# Nest Core API — Technical Checklist

## Runtime and Framework

- [x] Node.js 20.19.4
- [x] TypeScript 5.9.3
- [x] NestJS
- [x] Strict TypeScript project
- [x] Nest CLI project structure
- [x] Development mode with watch
- [x] Production build generation

## Core NestJS Concepts

- [x] Root module configured
- [x] Feature modules created
- [x] Controllers created
- [x] Services created
- [x] Dependency injection used
- [x] DTOs created
- [x] Global ValidationPipe configured
- [x] ParseIntPipe used before MongoDB migration
- [x] Exception Filter created
- [x] Guard created
- [x] Middleware created
- [x] Interceptors created

## Domain Modules

- [x] Status module
- [x] Companies module
- [x] Recruiters module
- [x] Opportunities module
- [x] Interview notes module

## Companies

- [x] Company DTO validation
- [x] Company MongoDB schema
- [x] Company Mongoose model registered
- [x] Create company endpoint
- [x] List companies endpoint
- [x] Get company by ID endpoint
- [x] Company data persisted in MongoDB

## Recruiters

- [x] Recruiter DTO validation
- [x] Recruiter MongoDB schema
- [x] Recruiter Mongoose model registered
- [x] Create recruiter endpoint
- [x] List recruiters endpoint
- [x] Get recruiter by ID endpoint
- [x] Recruiter data persisted in MongoDB

## Opportunities

- [x] Opportunity DTO validation
- [x] Update DTO with PartialType
- [x] Filter DTO
- [x] Opportunity MongoDB schema
- [x] Opportunity Mongoose model registered
- [x] Create opportunity endpoint
- [x] List opportunities endpoint
- [x] Get opportunity by ID endpoint
- [x] Update opportunity endpoint
- [x] Delete opportunity endpoint
- [x] Filtering by status
- [x] Filtering by work mode
- [x] Filtering by company
- [x] Pagination
- [x] Sorting
- [x] Opportunity data persisted in MongoDB

## Interview Notes

- [x] Interview note DTO validation
- [x] Interview note MongoDB schema
- [x] Interview note Mongoose model registered
- [x] Create interview note endpoint
- [x] List interview notes endpoint
- [x] Get interview note by ID endpoint
- [x] Interview note data persisted in MongoDB
- [x] Opportunity ObjectId reference
- [x] Existing opportunity validation before creating note
- [x] Populate related opportunity data

## Configuration

- [x] ConfigModule configured
- [x] ConfigService used
- [x] `.env` created
- [x] `.env.example` created
- [x] Local `.env` excluded from Git
- [x] Port configured from environment variables
- [x] MongoDB URI configured from environment variables
- [x] API key configured from environment variables
- [x] CORS origin configured from environment variables
- [x] Rate limit configured from environment variables

## MongoDB

- [x] MongooseModule configured globally
- [x] MongooseModule.forRootAsync used
- [x] MongooseModule.forFeature used in modules
- [x] Schemas created with decorators
- [x] Models injected with InjectModel
- [x] Documents created
- [x] Documents queried
- [x] Documents updated
- [x] Documents deleted
- [x] ObjectId references used
- [x] Populate used

## Validation

- [x] class-validator installed
- [x] class-transformer installed
- [x] Required string validation
- [x] Email validation
- [x] URL validation
- [x] Enum validation
- [x] Mongo ObjectId validation
- [x] Numeric query transformation
- [x] Pagination validation
- [x] Sorting validation
- [x] Extra properties blocked with forbidNonWhitelisted

## Error Handling

- [x] Global HttpExceptionFilter
- [x] Standardized error format
- [x] Path included in errors
- [x] Timestamp included in errors
- [x] Request ID included in errors
- [x] NotFoundException used
- [x] UnauthorizedException used
- [x] Validation errors preserved

## Security and HTTP

- [x] Helmet enabled
- [x] CORS enabled
- [x] Compression enabled
- [x] Rate limiting enabled
- [x] API key guard created
- [x] Opportunity write operations protected
- [x] Public read operations available
- [x] Request ID header supported

## Observability

- [x] RequestIdMiddleware
- [x] X-Request-Id response header
- [x] Request ID accepted from client
- [x] Request ID generated when missing
- [x] ResponseInterceptor
- [x] Standardized success responses
- [x] RequestLoggerInterceptor
- [x] Method logged
- [x] Path logged
- [x] Status code logged
- [x] Duration logged
- [x] Request ID logged

## Automated Validation

- [x] Smoke test script created
- [x] Smoke test script executable
- [x] Status endpoint validated
- [x] Company creation validated
- [x] Recruiter creation validated
- [x] Opportunity creation with API key validated
- [x] Opportunity list metadata validated
- [x] Interview note creation validated
- [x] Populate validation included
- [x] Unauthorized opportunity creation validated
- [x] Not found error validated
- [x] Request ID validation included

## Documentation

- [x] Professional README created
- [x] Tech stack documented
- [x] Domain documented
- [x] Project structure documented
- [x] Environment variables documented
- [x] Endpoints documented
- [x] API response format documented
- [x] Error format documented
- [x] Request ID documented
- [x] NestJS concepts documented
- [x] Smoke test documented

## Final Validation

- [ ] `npm install`
- [ ] `npm run build`
- [ ] `npm run start:dev`
- [ ] `npm run smoke:test`
- [ ] MongoDB is running
- [ ] Status endpoint returns success
- [ ] Smoke test reports `12` passed and `0` failed
