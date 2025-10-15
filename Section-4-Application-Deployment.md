# Section 4: Application Deployment and Security

## Summary
Section 4 covers essential concepts for deploying and securing applications in modern development environments:

1. Edge computing benefits
2. Application deployment models (private cloud, public cloud, hybrid cloud, edge)
3. Application deployment types (virtual machines, bare metal, containers)
4. CI/CD pipeline components
5. Python unit testing
6. Dockerfile interpretation
7. Docker image usage in local development
8. Application security (secret protection, encryption, data handling)
9. Infrastructure components (firewall, DNS, load balancer, reverse proxy)
10. OWASP top threats (XSS, SQL injection, CSRF)
11. Bash commands (file management, directory navigation, environment variables)
12. DevOps principles

**Practice Resources:**
- Docker Hub and Docker documentation
- Cisco DevNet Sandboxes for CI/CD testing
- OWASP Testing Guide
- Python unittest documentation
- DevOps practice labs and tutorials

---

## 4.1 Describe Benefits of Edge Computing

### Overview
**ELI5:** Edge computing is like having a mini-store in your neighborhood instead of driving to a warehouse across town—you get what you need faster because it's closer to you.

**Summary:**
Edge computing brings data processing and storage closer to where data is created, rather than relying on centralized cloud data centers.

**Key Benefits:**
- **Reduced Latency:** Near-instant responses for real-time applications
- **Bandwidth Optimization:** Process locally, send only essential data to cloud
- **Improved Reliability:** Works offline when cloud connectivity is interrupted
- **Enhanced Security:** Sensitive data processed locally without traversing public networks

**Common Use Cases:** IoT devices, autonomous vehicles, industrial automation, smart cities, healthcare monitoring

### Edge Computing vs Cloud Computing

| Aspect | Edge Computing | Cloud Computing |
|--------|----------------|-----------------|
| Location | Near data source | Centralized data center |
| Latency | Very low (1-10ms) | Higher (50-200ms) |
| Use Case | Real-time, IoT | Analytics, storage |
| Reliability | Works offline | Requires connectivity |

---

### Sample Exam Questions

1. What is the primary benefit of edge computing for IoT applications?
   - A) Lower hardware costs
   - B) Reduced latency and faster response times
   - C) Unlimited storage capacity
   - D) Simplified application development
   <details>
   <summary>Show Answer</summary>
   **B) Reduced latency and faster response times** - Edge computing processes data near the source, eliminating network delays to distant cloud data centers.
   </details>
   <br/>

2. Which scenario would benefit MOST from edge computing?
   - A) Long-term data archival
   - B) Autonomous vehicle navigation requiring split-second decisions
   - C) Annual financial reports
   - D) Email server hosting
   <details>
   <summary>Show Answer</summary>
   **B) Autonomous vehicle navigation requiring split-second decisions** - Edge computing enables real-time processing without cloud latency.
   </details>
   <br/>

3. Fill in the blank: Edge computing reduces __________ by processing data closer to where it is generated.
   <details>
   <summary>Show Answer</summary>
   **latency** - Processing locally eliminates network delay to remote data centers.
   </details>
   <br/>

---

## 4.2 Identify Attributes of Different Application Deployment Models (Private Cloud, Public Cloud, Hybrid Cloud, and Edge)

### Overview
**ELI5:** Cloud deployment models are like different ways to rent office space—you can rent your own private building, share a big building with others, do a mix of both, or set up small offices where your customers are.

**Summary:**
Deployment models describe where and how applications run, balancing control, cost, scalability, and performance.

**Private Cloud:**
- Dedicated infrastructure for single organization
- Full control over security and configuration
- Higher upfront costs (CapEx)
- Use case: Financial services, healthcare, government (compliance requirements)

**Public Cloud:**
- Shared infrastructure by third-party vendors (AWS, Azure, GCP)
- Pay-as-you-go (OpEx), no hardware investment
- Virtually unlimited scalability
- Use case: Startups, web applications, development/testing

**Hybrid Cloud:**
- Combination of private and public cloud
- Run sensitive workloads on-premises, use public cloud for scalability
- Use case: Enterprises with compliance requirements, disaster recovery

**Edge:**
- Distributed computing near data source
- Ultra-low latency for real-time applications
- Use case: IoT, autonomous vehicles, industrial automation

### Deployment Model Comparison

| Model | Control | Scalability | Cost Model | Best For |
|-------|---------|-------------|------------|----------|
| Private Cloud | High | Limited | CapEx | Compliance, security |
| Public Cloud | Low | Unlimited | OpEx | Startups, web apps |
| Hybrid Cloud | Medium | Flexible | Mixed | Enterprise transition |
| Edge | Medium | Distributed | Varies | IoT, real-time |

---

### Sample Exam Questions

