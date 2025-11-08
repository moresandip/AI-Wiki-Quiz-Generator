from pydantic import BaseModel
from typing import List, Dict, Optional

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    difficulty: str
    explanation: str

class KeyEntities(BaseModel):
    people: List[str]
    organizations: List[str]
    locations: List[str]

class QuizOutput(BaseModel):
    id: int
    url: str
    title: str
    summary: str
    key_entities: KeyEntities
    sections: List[str]
    quiz: List[QuizQuestion]
    related_topics: List[str]
