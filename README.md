# AI Wiki Quiz Generator

A full-stack application that generates educational quizzes from Wikipedia articles using AI.

## Features

- **Quiz Generation**: Input a Wikipedia URL to automatically generate a quiz with 5-10 questions
- **AI-Powered**: Uses Google's Gemini AI via LangChain to create relevant questions
- **Data Storage**: Persists quizzes in a MySQL/PostgreSQL database
- **History View**: Browse and view previously generated quizzes
- **Clean UI**: Modern React interface with Tailwind CSS

## Tech Stack

### Backend (Python)
- FastAPI
- SQLAlchemy
- BeautifulSoup4
- LangChain + Gemini AI
- Pydantic

### Frontend (JavaScript)
- React
- Tailwind CSS
- Axios for API calls

### Database
- MySQL or PostgreSQL

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js and npm
- MySQL/PostgreSQL database
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your database:
   - Create a MySQL/PostgreSQL database named `quiz_history`
   - Update the `DATABASE_URL` in `database.py` with your credentials

5. Configure API key:
   - Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to `backend/.env`:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

6. Run the backend:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

## API Endpoints

- `POST /generate_quiz` - Generate a quiz from a Wikipedia URL
- `GET /history` - Get list of all generated quizzes
- `GET /quiz/{quiz_id}` - Get details of a specific quiz

## Usage

1. Open the application in your browser
2. Go to the "Generate Quiz" tab
3. Enter a Wikipedia article URL (e.g., `https://en.wikipedia.org/wiki/Alan_Turing`)
4. Click "Generate Quiz" and wait for the AI to process
5. View the generated quiz with questions, answers, and explanations
6. Switch to "Past Quizzes" to see your history and view previous quizzes

## Sample Output Structure

```json
{
  "id": 1,
  "url": "https://en.wikipedia.org/wiki/Alan_Turing",
  "title": "Alan Turing",
  "summary": "Alan Turing was a British mathematician...",
  "key_entities": {
    "people": ["Alan Turing"],
    "organizations": ["University of Cambridge"],
    "locations": ["United Kingdom"]
  },
  "sections": ["Early life", "World War II", "Legacy"],
  "quiz": [
    {
      "question": "Where did Alan Turing study?",
      "options": ["Harvard", "Cambridge", "Oxford", "Princeton"],
      "answer": "Cambridge University",
      "difficulty": "easy",
      "explanation": "Mentioned in the 'Early life' section."
    }
  ],
  "related_topics": ["Cryptography", "Computer science"]
}
```

## Project Structure

```
ai-wiki-quiz-generator/
├── backend/
│   ├── database.py          # Database setup
│   ├── models.py            # Pydantic schemas
│   ├── scraper.py           # Wikipedia scraping
│   ├── llm_quiz_generator.py # AI quiz generation
│   ├── main.py              # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── services/        # API service functions
│   │   ├── tabs/            # Tab components
│   │   └── App.js           # Main React app
│   ├── package.json
│   └── tailwind.config.js   # Tailwind configuration
└── README.md
```

## Troubleshooting

- **Database connection issues**: Ensure your MySQL/PostgreSQL server is running and credentials are correct
- **API key errors**: Verify your Gemini API key is valid and properly set in `.env`
- **Scraping failures**: Some Wikipedia pages may have different structures; the scraper handles common cases
- **CORS errors**: The backend includes CORS middleware for frontend communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
