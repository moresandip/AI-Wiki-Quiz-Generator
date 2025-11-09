import logging
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import json
from dotenv import load_dotenv
from database import get_db, Quiz
from scraper import scrape_wikipedia
from llm_quiz_generator import create_quiz_generator
from models import QuizOutput

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("backend.log"),
        logging.StreamHandler()
    ]
)

# Load environment variables
load_dotenv()

class GenerateQuizRequest(BaseModel):
    url: str

app = FastAPI(title="AI Wiki Quiz Generator")

# CORS middleware
# Allow all origins for now (you can restrict to specific domains in production)
allowed_origins = [
    "http://localhost:3000",
    "https://ai-wiki-quiz-generatorr.netlify.app",
    "https://*.netlify.app",  # Allow all Netlify preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Using * for now, but you can use allowed_origins list above for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_quiz")
async def generate_quiz(request: GenerateQuizRequest, db: Session = Depends(get_db)):
    """
    Generate a quiz from a Wikipedia URL.
    """
    try:
        # Scrape the article
        content, title = scrape_wikipedia(request.url)

        # Generate quiz using LLM
        chain = create_quiz_generator()
        quiz_data = chain.invoke({
            "title": title,
            "content": content,
            "url": request.url
        })

        # Save to database
        quiz_json = json.dumps(quiz_data)
        db_quiz = Quiz(
            url=request.url,
            title=title,
            scraped_content=content,
            full_quiz_data=quiz_json
        )
        db.add(db_quiz)
        db.commit()
        db.refresh(db_quiz)

        return quiz_data

    except Exception as e:
        # Log the detailed error and traceback for debugging
        import traceback
        error_details = traceback.format_exc()
        logging.error(f"Error generating quiz for URL {request.url}:\n{error_details}")
        # Return a more specific error to the frontend
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz. Internal error: {str(e)}")

@app.get("/history")
async def get_history(db: Session = Depends(get_db)):
    """
    Get list of all generated quizzes.
    """
    quizzes = db.query(Quiz).all()
    return [
        {
            "id": q.id,
            "url": q.url,
            "title": q.title,
            "date_generated": q.date_generated
        }
        for q in quizzes
    ]

@app.get("/quiz/{quiz_id}")
async def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """
    Get a specific quiz by ID.
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    quiz_data = json.loads(quiz.full_quiz_data)
    return quiz_data

@app.delete("/quiz/{quiz_id}")
async def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific quiz by ID.
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    db.delete(quiz)
    db.commit()
    return {"message": "Quiz deleted successfully"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
