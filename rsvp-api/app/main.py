from fastapi import FastAPI, HTTPException, status
from mangum import Mangum
from . import schemas, crud


app = FastAPI(title="Wedding RSVP API")


@app.get("/rsvp/{phone}", response_model=schemas.GuestGroup)
def get_guest(phone: str):
    guest = crud.get_guest_by_phone(phone)
    if not guest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")
    return guest


@app.post("/rsvp/confirm", response_model=schemas.ConfirmAttendanceRequest)
def confirm_attendance(payload: schemas.ConfirmAttendanceRequest):
    guest_group = crud.get_guest_by_phone(payload.phone)
    if not guest_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")

    existing_names = {guest["name"] for guest in guest_group["guests"]}
    payload_names = {guest.name for guest in payload.guests}

    if existing_names != payload_names:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Guest list does not match existing group",
        )

    return crud.confirm_attendance(payload.phone, payload.guests, payload.message)


@app.post("/guests", response_model=schemas.GuestGroup)
def add_guest(payload: schemas.CreateGuestRequest):
    existing = crud.get_guest_by_phone(payload.phone)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Guest with phone {payload.phone} already exists")

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
