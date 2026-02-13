import csv
import io
import re
from fastapi import FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from . import schemas, crud


app = FastAPI(title="Wedding RSVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)


@app.get("/rsvp/{phone}", response_model=schemas.GuestGroupResponse)
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


@app.post("/guests", response_model=schemas.GuestGroupResponse)
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


@app.post("/guests/upload")
def upload_guests(file: UploadFile = File(...)):
    content = file.file.read().decode("utf-8")
    csv_reader = csv.reader(io.StringIO(content))
    
    items = []
    for row in csv_reader:
        if not row:
            continue
            
        principal_name = row[0].strip()
        companions_text = row[2]
        phone_raw = row[3]
        
        companion_names = [name.strip() for name in companions_text.splitlines() if name.strip()]
        
        phone = re.sub(r"[^0-9+]", "", phone_raw)
        
        guests = [schemas.Guest(name=principal_name, attending=None, notes=None)]
        for name in companion_names:
            guests.append(schemas.Guest(name=name, attending=None, notes=None))
            
        item = {
            "phone": phone,
            "guests": [guest.model_dump() for guest in guests],
            "message": None
        }
        items.append(item)
        
    count = crud.batch_create_guests(items)
    return {"message": f"Successfully uploaded {count} guest groups"}


@app.get("/guests", response_model=list[schemas.GuestGroupResponse])
def list_guests():
    return crud.list_guests()

handler = Mangum(app)
