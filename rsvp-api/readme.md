# RSVP API (Serverless FastAPI on AWS)

A small, serverless REST API for managing wedding (or event) RSVPs. It is designed to run on **AWS Lambda** behind an **API Gateway HTTP API**, using **DynamoDB** as the persistence layer. Infrastructure is defined with **Terraform**, and packaging/deployment is automated via a **Makefile** and **Docker** (to build a Lambda-compatible zip).

---

## Project Structure

High-level layout:

- `app/` — Application source code (FastAPI app + DynamoDB access)
- `terraform/` — Infrastructure as Code (AWS resources)
- `tests/` — Automated tests
- `Dockerfile` — Builds a Lambda deployment artifact (`lambda.zip`) in an Amazon Linux environment
- `Makefile` — Common tasks: build, deploy, destroy
- `lambda.zip` — Deployment artifact produced by `make build`
- `pyproject.toml` / `uv.lock` — Python dependency management (with `uv`)

---

## Architecture

### Runtime request flow

1. **Client** sends HTTP request
2. **API Gateway (HTTP API)** forwards the request to Lambda (proxy integration)
3. **AWS Lambda** runs the FastAPI application via an ASGI adapter
4. The app reads/writes data in **DynamoDB**
5. Response flows back through API Gateway to the client

### AWS resources (Terraform-managed)

- DynamoDB table for guest records (partition key: `phone`)
- Lambda function running Python 3.12
- API Gateway v2 HTTP API with a default route (`$default`) pointing to Lambda
- IAM role/policies granting Lambda:
  - CloudWatch Logs basic execution
  - DynamoDB read/write permissions for the table

---

## API Overview

Typical endpoints exposed by the service:

- `GET /rsvp/{phone}` — fetch a guest record by phone
- `POST /rsvp/confirm` — confirm attendance for a phone number
- `POST /guests` — create a new guest
- `GET /guests` — list all guests

Once deployed, Terraform outputs the API base URL; you’ll call endpoints under that base URL.

---

## Requirements

### Local tooling

- **Docker** (used for building a Linux/amd64 Lambda artifact)
- **Terraform** (for provisioning AWS resources)
- **AWS credentials** configured locally (e.g., via `aws configure` or environment variables)

### Python tooling (optional, for local dev/tests)

- Python **3.12+**
- **uv** (project uses `uv` for dependency management)

---

## Installation (Local Dev)

### 1) Set up the Python environment (uv)

From the project root:


This installs runtime + dev dependencies (as defined in `pyproject.toml` and pinned by `uv.lock`).

### 2) Configure AWS credentials

You need valid AWS credentials with permissions to create:
- Lambda
- API Gateway
- DynamoDB
- IAM roles/policies

Common options:
- `aws configure`
- Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, (and optionally `AWS_SESSION_TOKEN`)

---

## Using the Makefile

The Makefile is the primary interface for building and deploying.

### Targets

#### `make build`
Builds `lambda.zip` using Docker in an Amazon Linux environment and outputs the artifact into the project root.


Notes:
- Uses `docker buildx` targeting `linux/amd64` to match common Lambda execution architectures.
- Produces/overwrites `lambda.zip`.

#### `make clean`
Removes the generated deployment artifact.


#### `make deploy`
Builds the artifact and runs `terraform apply` in `terraform/`.

After a successful deploy, look for the API endpoint output.

#### `make destroy`
Tears down the infrastructure via `terraform destroy`.