1. Which deployment model provides the MOST control over security and infrastructure?
   - A) Public cloud
   - B) Private cloud
   - C) Hybrid cloud
   - D) Edge computing
   <details>
   <summary>Show Answer</summary>
   **B) Private cloud** - Private cloud provides dedicated infrastructure with full control over security policies and hardware configuration.
   </details>
   <br/>

2. What is the primary advantage of a hybrid cloud deployment model?
   - A) Lowest cost of all models
   - B) Requires no internet connectivity
   - C) Combines security of private cloud with scalability of public cloud
   - D) Eliminates need for IT staff
   <details>
   <summary>Show Answer</summary>
   **C) Combines security of private cloud with scalability of public cloud** - Hybrid cloud allows sensitive data on-premises while leveraging public cloud for scalable workloads.
   </details>
   <br/>

3. Fill in the blank: A __________ cloud deployment combines on-premises infrastructure with public cloud services.
   <details>
   <summary>Show Answer</summary>
   **hybrid** - Hybrid cloud integrates private and public environments with orchestration between them.
   </details>
   <br/>

---

## 4.3 Identify the Attributes of These Application Deployment Types

### Overview
**ELI5:** Deployment types are like different ways to run a restaurant—bare metal is owning the whole building, virtual machines are renting different floors, and containers are like food trucks that quickly move anywhere.

**Summary:**
Deployment types determine how applications run on infrastructure, affecting performance, isolation, and resource efficiency.

### Virtual Machines (VMs)

- **Full Isolation:** Each VM has complete OS, providing strong isolation
- **Hypervisor:** Software layer (VMware, KVM, Hyper-V) that manages VMs
- **Boot Time:** Minutes to start
- **Overhead:** Resource-intensive (full OS per VM)
- **Use Case:** Mixed operating systems, legacy apps, strong isolation needs

### Bare Metal

- **Direct Hardware Access:** No hypervisor overhead
- **Maximum Performance:** Full access to CPU, memory, I/O
- **Provisioning:** Hours to days to deploy
- **Use Case:** High-performance computing, databases, latency-sensitive apps

### Containers

- **OS-Level Virtualization:** Share host OS kernel, lightweight
- **Docker:** Most popular container platform
- **Boot Time:** Seconds to start
- **Portability:** "Build once, run anywhere"
- **Orchestration:** Kubernetes manages containers at scale
- **Use Case:** Microservices, cloud-native apps, rapid scaling

### Deployment Type Comparison

| Attribute | Virtual Machines | Bare Metal | Containers |
|-----------|-----------------|------------|------------|
| Isolation | Strong (full OS) | Complete | Moderate (shared kernel) |
| Startup Time | Minutes | Hours/Days | Seconds |
| Resource Efficiency | Low | High | Very High |
| Portability | Good | Poor | Excellent |
| Density | 10s per host | 1 per host | 100s per host |

---

### Sample Exam Questions

1. What is the main advantage of containers over virtual machines?
   - A) Stronger security isolation
   - B) Ability to run different operating systems
   - C) Faster startup times and better resource efficiency
   - D) Direct hardware access
   <details>
   <summary>Show Answer</summary>
   **C) Faster startup times and better resource efficiency** - Containers share the host OS kernel, making them lightweight with second-level startup times.
   </details>
   <br/>

2. Which deployment type provides the BEST performance for latency-sensitive workloads?
   - A) Containers
   - B) Virtual machines
   - C) Bare metal
   - D) Serverless functions
   <details>
   <summary>Show Answer</summary>
   **C) Bare metal** - Bare metal provides direct hardware access without virtualization overhead.
   </details>
   <br/>

3. Fill in the blank: Containers share the host operating system __________, making them more lightweight than virtual machines.
   <details>
   <summary>Show Answer</summary>
   **kernel** - Containers use OS-level virtualization, sharing the kernel while maintaining process isolation.
   </details>
   <br/>

---

## 4.4 Describe Components for a CI/CD Pipeline in Application Deployments

### Overview
**ELI5:** A CI/CD pipeline is like an automated assembly line for software—every change is automatically checked, tested, and delivered without manual work.

**Summary:**
CI/CD (Continuous Integration/Continuous Delivery) automates the steps from code commit to production deployment, ensuring quality and enabling rapid releases.

**Continuous Integration:** Automates code integration and testing (multiple times per day)
**Continuous Delivery:** Automates deployment to staging, requires manual approval for production
**Continuous Deployment:** Fully automated to production (no manual intervention)

### Key CI/CD Pipeline Components

