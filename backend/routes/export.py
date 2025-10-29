from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Dict, Any
import logging
import json
from datetime import datetime

router = APIRouter(prefix="/api/export", tags=["export"])
logger = logging.getLogger(__name__)

class ExportRequest(BaseModel):
    email: EmailStr
    data: Dict[str, Any]

class ExportResponse(BaseModel):
    success: bool
    message: str

@router.post("/email", response_model=ExportResponse)
async def export_to_email(request: ExportRequest):
    """
    Export user data to email before deletion.
    This is a privacy-focused feature that allows users to get their data
    before permanently deleting it from the app.
    """
    try:
        # In a production app, you would integrate with an email service like SendGrid
        # For now, we'll log the export request
        
        export_data = {
            "email": request.email,
            "export_date": datetime.utcnow().isoformat(),
            "data": request.data
        }
        
        logger.info(f"Data export requested for {request.email}")
        logger.info(f"Export data: {json.dumps(export_data, indent=2)}")
        
        # TODO: Integrate with email service (SendGrid, AWS SES, etc.)
        # For MVP, we're simulating successful export
        
        return ExportResponse(
            success=True,
            message=f"Your data has been prepared for export. In production, this would be sent to {request.email}"
        )
        
    except Exception as e:
        logger.error(f"Error exporting data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Export error: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "export"}
