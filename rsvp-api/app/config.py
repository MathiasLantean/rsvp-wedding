import os

AWS_REGION = os.getenv("AWS_REGION", "us-east-2")
DYNAMODB_TABLE = os.getenv("DYNAMODB_TABLE", "rsvp-guests")