1. **Source Control / VCS** - Git, GitHub, GitLab (triggers pipeline on commit)
2. **Build Automation** - Compiles code, resolves dependencies (Maven, npm, pip)
3. **Automated Testing** - Unit, integration, end-to-end, security tests
4. **Artifact Repository** - Stores build outputs (Docker Hub, Artifactory, Nexus)
5. **Deployment Automation** - Deploys to environments (Ansible, Kubernetes)
6. **CI/CD Orchestration** - Coordinates pipeline (Jenkins, GitLab CI, GitHub Actions)
7. **Monitoring and Feedback** - Tracks health and metrics (Prometheus, Datadog)

### Example: Simple GitLab CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA

test_job:
  stage: test
  script:
    - pip install -r requirements.txt
    - pytest tests/

deploy_staging:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=myapp:$CI_COMMIT_SHA
  environment: staging
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=myapp:$CI_COMMIT_SHA
  environment: production
  when: manual  # Requires approval
  only:
    - main
```

---

### Sample Exam Questions

1. What is the primary purpose of Continuous Integration (CI)?
   - A) To automatically deploy code to production
   - B) To frequently integrate and test code changes from multiple developers
   - C) To monitor application performance
   - D) To manage infrastructure
   <details>
   <summary>Show Answer</summary>
   **B) To frequently integrate and test code changes from multiple developers** - CI automates building and testing whenever code is committed.
   </details>
   <br/>

2. Which component stores build artifacts like Docker images?
   - A) Source control system
   - B) Test framework
   - C) Artifact repository
   - D) Monitoring system
   <details>
   <summary>Show Answer</summary>
   **C) Artifact repository** - Repositories like Docker Hub and Artifactory store versioned build outputs.
   </details>
   <br/>

3. Fill in the blank: In Continuous Deployment, every code change that passes tests is automatically deployed to __________.
   <details>
   <summary>Show Answer</summary>
   **production** - Continuous Deployment fully automates releases to production (unlike Continuous Delivery which requires manual approval).
   </details>
   <br/>

---

## 4.5 Construct a Python Unit Test

### Overview
**ELI5:** Unit testing is like checking each ingredient before you cook—you make sure salt isn't sugar and eggs aren't rotten. Each small check ensures the final meal turns out right.

**Summary:**
Unit testing verifies individual functions work correctly in isolation. Python's `unittest` framework provides tools for writing and running tests.

**Key Concepts:**
- **Test Case:** Single scenario verifying specific behavior
- **Assertion:** Checks if condition is true (test passes/fails)
- **Test Fixture:** Setup code (setUp) and cleanup code (tearDown)
- **AAA Pattern:** Arrange (setup), Act (execute), Assert (verify)

**Common Assertions:**
- `assertEqual(a, b)` - Verify a equals b
- `assertTrue(x)` / `assertFalse(x)` - Verify boolean value
- `assertRaises(Exception)` - Verify exception is raised

### Example: Basic Unit Test

```python
# calculator.py
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

```python
# test_calculator.py
import unittest
from calculator import add, divide

class TestCalculator(unittest.TestCase):
    
    def test_add(self):
        # Arrange
        a, b = 5, 3
        # Act
        result = add(a, b)
        # Assert
        self.assertEqual(result, 8)
    
    def test_divide(self):
        result = divide(10, 2)
        self.assertEqual(result, 5.0)
    
    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == '__main__':
    unittest.main()
```

---

### Sample Exam Questions

1. What is the primary purpose of unit testing?
   - A) To test the entire application workflow
   - B) To verify individual functions work correctly in isolation
   - C) To test database performance
   - D) To deploy code to production
   <details>
   <summary>Show Answer</summary>
   **B) To verify individual functions work correctly in isolation** - Unit tests focus on testing small, isolated pieces of code independently.
   </details>
   <br/>

2. In Python's unittest framework, test methods must start with which prefix?
   - A) check_
   - B) verify_
   - C) test_
   - D) assert_
   <details>
   <summary>Show Answer</summary>
   **C) test_** - The unittest framework automatically discovers and runs methods starting with `test_`.
   </details>
   <br/>

3. Fill in the blank: The AAA pattern in unit testing stands for Arrange, Act, and __________.
   <details>
   <summary>Show Answer</summary>
   **Assert** - The pattern organizes tests into setup, execution, and verification sections.
   </details>
   <br/>

---

## 4.6 Interpret Contents of a Dockerfile

### Overview
**ELI5:** A Dockerfile is like a recipe that tells Docker exactly how to build your application's container—what ingredients to start with, what to install, and what command to run.

**Summary:**
A Dockerfile contains instructions to build a Docker image. Each instruction creates a layer in the image.

### Common Dockerfile Instructions

| Instruction | Purpose | Example |
|-------------|---------|---------|
| `FROM` | Set base image | `FROM python:3.9-slim` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy files into image | `COPY app.py .` |
| `RUN` | Execute commands during build | `RUN pip install -r requirements.txt` |
| `ENV` | Set environment variables | `ENV PORT=8080` |
| `EXPOSE` | Document port | `EXPOSE 8080` |
| `CMD` | Default command when container starts | `CMD ["python", "app.py"]` |

