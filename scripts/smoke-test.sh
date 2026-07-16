#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3004}"
API_KEY="${API_KEY:-nest-core-secret}"

PASS_COUNT=0
FAIL_COUNT=0

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  echo "PASS - $1"
}

fail() {
  FAIL_COUNT=$((FAIL_COUNT + 1))
  echo "FAIL - $1"
}

assert_equals() {
  local actual="$1"
  local expected="$2"
  local message="$3"

  if [[ "$actual" == "$expected" ]]; then
    pass "$message"
  else
    fail "$message | expected=$expected actual=$actual"
  fi
}

assert_not_empty() {
  local value="$1"
  local message="$2"

  if [[ -n "$value" && "$value" != "null" ]]; then
    pass "$message"
  else
    fail "$message | value is empty"
  fi
}

request_json() {
  local method="$1"
  local url="$2"
  local body="${3:-}"

  if [[ -n "$body" ]]; then
    curl -s -X "$method" "$url" \
      -H "Content-Type: application/json" \
      -H "X-Request-Id: smoke-test" \
      -H "X-API-Key: $API_KEY" \
      -d "$body"
  else
    curl -s -X "$method" "$url" \
      -H "X-Request-Id: smoke-test"
  fi
}

echo
echo "Running smoke test against:"
echo "$BASE_URL"
echo

STATUS_RESPONSE=$(
  request_json GET "$BASE_URL/api/status"
)

STATUS_SUCCESS=$(
  echo "$STATUS_RESPONSE" | jq -r '.success'
)

assert_equals \
  "$STATUS_SUCCESS" \
  "true" \
  "GET /api/status returns success true"

STATUS_REQUEST_ID=$(
  echo "$STATUS_RESPONSE" | jq -r '.requestId'
)

assert_equals \
  "$STATUS_REQUEST_ID" \
  "smoke-test" \
  "GET /api/status returns requestId"

COMPANY_RESPONSE=$(
  request_json POST "$BASE_URL/api/companies" '{
    "name": "Smoke Test Company",
    "industry": "Recruitment",
    "website": "https://smoketest.example.com"
  }'
)

COMPANY_ID=$(
  echo "$COMPANY_RESPONSE" | jq -r '.data._id'
)

assert_not_empty \
  "$COMPANY_ID" \
  "POST /api/companies creates company"

RECRUITER_RESPONSE=$(
  request_json POST "$BASE_URL/api/recruiters" '{
    "name": "Smoke Recruiter",
    "email": "smoke.recruiter@example.com",
    "company": "Smoke Test Company"
  }'
)

RECRUITER_ID=$(
  echo "$RECRUITER_RESPONSE" | jq -r '.data._id'
)

assert_not_empty \
  "$RECRUITER_ID" \
  "POST /api/recruiters creates recruiter"

OPPORTUNITY_RESPONSE=$(
  request_json POST "$BASE_URL/api/opportunities" '{
    "company": "Smoke Test Company",
    "position": "Frontend Developer",
    "status": "applied",
    "workMode": "remote",
    "salary": 50000
  }'
)

OPPORTUNITY_ID=$(
  echo "$OPPORTUNITY_RESPONSE" | jq -r '.data._id'
)

assert_not_empty \
  "$OPPORTUNITY_ID" \
  "POST /api/opportunities creates opportunity with API key"

OPPORTUNITY_LIST_RESPONSE=$(
  request_json GET "$BASE_URL/api/opportunities?page=1&limit=5&sortBy=salary&order=desc"
)

OPPORTUNITY_LIST_SUCCESS=$(
  echo "$OPPORTUNITY_LIST_RESPONSE" | jq -r '.success'
)

assert_equals \
  "$OPPORTUNITY_LIST_SUCCESS" \
  "true" \
  "GET /api/opportunities returns success true"

OPPORTUNITY_META_TOTAL=$(
  echo "$OPPORTUNITY_LIST_RESPONSE" | jq -r '.meta.total'
)

assert_not_empty \
  "$OPPORTUNITY_META_TOTAL" \
  "GET /api/opportunities returns meta total"

NOTE_RESPONSE=$(
  request_json POST "$BASE_URL/api/interview-notes" "{
    \"opportunityId\": \"$OPPORTUNITY_ID\",
    \"interviewer\": \"Smoke Recruiter\",
    \"notes\": \"Smoke test interview note.\"
  }"
)

NOTE_ID=$(
  echo "$NOTE_RESPONSE" | jq -r '.data._id'
)

assert_not_empty \
  "$NOTE_ID" \
  "POST /api/interview-notes creates interview note"

NOTE_LIST_RESPONSE=$(
  request_json GET "$BASE_URL/api/interview-notes"
)

NOTE_POPULATED_COMPANY=$(
  echo "$NOTE_LIST_RESPONSE" | jq -r '.data[0].opportunityId.company // empty'
)

assert_not_empty \
  "$NOTE_POPULATED_COMPANY" \
  "GET /api/interview-notes returns populated opportunity"

UNAUTHORIZED_RESPONSE=$(
  curl -s -X POST "$BASE_URL/api/opportunities" \
    -H "Content-Type: application/json" \
    -H "X-Request-Id: smoke-unauthorized" \
    -d '{
      "company": "Unauthorized Company",
      "position": "Frontend Developer",
      "status": "saved",
      "workMode": "remote",
      "salary": 45000
    }'
)

UNAUTHORIZED_STATUS=$(
  echo "$UNAUTHORIZED_RESPONSE" | jq -r '.statusCode'
)

assert_equals \
  "$UNAUTHORIZED_STATUS" \
  "401" \
  "POST /api/opportunities without API key returns 401"

NOT_FOUND_RESPONSE=$(
  request_json GET "$BASE_URL/api/opportunities/64b000000000000000000999"
)

NOT_FOUND_STATUS=$(
  echo "$NOT_FOUND_RESPONSE" | jq -r '.statusCode'
)

assert_equals \
  "$NOT_FOUND_STATUS" \
  "404" \
  "GET missing opportunity returns 404"

NOT_FOUND_REQUEST_ID=$(
  echo "$NOT_FOUND_RESPONSE" | jq -r '.requestId'
)

assert_equals \
  "$NOT_FOUND_REQUEST_ID" \
  "smoke-test" \
  "Error response includes requestId"

echo
echo "Smoke test summary"
echo "Passed: $PASS_COUNT"
echo "Failed: $FAIL_COUNT"
echo

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 1
fi

echo "Smoke test completed successfully"
