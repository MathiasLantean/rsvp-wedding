from boto3.dynamodb.conditions import Key
from .db import table


def get_guest_by_phone(phone: str):
    response = table.get_item(Key={"phone": phone})
    return response.get("Item")


def list_guests():
    response = table.scan()
    return response.get("Items", [])

def create_guest(phone: str, name: str, invited_total: int):
    item = {
        "phone": phone,
        "name": name,
        "invited_total": invited_total,
    }
    table.put_item(Item=item)
    return item

def confirm_attendance(phone: str, confirmed: int):
    response = table.update_item(
        Key={"phone": phone},
        UpdateExpression="SET confirmed = :c",
        ExpressionAttributeValues={":c": confirmed},
        ReturnValues="ALL_NEW",
    )
    return response.get("Attributes")