### Example: Python Web Application Dockerfile

```dockerfile
# Use official Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PORT=5000

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Create non-root user for security
RUN useradd -m appuser
USER appuser

# Document port
EXPOSE 5000

# Run application
CMD ["python", "app.py"]
```

**Build and run:**
```bash
docker build -t myapp:1.0 .
docker run -d -p 5000:5000 myapp:1.0
```

**Best Practices:**
- Use specific base image versions (`python:3.9-slim` not `python:latest`)
- Minimize layers (combine RUN commands with `&&`)
- Don't run as root (create non-root user)
- Use `.dockerignore` to exclude unnecessary files

---

### Sample Exam Questions

1. What is the purpose of the WORKDIR instruction in a Dockerfile?
   - A) To create a volume for persistent storage
   - B) To set the working directory for subsequent instructions
   - C) To expose a port for networking
   - D) To define the entry point
   <details>
   <summary>Show Answer</summary>
   **B) To set the working directory for subsequent instructions** - WORKDIR sets where commands like RUN, COPY, and CMD execute.
   </details>
   <br/>

2. Which instruction installs packages during the image build process?
   - A) CMD
   - B) ENTRYPOINT
   - C) RUN
   - D) COPY
   <details>
   <summary>Show Answer</summary>
   **C) RUN** - RUN executes commands during build, creating a new layer in the image.
   </details>
   <br/>

3. Fill in the blank: The __________ instruction specifies the base image that your image will be built upon.
   <details>
   <summary>Show Answer</summary>
   **FROM** - FROM must be the first instruction and specifies the parent image.
   </details>
   <br/>

---

## 4.7 Utilize Docker Images in Local Developer Environment

### Overview
**ELI5:** Using Docker in development is like having pre-packaged workstations you can instantly set up and throw away—no hours installing tools, just download and start coding.

**Summary:**
Docker enables running applications in isolated containers on local machines, ensuring consistency across environments.

**Key Concepts:**
- **Image:** Read-only template with application and dependencies
- **Container:** Running instance of an image
- **Volume:** Persistent storage that survives container restarts
- **Port Mapping:** Expose container ports to host

### Essential Docker Commands

```bash
# Pull image from Docker Hub
docker pull python:3.9

# List images
docker images

# Run container
docker run -d --name myapp python:3.9

# List running containers
docker ps

# Stop container
docker stop myapp

# Start stopped container
docker start myapp

# View logs
docker logs myapp

# Execute command in container
docker exec -it myapp bash

# Remove container
docker rm myapp
```

### Example: Running Python Application

```bash
# Run with volume mount (live code updates)
docker run -d \
  --name myapp \
  -p 5000:5000 \
  -v $(pwd):/app \
  -w /app \
  -e API_KEY=abc123 \
  python:3.9 \
  python app.py
```

**Flags explained:**
- `-d`: Run in background
- `-p 5000:5000`: Map port 5000
- `-v $(pwd):/app`: Mount current directory to /app
- `-w /app`: Set working directory
- `-e`: Set environment variable

### Example: Docker Compose for Multi-Container Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

**Docker Compose commands:**
```bash
docker-compose up -d      # Start all services
docker-compose logs -f    # View logs
docker-compose down       # Stop and remove
```

---

### Sample Exam Questions

1. What is the purpose of the `-v` flag when running a Docker container?
   - A) To view container logs
   - B) To mount a volume between host and container
   - C) To set the Docker version
   - D) To verify the container is running
   <details>
   <summary>Show Answer</summary>
   **B) To mount a volume between host and container** - The `-v` flag creates persistent storage or mounts host directories (e.g., `-v $(pwd):/app`).
   </details>
   <br/>

2. Which command executes a command inside a running container?
   - A) docker run
   - B) docker start
   - C) docker exec
   - D) docker attach
   <details>
   <summary>Show Answer</summary>
   **C) docker exec** - `docker exec` runs commands in already-running containers (e.g., `docker exec -it mycontainer bash`).
   </details>
   <br/>

3. Fill in the blank: The `--rm` flag automatically __________ the container when it exits.
   <details>
   <summary>Show Answer</summary>
   **removes** - The `--rm` flag cleans up containers after they stop.
   </details>
   <br/>

---

## 4.8 Identify Application Security Issues Related to Secret Protection, Encryption (Storage and Transport), and Data Handling

### Overview
**ELI5:** Application security is like protecting your house—you need locks on doors (encryption), a safe for valuables (secret protection), and don't leave personal information where anyone can see it (proper data handling).

