from typing import Optional, List

from pydantic import BaseModel, Field

class Guest(BaseModel):
    name: str = Field(..., min_length=1)
    attending: Optional[bool] = None
    notes: Optional[str] = None

class GuestGroup(BaseModel):
    phone: str = Field(..., min_length=1)
    guests: List[Guest]

class CreateGuestRequest(BaseModel):
    phone: str = Field(..., min_length=1)
    guest_names: List[str] = Field(..., min_length=1)

class ConfirmAttendanceRequest(BaseModel):
    phone: str = Field(..., min_length=1)
    guests: List[Guest]
    message: Optional[str] = None

class GuestGroupResponse(BaseModel):
    phone: str = Field(..., min_length=1)
    guests: List[Guest]
    message: Optional[str] = None