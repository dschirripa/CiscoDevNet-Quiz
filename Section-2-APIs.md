# Section 2: Understanding and Using APIs

## Summary
Section 2 covers essential API concepts for the Cisco DevNet Associate exam:

1. **REST API Requests:** HTTP methods, headers, and request construction
2. **Webhooks:** Event-driven patterns vs. polling
3. **API Constraints:** Rate limits, pagination, token expiration
4. **HTTP Status Codes:** 2xx, 3xx, 4xx, 5xx meanings
5. **Troubleshooting:** Diagnosing API issues systematically
6. **Response Components:** Status code, headers, and body
7. **Authentication:** Basic Auth, API Keys, Bearer Tokens
8. **API Styles:** REST vs. RPC, Sync vs. Async
9. **Python Scripts:** Using the requests library

**Practice Resources:**
- Cisco DevNet Sandboxes (DNA Center, Meraki, Webex)
- Postman for API testing
- Python requests library

---

## 2.1 Construct a REST API Request to Accomplish a Task Given API Documentation

### Overview
**ELI5:** REST APIs are like ordering at a restaurant—you look at the menu (API docs), tell the waiter what you want (request), and get your food (response).

**Summary:**
**REST** uses standard HTTP methods (GET, POST, PUT, PATCH, DELETE) to perform operations on resources. Key principles:
- **Stateless:** Each request is independent
- **Resource-based:** URLs represent things (`/devices/123`)
- **Standard methods:** HTTP verbs for CRUD operations

### HTTP Methods

| Method | Operation | Purpose | Body? |
|--------|-----------|---------|-------|
| GET | Read | Retrieve resource | No |
| POST | Create | Add new resource | Yes |
| PUT | Update | Replace resource | Yes |
| PATCH | Update | Partial update | Yes |
| DELETE | Delete | Remove resource | No |

### Request Components

**Complete URL:**
```
https://api.meraki.com/api/v1/organizations/123/devices
└────┬────┘└──────┬──────┘└───┬───┘└────────┬──────────┘
  Protocol    Domain    Base Path    Endpoint
```

**Headers:**
- `Authorization: Bearer token123` (authentication)
- `Content-Type: application/json` (request format)
- `Accept: application/json` (response format)

**Path Parameters:** `/devices/{deviceId}` - required resource IDs

**Query Parameters:** `?status=active&limit=100` - optional filters

**Request Body:** JSON data for POST/PUT/PATCH

### Example: Simple API Request

```python
import requests

# GET request - retrieve data
url = "https://api.meraki.com/api/v1/organizations"
headers = {"X-Cisco-Meraki-API-Key": "your_key"}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    orgs = response.json()
    print(f"Found {len(orgs)} organizations")
```

### Example: POST Request - Create Resource

```python
# POST request - create new device
url = "https://api.example.com/devices"
headers = {
    "Authorization": "Bearer token123",
    "Content-Type": "application/json"
}
data = {
    "hostname": "router-01",
    "ip": "10.1.1.1"
}

response = requests.post(url, headers=headers, json=data)
if response.status_code == 201:
    print("Device created successfully")
```

---

### Sample Exam Questions

1. Which HTTP method should you use to partially update an existing resource?
   - A) GET
   - B) POST
   - C) PUT
   - D) PATCH
   <details>
   <summary>Show Answer</summary>
   **D) PATCH** - PATCH is for partial updates. PUT replaces the entire resource.
   </details>
   <br/>

2. What does "stateless" mean in REST APIs?
   - A) APIs don't store data
   - B) Each request contains all necessary information
   - C) APIs use HTTP protocol
   - D) Responses are in JSON
   <details>
   <summary>Show Answer</summary>
   **B) Each request contains all necessary information** - The server doesn't remember previous requests.
   </details>
   <br/>

3. Fill in the blank: The __________ header specifies the format of data being sent to the API.
   <details>
   <summary>Show Answer</summary>
   **Content-Type** - Common values include `application/json` and `application/xml`.
   </details>
   <br/>

---

## 2.2 Describe Common Usage Patterns Related to Webhooks