**Summary:**
Application security protects sensitive data, credentials, and communications from unauthorized access. Understanding security issues is critical for building secure applications.

### Secret Protection

**❌ Bad Practice: Hardcoded Secrets**
```python
# NEVER DO THIS
api_key = "a1b2c3d4e5f6"  # Exposed in version control!
response = requests.get(url, headers={"Authorization": f"Bearer {api_key}"})
```

**✅ Good Practice: Environment Variables**
```python
import os

api_key = os.getenv("API_KEY")
if not api_key:
    raise ValueError("API_KEY not set")

response = requests.get(url, headers={"Authorization": f"Bearer {api_key}"})
```

**Best Practices:**
- Never commit secrets to version control
- Use environment variables for development
- Use secret managers in production (AWS Secrets Manager, Azure Key Vault)
- Rotate secrets regularly
- Add `.env` files to `.gitignore`

### Encryption

**Two Types:**

**1. Encryption in Transit (HTTPS/TLS)**

**❌ Bad: Plain HTTP**
```python
# Unencrypted - credentials visible in network traffic
response = requests.post("http://api.example.com/login",  # HTTP!
                        json={"username": "admin", "password": "secret"})
```

**✅ Good: HTTPS**
```python
# Encrypted - credentials protected
response = requests.post("https://api.example.com/login",  # HTTPS
                        json={"username": "admin", "password": "secret"},
                        verify=True)  # Verify SSL certificate
```

**2. Encryption at Rest**

**❌ Bad: Plain Text Passwords**
```python
# NEVER store passwords in plain text
def save_user(username, password):
    with open("users.txt", "a") as f:
        f.write(f"{username}:{password}\n")  # Plain text!
```

**✅ Good: Hash Passwords**
```python
import bcrypt

def save_user(username, password):
    # Hash with bcrypt (includes salt automatically)
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    with open("users.txt", "a") as f:
        f.write(f"{username}:{password_hash.decode()}\n")

def verify_password(username, password):
    # Compare password with stored hash
    # ... read stored_hash from file ...
    return bcrypt.checkpw(password.encode(), stored_hash.encode())
```

**Best Practices:**
- Always use HTTPS for web traffic
- Hash passwords with bcrypt, scrypt, or Argon2 (never MD5/SHA1)
- Encrypt sensitive data at rest
- Verify SSL certificates (avoid `verify=False` in production)

### Data Handling

**Input Validation (Prevent SQL Injection)**

**❌ Bad: String Concatenation**
```python
# SQL Injection vulnerability!
def get_user(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
```

**✅ Good: Parameterized Queries**
```python
# Protected against SQL injection
def get_user(user_id):
    query = "SELECT * FROM users WHERE id = ?"
    cursor.execute(query, (user_id,))
```

**Output Encoding (Prevent XSS)**

**❌ Bad: No Encoding**
```python
# XSS vulnerability
@app.route('/search')
def search():
    query = request.args.get('q')
    return f"<h1>Results for: {query}</h1>"  # XSS if query contains <script>
```

**✅ Good: Escape Output**
```python
from markupsafe import escape

@app.route('/search')
def search():
    query = request.args.get('q')
    return f"<h1>Results for: {escape(query)}</h1>"  # HTML entities escaped
```

---

### Sample Exam Questions

1. What is the MOST secure way to store API keys in application code?
   - A) Hardcode them in source code
   - B) Store them in a comment
   - C) Use environment variables or secret management system
   - D) Store in a text file in the repository
   <details>
   <summary>Show Answer</summary>
   **C) Use environment variables or secret management system** - This keeps secrets out of source code and version control.
   </details>
   <br/>

2. Why should passwords be hashed instead of encrypted?
   - A) Hashing is faster
   - B) Hashing is one-way; passwords can be verified without storing the original
   - C) Encryption is more expensive
   - D) Hashed passwords take less space
   <details>
   <summary>Show Answer</summary>
   **B) Hashing is one-way; passwords can be verified without storing the original** - Hashing with bcrypt/scrypt protects passwords even if the database is compromised.
   </details>
   <br/>

3. Fill in the blank: Using __________ queries instead of string concatenation helps prevent SQL injection attacks.
   <details>
   <summary>Show Answer</summary>
   **parameterized** (or prepared) - Parameterized queries separate SQL code from data.
   </details>
   <br/>

---

## 4.9 Explain Firewall, DNS, Load Balancers, and Reverse Proxy in Application Deployment

### Overview
**ELI5:** These components are like support staff for your app—the firewall is the security guard checking IDs, DNS is the receptionist giving directions, the load balancer distributes work evenly, and the reverse proxy is the assistant who handles requests.

**Summary:**
Infrastructure components handle security, routing, distribution, and optimization of network traffic for scalable, secure applications.

### Firewall

**Definition:** Network security device that monitors and controls traffic based on security rules.

