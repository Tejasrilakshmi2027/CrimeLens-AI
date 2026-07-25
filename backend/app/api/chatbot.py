from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.chat import ChatRequest
from app.auth.utils import get_current_active_user
from app.models.user import User

from app.services.chatbot_service import generate_sql
from app.services.query_service import execute_sql
from app.services.response_service import format_response
from app.services.chat_memory import add

router = APIRouter()


@router.post("/ask")
def ask(request: ChatRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):

    # Save user message
    add("user", request.question)

    # Generate SQL
    sql = generate_sql(request.question)

    # Execute SQL
    result = execute_sql(db, sql)

    # Convert result to readable answer
    answer = format_response(request.question, result)

    # Save assistant reply
    add("assistant", answer)

    return {
        "question": request.question,
        "sql": sql,
        "answer": answer,
        "result": result
    }