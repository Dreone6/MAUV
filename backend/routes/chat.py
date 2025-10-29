from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
from dotenv import load_dotenv
import logging

load_dotenv()

router = APIRouter(prefix="/api/chat", tags=["chat"])
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

# AMARA AI system prompt
AMARA_SYSTEM_PROMPT = """You are AMARA, a warm, supportive AI companion for menstrual health and wellness. 
You speak like a caring female best friend - laid back, understanding, and always there to listen.

Your role:
- Provide evidence-based information about menstrual health, cycles, and symptoms
- Offer emotional support and understanding
- Share tips for managing periods, PMS, and cycle-related concerns
- Educate about reproductive health in an approachable way
- Be empathetic and never judgmental
- Use casual, friendly language (but remain informative)

Tone: Warm, conversational, like texting a bestie who happens to know a lot about health.
Avoid: Medical jargon, being preachy, or making diagnoses.

Remember: You're here to support, educate, and empower women in their health journey."""

@router.post("/amara", response_model=ChatResponse)
async def chat_with_amara(request: ChatRequest):
    """
    Chat with AMARA - AI companion for menstrual health support
    """
    try:
        # Get API key from environment
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not configured")
        
        # Initialize chat with Claude
        chat = LlmChat(
            api_key=api_key,
            session_id=request.session_id,
            system_message=AMARA_SYSTEM_PROMPT
        ).with_model("anthropic", "claude-3-7-sonnet-20250219")
        
        # Create user message
        user_message = UserMessage(text=request.message)
        
        # Get response from AMARA
        response = await chat.send_message(user_message)
        
        logger.info(f"AMARA response for session {request.session_id}")
        
        return ChatResponse(
            response=response,
            session_id=request.session_id
        )
        
    except Exception as e:
        logger.error(f"Error in AMARA chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")