**Purpose:** Protect applications, block malicious traffic, segment networks, enforce policies

**Types:**
- **Network Firewall:** Layer 3/4, filters by IP/port
- **Web Application Firewall (WAF):** Layer 7, protects against OWASP threats

**Example rules:**
```
ALLOW TCP port 443 from 0.0.0.0/0  # HTTPS
ALLOW TCP port 22 from 10.0.0.0/8  # SSH from internal only
DENY TCP port 23 from 0.0.0.0/0    # Block Telnet
```

### DNS (Domain Name System)

**Definition:** Translates domain names to IP addresses

**Purpose:** Name resolution, load distribution, failover, geographic routing

**Common DNS Records:**
- **A:** Maps domain to IPv4 (`example.com → 192.0.2.1`)
- **AAAA:** Maps domain to IPv6
- **CNAME:** Alias for another domain
- **MX:** Mail server

### Load Balancer

**Definition:** Distributes incoming traffic across multiple servers

**Purpose:** Distribute traffic evenly, improve availability, enable scaling, perform health checks

**Algorithms:**
- **Round Robin:** Sequential distribution
- **Least Connections:** Send to server with fewest connections
- **IP Hash:** Use client IP to determine server (session persistence)

**Types:**
- **Layer 4:** Routes by IP/port (fast)
- **Layer 7:** Routes by HTTP headers/URL (intelligent)

### Reverse Proxy

**Definition:** Sits in front of web servers and forwards client requests to backends

**Purpose:** Hide backend topology, SSL termination, caching, compression, security filtering

**Example NGINX Configuration:**
```nginx
server {
    listen 443 ssl;
    server_name api.example.com;
    
    ssl_certificate /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;
    
    # Cache static content
    location ~* \.(jpg|css|js)$ {
        proxy_pass http://backend;
        expires 30d;
    }
    
    # API requests (no cache)
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }
}
```

---

### Sample Exam Questions

1. What is the primary purpose of a load balancer?
   - A) To encrypt network traffic
   - B) To distribute incoming traffic across multiple servers
   - C) To translate domain names to IP addresses
   - D) To store application logs
   <details>
   <summary>Show Answer</summary>
   **B) To distribute incoming traffic across multiple servers** - Load balancers improve availability and performance by distributing requests.
   </details>
   <br/>

2. What does DNS primarily do?
   - A) Encrypts data in transit
   - B) Blocks malicious traffic
   - C) Translates domain names to IP addresses
   - D) Distributes traffic
   <details>
   <summary>Show Answer</summary>
   **C) Translates domain names to IP addresses** - DNS resolves human-readable names to IP addresses.
   </details>
   <br/>

3. Fill in the blank: A __________ Application Firewall (WAF) protects web applications from attacks like SQL injection and XSS.
   <details>
   <summary>Show Answer</summary>
   **Web** - A WAF operates at Layer 7 to inspect HTTP/HTTPS traffic.
   </details>
   <br/>

---

## 4.10 Describe Top OWASP Threats (Such as XSS, SQL Injections, and CSRF)

### Overview
**ELI5:** OWASP threats are like common ways burglars break into houses—some pick locks (SQL injection), some trick you into opening the door (XSS), and others pretend to be you (CSRF). Knowing these helps protect your application.

**Summary:**
OWASP (Open Web Application Security Project) maintains a list of the top 10 most critical web application security risks.

### SQL Injection

**Definition:** Attacker inserts malicious SQL code into queries, allowing unauthorized database access.

**❌ Vulnerable Code:**
```python
# SQL Injection risk!
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)

# Attack: username = "admin' OR '1'='1"
# Query becomes: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
# Returns all users!
```

**✅ Secure Code:**
```python
# Protected with parameterized query
def get_user(username):
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
```

**Prevention:**
- Use parameterized queries
- Use ORM frameworks
- Validate input

### Cross-Site Scripting (XSS)

**Definition:** Attacker injects malicious JavaScript into web pages viewed by other users.

**Types:**
- **Reflected XSS:** Script in URL/form parameter, reflected in response
- **Stored XSS:** Script stored in database, executed when page loads
- **DOM XSS:** Vulnerability in client-side JavaScript

**❌ Vulnerable Code:**
```python
# XSS risk!
@app.route('/search')
def search():
    query = request.args.get('q')
    return f"<h1>Results for: {query}</h1>"

# Attack URL: /search?q=<script>alert('XSS')</script>
```

**✅ Secure Code:**
```python
from markupsafe import escape

@app.route('/search')
def search():
    query = request.args.get('q')
    return f"<h1>Results for: {escape(query)}</h1>"
# <script> becomes &lt;script&gt; (displayed as text, not executed)
```

