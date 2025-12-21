from typing import List

from .db import table
from .schemas import Guest


def get_guest_by_phone(phone: str):
    response = table.get_item(Key={"phone": phone})
    return response.get("Item")


def list_guests():
    response = table.scan()
    return response.get("Items", [])

def create_guest(phone: str, guests: List[Guest]):
    item = {
        "phone": phone,
        "guests": [guest.model_dump() for guest in guests],
        "message": None
    }
    table.put_item(Item=item)
    return item

def confirm_attendance(phone: str, guests: list[Guest], message: str | None):
    response = table.update_item(
        Key={"phone": phone},
        UpdateExpression="SET guests = :g, message = :m",
        ExpressionAttributeValues={
            ":g": [guest.model_dump() for guest in guests],
            ":m": message,
        },
        ReturnValues="ALL_NEW",
    )

    return response.get("Attributes")