### Overview
**ELI5:** Webhooks are like doorbells—instead of constantly checking if someone's at the door (polling), the doorbell rings when someone arrives (webhook).

**Summary:**
**Webhooks** push event notifications to your app when something happens, eliminating the need for constant polling.

**Polling vs. Webhooks:**
```
Polling:
App → "Any updates?" → API
(wait 30 seconds)
App → "Any updates?" → API
(repeat...)

Webhooks:
API → "Device offline!" → App (instant notification)
```

**Benefits:**
- Real-time notifications
- Reduced API calls
- Lower latency
- More efficient

**Common Use Cases:**
- Device status changes
- Configuration updates
- Alert notifications
- CI/CD pipeline triggers

### Webhook Workflow

**1. Register webhook:**
```python
# Register your endpoint with the API
payload = {
    "url": "https://yourapp.com/webhook",
    "events": ["device.offline", "device.online"]
}
response = requests.post("https://api.example.com/webhooks", json=payload)
```

**2. Receive events:**
```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.get_json()
    
    event = data.get('event')
    device_id = data.get('device_id')
    
    print(f"Event: {event}, Device: {device_id}")
    
    # Process event (send alert, log, take action)
    
    return '', 200  # Acknowledge receipt
```

### Webhook Security

**Verify signatures to ensure authenticity:**
```python
import hmac
import hashlib

def verify_signature(payload, signature, secret):
    """Verify webhook signature."""
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)

@app.route('/webhook', methods=['POST'])
def secure_webhook():
    payload = request.get_data()
    signature = request.headers.get('X-Webhook-Signature')
    
    if not verify_signature(payload, signature, WEBHOOK_SECRET):
        return 'Unauthorized', 401
    
    # Process webhook...
    return '', 200
```

---

### Sample Exam Questions

1. What is the main advantage of webhooks over polling?
   - A) Easier to implement
   - B) Real-time notifications with fewer API calls
   - C) Works without authentication
   - D) Uses less memory
   <details>
   <summary>Show Answer</summary>
   **B) Real-time notifications with fewer API calls** - Webhooks push data instantly instead of repeatedly checking.
   </details>
   <br/>

2. How does an API deliver webhook data to your application?
   - A) Emails the data
   - B) Sends HTTP POST request to your URL
   - C) Updates a shared database
   - D) Stores in a queue you poll
   <details>
   <summary>Show Answer</summary>
   **B) Sends HTTP POST request to your URL** - The API posts event data to your registered endpoint.
   </details>
   <br/>

3. Fill in the blank: Webhooks should return HTTP status code __________ to acknowledge successful receipt.
   <details>
   <summary>Show Answer</summary>
   **200** - Return 200 OK to confirm you received the webhook. Non-2xx may trigger retries.
   </details>
   <br/>

---

## 2.3 Identify the Constraints When Consuming APIs

### Overview
**ELI5:** API constraints are like playground rules—only so many kids on the slide (rate limits), take turns (queueing), and your ticket expires after an hour (token expiration).

**Summary:**
APIs impose limits to ensure stability and fair usage:

**1. Rate Limiting** - Restricts requests per time period
**2. Pagination** - Splits large results into pages
**3. Token Expiration** - Auth tokens expire after set time
**4. Request Size Limits** - Maximum body/URL size
**5. Timeouts** - Max request duration

### Rate Limiting

**HTTP 429 Too Many Requests**

**Rate limit headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1697284800
Retry-After: 60
```

**Handle rate limits:**
```python
def api_request_with_retry(url, headers):
    """Handle rate limiting automatically."""
    response = requests.get(url, headers=headers)
    
    if response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 60))
        print(f"Rate limited. Waiting {retry_after}s...")
        time.sleep(retry_after)
        response = requests.get(url, headers=headers)
    
    return response.json()
```

### Pagination

**Retrieve all pages:**
```python
def get_all_devices(base_url, headers):
    """Get all devices across multiple pages."""
    all_devices = []
    page = 1
    
    while True:
        response = requests.get(
            f"{base_url}/devices?page={page}&limit=100",
            headers=headers
        )
        data = response.json()
        all_devices.extend(data['items'])
        
        if not data.get('has_more'):
            break
        page += 1
    
    return all_devices
