import boto3
from .config import AWS_REGION, DYNAMODB_TABLE


dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
table = dynamodb.Table(DYNAMODB_TABLE)