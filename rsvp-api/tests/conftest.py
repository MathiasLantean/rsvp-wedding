import boto3
import pytest
import app.config as config
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def cleanup_guest():
    created_phones = []

    yield created_phones

    dynamodb = boto3.resource(
        "dynamodb",
        region_name=config.AWS_REGION,
    )

    table = dynamodb.Table(config.DYNAMODB_TABLE)

    for phone in created_phones:
        table.delete_item(Key={"phone": phone})
