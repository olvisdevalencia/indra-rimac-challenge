
---

# SWAPI application microservice INDRA BACKEND DEVELOPER TEST 🚀

This project is an **SWAPI application microservice** built with **Serverless Framework** on **AWS Lambda**, leveraging services like **S3**, **DynamoDB**.

## Requirements

- Node.js (v16 or higher)
- pnpm
- AWS CLI configured with valid credentials
- Serverless Framework

## Configuration

1. **Environment Variables**: Create a `.env` file with the following variables:

    ```bash
    DYNAMODB_TABLE=IndraRimacCharacters
    ```

2. **IAM Permissions**: The AWS user must have permissions to manage Lambda, SNS, SQS, DynamoDB, RDS, and IAM roles.

## Installation

Install the dependencies using **pnpm**:

```bash
pnpm install
```

## Deployment

Deploy the service to AWS:

```bash
serverless deploy
```

## Local Development

Run the service locally using **Serverless Offline**:

```bash
serverless offline
```

## Resources

This project uses the following AWS services:
- **AWS Lambda** for business logic.
- **DynamoDB** for storing characters.

## Commands

- **Deploy the service**: `serverless deploy`
- **Run locally**: `serverless offline`
- **Remove AWS resources**: `serverless remove`

---