**Prevention:**
- Escape HTML output
- Use templating engines that auto-escape
- Content Security Policy (CSP) headers
- HTTPOnly cookies

### Cross-Site Request Forgery (CSRF)

**Definition:** Attacker tricks authenticated users into executing unwanted actions by exploiting their active session.

**Attack Scenario:**
1. User logs into `bank.com` (gets session cookie)
2. User visits malicious site while still logged in
3. Malicious site sends request to `bank.com` using victim's cookies
4. Bank thinks request is legitimate

**❌ Vulnerable Code:**
```python
# No CSRF protection
@app.route('/transfer', methods=['POST'])
def transfer():
    amount = request.form.get('amount')
    recipient = request.form.get('recipient')
    transfer_money(get_current_user(), recipient, amount)
    return "Transfer complete"
```

**✅ Secure Code:**
```python
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)

@app.route('/transfer', methods=['POST'])
def transfer():
    # CSRF token validated automatically
    amount = request.form.get('amount')
    recipient = request.form.get('recipient')
    transfer_money(get_current_user(), recipient, amount)
    return "Transfer complete"
```

**HTML with CSRF Token:**
```html
<form method="POST" action="/transfer">
  {{ csrf_token() }}  <!-- CSRF token -->
  <input type="text" name="recipient">
  <input type="number" name="amount">
  <button type="submit">Transfer</button>
</form>
```

**Prevention:**
- CSRF tokens (unique per session/request)
- SameSite cookie attribute
- Verify Origin/Referer headers
- Re-authenticate for sensitive actions

---

### Sample Exam Questions

1. What is the primary defense against SQL injection attacks?
   - A) Using HTTPS
   - B) Implementing rate limiting
   - C) Using parameterized queries or prepared statements
   - D) Encrypting the database
   <details>
   <summary>Show Answer</summary>
   **C) Using parameterized queries or prepared statements** - Parameterized queries separate SQL code from data.
   </details>
   <br/>

2. Which attack allows injecting malicious JavaScript into web pages?
   - A) SQL Injection
   - B) Cross-Site Scripting (XSS)
   - C) Cross-Site Request Forgery (CSRF)
   - D) Denial of Service (DoS)
   <details>
   <summary>Show Answer</summary>
   **B) Cross-Site Scripting (XSS)** - XSS allows attackers to inject scripts that execute in victims' browsers.
   </details>
   <br/>

3. Fill in the blank: To prevent XSS attacks, user-generated content should be __________ before displaying in HTML.
   <details>
   <summary>Show Answer</summary>
   **escaped** (or encoded/sanitized) - HTML escaping converts special characters to HTML entities.
   </details>
   <br/>

---

## 4.11 Utilize Bash Commands (File Management, Directory Navigation, and Environmental Variables)

### Overview
**ELI5:** Bash commands are like giving instructions by typing—instead of clicking folders, you type "cd Documents", and instead of right-clicking to create a file, you type "touch file.txt".

**Summary:**
Bash is a command-line interface for Linux/macOS systems, essential for DevOps and server management.

### Directory Navigation

```bash
pwd                    # Print working directory
ls                     # List files
ls -la                 # List all files with details
cd /home/user/docs    # Change directory
cd ~                   # Go to home directory
cd ..                  # Go up one level
cd -                   # Go to previous directory
```

### File Management

```bash
# Creating
touch file.txt                # Create empty file
mkdir mydir                   # Create directory
mkdir -p path/to/dir          # Create nested directories

# Viewing
cat file.txt                  # Display entire file
head -n 10 file.txt          # First 10 lines
tail -n 10 file.txt          # Last 10 lines
tail -f /var/log/app.log     # Follow log file (real-time)

# Copying/Moving/Deleting
cp source.txt dest.txt        # Copy file
cp -r source_dir/ dest_dir/   # Copy directory
mv old.txt new.txt            # Rename/move file
rm file.txt                   # Delete file
rm -rf directory/             # Delete directory (DANGEROUS!)

# Searching
find /path -name "*.py"       # Find files by name
grep "error" logfile.txt      # Search text in file
grep -r "TODO" /project/      # Search recursively
```

### File Permissions

```bash
ls -l file.txt                # View permissions
chmod 755 script.sh           # Set permissions (rwxr-xr-x)
chmod +x script.sh            # Make executable
chown user:group file.txt     # Change owner
```

**Permission values:** r=4, w=2, x=1 (755 = rwxr-xr-x, 644 = rw-r--r--)

### Environment Variables

```bash
# View variables
env                           # All environment variables
echo $HOME                    # User's home directory
echo $PATH                    # Command search path
echo $USER                    # Current username

# Set variables
export API_KEY="abc123"       # Set for current session
export DB_URL="postgres://localhost/db"

# Use variables
curl -H "Authorization: Bearer $API_KEY" api.example.com

# Persistent variables (add to ~/.bashrc)
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc              # Reload configuration
```