```

### Token Expiration

**Auto-refresh expired tokens:**
```python
class APIClient:
    def __init__(self, base_url, username, password):
        self.base_url = base_url
        self.username = username
        self.password = password
        self.token = None
        self.token_expires = None
    
    def get_token(self):
        """Obtain fresh token."""
        response = requests.post(
            f"{self.base_url}/auth/token",
            json={"username": self.username, "password": self.password}
        )
        data = response.json()
        self.token = data['token']
        self.token_expires = time.time() + data['expires_in']
    
    def ensure_valid_token(self):
        """Refresh token if expired."""
        if not self.token or time.time() >= self.token_expires:
            self.get_token()
    
    def request(self, endpoint):
        """Make request with valid token."""
        self.ensure_valid_token()
        headers = {"Authorization": f"Bearer {self.token}"}
        return requests.get(f"{self.base_url}{endpoint}", headers=headers)
```

---

### Sample Exam Questions

1. What HTTP status code indicates you've exceeded the rate limit?
   - A) 401
   - B) 404
   - C) 429
   - D) 503
   <details>
   <summary>Show Answer</summary>
   **C) 429** - 429 Too Many Requests means rate limit exceeded. Check Retry-After header.
   </details>
   <br/>

2. How should you handle large result sets that exceed response size limits?
   - A) Request a bigger API key
   - B) Use pagination to retrieve results in multiple requests
   - C) Increase network bandwidth
   - D) Compress the response
   <details>
   <summary>Show Answer</summary>
   **B) Use pagination to retrieve results in multiple requests** - Pagination splits data into manageable pages.
   </details>
   <br/>

3. Fill in the blank: The __________ header tells you how many requests remain before hitting the rate limit.
   <details>
   <summary>Show Answer</summary>
   **X-RateLimit-Remaining** - This header shows requests left in current rate limit window.
   </details>
   <br/>

---

## 2.4 Explain Common HTTP Response Codes Associated with REST APIs

### Overview
**ELI5:** Status codes are like traffic lights—green (2xx) means go, yellow (3xx) means redirect, red (4xx) means you made a mistake, flashing red (5xx) means server problem.

**Summary:**
HTTP status codes indicate request outcomes:

| Range | Category | Meaning |
|-------|----------|---------|
| 2xx | Success | Request succeeded |
| 3xx | Redirection | Resource moved |
| 4xx | Client Error | Problem with your request |
| 5xx | Server Error | Server problem |

### Common Status Codes

**2xx Success:**
- **200 OK** - Request successful
- **201 Created** - Resource created (POST)
- **204 No Content** - Success, no response body

**4xx Client Errors:**
- **400 Bad Request** - Invalid request format
- **401 Unauthorized** - Authentication failed
- **403 Forbidden** - No permission
- **404 Not Found** - Resource doesn't exist
- **429 Too Many Requests** - Rate limited

**5xx Server Errors:**
- **500 Internal Server Error** - Server failure
- **502 Bad Gateway** - Gateway error
- **503 Service Unavailable** - Server overloaded

### Handle Status Codes

```python
def make_api_request(url, headers):
    """Make request with status code handling."""
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    
    elif response.status_code == 401:
        print("Authentication failed - check credentials")
        return None
    
    elif response.status_code == 404:
        print("Resource not found - check URL")
        return None
    
    elif response.status_code == 429:
        print("Rate limited - wait and retry")
        return None
    
    elif response.status_code >= 500:
        print("Server error - retry later")
        return None
    
    else:
        print(f"Unexpected status: {response.status_code}")
        return None
