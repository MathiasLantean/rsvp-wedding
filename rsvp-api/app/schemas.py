from pydantic import BaseModel, Field

class CreateGuestRequest(BaseModel):
    phone: str
    name: str
    invited_total: int = Field(..., ge=1)

class GuestResponse(BaseModel):
    phone: str
    name: str
    invited_total: int = Field(..., ge=1)
    confirmed: int | None = None


class ConfirmAttendanceRequest(BaseModel):
    phone: str
    confirmed: int = Field(..., ge=0)
