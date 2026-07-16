# Nest Core API

NestJS REST API for tracking job opportunities, companies, recruiters and interview notes.

This project focuses on learning and applying core NestJS concepts while building a practical backend for job search tracking. It includes modular architecture, DTO validation, MongoDB persistence, request tracing, global response formatting, standardized error handling and API protection with an API key guard.

## Main Features

- NestJS modular architecture
- MongoDB integration with Mongoose
- Environment configuration with ConfigModule
- DTO validation with ValidationPipe
- Query filters
- Pagination
- Sorting
- CRUD operations
- MongoDB schemas with decorators
- ObjectId references
- Populate related documents
- Global Exception Filter
- Global Response Interceptor
- Request logging Interceptor
- Request ID Middleware
- API Key Guard
- Helmet security headers
- CORS configuration
- HTTP compression
- Rate limiting with Throttler
- Automated smoke test

## Tech Stack

- Node.js 20
- TypeScript 5.9
- NestJS
- MongoDB
- Mongoose
- class-validator
- class-transformer
- Helmet
- Compression
- Nest Throttler

## Project Domain

The API is designed for tracking job opportunities.

Main resources:

```text
companies
recruiters
opportunities
interview-notes
```

## Project Structure

```text
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── guards/
│   │   └── api-key.guard.ts
│   ├── interceptors/
│   │   ├── request-logger.interceptor.ts
│   │   └── response.interceptor.ts
│   └── middlewares/
│       └── request-id.middleware.ts
└── modules/
    ├── companies/
    ├── interview-notes/
    ├── opportunities/
    ├── recruiters/
    └── status/
```

## Requirements

- Node.js `20.19.4`
- npm
- MongoDB running locally
- curl
- jq

## Installation

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | API port | `3004` |
| `APP_NAME` | Application name | `nest-core-api` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/nest_job_tracker` |
| `API_KEY` | API key required for protected opportunity writes | `change-this-value` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `RATE_LIMIT_TTL_MS` | Rate limit time window in milliseconds | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per time window | `100` |

## Development

Start MongoDB:

```bash
sudo systemctl start mongod
```

Start the API:

```bash
npm run start:dev
```

The API runs at:

```text
http://localhost:3004
```

## Build

```bash
npm run build
```

## Production Start

```bash
npm run build
npm run start:prod
```

## API Response Format

Successful responses are wrapped by a global interceptor:

```json
{
  "success": true,
  "data": {},
  "requestId": "frontend-123",
  "timestamp": "2026-07-12T15:00:00.000Z"
}
```

Paginated responses include metadata:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "sortBy": "company",
    "order": "asc"
  },
  "requestId": "frontend-123",
  "timestamp": "2026-07-12T15:00:00.000Z"
}
```

## Error Format

Errors are handled by a global exception filter:

```json
{
  "statusCode": 404,
  "message": "Opportunity with id 64b000000000000000000999 was not found",
  "error": "Not Found",
  "path": "/api/opportunities/64b000000000000000000999",
  "requestId": "frontend-123",
  "timestamp": "2026-07-12T15:00:00.000Z"
}
```

## Request ID

Every request receives an `X-Request-Id` header.

Clients can also provide their own:

```bash
curl -s \
  http://localhost:3004/api/status \
  -H "X-Request-Id: frontend-123" | jq
```

The same request ID appears in:

- Response headers
- Successful response bodies
- Error response bodies
- Request logs

## Main Endpoints

### Status

```http
GET /api/status
```

### Companies

```http
GET  /api/companies
GET  /api/companies/:id
POST /api/companies
```

Create company:

```bash
curl -s -X POST \
  http://localhost:3004/api/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Frontend Talent",
    "industry": "Recruitment",
    "website": "https://frontendtalent.example.com"
  }' | jq
```

### Recruiters

```http
GET  /api/recruiters
GET  /api/recruiters/:id
POST /api/recruiters
```

Create recruiter:

```bash
curl -s -X POST \
  http://localhost:3004/api/recruiters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Andrea Torres",
    "email": "andrea@frontendtalent.example.com",
    "company": "Frontend Talent",
    "phone": "555-0199"
  }' | jq
```

### Opportunities

```http
GET    /api/opportunities
GET    /api/opportunities/:id
POST   /api/opportunities
PATCH  /api/opportunities/:id
DELETE /api/opportunities/:id
```

Write operations require:

```http
X-API-Key: your-api-key
```

Create opportunity:

```bash
curl -s -X POST \
  http://localhost:3004/api/opportunities \
  -H "Content-Type: application/json" \
  -H "X-API-Key: change-this-value" \
  -d '{
    "company": "Frontend Talent",
    "position": "Senior React Developer",
    "status": "applied",
    "workMode": "remote",
    "salary": 50000
  }' | jq
```

Filter, sort and paginate:

```bash
curl -s \
  "http://localhost:3004/api/opportunities?status=applied&sortBy=salary&order=desc&page=1&limit=5" \
  | jq
```

Supported statuses:

```text
saved
applied
interview
offer
rejected
```

Supported work modes:

```text
remote
hybrid
onsite
```

Supported sort fields:

```text
company
position
status
workMode
salary
```

### Interview Notes

```http
GET  /api/interview-notes
GET  /api/interview-notes/:id
POST /api/interview-notes
```

Interview notes reference opportunities through MongoDB ObjectId.

Create note:

```bash
OPPORTUNITY_ID="<existing-opportunity-id>"

curl -s -X POST \
  http://localhost:3004/api/interview-notes \
  -H "Content-Type: application/json" \
  -d "{
    \"opportunityId\": \"$OPPORTUNITY_ID\",
    \"interviewer\": \"Andrea Torres\",
    \"notes\": \"Strong frontend profile. Continue with technical interview.\"
  }" | jq
```

When listing notes, the related opportunity is populated:

```json
{
  "opportunityId": {
    "_id": "...",
    "company": "Frontend Talent",
    "position": "Senior React Developer",
    "status": "applied",
    "workMode": "remote",
    "salary": 50000
  }
}
```

## Core NestJS Concepts Used

### Module

Groups related controllers, services and providers.

```text
CompaniesModule
├── CompaniesController
├── CompaniesService
└── CompanySchema
```

### Controller

Receives HTTP requests.

```text
GET /api/companies
-> CompaniesController
```

### Service

Contains business logic and data access.

```text
CompaniesController
-> CompaniesService
-> MongoDB
```

### DTO

Defines and validates request data.

```text
CreateOpportunityDto
UpdateOpportunityDto
FilterOpportunitiesDto
```

### Pipe

Validates and transforms input.

```text
ValidationPipe
ParseIntPipe
```

### Guard

Protects routes.

```text
ApiKeyGuard
```

### Middleware

Runs before controllers.

```text
RequestIdMiddleware
```

### Interceptor

Transforms or observes successful responses.

```text
ResponseInterceptor
RequestLoggerInterceptor
```

### Exception Filter

Formats errors globally.

```text
HttpExceptionFilter
```

## Smoke Test

Start the API:

```bash
npm run start:dev
```

In another terminal:

```bash
npm run smoke:test
```

Expected result:

```text
Smoke test summary
Passed: 12
Failed: 0

Smoke test completed successfully
```

You can override the URL and API key:

```bash
BASE_URL=http://localhost:3004 \
API_KEY=nest-core-secret \
npm run smoke:test
```

## Scripts

```bash
npm run start
npm run start:dev
npm run start:prod
npm run build
npm run test
npm run test:e2e
npm run smoke:test
```

## Notes

This project intentionally starts with in-memory modules and progressively migrates resources to MongoDB. The final version stores companies, recruiters, opportunities and interview notes in MongoDB.

The API demonstrates core NestJS backend patterns using a practical job tracking domain.