```

---

### Sample Exam Questions

1. What does status code 201 indicate?
   - A) Request accepted but not processed
   - B) Resource successfully created
   - C) Success with no content
   - D) Resource updated
   <details>
   <summary>Show Answer</summary>
   **B) Resource successfully created** - 201 Created confirms POST created a new resource.
   </details>
   <br/>

2. Which status code means you lack permissions to access a resource?
   - A) 401
   - B) 403
   - C) 404
   - D) 405
   <details>
   <summary>Show Answer</summary>
   **B) 403** - 403 Forbidden means authenticated but no permission. 401 is not authenticated.
   </details>
   <br/>

3. Fill in the blank: A __________ error indicates a problem with your request, not the server.
   <details>
   <summary>Show Answer</summary>
   **4xx** (or client error) - 4xx codes mean fix your request. 5xx codes mean server problem.
   </details>
   <br/>

---

## 2.5 Troubleshoot a Problem Given the HTTP Response Code, Request and API Documentation

### Overview
**ELI5:** Troubleshooting APIs is like being a detective—gather clues (status code, error message), check the manual (API docs), and figure out what went wrong.

**Summary:**
Systematic troubleshooting process:

1. **Check status code** - Identifies problem category
2. **Read error message** - Specific issue details
3. **Verify request** - Check method, URL, headers, body
4. **Consult documentation** - Required fields, formats, auth
5. **Fix and retry** - Apply solution

### Troubleshooting by Status Code

**400 Bad Request:**
- Check JSON syntax
- Verify required fields
- Confirm data types
- Validate parameter values

**401 Unauthorized:**
- Verify API key/token
- Check header format
- Confirm token not expired
- Try fresh credentials

**404 Not Found:**
- Verify URL and resource ID
- Check API version in path
- Confirm resource exists
- Use correct environment (prod vs sandbox)

**429 Rate Limited:**
- Wait for Retry-After period
- Implement throttling
- Use exponential backoff

**500 Server Error:**
- Retry with exponential backoff
- Check API status page
- Contact support if persists

### Debug Example

```python
def debug_api_call(url, headers, data=None):
    """Make API call with debugging info."""
    print(f"URL: {url}")
    print(f"Headers: {headers}")
    if data:
        print(f"Body: {json.dumps(data, indent=2)}")
    
    response = requests.post(url, headers=headers, json=data)
    
    print(f"\nStatus: {response.status_code}")
    print(f"Response: {response.text}")
    
    # Diagnose issues
    if response.status_code == 400:
        print("\n✗ Bad Request - Check:")
        print("  - JSON syntax valid?")
        print("  - All required fields present?")
        print("  - Correct data types?")
    
    elif response.status_code == 401:
        print("\n✗ Unauthorized - Check:")
        print("  - API key correct?")
        print("  - Token expired?")
        print("  - Proper header format?")
    
    return response
```

---

### Sample Exam Questions

1. You receive 404 Not Found. What should you check first?
   - A) Authentication
   - B) URL, resource ID, and API version
   - C) Rate limits
   - D) Server logs
   <details>
   <summary>Show Answer</summary>
   **B) URL, resource ID, and API version** - 404 means resource not found, so verify path and ID.
   </details>
   <br/>

2. How do you diagnose a 400 Bad Request error?
   - A) Wait and retry
   - B) Check request format, required fields, and data types
   - C) Contact support immediately
   - D) Increase timeout
   <details>
   <summary>Show Answer</summary>
   **B) Check request format, required fields, and data types** - 400 indicates malformed request.
   </details>
   <br/>

3. Fill in the blank: When troubleshooting 401 errors, check your authentication __________ and verify tokens haven't expired.
   <details>
   <summary>Show Answer</summary>
   **credentials** (or headers/tokens) - 401 means authentication failed or is missing.
   </details>
   <br/>

---

## 2.6 Identify the Parts of an HTTP Response (Response Code, Headers, Body)

### Overview
**ELI5:** An HTTP response is like a package—the tracking status (code) says if it arrived, the label (headers) has shipping info, and inside (body) is what you ordered.

**Summary:**
HTTP responses have three parts:

**1. Status Line:** `HTTP/1.1 200 OK`
**2. Headers:** Metadata (content type, rate limits, etc.)
**3. Body:** Actual data returned

### Response Structure

```
HTTP/1.1 200 OK                           ← Status Line
Content-Type: application/json            ← Headers
X-RateLimit-Remaining: 95                 ← Headers
                                          ← Blank line
{                                         ← Body
  "id": "123",                            ← Body
  "hostname": "router-01"                 ← Body
}                                         ← Body
```

### Common Response Headers

**Content headers:**
- `Content-Type: application/json` - Response format
- `Content-Length: 1024` - Size in bytes

**Rate limit headers:**
- `X-RateLimit-Limit: 1000` - Max requests
- `X-RateLimit-Remaining: 95` - Requests left
- `X-RateLimit-Reset: 1697284800` - Reset timestamp

**Caching headers:**
- `Cache-Control: max-age=3600` - Cache duration
- `ETag: "abc123"` - Resource version identifier

### Access Response Parts

```python
response = requests.get(url, headers=headers)

