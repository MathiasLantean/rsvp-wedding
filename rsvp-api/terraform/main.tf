provider "aws" {
  region = var.region
  profile = "personal"
}

resource "aws_dynamodb_table" "rsvp" {
  name         = "rsvp-guests"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "phone"

  attribute {
    name = "phone"
    type = "S"
  }
}

resource "aws_lambda_function" "api" {
  function_name = "rsvp-api"
  runtime       = "python3.12"
  handler       = "app.main.handler"
  role          = aws_iam_role.lambda.arn

  filename         = "../lambda.zip"
  source_code_hash = filebase64sha256("../lambda.zip")

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.rsvp.name
    }
  }
}

resource "aws_apigatewayv2_api" "http" {
  name          = "rsvp-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                  = aws_apigatewayv2_api.http.id
  integration_type        = "AWS_PROXY"
  integration_uri         = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.http.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http.execution_arn}/*/*"
}
