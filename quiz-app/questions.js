// questions.js — Cisco DEVASC 200-901 Question Bank
// Generated from study guide sections 1-6

const QUESTIONS = [
  // ============================================================
  // SECTION 1: Software Development and Design
  // ============================================================

  // 1.1 Data Formats
  { section: "Section 1", topic: "1.1 Data Formats (XML, JSON, YAML)", type: "mc",
    question: "Which data format is most commonly used for modern REST APIs?",
    choices: ["XML", "JSON", "YAML", "CSV"],
    answer: 1, explanation: "JSON is lightweight, easy to parse, and natively supported by JavaScript, making it the standard for REST APIs." },

  { section: "Section 1", topic: "1.1 Data Formats (XML, JSON, YAML)", type: "mc",
    question: "What is a key advantage of YAML over JSON?",
    choices: ["YAML is faster to parse", "YAML supports more data types", "YAML is more human-readable with less syntax", "YAML is more secure"],
    answer: 2, explanation: "YAML uses indentation instead of braces/brackets, making it cleaner and easier to read." },

  { section: "Section 1", topic: "1.1 Data Formats (XML, JSON, YAML)", type: "mc",
    question: "Which protocol commonly uses XML for network device configuration?",
    choices: ["REST", "NETCONF", "SSH", "SNMP"],
    answer: 1, explanation: "NETCONF uses XML-encoded data for network configuration and state retrieval." },

  { section: "Section 1", topic: "1.1 Data Formats (XML, JSON, YAML)", type: "fill",
    question: "In YAML, structure is defined using __________ rather than brackets or braces.",
    answer: "indentation", explanation: "YAML relies on consistent indentation (spaces, not tabs) to represent hierarchical data." },

  // 1.2 Parsing
  { section: "Section 1", topic: "1.2 Parsing Data Formats in Python", type: "mc",
    question: "Which Python method parses a JSON string into a Python dictionary?",
    choices: ["json.dump()", "json.loads()", "json.parse()", "json.read()"],
    answer: 1, explanation: "loads() means 'load string' and converts a JSON string to a Python object." },

  { section: "Section 1", topic: "1.2 Parsing Data Formats in Python", type: "mc",
    question: "In xml.etree.ElementTree, which method finds the first matching child element?",
    choices: ["element.get()", "element.search()", "element.find()", "element.query()"],
    answer: 2, explanation: "find() returns the first matching child, while findall() returns all matches." },

  { section: "Section 1", topic: "1.2 Parsing Data Formats in Python", type: "mc",
    question: "Which YAML parsing method is recommended for security when handling untrusted input?",
    choices: ["yaml.load()", "yaml.safe_load()", "yaml.parse()", "yaml.read()"],
    answer: 1, explanation: "safe_load() prevents arbitrary code execution from malicious YAML files." },

  { section: "Section 1", topic: "1.2 Parsing Data Formats in Python", type: "fill",
    question: "To parse YAML in Python, you must first install the __________ package using pip.",
    answer: "pyyaml", explanation: "Install with `pip install pyyaml`, then `import yaml`." },

  // 1.3 TDD
  { section: "Section 1", topic: "1.3 Test-Driven Development", type: "mc",
    question: "What is the first step in the Test-Driven Development (TDD) cycle?",
    choices: ["Write the implementation code", "Write a failing test", "Refactor the code", "Deploy to production"],
    answer: 1, explanation: "TDD starts by writing a test for functionality that doesn't exist yet (the 'Red' phase)." },

  { section: "Section 1", topic: "1.3 Test-Driven Development", type: "mc",
    question: "Which phase of the Red-Green-Refactor TDD cycle focuses on improving code quality without changing functionality?",
    choices: ["Red", "Green", "Refactor", "Deploy"],
    answer: 2, explanation: "The Refactor phase cleans up code structure while keeping all tests passing." },

  { section: "Section 1", topic: "1.3 Test-Driven Development", type: "mc",
    question: "What is a key benefit of Test-Driven Development?",
    choices: ["Eliminates code reviews", "Makes code run faster", "Catches bugs early and ensures code works as expected", "Reduces the amount of code needed"],
    answer: 2, explanation: "TDD finds issues during development, not after deployment, and provides confidence in code correctness." },

  { section: "Section 1", topic: "1.3 Test-Driven Development", type: "fill",
    question: "In Python unittest, the __________ method checks if two values are equal.",
    answer: "assertEqual", explanation: "self.assertEqual(actual, expected) is the standard assertion for equality testing." },

  // 1.4 Dev Methodologies
  { section: "Section 1", topic: "1.4 Software Development Methods", type: "mc",
    question: "Which software development method is best suited for projects with frequently changing requirements?",
    choices: ["Waterfall", "Agile", "V-Model", "Spiral"],
    answer: 1, explanation: "Agile welcomes changing requirements and adapts through iterative sprints with continuous feedback." },

  { section: "Section 1", topic: "1.4 Software Development Methods", type: "mc",
    question: "What is the primary focus of Lean development methodology?",
    choices: ["Extensive documentation", "Eliminating waste and maximizing value", "Strict phase gates", "Large team sizes"],
    answer: 1, explanation: "Lean emphasizes efficiency by removing activities that don't add customer value." },

  { section: "Section 1", topic: "1.4 Software Development Methods", type: "mc",
    question: "What is a major disadvantage of the Waterfall methodology?",
    choices: ["Too much team collaboration", "Difficulty accommodating changes once development has started", "Lack of documentation", "Too frequent releases"],
    answer: 1, explanation: "Waterfall's sequential nature makes changes expensive and disruptive after planning is complete." },

  { section: "Section 1", topic: "1.4 Software Development Methods", type: "fill",
    question: "In Agile development, a __________ is a short, time-boxed period (typically 2-4 weeks) where a team works to complete a set of features.",
    answer: "sprint", explanation: "Sprints are the fundamental unit of work in Scrum and other Agile frameworks." },

  // 1.5 Code Organization
  { section: "Section 1", topic: "1.5 Code Organization", type: "mc",
    question: "What is the primary benefit of organizing code into functions?",
    choices: ["Functions make code run faster", "Functions enable code reuse and reduce duplication", "Functions eliminate the need for testing", "Functions reduce memory usage"],
    answer: 1, explanation: "Functions encapsulate logic that can be called multiple times, following the DRY (Don't Repeat Yourself) principle." },

  { section: "Section 1", topic: "1.5 Code Organization", type: "mc",
    question: "In object-oriented programming, what is a class?",
    choices: ["A single variable", "A blueprint for creating objects with attributes and methods", "A type of loop", "A database table"],
    answer: 1, explanation: "Classes define the structure (attributes) and behavior (methods) of objects." },

  { section: "Section 1", topic: "1.5 Code Organization", type: "fill",
    question: "The __________ principle states 'Don't Repeat Yourself' and encourages code reuse through functions and modules.",
    answer: "DRY", explanation: "The DRY principle promotes eliminating code duplication by abstracting common logic into reusable functions." },

  // 1.6 Design Patterns
  { section: "Section 1", topic: "1.6 Design Patterns (MVC & Observer)", type: "mc",
    question: "In the MVC design pattern, which component handles user input and coordinates between model and view?",
    choices: ["Model", "View", "Controller", "Observer"],
    answer: 2, explanation: "The Controller processes user input, updates the model, and selects the appropriate view." },

  { section: "Section 1", topic: "1.6 Design Patterns (MVC & Observer)", type: "mc",
    question: "What is the primary advantage of the Observer design pattern?",
    choices: ["Reduces memory usage", "Allows objects to automatically react when another object's state changes", "Eliminates the need for databases", "Makes code run faster"],
    answer: 1, explanation: "Observer enables loose coupling where subjects notify observers of changes without tight dependencies." },

  { section: "Section 1", topic: "1.6 Design Patterns (MVC & Observer)", type: "mc",
    question: "Which MVC component should contain business logic and data validation?",
    choices: ["View", "Controller", "Model", "Router"],
    answer: 2, explanation: "The Model encapsulates data and business rules, independent of presentation logic." },

  // 1.7 Version Control
  { section: "Section 1", topic: "1.7 Version Control Benefits", type: "mc",
    question: "What is the primary purpose of version control systems like Git?",
    choices: ["To compile code faster", "To track changes to code over time and enable collaboration", "To encrypt source code", "To host websites"],
    answer: 1, explanation: "Version control maintains a complete history and allows multiple developers to work together effectively." },

  { section: "Section 1", topic: "1.7 Version Control Benefits", type: "mc",
    question: "What is a key benefit of using branches in version control?",
    choices: ["Branches make code run faster", "Branches allow experimentation without affecting the main codebase", "Branches reduce storage requirements", "Branches automatically fix bugs"],
    answer: 1, explanation: "Branches provide isolated environments for features, experiments, or bug fixes." },

  { section: "Section 1", topic: "1.7 Version Control Benefits", type: "fill",
    question: "A __________ in version control is a snapshot of changes saved with a descriptive message.",
    answer: "commit", explanation: "Commits represent points in project history recording what changed, who changed it, and why." },

  // 1.8 Git Operations
  { section: "Section 1", topic: "1.8 Git Operations", type: "mc",
    question: "What does the `git commit` command do?",
    choices: ["Uploads changes to a remote repository", "Saves staged changes to the local repository with a message", "Creates a new branch", "Downloads changes from remote"],
    answer: 1, explanation: "Commit creates a snapshot of staged files in the local repository history." },

  { section: "Section 1", topic: "1.8 Git Operations", type: "mc",
    question: "Which command downloads changes from a remote repository and merges them into the current branch?",
    choices: ["git fetch", "git push", "git pull", "git clone"],
    answer: 2, explanation: "git pull combines git fetch (download) and git merge (integrate) in one operation." },

  { section: "Section 1", topic: "1.8 Git Operations", type: "mc",
    question: "How do you create a new branch and switch to it in one command?",
    choices: ["git branch -c new-branch", "git checkout -b new-branch", "git create new-branch", "git switch -n new-branch"],
    answer: 1, explanation: "The -b flag creates and switches to a new branch simultaneously." },

  { section: "Section 1", topic: "1.8 Git Operations", type: "fill",
    question: "When a merge creates conflicts, Git inserts conflict __________ (<<<<<<<, =======, >>>>>>>) in affected files.",
    answer: "markers", explanation: "Conflict markers show HEAD version, separator, and incoming version to help resolve conflicts." },

  // ============================================================
  // SECTION 2: APIs
  // ============================================================

  // 2.1 REST API Requests
  { section: "Section 2", topic: "2.1 REST API Requests", type: "mc",
    question: "Which HTTP method should you use to partially update an existing resource?",
    choices: ["GET", "POST", "PUT", "PATCH"],
    answer: 3, explanation: "PATCH is for partial updates. PUT replaces the entire resource." },

  { section: "Section 2", topic: "2.1 REST API Requests", type: "mc",
    question: "What does 'stateless' mean in REST APIs?",
    choices: ["APIs don't store data", "Each request contains all necessary information", "APIs use HTTP protocol", "Responses are in JSON"],
    answer: 1, explanation: "The server doesn't remember previous requests — each request is self-contained." },

  { section: "Section 2", topic: "2.1 REST API Requests", type: "mc",
    question: "Which HTTP method is used to create a new resource?",
    choices: ["GET", "POST", "DELETE", "PATCH"],
    answer: 1, explanation: "POST is used to create new resources and sends data in the request body." },

  { section: "Section 2", topic: "2.1 REST API Requests", type: "fill",
    question: "The __________ header specifies the format of data being sent to the API.",
    answer: "Content-Type", explanation: "Common values include application/json and application/xml." },

  // 2.2 Webhooks
  { section: "Section 2", topic: "2.2 Webhooks", type: "mc",
    question: "What is the main advantage of webhooks over polling?",
    choices: ["Easier to implement", "Real-time notifications with fewer API calls", "Works without authentication", "Uses less memory"],
    answer: 1, explanation: "Webhooks push data instantly instead of repeatedly checking, reducing overhead and latency." },

  { section: "Section 2", topic: "2.2 Webhooks", type: "mc",
    question: "How does an API deliver webhook data to your application?",
    choices: ["Emails the data", "Sends an HTTP POST request to your registered URL", "Updates a shared database", "Stores in a queue you poll"],
    answer: 1, explanation: "The API posts event data as an HTTP POST to your registered endpoint URL." },

  { section: "Section 2", topic: "2.2 Webhooks", type: "fill",
    question: "Webhooks should return HTTP status code __________ to acknowledge successful receipt.",
    answer: "200", explanation: "Return 200 OK to confirm receipt. Non-2xx responses may trigger retries from the sender." },

  // 2.3 API Constraints
  { section: "Section 2", topic: "2.3 API Constraints", type: "mc",
    question: "What HTTP status code indicates you have exceeded the API rate limit?",
    choices: ["401", "404", "429", "503"],
    answer: 2, explanation: "429 Too Many Requests means the rate limit has been exceeded. Check the Retry-After header." },

  { section: "Section 2", topic: "2.3 API Constraints", type: "mc",
    question: "How should you handle large result sets that exceed a single API response size limit?",
    choices: ["Request a bigger API key", "Use pagination to retrieve results in multiple requests", "Increase network bandwidth", "Compress the response"],
    answer: 1, explanation: "Pagination splits large data sets into manageable pages using parameters like limit and offset." },

  { section: "Section 2", topic: "2.3 API Constraints", type: "fill",
    question: "The __________ header tells you how many requests remain before hitting the rate limit.",
    answer: "X-RateLimit-Remaining", explanation: "This response header shows the number of requests remaining in the current rate limit window." },

  // 2.4 HTTP Status Codes
  { section: "Section 2", topic: "2.4 HTTP Status Codes", type: "mc",
    question: "What does HTTP status code 201 indicate?",
    choices: ["Request accepted but not processed", "Resource successfully created", "Success with no content", "Resource updated"],
    answer: 1, explanation: "201 Created confirms a POST request successfully created a new resource." },

  { section: "Section 2", topic: "2.4 HTTP Status Codes", type: "mc",
    question: "Which status code means you are authenticated but lack permissions to access a resource?",
    choices: ["401", "403", "404", "405"],
    answer: 1, explanation: "403 Forbidden means authenticated but no permission. 401 means not authenticated at all." },

  { section: "Section 2", topic: "2.4 HTTP Status Codes", type: "mc",
    question: "What does a 5xx status code range indicate?",
    choices: ["Client-side error", "Redirection", "Server-side error", "Success"],
    answer: 2, explanation: "5xx codes indicate the server encountered an error. 4xx codes indicate client request errors." },

  { section: "Section 2", topic: "2.4 HTTP Status Codes", type: "fill",
    question: "A __________ error code range indicates a problem with your request, not the server.",
    answer: "4xx", explanation: "4xx codes mean fix your request. 5xx codes mean a server problem." },

  // 2.5 Troubleshooting
  { section: "Section 2", topic: "2.5 API Troubleshooting", type: "mc",
    question: "You receive a 404 Not Found. What should you check first?",
    choices: ["Authentication credentials", "URL, resource ID, and API version", "Rate limits", "Server logs"],
    answer: 1, explanation: "404 means the resource was not found at that URL, so verify the path and resource ID." },

  { section: "Section 2", topic: "2.5 API Troubleshooting", type: "mc",
    question: "How do you diagnose a 400 Bad Request error?",
    choices: ["Wait and retry", "Check request format, required fields, and data types", "Contact support immediately", "Increase timeout"],
    answer: 1, explanation: "400 indicates a malformed request — verify JSON structure, required fields, and data types." },

  // 2.6 HTTP Response Parts
  { section: "Section 2", topic: "2.6 HTTP Response Components", type: "mc",
    question: "What does the Content-Type response header indicate?",
    choices: ["Response size", "Format of the response body (e.g., JSON, XML)", "Authentication method", "API version"],
    answer: 1, explanation: "Content-Type tells you how to parse the response body." },

  { section: "Section 2", topic: "2.6 HTTP Response Components", type: "mc",
    question: "Where is the actual data returned by an API located?",
    choices: ["Status line", "Headers", "Response body", "URL"],
    answer: 2, explanation: "The body contains the payload data (JSON, XML, etc.)." },

  // 2.7 Authentication
  { section: "Section 2", topic: "2.7 API Authentication", type: "mc",
    question: "What is the main advantage of Bearer Tokens over Basic Auth?",
    choices: ["Easier to implement", "Tokens expire automatically and can be revoked", "Works without HTTPS", "Doesn't require a username"],
    answer: 1, explanation: "Tokens are time-limited and can be individually revoked, making them more secure." },

  { section: "Section 2", topic: "2.7 API Authentication", type: "mc",
    question: "Where should you store API keys according to security best practices?",
    choices: ["Hardcoded in script", "In the project directory", "In environment variables", "In code comments"],
    answer: 2, explanation: "Environment variables prevent committing secrets to version control." },

  { section: "Section 2", topic: "2.7 API Authentication", type: "fill",
    question: "Cisco Meraki API uses the __________ header for authentication.",
    answer: "X-Cisco-Meraki-API-Key", explanation: "Meraki uses this custom header for API key authentication instead of the standard Authorization header." },

  // 2.8 API Styles
  { section: "Section 2", topic: "2.8 API Styles (REST, RPC, Sync, Async)", type: "mc",
    question: "What is the main difference between REST and RPC API styles?",
    choices: ["REST uses JSON; RPC uses XML", "REST is resource-oriented; RPC is action-oriented", "REST is always faster", "RPC always requires authentication"],
    answer: 1, explanation: "REST focuses on resources (nouns), RPC focuses on actions (verbs/functions)." },

  { section: "Section 2", topic: "2.8 API Styles (REST, RPC, Sync, Async)", type: "mc",
    question: "When should you use asynchronous API calls?",
    choices: ["For faster responses", "For long-running tasks like backups or firmware upgrades", "Only with authentication", "For all GET requests"],
    answer: 1, explanation: "Async prevents timeouts on slow operations by returning a job ID for later polling." },

  // 2.9 Python Requests
  { section: "Section 2", topic: "2.9 Python Requests Library", type: "mc",
    question: "Which Python library is the de facto standard for making REST API calls?",
    choices: ["urllib", "http.client", "requests", "json"],
    answer: 2, explanation: "The requests library is preferred for its simplicity and features over lower-level options." },

  { section: "Section 2", topic: "2.9 Python Requests Library", type: "mc",
    question: "How do you pass JSON data in a POST request with the Python requests library?",
    choices: ["In the `data` parameter as a string", "In the `json` parameter as a dictionary", "In the URL as query parameters", "In the headers"],
    answer: 1, explanation: "Using json=data automatically serializes the dict and sets the Content-Type header." },

  { section: "Section 2", topic: "2.9 Python Requests Library", type: "fill",
    question: "To avoid hardcoding API keys in Python, retrieve them using os.environ.__________()",
    answer: "get", explanation: "os.environ.get('API_KEY') safely retrieves environment variables without raising an error if missing." },

  // ============================================================
  // SECTION 3: Cisco Platforms and APIs
  // ============================================================

  // 3.1 SDKs
  { section: "Section 3", topic: "3.1 Cisco SDKs", type: "mc",
    question: "What is the main benefit of using a Cisco SDK instead of directly calling REST APIs?",
    choices: ["SDKs are faster than REST APIs", "SDKs simplify automation by providing ready-made functions", "SDKs don't require authentication", "SDKs work without internet connection"],
    answer: 1, explanation: "SDKs abstract away complexity and provide higher-level interfaces with built-in error handling." },

  { section: "Section 3", topic: "3.1 Cisco SDKs", type: "fill",
    question: "The Python library commonly used for Cisco Meraki automation is called __________.",
    answer: "meraki", explanation: "Install with `pip install meraki` for the DashboardAPI class." },

  // 3.2 Network Management Platforms
  { section: "Section 3", topic: "3.2 Network Management Platforms", type: "mc",
    question: "What is the main purpose of Cisco DNA Center?",
    choices: ["Cloud storage for configurations", "Network automation, assurance, and centralized management", "Email management for IT teams", "Antivirus protection"],
    answer: 1, explanation: "DNA Center provides intent-based networking for enterprise networks." },

  { section: "Section 3", topic: "3.2 Network Management Platforms", type: "mc",
    question: "Which Cisco platform is specifically designed for cloud-managed networks?",
    choices: ["DNA Center", "ACI", "Meraki", "NSO"],
    answer: 2, explanation: "Meraki provides cloud-based dashboard management for network devices." },

  { section: "Section 3", topic: "3.2 Network Management Platforms", type: "mc",
    question: "What does ACI stand for in Cisco networking?",
    choices: ["Automated Configuration Interface", "Application Centric Infrastructure", "Advanced Control Interface", "Adaptive Cloud Integration"],
    answer: 1, explanation: "ACI (Application Centric Infrastructure) is Cisco's SDN solution for data center networks." },

  { section: "Section 3", topic: "3.2 Network Management Platforms", type: "fill",
    question: "NSO stands for Network Services __________.",
    answer: "Orchestrator", explanation: "NSO automates multi-vendor network service configuration and management." },

  // 3.3 Compute Management
  { section: "Section 3", topic: "3.3 Compute Management (UCS, Intersight)", type: "mc",
    question: "What is the main difference between Cisco UCS Manager and Cisco Intersight?",
    choices: ["UCS Manager is newer than Intersight", "UCS Manager is on-premises; Intersight is cloud-based for hybrid environments", "Intersight only manages network devices", "UCS Manager requires no authentication"],
    answer: 1, explanation: "Intersight can manage resources across multiple locations through the cloud." },

  { section: "Section 3", topic: "3.3 Compute Management (UCS, Intersight)", type: "fill",
    question: "A __________ cloud environment combines on-premises and cloud resources managed together.",
    answer: "hybrid", explanation: "Hybrid cloud allows unified management of resources in different locations." },

  // 3.4 Collaboration Platforms
  { section: "Section 3", topic: "3.4 Collaboration Platforms (Webex, CUCM)", type: "mc",
    question: "Which API would you use to provision and manage users in Cisco Unified Communications Manager (CUCM)?",
    choices: ["UDS", "AXL", "Webex API", "RESTCONF"],
    answer: 1, explanation: "AXL (Administrative XML Layer) is used for administrative tasks like provisioning users and devices in CUCM." },

  { section: "Section 3", topic: "3.4 Collaboration Platforms (Webex, CUCM)", type: "mc",
    question: "In Cisco Webex, what is a 'space'?",
    choices: ["A physical conference room", "A storage location for files", "A chat room for group messaging and collaboration", "A server location"],
    answer: 2, explanation: "Webex spaces (formerly called rooms) are virtual collaboration areas for teams." },

  { section: "Section 3", topic: "3.4 Collaboration Platforms (Webex, CUCM)", type: "fill",
    question: "UDS stands for User Data __________.",
    answer: "Services", explanation: "UDS provides user lookup and directory services in Cisco Unified Communications Manager." },

  // 3.5 Security Platforms
  { section: "Section 3", topic: "3.5 Security Platforms (XDR, Umbrella, ISE)", type: "mc",
    question: "What is the primary function of Cisco Umbrella?",
    choices: ["Endpoint antivirus", "DNS-based cloud security and web filtering", "Firewall management", "Network monitoring"],
    answer: 1, explanation: "Cisco Umbrella uses DNS to provide first line of defense by blocking malicious domains." },

  { section: "Section 3", topic: "3.5 Security Platforms (XDR, Umbrella, ISE)", type: "mc",
    question: "What does ISE stand for in Cisco security?",
    choices: ["Internet Security Engine", "Identity Services Engine", "Integrated Security Environment", "Infrastructure Security Engine"],
    answer: 1, explanation: "Cisco ISE (Identity Services Engine) provides network access control and policy enforcement." },

  // 3.6 Device-Level APIs
  { section: "Section 3", topic: "3.6 Device-Level APIs (IOS XE, NX-OS)", type: "mc",
    question: "Which protocol provides a RESTful API interface directly on Cisco IOS XE devices?",
    choices: ["NETCONF", "SNMP", "RESTCONF", "SSH"],
    answer: 2, explanation: "RESTCONF is natively supported on IOS XE for HTTP-based configuration and state retrieval." },

  { section: "Section 3", topic: "3.6 Device-Level APIs (IOS XE, NX-OS)", type: "mc",
    question: "What is the main advantage of model-driven telemetry over SNMP polling?",
    choices: ["Higher security", "Push-based real-time streaming instead of request-response polling", "Simpler configuration", "Less bandwidth"],
    answer: 1, explanation: "Streaming telemetry pushes data continuously, providing real-time visibility without polling overhead." },

  // ============================================================
  // SECTION 4: Application Deployment and Security
  // ============================================================

  // 4.1 Edge Computing
  { section: "Section 4", topic: "4.1 Edge Computing", type: "mc",
    question: "What is the primary benefit of edge computing for IoT applications?",
    choices: ["Lower hardware costs", "Reduced latency and faster response times", "Unlimited storage capacity", "Simplified application development"],
    answer: 1, explanation: "Edge computing processes data near the source, eliminating network delays to distant cloud data centers." },

  { section: "Section 4", topic: "4.1 Edge Computing", type: "mc",
    question: "Which scenario would benefit MOST from edge computing?",
    choices: ["Long-term data archival", "Autonomous vehicle navigation requiring split-second decisions", "Annual financial reports", "Email server hosting"],
    answer: 1, explanation: "Autonomous vehicles need real-time processing that cannot tolerate cloud round-trip latency." },

  { section: "Section 4", topic: "4.1 Edge Computing", type: "fill",
    question: "Edge computing reduces __________ by processing data closer to where it is generated.",
    answer: "latency", explanation: "Processing locally eliminates the network delay of sending data to remote data centers." },

  // 4.2 Deployment Models
  { section: "Section 4", topic: "4.2 Application Deployment Models", type: "mc",
    question: "Which deployment model provides the MOST control over security and infrastructure?",
    choices: ["Public cloud", "Private cloud", "Hybrid cloud", "Edge computing"],
    answer: 1, explanation: "Private cloud provides dedicated infrastructure with full control over security and hardware." },

  { section: "Section 4", topic: "4.2 Application Deployment Models", type: "mc",
    question: "What is the primary advantage of a hybrid cloud deployment model?",
    choices: ["Lowest cost of all models", "Requires no internet connectivity", "Combines security of private cloud with scalability of public cloud", "Eliminates need for IT staff"],
    answer: 2, explanation: "Hybrid cloud keeps sensitive data on-premises while leveraging public cloud for scalable workloads." },

  { section: "Section 4", topic: "4.2 Application Deployment Models", type: "fill",
    question: "A __________ cloud deployment combines on-premises infrastructure with public cloud services.",
    answer: "hybrid", explanation: "Hybrid cloud integrates private and public environments with orchestration between them." },

  // 4.3 Deployment Types
  { section: "Section 4", topic: "4.3 Application Deployment Types", type: "mc",
    question: "What is the main advantage of containers over virtual machines?",
    choices: ["Stronger security isolation", "Ability to run different operating systems", "Faster startup times and better resource efficiency", "Direct hardware access"],
    answer: 2, explanation: "Containers share the host OS kernel, making them lightweight with second-level startup times." },

  { section: "Section 4", topic: "4.3 Application Deployment Types", type: "mc",
    question: "Which deployment type provides the BEST performance for latency-sensitive workloads?",
    choices: ["Containers", "Virtual machines", "Bare metal", "Serverless functions"],
    answer: 2, explanation: "Bare metal provides direct hardware access without any virtualization overhead." },

  { section: "Section 4", topic: "4.3 Application Deployment Types", type: "fill",
    question: "Containers share the host operating system __________, making them more lightweight than virtual machines.",
    answer: "kernel", explanation: "Containers use OS-level virtualization, sharing the kernel while maintaining process isolation." },

  // 4.4 CI/CD
  { section: "Section 4", topic: "4.4 CI/CD Pipeline Components", type: "mc",
    question: "What is the primary purpose of Continuous Integration (CI)?",
    choices: ["To automatically deploy code to production", "To frequently integrate and test code changes from multiple developers", "To monitor application performance", "To manage infrastructure"],
    answer: 1, explanation: "CI automates building and testing whenever code is committed, catching integration issues early." },

  { section: "Section 4", topic: "4.4 CI/CD Pipeline Components", type: "mc",
    question: "Which CI/CD component stores build artifacts like Docker images?",
    choices: ["Source control system", "Test framework", "Artifact repository", "Monitoring system"],
    answer: 2, explanation: "Artifact repositories like Docker Hub and JFrog Artifactory store versioned build outputs." },

  { section: "Section 4", topic: "4.4 CI/CD Pipeline Components", type: "fill",
    question: "In Continuous Deployment, every code change that passes tests is automatically deployed to __________.",
    answer: "production", explanation: "Continuous Deployment fully automates releases (unlike Continuous Delivery which requires manual approval)." },

  // 4.5 Unit Testing
  { section: "Section 4", topic: "4.5 Python Unit Tests", type: "mc",
    question: "What is the primary purpose of unit testing?",
    choices: ["To test the entire application workflow", "To verify individual functions work correctly in isolation", "To test database performance", "To deploy code to production"],
    answer: 1, explanation: "Unit tests focus on testing small, isolated pieces of code independently." },

  { section: "Section 4", topic: "4.5 Python Unit Tests", type: "mc",
    question: "In Python's unittest framework, test methods must start with which prefix?",
    choices: ["check_", "verify_", "test_", "assert_"],
    answer: 2, explanation: "The unittest framework automatically discovers and runs methods starting with `test_`." },

  { section: "Section 4", topic: "4.5 Python Unit Tests", type: "fill",
    question: "The AAA pattern in unit testing stands for Arrange, Act, and __________.",
    answer: "Assert", explanation: "The AAA pattern organizes tests into setup, execution, and verification sections." },

  // 4.6 Dockerfile
  { section: "Section 4", topic: "4.6 Dockerfile", type: "mc",
    question: "What is the purpose of the WORKDIR instruction in a Dockerfile?",
    choices: ["To create a volume for persistent storage", "To set the working directory for subsequent instructions", "To expose a port for networking", "To define the entry point"],
    answer: 1, explanation: "WORKDIR sets where commands like RUN, COPY, and CMD execute within the container." },

  { section: "Section 4", topic: "4.6 Dockerfile", type: "mc",
    question: "Which Dockerfile instruction installs packages during the image build process?",
    choices: ["CMD", "ENTRYPOINT", "RUN", "COPY"],
    answer: 2, explanation: "RUN executes commands during build time, creating a new image layer." },

  { section: "Section 4", topic: "4.6 Dockerfile", type: "fill",
    question: "The __________ instruction must be the first instruction in a Dockerfile and specifies the base image.",
    answer: "FROM", explanation: "FROM specifies the parent image to build upon (e.g., FROM python:3.11-slim)." },

  // 4.7 Docker Commands
  { section: "Section 4", topic: "4.7 Docker Commands", type: "mc",
    question: "What is the purpose of the `-v` flag when running a Docker container?",
    choices: ["To view container logs", "To mount a volume between host and container", "To set the Docker version", "To verify the container is running"],
    answer: 1, explanation: "The `-v` flag creates persistent storage or mounts host directories into the container." },

  { section: "Section 4", topic: "4.7 Docker Commands", type: "mc",
    question: "Which command executes a command inside a running container?",
    choices: ["docker run", "docker start", "docker exec", "docker attach"],
    answer: 2, explanation: "`docker exec` runs commands in already-running containers (e.g., docker exec -it mycontainer bash)." },

  { section: "Section 4", topic: "4.7 Docker Commands", type: "fill",
    question: "The `--rm` flag automatically __________ the container when it exits.",
    answer: "removes", explanation: "The --rm flag cleans up containers automatically after they stop running." },

  // 4.8 App Security
  { section: "Section 4", topic: "4.8 Application Security", type: "mc",
    question: "What is the MOST secure way to store API keys in application code?",
    choices: ["Hardcode them in source code", "Store them in a comment", "Use environment variables or a secret management system", "Store in a text file in the repository"],
    answer: 2, explanation: "Environment variables and secret managers keep secrets out of source code and version control." },

  { section: "Section 4", topic: "4.8 Application Security", type: "mc",
    question: "Why should passwords be hashed instead of encrypted?",
    choices: ["Hashing is faster", "Hashing is one-way — passwords can be verified without storing the original", "Encryption is more expensive", "Hashed passwords take less space"],
    answer: 1, explanation: "Hashing with bcrypt/scrypt protects passwords even if the database is compromised." },

  { section: "Section 4", topic: "4.8 Application Security", type: "fill",
    question: "Using __________ queries instead of string concatenation helps prevent SQL injection attacks.",
    answer: "parameterized", explanation: "Parameterized queries separate SQL code from data, preventing injection." },

  // 4.9 Infrastructure Components
  { section: "Section 4", topic: "4.9 Firewall, DNS, Load Balancer, Reverse Proxy", type: "mc",
    question: "What is the primary purpose of a load balancer?",
    choices: ["To encrypt network traffic", "To distribute incoming traffic across multiple servers", "To translate domain names to IP addresses", "To store application logs"],
    answer: 1, explanation: "Load balancers improve availability and performance by distributing requests across backend servers." },

  { section: "Section 4", topic: "4.9 Firewall, DNS, Load Balancer, Reverse Proxy", type: "mc",
    question: "What does DNS primarily do?",
    choices: ["Encrypts data in transit", "Blocks malicious traffic", "Translates domain names to IP addresses", "Distributes traffic across servers"],
    answer: 2, explanation: "DNS (Domain Name System) resolves human-readable names to IP addresses." },

  { section: "Section 4", topic: "4.9 Firewall, DNS, Load Balancer, Reverse Proxy", type: "fill",
    question: "A __________ Application Firewall (WAF) protects web applications from attacks like SQL injection and XSS.",
    answer: "Web", explanation: "A WAF operates at Layer 7 to inspect and filter HTTP/HTTPS traffic." },

  // 4.10 OWASP
  { section: "Section 4", topic: "4.10 OWASP Threats", type: "mc",
    question: "What is the primary defense against SQL injection attacks?",
    choices: ["Using HTTPS", "Implementing rate limiting", "Using parameterized queries or prepared statements", "Encrypting the database"],
    answer: 2, explanation: "Parameterized queries separate SQL code from data, preventing injection." },

  { section: "Section 4", topic: "4.10 OWASP Threats", type: "mc",
    question: "Which attack allows injecting malicious JavaScript into web pages viewed by other users?",
    choices: ["SQL Injection", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery (CSRF)", "Denial of Service (DoS)"],
    answer: 1, explanation: "XSS (Cross-Site Scripting) allows attackers to inject scripts that execute in victims' browsers." },

  { section: "Section 4", topic: "4.10 OWASP Threats", type: "fill",
    question: "To prevent XSS attacks, user-generated content should be __________ before displaying in HTML.",
    answer: "escaped", explanation: "HTML escaping converts special characters like < and > to HTML entities, preventing script execution." },

  // 4.11 Bash
  { section: "Section 4", topic: "4.11 Bash Commands", type: "mc",
    question: "Which Bash command changes the current working directory?",
    choices: ["pwd", "ls", "cd", "mkdir"],
    answer: 2, explanation: "The `cd` (change directory) command navigates to different directories." },

  { section: "Section 4", topic: "4.11 Bash Commands", type: "mc",
    question: "What does `chmod +x script.sh` do?",
    choices: ["Deletes the script", "Makes the script executable", "Copies the script", "Displays the script contents"],
    answer: 1, explanation: "`chmod +x` adds the execute permission bit to the file." },

  { section: "Section 4", topic: "4.11 Bash Commands", type: "fill",
    question: "The __________ command displays the current working directory's full path.",
    answer: "pwd", explanation: "`pwd` (print working directory) shows the absolute path of the current location." },

  // 4.12 DevOps
  { section: "Section 4", topic: "4.12 DevOps Principles", type: "mc",
    question: "What is the primary goal of DevOps practices?",
    choices: ["To replace operations teams", "To break down silos between development and operations for faster delivery", "To eliminate all manual testing", "To reduce employees"],
    answer: 1, explanation: "DevOps fosters collaboration and shared responsibility between Dev and Ops teams." },

  { section: "Section 4", topic: "4.12 DevOps Principles", type: "mc",
    question: "Which principle involves managing infrastructure through version-controlled code?",
    choices: ["Continuous Integration", "Infrastructure as Code (IaC)", "Microservices", "Shift-Left Security"],
    answer: 1, explanation: "IaC provisions and manages infrastructure through code rather than manual processes." },

  { section: "Section 4", topic: "4.12 DevOps Principles", type: "fill",
    question: "In DevOps culture, __________ postmortems focus on learning from failures without assigning blame.",
    answer: "blameless", explanation: "Blameless postmortems create safe environments for teams to analyze incidents and improve processes." },

  // ============================================================
  // SECTION 5: Infrastructure and Automation
  // ============================================================

  // 5.1 Model-Driven Programmability
  { section: "Section 5", topic: "5.1 Model-Driven Programmability", type: "mc",
    question: "What is the primary advantage of model-driven programmability over traditional CLI automation?",
    choices: ["It is faster to execute", "It uses standardized data models for vendor-neutral automation", "It requires less bandwidth", "It is easier to learn"],
    answer: 1, explanation: "YANG models enable consistent automation across vendors, unlike device-specific CLI commands." },

  { section: "Section 5", topic: "5.1 Model-Driven Programmability", type: "mc",
    question: "Which protocol provides a RESTful interface to NETCONF datastores?",
    choices: ["SNMP", "SSH", "RESTCONF", "Telnet"],
    answer: 2, explanation: "RESTCONF provides HTTP-based REST API access to YANG-modeled network data." },

  { section: "Section 5", topic: "5.1 Model-Driven Programmability", type: "fill",
    question: "__________ models define standardized schemas for network device configuration and state data.",
    answer: "YANG", explanation: "YANG (Yet Another Next Generation) provides standardized data structures for network management." },

  // 5.2 Controller vs Device Management
  { section: "Section 5", topic: "5.2 Controller vs Device Management", type: "mc",
    question: "What is the primary advantage of controller-level management over device-level management?",
    choices: ["It requires less initial setup", "It provides centralized policy management and automation at scale", "It works without network connectivity", "It is less expensive"],
    answer: 1, explanation: "Controllers enable consistent, automated policy enforcement across large networks from a single pane of glass." },

  { section: "Section 5", topic: "5.2 Controller vs Device Management", type: "mc",
    question: "Which Cisco platform provides controller-level management for enterprise networks?",
    choices: ["IOS XE CLI", "Cisco DNA Center", "PuTTY", "Wireshark"],
    answer: 1, explanation: "DNA Center is a network controller providing intent-based automation and management." },

  { section: "Section 5", topic: "5.2 Controller vs Device Management", type: "fill",
    question: "In controller-level management, the operator defines the __________, and the controller determines the implementation details.",
    answer: "intent", explanation: "Intent-based networking focuses on desired outcomes rather than step-by-step device configurations." },

  // 5.3 CML and pyATS
  { section: "Section 5", topic: "5.3 Cisco Modeling Labs & pyATS", type: "mc",
    question: "What is the primary purpose of Cisco Modeling Labs (CML)?",
    choices: ["Monitor production network performance", "Simulate network topologies for testing and training", "Configure physical network devices", "Generate network documentation"],
    answer: 1, explanation: "CML provides virtual network environments for safe experimentation without touching production." },

  { section: "Section 5", topic: "5.3 Cisco Modeling Labs & pyATS", type: "mc",
    question: "Which pyATS component parses device CLI output into structured data?",
    choices: ["Topology", "Genie", "YAML", "Testbed"],
    answer: 1, explanation: "Genie is the parsing library that converts CLI output to Python dictionaries." },

  { section: "Section 5", topic: "5.3 Cisco Modeling Labs & pyATS", type: "mc",
    question: "What type of validation is pyATS particularly useful for?",
    choices: ["Hardware diagnostics", "Pre/post network change verification", "Physical cable testing", "Power consumption analysis"],
    answer: 1, explanation: "pyATS captures network state before changes and validates after to ensure correctness." },

  // 5.4 Infrastructure CI/CD
  { section: "Section 5", topic: "5.4 Infrastructure CI/CD Pipelines", type: "mc",
    question: "What is the primary difference between application and infrastructure CI/CD pipelines?",
    choices: ["Application pipelines use Git, infrastructure doesn't", "Application deploys code, infrastructure deploys network/system configurations", "Infrastructure pipelines are always faster", "Application pipelines don't use automation"],
    answer: 1, explanation: "Application CI/CD targets software; infrastructure CI/CD targets network devices and system configurations." },

  { section: "Section 5", topic: "5.4 Infrastructure CI/CD Pipelines", type: "fill",
    question: "Infrastructure CI/CD pipelines often use __________ runs to preview changes before actual deployment.",
    answer: "dry", explanation: "Tools like Terraform and Ansible provide dry-run modes to safely preview changes without applying them." },

  // 5.5 IaC
  { section: "Section 5", topic: "5.5 Infrastructure as Code", type: "mc",
    question: "What does 'idempotency' mean in Infrastructure as Code?",
    choices: ["Code runs only once", "Running the same code multiple times produces the same result", "Code is encrypted", "Code is documented"],
    answer: 1, explanation: "Idempotent operations can be safely re-run without causing unintended side effects." },

  { section: "Section 5", topic: "5.5 Infrastructure as Code", type: "mc",
    question: "Which IaC approach describes the desired end state rather than specific steps to achieve it?",
    choices: ["Imperative", "Procedural", "Declarative", "Sequential"],
    answer: 2, explanation: "Declarative code specifies 'what' should exist, and the tool determines 'how' to achieve it." },

  { section: "Section 5", topic: "5.5 Infrastructure as Code", type: "fill",
    question: "In IaC, __________ infrastructure means replacing components rather than modifying them in place.",
    answer: "immutable", explanation: "Immutable infrastructure eliminates configuration drift by replacing rather than updating existing resources." },

  // 5.6 Ansible
  { section: "Section 5", topic: "5.6 Ansible", type: "mc",
    question: "What is Ansible's primary advantage in terms of architecture?",
    choices: ["It requires agents on all managed devices", "It is agentless, using SSH for connectivity", "It only works with Windows systems", "It requires a proprietary database"],
    answer: 1, explanation: "Ansible's agentless design eliminates the need for installing software on managed devices." },

  { section: "Section 5", topic: "5.6 Ansible", type: "mc",
    question: "What file format does Ansible use for writing playbooks?",
    choices: ["JSON", "XML", "YAML", "Binary"],
    answer: 2, explanation: "Ansible playbooks are written in human-readable YAML format." },

  { section: "Section 5", topic: "5.6 Ansible", type: "fill",
    question: "Ansible uses __________ to connect to Linux and network devices for agentless management.",
    answer: "SSH", explanation: "Ansible leverages SSH (Secure Shell) for agentless communication with managed nodes." },

  // 5.7 Terraform
  { section: "Section 5", topic: "5.7 Terraform", type: "mc",
    question: "What is Terraform's primary purpose?",
    choices: ["Monitor application performance", "Provision and manage infrastructure as code across cloud platforms", "Write Python scripts", "Manage source code versions"],
    answer: 1, explanation: "Terraform is an IaC tool for multi-cloud infrastructure provisioning." },

  { section: "Section 5", topic: "5.7 Terraform", type: "mc",
    question: "What Terraform command shows planned changes before applying them?",
    choices: ["terraform show", "terraform validate", "terraform plan", "terraform preview"],
    answer: 2, explanation: "`terraform plan` displays what will be created, modified, or destroyed before execution." },

  { section: "Section 5", topic: "5.7 Terraform", type: "mc",
    question: "What file does Terraform use to track the current state of infrastructure?",
    choices: ["config.json", "terraform.tfstate", "state.db", "infrastructure.yaml"],
    answer: 1, explanation: "The terraform.tfstate file maps code to real-world resources." },

  { section: "Section 5", topic: "5.7 Terraform", type: "fill",
    question: "Terraform uses __________ Configuration Language (HCL) for defining infrastructure.",
    answer: "HashiCorp", explanation: "HCL (HashiCorp Configuration Language) is Terraform's declarative configuration syntax." },

  // 5.8 NSO
  { section: "Section 5", topic: "5.8 Cisco NSO", type: "mc",
    question: "What is Cisco NSO's primary capability?",
    choices: ["Monitor network traffic flows", "Orchestrate services across multi-vendor network devices", "Replace all network hardware", "Provide wireless access points"],
    answer: 1, explanation: "NSO provides unified service orchestration and automation across diverse vendor environments." },

  { section: "Section 5", topic: "5.8 Cisco NSO", type: "mc",
    question: "What are NEDs in Cisco NSO?",
    choices: ["Network encryption devices", "Network Element Drivers that enable device-specific communication", "New equipment databases", "Network error detectors"],
    answer: 1, explanation: "NEDs translate NSO's generic commands into device-specific syntax for each vendor." },

  { section: "Section 5", topic: "5.8 Cisco NSO", type: "mc",
    question: "What happens if a transaction fails partway through in NSO?",
    choices: ["The changes remain partially applied", "NSO automatically rolls back all changes", "The operator must manually fix it", "NSO shuts down"],
    answer: 1, explanation: "NSO uses transaction-based configuration with automatic rollback on failure." },

  // 5.12 RESTCONF/NETCONF
  { section: "Section 5", topic: "5.12 RESTCONF & NETCONF", type: "mc",
    question: "What data format does RESTCONF primarily use in responses?",
    choices: ["Plain text", "Binary", "JSON or XML", "CSV"],
    answer: 2, explanation: "RESTCONF supports both JSON and XML formatted responses." },

  { section: "Section 5", topic: "5.12 RESTCONF & NETCONF", type: "mc",
    question: "Which protocol uses SSH as its transport mechanism?",
    choices: ["RESTCONF", "SNMP", "NETCONF", "HTTP REST"],
    answer: 2, explanation: "NETCONF operates over SSH (typically TCP port 830)." },

  { section: "Section 5", topic: "5.12 RESTCONF & NETCONF", type: "fill",
    question: "NETCONF operations like <get-config> are structured using __________ format.",
    answer: "XML", explanation: "NETCONF uses XML for all protocol messages and data encoding." },

  // 5.13 YANG Models
  { section: "Section 5", topic: "5.13 YANG Models", type: "mc",
    question: "In YANG models, what does the `leaf` statement represent?",
    choices: ["A repeatable list of items", "A single data value", "A group of related containers", "A network protocol"],
    answer: 1, explanation: "`leaf` defines individual data elements such as name, enabled, or MTU." },

  { section: "Section 5", topic: "5.13 YANG Models", type: "mc",
    question: "What is the purpose of the `key` statement in a YANG `list`?",
    choices: ["To encrypt the data", "To specify the unique identifier for list entries", "To define default values", "To set access permissions"],
    answer: 1, explanation: "`key` ensures each list item can be uniquely identified (like a primary key)." },

  { section: "Section 5", topic: "5.13 YANG Models", type: "fill",
    question: "In YANG, a __________ groups related data together and is not repeatable, while a list is repeatable.",
    answer: "container", explanation: "Containers organize related data hierarchically without repetition." },

  // 5.14 Diff
  { section: "Section 5", topic: "5.14 Unified Diff", type: "mc",
    question: "In a unified diff, what does a line beginning with `-` indicate?",
    choices: ["A line that was added", "A line that was removed", "An unchanged line", "A comment"],
    answer: 1, explanation: "Lines prefixed with `-` were deleted from the original file." },

  { section: "Section 5", topic: "5.14 Unified Diff", type: "mc",
    question: "What does a line beginning with `+` indicate in a unified diff?",
    choices: ["A line that was removed", "A line that was added", "An error", "A file header"],
    answer: 1, explanation: "Lines prefixed with `+` were added in the modified version." },

  // 5.16 Sequence Diagrams
  { section: "Section 5", topic: "5.16 Sequence Diagrams", type: "mc",
    question: "How does time flow in a sequence diagram?",
    choices: ["Left to right", "Right to left", "Top to bottom", "Bottom to top"],
    answer: 2, explanation: "Sequence diagrams show interactions chronologically from top (first event) to bottom (last event)." },

  { section: "Section 5", topic: "5.16 Sequence Diagrams", type: "mc",
    question: "What do dashed arrows typically represent in sequence diagrams?",
    choices: ["Error messages", "Responses or return values", "Ignored messages", "Encrypted data"],
    answer: 1, explanation: "Dashed arrows show replies or return values responding to previous requests (solid arrows)." },

  { section: "Section 5", topic: "5.16 Sequence Diagrams", type: "fill",
    question: "In sequence diagrams, vertical lines called __________ represent the different actors or systems involved.",
    answer: "lifelines", explanation: "Lifelines show the existence and duration of each participant in the interaction." },

  // ============================================================
  // SECTION 6: Network Fundamentals
  // ============================================================

  // 6.1 MAC & VLANs
  { section: "Section 6", topic: "6.1 MAC Addresses & VLANs", type: "mc",
    question: "What is the primary purpose of a MAC address?",
    choices: ["To route packets across the internet", "To identify network devices at Layer 2 on a local network", "To encrypt data", "To assign IP addresses"],
    answer: 1, explanation: "MAC addresses enable switches to forward frames to the correct destination port on a local network." },

  { section: "Section 6", topic: "6.1 MAC Addresses & VLANs", type: "mc",
    question: "What is the main benefit of using VLANs?",
    choices: ["Increase network speed", "Logically segment networks for security and management without physical separation", "Replace physical switches", "Eliminate the need for IP addresses"],
    answer: 1, explanation: "VLANs separate broadcast domains and isolate traffic without requiring separate physical infrastructure." },

  { section: "Section 6", topic: "6.1 MAC Addresses & VLANs", type: "mc",
    question: "How many bytes (octets) are in a MAC address?",
    choices: ["4 bytes", "6 bytes", "8 bytes", "16 bytes"],
    answer: 1, explanation: "MAC addresses are 48 bits (6 bytes), typically written as 12 hexadecimal digits." },

  { section: "Section 6", topic: "6.1 MAC Addresses & VLANs", type: "fill",
    question: "The __________ protocol is used to map IP addresses to MAC addresses on a local network.",
    answer: "ARP", explanation: "ARP (Address Resolution Protocol) resolves Layer 3 (IP) addresses to Layer 2 (MAC) addresses." },

  // 6.2 IP Addressing
  { section: "Section 6", topic: "6.2 IP Addresses, Subnets & Routing", type: "mc",
    question: "What is the primary purpose of a subnet mask?",
    choices: ["Encrypt network traffic", "Define which part of an IP address is the network vs. the host portion", "Assign IP addresses automatically", "Route packets between networks"],
    answer: 1, explanation: "Subnet masks divide IP addresses into network and host portions." },

  { section: "Section 6", topic: "6.2 IP Addresses, Subnets & Routing", type: "mc",
    question: "How many usable host addresses are in a /24 subnet?",
    choices: ["254", "256", "255", "253"],
    answer: 0, explanation: "A /24 has 256 total addresses, minus the network address and broadcast address = 254 usable hosts." },

  { section: "Section 6", topic: "6.2 IP Addresses, Subnets & Routing", type: "mc",
    question: "What is the function of a default gateway?",
    choices: ["Assign IP addresses to devices", "Forward traffic to networks outside the local subnet", "Block unauthorized traffic", "Cache DNS queries"],
    answer: 1, explanation: "The default gateway routes packets destined for networks other than the local subnet." },

  { section: "Section 6", topic: "6.2 IP Addresses, Subnets & Routing", type: "fill",
    question: "The IP address __________ is the loopback address used to refer to the local machine.",
    answer: "127.0.0.1", explanation: "127.0.0.1 (or ::1 for IPv6) is the loopback address used for local testing." },

  // 6.3 Network Components
  { section: "Section 6", topic: "6.3 Network Components", type: "mc",
    question: "What is the primary function of a network switch?",
    choices: ["Route packets between different IP networks", "Forward frames within a local network based on MAC addresses", "Block malicious traffic", "Distribute traffic across servers"],
    answer: 1, explanation: "Switches operate at Layer 2, using MAC address tables for local frame forwarding." },

  { section: "Section 6", topic: "6.3 Network Components", type: "mc",
    question: "Which device connects different IP networks and makes forwarding decisions based on IP addresses?",
    choices: ["Switch", "Hub", "Router", "Repeater"],
    answer: 2, explanation: "Routers operate at Layer 3 and forward packets between networks using routing tables." },

  { section: "Section 6", topic: "6.3 Network Components", type: "mc",
    question: "What is a firewall's primary function?",
    choices: ["Assign IP addresses", "Monitor performance", "Control network traffic based on security policy rules", "Translate domain names"],
    answer: 2, explanation: "Firewalls inspect and filter traffic based on rules to protect networks from unauthorized access." },

  // 6.4 Network Topology
  { section: "Section 6", topic: "6.4 Network Topology", type: "mc",
    question: "In a star topology, what is the central connecting device?",
    choices: ["Router", "Firewall", "Switch or hub", "Server"],
    answer: 2, explanation: "Star topology connects all devices to a central switch or hub." },

  { section: "Section 6", topic: "6.4 Network Topology", type: "mc",
    question: "What is the main advantage of a mesh network topology?",
    choices: ["Lowest cost to implement", "Redundant paths providing high availability and fault tolerance", "Simplest to configure", "Uses the fewest cables"],
    answer: 1, explanation: "Mesh topology provides multiple paths between nodes, so a single link failure doesn't disrupt connectivity." },

  // 6.5 Management Planes
  { section: "Section 6", topic: "6.5 Management, Data & Control Planes", type: "mc",
    question: "Which network plane is responsible for making routing and forwarding decisions?",
    choices: ["Management plane", "Data plane", "Control plane", "Application plane"],
    answer: 2, explanation: "The control plane builds routing tables and makes forwarding decisions (e.g., OSPF, BGP)." },

  { section: "Section 6", topic: "6.5 Management, Data & Control Planes", type: "mc",
    question: "Which plane handles the actual forwarding of packets from source to destination?",
    choices: ["Management plane", "Data plane", "Control plane", "Orchestration plane"],
    answer: 1, explanation: "The data plane (forwarding plane) moves packets based on decisions made by the control plane." },

  { section: "Section 6", topic: "6.5 Management, Data & Control Planes", type: "fill",
    question: "SSH, SNMP, and NETCONF are all examples of __________ plane protocols used to manage network devices.",
    answer: "management", explanation: "The management plane handles device configuration and monitoring communications." },

  // 6.6 IP Services
  { section: "Section 6", topic: "6.6 IP Services (DHCP, DNS, NAT, NTP)", type: "mc",
    question: "What is the primary function of DHCP?",
    choices: ["Resolve domain names to IP addresses", "Automatically assign IP addresses to network devices", "Translate private IPs to public IPs", "Synchronize network time"],
    answer: 1, explanation: "DHCP (Dynamic Host Configuration Protocol) automatically provides IP addresses, subnet masks, gateways, and DNS servers to devices." },

  { section: "Section 6", topic: "6.6 IP Services (DHCP, DNS, NAT, NTP)", type: "mc",
    question: "What does NAT primarily accomplish?",
    choices: ["Encrypts network traffic", "Translates private IP addresses to a public IP for internet access", "Blocks unauthorized access", "Distributes traffic"],
    answer: 1, explanation: "NAT (Network Address Translation) allows devices with private IPs to communicate over the internet using a shared public IP." },

  { section: "Section 6", topic: "6.6 IP Services (DHCP, DNS, NAT, NTP)", type: "mc",
    question: "What is the purpose of NTP in a network?",
    choices: ["Transfer files between hosts", "Synchronize clocks across network devices", "Monitor network performance", "Assign IP addresses"],
    answer: 1, explanation: "NTP (Network Time Protocol) synchronizes clocks on networked devices for accurate logging and security." },

  { section: "Section 6", topic: "6.6 IP Services (DHCP, DNS, NAT, NTP)", type: "fill",
    question: "SNMP uses __________ to read and write configuration on network devices.",
    answer: "OIDs", explanation: "Object Identifiers (OIDs) in SNMP uniquely identify managed objects in the MIB (Management Information Base)." },

  // 6.7 Protocol Ports
  { section: "Section 6", topic: "6.7 Common Protocol Ports", type: "mc",
    question: "Which port does HTTPS use by default?",
    choices: ["80", "443", "8080", "8443"],
    answer: 1, explanation: "HTTPS (HTTP Secure) runs on TCP port 443." },

  { section: "Section 6", topic: "6.7 Common Protocol Ports", type: "mc",
    question: "SSH uses which default TCP port?",
    choices: ["21", "22", "23", "25"],
    answer: 1, explanation: "SSH (Secure Shell) uses TCP port 22 for secure remote access." },

  { section: "Section 6", topic: "6.7 Common Protocol Ports", type: "mc",
    question: "Which protocol and port does DNS use for standard queries?",
    choices: ["TCP 53", "UDP 53", "TCP 67", "UDP 123"],
    answer: 1, explanation: "DNS uses UDP port 53 for standard queries (TCP 53 for zone transfers and large responses)." },

  { section: "Section 6", topic: "6.7 Common Protocol Ports", type: "fill",
    question: "NETCONF uses TCP port __________ for its SSH-based transport.",
    answer: "830", explanation: "NETCONF is defined to run over SSH on TCP port 830 per RFC 6242." },

  // 6.8 Troubleshooting Connectivity
  { section: "Section 6", topic: "6.8 Connectivity Troubleshooting", type: "mc",
    question: "Which command tests basic IP connectivity to a remote host?",
    choices: ["traceroute", "ping", "nslookup", "netstat"],
    answer: 1, explanation: "`ping` sends ICMP echo requests to test if a host is reachable." },

  { section: "Section 6", topic: "6.8 Connectivity Troubleshooting", type: "mc",
    question: "What does the `traceroute` (or `tracert`) command show?",
    choices: ["Open ports on a host", "The path packets take through the network hop by hop", "DNS resolution results", "Active connections on a device"],
    answer: 1, explanation: "traceroute reveals each router (hop) that packets traverse to reach the destination." },

  // 6.9 Network Constraints
  { section: "Section 6", topic: "6.9 Network Constraints", type: "mc",
    question: "What is network latency?",
    choices: ["The amount of data that can be transferred per second", "The delay in transmitting data from source to destination", "Variation in packet delivery time", "Packet loss percentage"],
    answer: 1, explanation: "Latency is the time delay for data to travel from source to destination, measured in milliseconds." },

  { section: "Section 6", topic: "6.9 Network Constraints", type: "mc",
    question: "What is jitter in networking?",
    choices: ["Total bandwidth available", "Average latency of the network", "Variation in packet delivery delay over time", "Number of hops between endpoints"],
    answer: 2, explanation: "Jitter is the inconsistency in packet delivery timing, which impacts real-time applications like VoIP." },

  { section: "Section 6", topic: "6.9 Network Constraints", type: "fill",
    question: "Network __________ refers to the maximum rate of data transfer across a network path, measured in Mbps or Gbps.",
    answer: "bandwidth", explanation: "Bandwidth determines how much data can flow through a link per unit of time." },
];