# Status line
print(f"Status: {response.status_code}")
print(f"Reason: {response.reason}")

# Headers
print(f"Content-Type: {response.headers['Content-Type']}")
print(f"Rate Limit: {response.headers.get('X-RateLimit-Remaining')}")

# Body
if 'application/json' in response.headers.get('Content-Type', ''):
    data = response.json()  # Parse JSON
    print(f"Data: {data}")
else:
    print(f"Text: {response.text}")
```

---

### Sample Exam Questions

1. What does the Content-Type header indicate?
   - A) Response size
   - B) Format of response body (e.g., JSON, XML)
   - C) Authentication method
   - D) API version
   <details>
   <summary>Show Answer</summary>
   **B) Format of response body (e.g., JSON, XML)** - Content-Type tells you how to parse the body.
   </details>
   <br/>

2. Where is the actual data returned by an API located?
   - A) Status line
   - B) Headers
   - C) Response body
   - D) URL
   <details>
   <summary>Show Answer</summary>
   **C) Response body** - The body contains the payload data (JSON, XML, etc.).
   </details>
   <br/>

3. Fill in the blank: The __________ code indicates whether the request succeeded or failed.
   <details>
   <summary>Show Answer</summary>
   **status** - Status code (200, 404, 500, etc.) shows the request outcome.
   </details>
   <br/>

---

## 2.7 Utilize Common API Authentication Mechanisms: Basic, Custom Token, and API Keys

### Overview
**ELI5:** Authentication is like showing your ID—some places want a driver's license (username/password), others want a badge (API key), and some want a temporary pass (token).

**Summary:**
Common authentication methods:

**1. Basic Authentication** - Username and password (Base64 encoded)
**2. API Keys** - Static secret key in header
**3. Bearer Tokens** - Time-limited access token
**4. Custom Tokens** - Vendor-specific headers

### 1. Basic Authentication

**Used by:** Cisco IOS XE RESTCONF, network devices

```python
from requests.auth import HTTPBasicAuth

url = "https://device.example.com/restconf/data/interfaces"
response = requests.get(
    url,
    auth=HTTPBasicAuth('admin', 'password'),
    headers={"Accept": "application/yang-data+json"}
)
```

**Security:** Always use HTTPS. Credentials sent with every request.

### 2. API Keys

**Used by:** Cisco Meraki, third-party APIs

```python
url = "https://api.meraki.com/api/v1/organizations"
headers = {
    "X-Cisco-Meraki-API-Key": "your_api_key",
    "Content-Type": "application/json"
}
response = requests.get(url, headers=headers)
```

**Best Practice:** Store in environment variables
```python
import os
api_key = os.environ.get('MERAKI_API_KEY')
```

### 3. Bearer Tokens (OAuth 2.0)

**Used by:** Cisco DNA Center, Webex, modern APIs

**Two-step process:**

**Step 1: Get token**
```python
# DNA Center token
auth_url = "https://dnac/dna/system/api/v1/auth/token"
response = requests.post(
    auth_url,
    auth=HTTPBasicAuth('username', 'password')
)
token = response.json()['Token']
```

**Step 2: Use token**
```python
# Use token for API calls
headers = {
    "X-Auth-Token": token,
    "Content-Type": "application/json"
}
response = requests.get(
    "https://dnac/dna/intent/api/v1/network-device",
    headers=headers
)
```

**Token characteristics:**
- Expires after set time (e.g., 60 minutes)
- More secure than API keys
- Must refresh when expired

### Authentication Comparison

| Method | Security | Expiration | Example |
|--------|----------|------------|---------|
| Basic Auth | Low (if HTTPS) | No | IOS XE RESTCONF |
| API Key | Medium | Manual | Meraki |
| Bearer Token | High | Yes (auto) | DNA Center |

### Security Best Practices

```python
# ❌ BAD - Hardcoded
api_key = "abc123secret"

