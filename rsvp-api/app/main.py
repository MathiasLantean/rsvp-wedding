from fastapi import FastAPI, HTTPException
from mangum import Mangum
from . import schemas, crud


app = FastAPI(title="Wedding RSVP API")


@app.get("/rsvp/{phone}", response_model=schemas.GuestGroup)
def get_guest(phone: str):
    guest = crud.get_guest_by_phone(phone)
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest


@app.post("/rsvp/confirm", response_model=schemas.GuestGroup)
def confirm_attendance(payload: schemas.ConfirmAttendanceRequest):
    guest = crud.get_guest_by_phone(payload.phone)
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")


    if payload.confirmed > guest["invited_total"]:
        raise HTTPException(
            status_code=400,
            detail="Confirmed guests cannot exceed invited total",
        )

    return crud.confirm_attendance(payload.phone, payload.confirmed)


@app.post("/guests", response_model=schemas.GuestGroup)
def add_guest(payload: schemas.CreateGuestRequest):
    existing = crud.get_guest_by_phone(payload.phone)
    if existing:
        raise HTTPException(status_code=409, detail=f"Guest with phone {payload.phone} already exists")

    guests = [
        schemas.Guest(name=name, attending=None, notes=None)
        for name in payload.guest_names
    ]

    return crud.create_guest(
        phone=payload.phone,
        guests=guests,
    )

@app.get("/guests", response_model=list[schemas.GuestGroup])
def list_guests():
    return crud.list_guests()

handler = Mangum(app)