### Input/Output Redirection

```bash
command > output.txt          # Redirect output (overwrite)
command >> output.txt         # Redirect output (append)
command 2> error.log          # Redirect errors
command > /dev/null 2>&1      # Discard all output

# Pipes (chain commands)
ls -l | grep ".py"            # List Python files
cat log.txt | grep ERROR | wc -l  # Count error lines
```

---

### Sample Exam Questions

1. Which Bash command changes the current working directory?
   - A) pwd
   - B) ls
   - C) cd
   - D) mkdir
   <details>
   <summary>Show Answer</summary>
   **C) cd** - The `cd` (change directory) command navigates to different directories.
   </details>
   <br/>

2. What does `chmod +x script.sh` do?
   - A) Deletes the script
   - B) Makes the script executable
   - C) Copies the script
   - D) Displays the script contents
   <details>
   <summary>Show Answer</summary>
   **B) Makes the script executable** - `chmod +x` adds execute permission.
   </details>
   <br/>

3. Fill in the blank: The __________ command displays the current working directory's full path.
   <details>
   <summary>Show Answer</summary>
   **pwd** (print working directory) - Shows the absolute path of current location.
   </details>
   <br/>

---

## 4.12 Identify the Principles of DevOps Practices

### Overview
**ELI5:** DevOps is like having builders and maintainers work together as one team—instead of throwing work "over the wall," everyone collaborates from start to finish to deliver better software faster.

**Summary:**
DevOps combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously through collaboration, automation, and continuous improvement.

### Core DevOps Principles

**1. Collaboration and Communication**
- Break down silos between Dev and Ops
- Shared responsibility for application success
- Blameless postmortems (learn from failures without blame)
- Cross-functional teams

**2. Automation**
- Automate build, test, and deployment (CI/CD)
- Infrastructure as Code (Terraform, Ansible)
- Automated monitoring and alerting
- Benefits: Faster deployments, fewer errors, repeatability

**3. Continuous Integration/Continuous Delivery (CI/CD)**
- **CI:** Merge code frequently, automated testing
- **CD:** Always deployable, automated staging deployment
- **Continuous Deployment:** Fully automated to production
- Benefits: Faster releases, reduced risk, higher quality

**4. Infrastructure as Code (IaC)**
- Manage infrastructure through version-controlled code
- Tools: Terraform, Ansible, CloudFormation
- Benefits: Reproducible environments, version control, self-documented

**5. Monitoring and Logging**
- Visibility into application/infrastructure health
- Centralized logging (ELK Stack, Splunk)
- Real-time dashboards (Grafana, Datadog)
- Proactive problem detection

**6. Continuous Improvement**
- Embrace failures as learning opportunities
- Measure key metrics (DORA metrics):
  - Deployment Frequency
  - Lead Time for Changes
  - Mean Time to Recovery (MTTR)
  - Change Failure Rate

**7. Shift-Left Security (DevSecOps)**
- Integrate security throughout development
- Security scanning in CI/CD pipeline
- Automated vulnerability detection
- Benefits: Find issues early, security doesn't slow delivery

**8. Microservices and Modularity**
- Break applications into small, independent services
- Independent deployment and scaling
- Fault isolation

**9. Shared Responsibility**
- "You build it, you run it"
- Developers on-call for their services
- Incentivizes reliable, maintainable systems

### DevOps Benefits

**For Organizations:**
- Faster time to market
- Higher deployment frequency
- Lower failure rate
- Faster recovery

**For Teams:**
- Better collaboration
- Less firefighting, more innovation
- Continuous learning

---

### Sample Exam Questions

1. What is the primary goal of DevOps practices?
   - A) To replace operations teams
   - B) To break down silos between development and operations for faster software delivery
   - C) To eliminate all manual testing
   - D) To reduce employees
   <details>
   <summary>Show Answer</summary>
   **B) To break down silos between development and operations for faster software delivery** - DevOps fosters collaboration and shared responsibility.
   </details>
   <br/>

2. Which principle involves managing infrastructure through version-controlled code?
   - A) Continuous Integration
   - B) Infrastructure as Code (IaC)
   - C) Microservices
   - D) Shift-Left Security
   <details>
   <summary>Show Answer</summary>
   **B) Infrastructure as Code (IaC)** - IaC provisions infrastructure through code rather than manual processes.
   </details>
   <br/>

3. Fill in the blank: In DevOps culture, __________ postmortems focus on learning from failures without assigning blame.
   <details>
   <summary>Show Answer</summary>
   **blameless** - Blameless postmortems create safe environments for teams to analyze incidents and improve.
   </details>
   <br/>

---

**End of Section 4: Application Deployment and Security**