# ✅ GOOD - Environment variable
import os
api_key = os.environ.get('API_KEY')

# ✅ GOOD - .env file (don't commit to git!)
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('API_KEY')
```

---

### Sample Exam Questions

1. What's the main advantage of Bearer Tokens over Basic Auth?
   - A) Easier to implement
   - B) Tokens expire automatically and can be revoked
   - C) Works without HTTPS
   - D) Doesn't require username
   <details>
   <summary>Show Answer</summary>
   **B) Tokens expire automatically and can be revoked** - Tokens are time-limited and more secure.
   </details>
   <br/>

2. Where should you store API keys according to best practices?
   - A) Hardcoded in script
   - B) In project directory
   - C) In environment variables
   - D) In comments
   <details>
   <summary>Show Answer</summary>
   **C) In environment variables** - Prevents committing secrets to version control.
   </details>
   <br/>

3. Fill in the blank: Cisco Meraki API uses the __________ header for authentication.
   <details>
   <summary>Show Answer</summary>
   **X-Cisco-Meraki-API-Key** - Meraki's custom header for API key authentication.
   </details>
   <br/>

---

## 2.8 Compare Common API Styles (REST, RPC, Synchronous, and Asynchronous)

### Overview
**ELI5:** API styles are like ordering food—REST is menu-based ("burger"), RPC is action-based ("make burger"), sync is waiting at counter, async is getting a buzzer.

**Summary:**
Two key distinctions:

**Architecture:** REST vs. RPC
**Communication:** Sync vs. Async

### REST vs. RPC

**REST (Resource-Oriented):**
- Focus on resources (nouns)
- Standard HTTP methods
- Stateless
- Example: `GET /devices/123`

**RPC (Action-Oriented):**
- Focus on procedures (verbs)
- Usually POST for all operations
- Function calls
- Example: `POST /rpc {"method": "getDevice"}`

**Comparison:**

| Aspect | REST | RPC |
|--------|------|-----|
| Focus | Resources | Actions |
| Methods | GET, POST, PUT, DELETE | POST |
| URL | `/devices/123` | `/rpc` |
| Use Case | CRUD operations | Complex procedures |

### Synchronous vs. Asynchronous

**Synchronous (Blocking):**
- Wait for complete response
- Simple request-response
- For quick operations (< 30 sec)

```python
# Sync: Blocks until response
response = requests.get("/devices")
data = response.json()  # Got result immediately
```

**Asynchronous (Non-Blocking):**
- Returns task ID immediately
- Poll for completion
- For long operations (> 30 sec)

```python
# Async: Returns task ID, poll for status
response = requests.post("/tasks/backup")
task_id = response.json()['task_id']

# Poll until complete
while True:
    status = requests.get(f"/tasks/{task_id}").json()
    if status['state'] == 'completed':
        break
    time.sleep(5)
