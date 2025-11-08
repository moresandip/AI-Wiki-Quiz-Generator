import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from models import QuizOutput
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_quiz_generator():
    """
    Create a quiz generator using Google Gemini AI.
    """
    # Check if API key is available
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        # Fallback to mock generator if no API key
        print("Warning: GOOGLE_API_KEY not found. Using mock quiz generator.")
        return create_mock_quiz_generator()

    try:
        # Initialize the LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-exp",
            temperature=0.7,
            api_key=api_key
        )
        print("Google Gemini LLM initialized successfully.")
        # Test the LLM with a simple request to ensure it works
        test_response = llm.invoke("Hello")
        print("LLM initialized successfully")
    except Exception as e:
        print(f"Failed to initialize LLM: {e}. Using mock quiz generator.")
        return create_mock_quiz_generator()

    # Create the prompt template
    prompt_template = """
You are an expert educator creating a comprehensive quiz from a Wikipedia article. Analyze the provided article content and create a detailed quiz with accurate information based on the article.

Article Title: {title}
Article Content: {content}
Article URL: {url}

Based on this article, create a quiz with the following structure:

1. **Summary**: A concise 2-3 sentence summary of the article's main points
2. **Key Entities**: Extract and categorize important people, organizations, and locations mentioned in the article
3. **Sections**: List the main sections/topics covered in the article
4. **Quiz Questions**: Create 5 multiple-choice questions that test understanding of the article content. Each question should:
   - Be directly based on information from the article
   - Have 4 options (A, B, C, D)
   - Have one clearly correct answer
   - Include difficulty level (easy, medium, hard)
   - Have an explanation for why the answer is correct
5. **Related Topics**: Suggest 3-5 related topics that readers might be interested in

IMPORTANT: All information in the quiz must be accurate and directly derived from the article content. Do not add external knowledge or assumptions.

Return the response in the following JSON format:
{{
    "id": 1,
    "url": "{url}",
    "title": "{title}",
    "summary": "Brief summary here",
    "key_entities": {{
        "people": ["Person 1", "Person 2"],
        "organizations": ["Organization 1", "Organization 2"],
        "locations": ["Location 1", "Location 2"]
    }},
    "sections": ["Section 1", "Section 2", "Section 3"],
    "quiz": [
        {{
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Correct Option Text",
            "difficulty": "easy|medium|hard",
            "explanation": "Explanation of why this is correct"
        }}
    ],
    "related_topics": ["Topic 1", "Topic 2", "Topic 3"]
}}

Ensure the quiz questions are challenging but fair, and the information is accurate to the article.
"""

    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["title", "content", "url"]
    )

    # Create the chain
    chain = prompt | llm | JsonOutputParser()

    return chain

def create_mock_quiz_generator():
    """
    Create a mock quiz generator for demo purposes when API key is not available.
    """
    class MockQuizGenerator:
        def invoke(self, inputs):
            # Return a sample quiz as a dict to match JsonOutputParser output
            sample_quiz = {
                "id": 1,
                "url": inputs["url"],
                "title": inputs["title"],
                "summary": f"This is a sample summary for {inputs['title']}. The article contains information about various topics related to the subject.",
                "key_entities": {
                    "people": ["Sample Person 1", "Sample Person 2"],
                    "organizations": ["Sample Organization"],
                    "locations": ["Sample Location"]
                },
                "sections": ["Introduction", "History", "Key Concepts", "Applications"],
                "quiz": [
                    {
                        "question": f"What is the main topic of {inputs['title']}?",
                        "options": [inputs["title"], "Unrelated Topic 1", "Unrelated Topic 2", "Unrelated Topic 3"],
                        "answer": inputs["title"],
                        "difficulty": "easy",
                        "explanation": f"The main topic of the article is {inputs['title']}."
                    },
                    {
                        "question": "What type of information does this article provide?",
                        "options": ["Educational content", "Entertainment", "News", "Advertisements"],
                        "answer": "Educational content",
                        "difficulty": "easy",
                        "explanation": "This is an educational article providing information about the topic."
                    },
                    {
                        "question": "Which of these is a key section mentioned?",
                        "options": ["Introduction", "Random Section", "Unrelated", "None"],
                        "answer": "Introduction",
                        "difficulty": "medium",
                        "explanation": "The article typically includes an Introduction section."
                    },
                    {
                        "question": "What is the purpose of this type of article?",
                        "options": ["To inform readers", "To sell products", "To entertain", "To advertise"],
                        "answer": "To inform readers",
                        "difficulty": "easy",
                        "explanation": "Wikipedia articles are created to inform and educate readers about various topics."
                    },
                    {
                        "question": "How is information typically organized in such articles?",
                        "options": ["In sections and subsections", "Randomly", "Only in paragraphs", "As a single block"],
                        "answer": "In sections and subsections",
                        "difficulty": "medium",
                        "explanation": "Articles are organized into logical sections for better readability."
                    }
                ],
                "related_topics": ["Related Topic 1", "Related Topic 2", "Related Topic 3"]
            }
            return sample_quiz

    return MockQuizGenerator()