```

**When to Use:**

| Pattern | Use For | Example |
|---------|---------|---------|
| Sync | Quick reads/updates | GET device info |
| Async | Long operations | Firmware upgrade |

---

### Sample Exam Questions

1. What's the main difference between REST and RPC?
   - A) REST uses JSON; RPC uses XML
   - B) REST is resource-oriented; RPC is action-oriented
   - C) REST is faster
   - D) RPC requires auth
   <details>
   <summary>Show Answer</summary>
   **B) REST is resource-oriented; RPC is action-oriented** - REST focuses on things, RPC on actions.
   </details>
   <br/>

2. When should you use asynchronous API calls?
   - A) For faster responses
   - B) For long-running tasks like backups or upgrades
   - C) Only with authentication
   - D) For all GET requests
   <details>
   <summary>Show Answer</summary>
   **B) For long-running tasks like backups or upgrades** - Async prevents timeouts on slow operations.
   </details>
   <br/>

3. Fill in the blank: REST APIs being "stateless" means the server doesn't __________ client information between requests.
   <details>
   <summary>Show Answer</summary>
   **store** (or remember) - Each request must contain all necessary context.
   </details>
   <br/>

---

## 2.9 Construct a Python Script That Calls a REST API Using the Requests Library

### Overview
**ELI5:** Using Python to call APIs is like filling out forms—write what you want (request), show ID (auth), send it, and read the response.

**Summary:**
The `requests` library is the standard for API calls in Python. Basic workflow:

1. Install requests: `pip install requests`
2. Import library
3. Set URL and headers
4. Make request (GET, POST, etc.)
5. Handle response

### Basic GET Request

```python
import requests

url = "https://api.example.com/devices"
headers = {
    "Authorization": "Bearer token123",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    devices = response.json()
    print(f"Found {len(devices)} devices")
else:
    print(f"Error: {response.status_code}")
```

### POST Request (Create Resource)

```python
url = "https://api.example.com/devices"
headers = {
    "Authorization": "Bearer token123",
    "Content-Type": "application/json"
}
data = {
    "hostname": "router-01",
    "ip": "10.1.1.1"
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 201:
    new_device = response.json()
    print(f"Created device: {new_device['id']}")
```

### Complete Example: Cisco Meraki

```python
import requests
import os

# Get API key from environment
API_KEY = os.environ.get('MERAKI_API_KEY')

# Get organizations
url = "https://api.meraki.com/api/v1/organizations"
headers = {
    "X-Cisco-Meraki-API-Key": API_KEY,
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    orgs = response.json()
    for org in orgs:
        print(f"Org: {org['name']} (ID: {org['id']})")
        
        # Get networks for this org
        net_url = f"{url}/{org['id']}/networks"
        net_response = requests.get(net_url, headers=headers)
        
        if net_response.status_code == 200:
            networks = net_response.json()
            print(f"  Networks: {len(networks)}")
else:
    print(f"Error: {response.status_code}")
```

### Error Handling

```python
def api_request(url, headers):
    """Make API request with error handling."""
    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 401:
            print("Authentication failed")
        elif response.status_code == 404:
            print("Resource not found")
        elif response.status_code == 429:
            print("Rate limited")
        else:
            print(f"Error: {response.status_code}")
        
        return None
        
    except requests.exceptions.Timeout:
        print("Request timed out")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
```

### Key Methods

```python
# GET request
response = requests.get(url, headers=headers)

# POST request
response = requests.post(url, headers=headers, json=data)

# PUT request
response = requests.put(url, headers=headers, json=data)

# DELETE request
response = requests.delete(url, headers=headers)

# Access response
status = response.status_code
body = response.json()
text = response.text
headers = response.headers
```

---

### Sample Exam Questions

1. Which Python library is standard for REST API calls?
   - A) urllib
   - B) http.client
   - C) requests
   - D) json
   <details>
   <summary>Show Answer</summary>
   **C) requests** - The `requests` library is the de facto standard for simplicity and features.
   </details>
   <br/>

2. How do you pass JSON data in a POST request with requests?
   - A) In `data` parameter as string
   - B) In `json` parameter as dictionary
   - C) In URL as query parameters
   - D) In headers
   <details>
   <summary>Show Answer</summary>
   **B) In `json` parameter as dictionary** - `json=data` automatically serializes and sets headers.
   </details>
   <br/>

3. Fill in the blank: To avoid hardcoding API keys, store them in __________ variables.
   <details>
   <summary>Show Answer</summary>
   **environment** - Use `os.environ.get()` to access environment variables securely.
   </details>
   <br/>

---

**End of Section 2: Understanding and Using APIs**
