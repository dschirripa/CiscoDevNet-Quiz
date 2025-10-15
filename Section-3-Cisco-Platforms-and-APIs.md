# Section 3: Cisco Platforms and APIs

## Summary
Section 3 covers Cisco platforms, their APIs, and how to use them for network, compute, collaboration, and security automation. You’ll learn how to use SDKs, understand platform capabilities, and apply model-driven programmability. Key topics include:

1. Using Cisco SDKs and API documentation
2. Network management platforms (Meraki, DNA Center, ACI, SD-WAN, NSO)
3. Compute management platforms (UCS Manager, Intersight)
4. Collaboration platforms (Webex, CUCM, AXL, UDS)
5. Security platforms (XDR, Firepower, Umbrella, Secure Endpoint, ISE, Malware Analytics)
6. Device-level APIs (IOS XE, NX-OS)
7. DevNet resources (Sandbox, Code Exchange, forums, Learning Labs)
8. Model-driven programmability (YANG, RESTCONF, NETCONF)
9. Practical API code examples for real-world tasks

**Practice Resources:**
- Cisco DevNet Sandboxes and Learning Labs
- Official Cisco API documentation
- Python SDKs and sample code
- Community forums and support

---

## 3.1 Construct a Python Script That Uses a Cisco SDK Given SDK Documentation

### Overview
**ELI5:** Using a Cisco SDK is like using a pre-assembled LEGO kit with instructions—instead of finding individual bricks (API calls), you get ready-made pieces and a guide that shows exactly how to build what you need.

**Summary:**
A **Software Development Kit (SDK)** is a collection of libraries, tools, and documentation that simplifies interaction with Cisco platforms. Instead of manually crafting HTTP requests, SDKs provide Python functions that handle authentication, data formatting, and error handling automatically.

**Key SDK components:**
- **Libraries:** Pre-written Python modules (`pip install meraki`, `pip install dnacentersdk`)
- **Methods:** Python functions for API operations (`.getOrganizations()`, `.get_device_list()`)
- **Documentation:** API reference with examples and parameters
- **Error handling:** Built-in exception management
- **Rate limiting:** Automatic retry logic for 429 errors

**Benefits over raw REST API calls:**
- Less code to write (SDK handles boilerplate)
- Automatic authentication token management
- Built-in error handling and retries
- Type hints and IDE autocomplete support
- Maintained by Cisco, aligned with API updates

**Common Cisco SDKs:**
- **meraki** - Meraki Dashboard API
- **dnacentersdk** - DNA Center
- **webexteamssdk** - Webex
- **pyats** - Network testing and automation

### Example: Meraki SDK - Get Organizations and Networks

```python
import os
from meraki import DashboardAPI

# Initialize SDK with API key from environment
api_key = os.environ.get('MERAKI_API_KEY')
dashboard = DashboardAPI(api_key=api_key, suppress_logging=True)

try:
    # Get all organizations
    orgs = dashboard.organizations.getOrganizations()
    
    for org in orgs:
        print(f"Organization: {org['name']} (ID: {org['id']})")
        
        # Get networks for this organization
        networks = dashboard.organizations.getOrganizationNetworks(org['id'])
        print(f"  Networks: {len(networks)}")
        
        for net in networks[:3]:  # Show first 3
            print(f"    - {net['name']}")
            
except Exception as e:
    print(f"Error: {e}")
```

---

### Sample Exam Questions

1. What is the main benefit of using a Cisco SDK instead of directly calling REST APIs?
   - A) SDKs are faster than REST APIs
   - B) SDKs simplify automation by providing ready-made functions and documentation
   - C) SDKs don't require authentication
   - D) SDKs work without internet connection
   <details>
   <summary>Show Answer</summary>
   **B) SDKs simplify automation by providing ready-made functions and documentation** - SDKs abstract away complexity and provide higher-level interfaces.
   </details>
   <br/>

2. Where can you find details about available SDK functions and methods?
   - A) In the source code only
   - B) In the SDK documentation provided by Cisco DevNet
   - C) In the API responses
   - D) By trial and error
   <details>
   <summary>Show Answer</summary>
   **B) In the SDK documentation provided by Cisco DevNet** - Official SDK documentation explains all available functions, parameters, and examples.
   </details>
   <br/>

3. Fill in the blank: The Python library commonly used for Cisco Meraki automation is called __________.
   <details>
   <summary>Show Answer</summary>
   **meraki** (specifically the `DashboardAPI` class) - `pip install meraki`
   </details>
   <br/>
---

## 3.2 Describe the Capabilities of Cisco Network Management Platforms and APIs (Meraki, DNA Center, ACI, SD-WAN, NSO)

### Overview
**ELI5:** Network management platforms are like airport control towers—they give you a complete view of everything happening across your network and let you make changes from one central location instead of visiting each device individually.

**Summary:**
Cisco network management platforms provide **centralized control, visibility, and automation** for networks of all sizes. Each platform serves specific use cases and provides REST APIs for programmatic access.

**Key Platforms:**

| Platform | Use Case | API Capabilities | Port/Protocol |
|----------|----------|------------------|---------------|
| **Meraki** | Cloud-managed networks | Orgs, networks, devices, clients, policies | HTTPS/443 |
| **DNA Center** | Enterprise campus/WAN | Device inventory, assurance, configuration | HTTPS/443 |
| **ACI** | Data center fabric | Tenants, policies, endpoints, topology | HTTPS/443 |
| **SD-WAN (vManage)** | WAN optimization | Device templates, policies, analytics | HTTPS/443 |
| **NSO** | Multi-vendor orchestration | Service models, device groups, workflows | HTTP/8080 |

**Common API Operations:**
- **Inventory:** Get devices, sites, network topology
- **Configuration:** Update settings, deploy templates
- **Monitoring:** Health scores, client data, performance metrics
- **Assurance:** Network issues, suggested remediation
- **Provisioning:** Add devices, create networks, assign policies

**Authentication Methods:**
- **Meraki:** API key in header (`X-Cisco-Meraki-API-Key`)
- **DNA Center:** Token-based (get token, use in `X-Auth-Token`)
- **ACI:** Token-based (APIC login)
- **SD-WAN:** Session cookie authentication
- **NSO:** Basic Auth or token

### Example: DNA Center - Get Network Devices

```python
import requests
import os
from requests.auth import HTTPBasicAuth

# Step 1: Get authentication token
dnac_url = "https://sandboxdnac.cisco.com"
username = os.environ.get('DNAC_USER', 'devnetuser')
password = os.environ.get('DNAC_PASS', 'Cisco123!')

auth_url = f"{dnac_url}/dna/system/api/v1/auth/token"
response = requests.post(auth_url, auth=HTTPBasicAuth(username, password), verify=False)
token = response.json()['Token']

# Step 2: Get network devices
devices_url = f"{dnac_url}/dna/intent/api/v1/network-device"
headers = {
    "X-Auth-Token": token,
    "Content-Type": "application/json"
}

response = requests.get(devices_url, headers=headers, verify=False)
devices = response.json()['response']

print(f"Found {len(devices)} devices:\n")
for device in devices[:5]:  # Show first 5
    print(f"Hostname: {device['hostname']}")
    print(f"  Type: {device['type']}")
    print(f"  IP: {device['managementIpAddress']}")
    print(f"  Status: {device['reachabilityStatus']}\n")
```

---

### Sample Exam Questions

1. What is the main purpose of Cisco DNA Center?
   - A) Cloud storage for network configurations
   - B) Network automation, assurance, and centralized management
   - C) Email management for IT teams
   - D) Antivirus protection
   <details>
   <summary>Show Answer</summary>
   **B) Network automation, assurance, and centralized management** - DNA Center provides intent-based networking for enterprise networks.
   </details>
   <br/>

2. Which Cisco platform is specifically designed for cloud-managed networks?
   - A) DNA Center
   - B) ACI
   - C) Meraki
   - D) NSO
   <details>
   <summary>Show Answer</summary>
   **C) Meraki** - Meraki provides cloud-based dashboard management for network devices.
   </details>
   <br/>

3. Fill in the blank: NSO stands for Network Services __________.
   <details>
   <summary>Show Answer</summary>
   **Orchestrator** - NSO automates multi-vendor network services and configurations.
   </details>
   <br/>
---

## 3.3 Describe the Capabilities of Cisco Compute Management Platforms and APIs (UCS Manager, Intersight)

### Overview
**ELI5:** Compute management platforms are like remote controls for your data center—instead of physically touching servers, you manage, monitor, and automate everything from your desk (or anywhere with internet).

**Summary:**
Cisco compute platforms manage **servers, storage, and virtualization** infrastructure. They provide centralized management, automation, and monitoring for physical and virtual compute resources.

**Key Platforms:**

| Platform | Management Style | Use Case | API Type |
|----------|-----------------|----------|----------|
| **UCS Manager** | On-premises | Blade/rack servers in data center | XML API |
| **Intersight** | Cloud-based SaaS | Hybrid cloud, HyperFlex, UCS | REST API |

**UCS Manager:**
- Manages UCS blade and rack servers
- Service profiles for server templates
- XML-based API (Python SDK available: `ucsmsdk`)
- On-premises appliance

**Intersight:**
- Cloud-based management portal
- Manages UCS, HyperFlex, and third-party servers
- REST API with Python SDK (`intersight`)
- Hybrid cloud visibility
- Analytics and recommendations

**Common API Operations:**
- **Inventory:** Get servers, chassis, adapters, firmware versions
- **Provisioning:** Create service profiles, boot policies, VLAN configs
- **Monitoring:** Server health, power, temperature, faults
- **Firmware management:** Update firmware across servers
- **Troubleshooting:** Query faults, alarms, and logs

**Authentication:**
- **UCS Manager:** Session-based (login, get cookie)
- **Intersight:** API key + secret (signed requests)

### Example: UCS Manager - Get Server Inventory

```python
from ucsmsdk.ucshandle import UcsHandle

# Connect to UCS Manager
handle = UcsHandle("10.1.1.1", "admin", "password")
handle.login()

try:
    # Query all compute blades
    blades = handle.query_classid("computeBlade")
    
    print(f"Found {len(blades)} blade servers:\n")
    for blade in blades:
        print(f"Server: {blade.dn}")
        print(f"  Model: {blade.model}")
        print(f"  Serial: {blade.serial}")
        print(f"  CPUs: {blade.num_of_cpus}")
        print(f"  Memory: {blade.total_memory} MB")
        print(f"  Power State: {blade.oper_power}\n")
        
finally:
    handle.logout()
```

---

### Sample Exam Questions

1. What is the main difference between Cisco UCS Manager and Cisco Intersight?
   - A) UCS Manager is newer than Intersight
   - B) UCS Manager is on-premises; Intersight is cloud-based for hybrid environments
   - C) Intersight only manages network devices
   - D) UCS Manager requires no authentication
   <details>
   <summary>Show Answer</summary>
   **B) UCS Manager is on-premises; Intersight is cloud-based for hybrid environments** - Intersight can manage resources across multiple locations.
   </details>
   <br/>

2. Which operations can you automate using Cisco compute management APIs?
   - A) Only server monitoring
   - B) Server provisioning, monitoring, firmware updates, and troubleshooting
   - C) Only firmware updates
   - D) Email notifications only
   <details>
   <summary>Show Answer</summary>
   **B) Server provisioning, monitoring, firmware updates, and troubleshooting** - Compute APIs provide comprehensive server management capabilities.
   </details>
   <br/>

3. Fill in the blank: A __________ cloud environment combines on-premises and cloud resources managed together.
   <details>
   <summary>Show Answer</summary>
   **hybrid** - Hybrid cloud allows unified management of resources in different locations.
   </details>
   <br/>
---

## 3.4 Describe the Capabilities of Cisco Collaboration Platforms and APIs (Webex, CUCM, AXL, UDS)

### Overview
**ELI5:** Collaboration platforms are like digital office buildings—they have meeting rooms (Webex spaces), phone systems (CUCM), and directories (UDS) that APIs let you control and automate without manual clicking.

**Summary:**
Cisco collaboration platforms enable **messaging, video meetings, calling, and contact management**. APIs allow automation of user provisioning, bot creation, and integration with business workflows.

**Key Platforms and APIs:**

| Platform/API | Purpose | Common Operations | Protocol |
|--------------|---------|-------------------|----------|
| **Webex API** | Teams messaging & meetings | Spaces, messages, memberships, meetings | REST/HTTPS |
| **CUCM** | Enterprise phone system | Call routing, phone configs, users | SOAP/REST |
| **AXL** | CUCM administration | Add/update phones, users, lines | SOAP/XML |
| **UDS** | User directory services | User lookup, presence, contacts | REST |

**Webex API Capabilities:**
- **Spaces (Rooms):** Create team collaboration areas
- **Messages:** Send text, files, and cards (interactive forms)
- **Memberships:** Add/remove people from spaces
- **Meetings:** Schedule and manage video meetings
- **Bots:** Automated assistants that respond to messages
- **Webhooks:** Get notified of events (new message, space created)

**CUCM APIs:**
- **AXL (Administrative XML):** SOAP API for provisioning
  - Add phones, users, lines, hunt groups
  - Update device configurations
  - Bulk operations
- **UDS (User Data Services):** REST API for user info
  - User directory lookup
  - Presence status
  - Contact information
- **CUCM REST API:** Device management and monitoring

**Authentication:**
- **Webex:** Bearer token (OAuth 2.0 or Bot/Integration token)
- **AXL:** Basic Auth (CUCM admin credentials)
- **UDS:** Basic Auth

### Example: Webex - Create Space and Send Message

```python
import requests
import os

# Webex credentials
access_token = os.environ.get('WEBEX_TOKEN')
base_url = "https://webexapis.com/v1"
headers = {"Authorization": f"Bearer {access_token}"}

# Step 1: Create a new space
space_data = {"title": "DevNet Automation Team"}
response = requests.post(f"{base_url}/rooms", headers=headers, json=space_data)
space = response.json()
space_id = space['id']
print(f"Created space: {space['title']}")

# Step 2: Send a message to the space
message_data = {
    "roomId": space_id,
    "text": "Welcome to our automation workspace!"
}
response = requests.post(f"{base_url}/messages", headers=headers, json=message_data)
print("Message sent successfully")
```

---

### Sample Exam Questions

1. Which API would you use to provision and manage users in Cisco Unified Communications Manager (CUCM)?
   - A) UDS
   - B) AXL
   - C) Webex API
   - D) RESTCONF
   <details>
   <summary>Show Answer</summary>
   **B) AXL (Administrative XML Layer)** - AXL is used for administrative tasks like provisioning users and devices in CUCM.
   </details>
   <br/>

2. In Cisco Webex, what is a "space"?
   - A) A physical conference room
   - B) A storage location for files
   - C) A chat room for group messaging and collaboration
   - D) A server location
   <details>
   <summary>Show Answer</summary>
   **C) A chat room for group messaging and collaboration** - Webex spaces (formerly called rooms) are virtual collaboration areas.
   </details>
   <br/>

3. Fill in the blank: UDS stands for User Data __________.
   <details>
   <summary>Show Answer</summary>
   **Services** - UDS provides user lookup and directory services in CUCM.
   </details>
   <br/>
---

## 3.5 Describe the Capabilities of Cisco Security Platforms and APIs (XDR, Firepower, Umbrella, Secure Endpoint, ISE, Malware Analytics)

### Overview
**ELI5:** Security platforms are like a team of specialized guards—one watches the doors (firewall), one checks IDs (ISE), one inspects packages (malware analytics), and they all share information to stop threats faster.

**Summary:**
Cisco security platforms provide **threat detection, prevention, and response** across networks, endpoints, cloud, and applications. APIs enable automation of security operations, threat intelligence sharing, and incident response.

**Key Security Platforms:**

| Platform | Primary Function | API Capabilities |
|----------|-----------------|------------------|
| **XDR** | Unified threat detection & response | Incidents, alerts, threat intelligence |
| **Firepower** | Next-gen firewall | Policies, access rules, intrusion events |
| **Umbrella** | DNS-layer security | Block lists, policies, DNS logs |
| **Secure Endpoint (AMP)** | Endpoint protection | Malware events, quarantine, indicators |
| **ISE** | Network access control | Users, devices, policies, sessions |
| **Threat Grid** | Malware analysis | File analysis, threat scores, IOCs |

**Platform Details:**

**XDR (Extended Detection and Response):**
- Correlates data across endpoints, network, cloud
- Automated threat hunting and response
- API: Incidents, detections, response actions

**Firepower Management Center:**
- Manages Firepower firewalls and IPS
- API: Access policies, NAT rules, objects, events
- REST API for configuration and monitoring

**Umbrella:**
- DNS-based security (blocks malicious domains before connection)
- API: Enforcement, reporting, admin, investigate
- Block lists, security categories, DNS logs

**Secure Endpoint (formerly AMP for Endpoints):**
- Endpoint detection and response (EDR)
- API: Events, computers, policies, file lists
- Indicators of Compromise (IOCs), isolation

**ISE (Identity Services Engine):**
- Network access control (NAC)
- API: ERS (External RESTful Services) for policy management
- Guest access, device profiling, posture assessment

**Threat Grid (Malware Analytics):**
- Automated malware analysis sandbox
- API: Submit samples, get analysis results
- Behavioral indicators, threat scores

### Example: Secure Endpoint - Get Recent Security Events

```python
import requests
import os
from requests.auth import HTTPBasicAuth

# Secure Endpoint (AMP) credentials
client_id = os.environ.get('AMP_CLIENT_ID')
api_key = os.environ.get('AMP_API_KEY')

# Get recent security events
url = "https://api.amp.cisco.com/v1/events"
params = {"limit": 10}

response = requests.get(
    url,
    auth=HTTPBasicAuth(client_id, api_key),
    params=params
)

events = response.json()['data']

print(f"Recent Security Events:\n")
for event in events:
    print(f"Event: {event['event_type']}")
    print(f"  Computer: {event['computer']['hostname']}")
    print(f"  Time: {event['date']}")
    if 'file' in event:
        print(f"  File: {event['file']['file_name']}")
    print()
```

---

### Sample Exam Questions

1. What does XDR stand for in Cisco security?
   - A) External Data Repository
   - B) Extended Detection and Response
   - C) eXtended Device Registry
   - D) eXpert Diagnosis and Repair
   <details>
   <summary>Show Answer</summary>
   **B) Extended Detection and Response** - XDR integrates security tools for comprehensive threat detection and response.
   </details>
   <br/>

2. Which Cisco security platform provides DNS-based protection to block malicious websites?
   - A) Firepower
   - B) ISE
   - C) Umbrella
   - D) Secure Endpoint
   <details>
   <summary>Show Answer</summary>
   **C) Umbrella** - Umbrella uses DNS to block access to dangerous websites before connections are made.
   </details>
   <br/>

3. Fill in the blank: Cisco ISE (Identity Services Engine) primarily provides __________ and access management for networks.
   <details>
   <summary>Show Answer</summary>
   **identity** - ISE controls who can access the network based on identity and policy.
   </details>
   <br/>
---

## 3.6 Describe the Device Level APIs and Dynamic Interfaces for IOS XE and NX-OS

### Overview
**ELI5:** Device-level APIs are like having a conversation with a router using a structured language instead of typing commands—the device understands exactly what you want and gives you data in an organized format (JSON) instead of messy text.

**Summary:**
Modern Cisco operating systems (**IOS XE** for routers/switches, **NX-OS** for Nexus data center switches) provide programmable interfaces for configuration and monitoring. These APIs use **YANG models** to define data structures, enabling consistent, model-driven automation.

**API Protocols:**

| Protocol | Transport | Port | Data Format | Use Case |
|----------|-----------|------|-------------|----------|
| **RESTCONF** | HTTPS | 443 | JSON/XML | Web-based automation |
| **NETCONF** | SSH | 830 | XML | Enterprise config management |
| **gNMI** | gRPC | 57400 | Protobuf | Streaming telemetry |

**RESTCONF:**
- RESTful API (standard HTTP methods: GET, POST, PUT, PATCH, DELETE)
- URL structure: `/restconf/data/<yang-model>:<path>`
- Headers: `Accept: application/yang-data+json`, `Content-Type: application/yang-data+json`
- Easy to use with standard tools (curl, Postman, Python requests)
- Best for: Quick automation, REST-familiar developers

**NETCONF:**
- XML-RPC over SSH (more mature, enterprise-grade)
- Operations: `<get>`, `<get-config>`, `<edit-config>`, `<commit>`
- Transactional: Rollback on error (candidate configuration)
- Python library: `ncclient`
- Best for: Complex configurations requiring validation

**YANG Models:**
- **Data modeling language** that describes device capabilities
- Types:
  - **Native:** Cisco-specific (Cisco-IOS-XE-native, Cisco-NX-OS-native)
  - **OpenConfig:** Vendor-neutral (openconfig-interfaces)
  - **IETF:** Standards-based (ietf-interfaces, ietf-ip)

**Key Concepts:**
- **Configuration data:** Settings you can change (writable)
- **Operational data:** Device state and statistics (read-only)
- **Model-driven:** Structured data vs. CLI screen scraping
- **Dynamic interfaces:** APIs discover device capabilities automatically

### Example: RESTCONF - Get Interface Configuration

```python
import requests
from requests.auth import HTTPBasicAuth
import json

# IOS XE device credentials
device = "sandbox-iosxe-latest-1.cisco.com"
username = "developer"
password = "C1sco12345"

# RESTCONF endpoint for interfaces
url = f"https://{device}/restconf/data/ietf-interfaces:interfaces"

headers = {
    "Accept": "application/yang-data+json",
    "Content-Type": "application/yang-data+json"
}

response = requests.get(
    url,
    auth=HTTPBasicAuth(username, password),
    headers=headers,
    verify=False
)

if response.status_code == 200:
    interfaces = response.json()['ietf-interfaces:interfaces']['interface']
    print(f"Found {len(interfaces)} interfaces:\n")
    
    for intf in interfaces[:5]:  # Show first 5
        print(f"Interface: {intf['name']}")
        print(f"  Type: {intf['type']}")
        print(f"  Enabled: {intf.get('enabled', 'N/A')}")
        print()
```

---

### Sample Exam Questions

1. What is RESTCONF primarily used for?
   - A) Email configuration
   - B) Automating network device configuration and monitoring using REST APIs
   - C) Web browsing
   - D) File transfers
   <details>
   <summary>Show Answer</summary>
   **B) Automating network device configuration and monitoring using REST APIs** - RESTCONF provides a RESTful interface to YANG data models.
   </details>
   <br/>

2. What is a YANG model in network programmability?
   - A) A hardware component
   - B) A data model describing device capabilities and configuration
   - C) A type of cable
   - D) A programming language
   <details>
   <summary>Show Answer</summary>
   **B) A data model describing device capabilities and configuration** - YANG models define the structure, data types, and constraints for network data.
   </details>
   <br/>

3. Fill in the blank: NETCONF uses __________ protocol for secure communication with network devices.
   <details>
   <summary>Show Answer</summary>
   **SSH** (Secure Shell) - NETCONF typically operates over SSH on port 830.
   </details>
   <br/>
---

## 3.7 Identify the Appropriate DevNet Resource for a Given Scenario (Sandbox, Code Exchange, Support, Forums, Learning Labs, API Documentation)

### Overview
**ELI5:** DevNet resources are like a practice gym with trainers and study materials—you get equipment to practice on (Sandboxes), workout plans (Learning Labs), a coach's playbook (Documentation), example routines (Code Exchange), and teammates who help when you're stuck (Forums).

**Summary:**
Cisco DevNet provides comprehensive resources for learning, testing, and building network automation solutions. Understanding which resource fits each scenario is essential for efficient development.

**DevNet Resource Guide:**

| Resource | Purpose | When to Use | Access |
|----------|---------|-------------|--------|
| **Sandboxes** | Free lab environments | Test APIs, practice automation, POC | Always-on or reservable |
| **Code Exchange** | Sample code repository | Find working examples, templates | GitHub-style browsing |
| **Learning Labs** | Interactive tutorials | Learn new platforms step-by-step | Guided, hands-on |
| **API Documentation** | Technical reference | Understand endpoints, parameters | API explorer, docs |
| **Forums** | Community support | Ask questions, troubleshoot | Q&A style |
| **DevNet Support** | Official assistance | Complex issues, bug reports | Ticket system |

**Detailed Resource Descriptions:**

**1. Sandboxes (developer.cisco.com/sandbox)**
- Free access to real Cisco platforms
- Types:
  - **Always-On:** Instant access, shared environment
  - **Reservation:** Dedicated environment, book time slots
- Platforms available: DNA Center, Meraki, ACI, Webex, IOS XE, etc.
- Use for: Testing code, learning APIs, demos, POCs

**2. Code Exchange (developer.cisco.com/codeexchange)**
- GitHub-style repository of community code
- Filters: Platform, language, use case
- Contains: Full applications, scripts, integrations
- Use for: Starting point for projects, reference implementations

**3. Learning Labs (developer.cisco.com/learning)**
- Interactive, step-by-step tutorials
- Tracks: Beginner to advanced
- Covers: APIs, SDKs, automation, DevOps
- Use for: Structured learning, certification prep

**4. API Documentation**
- Platform-specific API references
- Includes: Endpoints, methods, parameters, examples
- Interactive API consoles (try APIs in browser)
- Use for: Technical details, troubleshooting, reference

**5. Forums (community.cisco.com/devnet)**
- Community Q&A
- Search existing questions
- Get help from experts and peers
- Use for: Specific problems, best practices, tips

**6. DevNet Support**
- Official Cisco technical support
- For: Complex issues, bugs, feature requests
- Access: Through DevNet portal
- Use for: Production issues, verified bugs

**Scenario-Based Selection:**

| Scenario | Best Resource |
|----------|---------------|
| "I need to test Meraki API before buying" | Sandbox (Always-On Meraki) |
| "How do I authenticate to DNA Center?" | API Documentation |
| "I'm getting a 401 error with Webex API" | Forums (search) or Support |
| "I want to learn RESTCONF step-by-step" | Learning Labs |
| "I need example code for ACI automation" | Code Exchange |
| "Is this a known bug in the SDK?" | Forums + Support |

---

### Sample Exam Questions

1. Where can you practice with real Cisco APIs and platforms for free?
   - A) Cisco TAC
   - B) Cisco DevNet Sandboxes
   - C) Cisco.com
   - D) GitHub
   <details>
   <summary>Show Answer</summary>
   **B) Cisco DevNet Sandboxes** - DevNet Sandboxes provide free lab environments to test APIs and learn automation.
   </details>
   <br/>

2. What is the purpose of the Cisco DevNet Code Exchange?
   - A) To purchase Cisco equipment
   - B) To share and find sample code for Cisco platforms and APIs
   - C) To report bugs
   - D) To download firmware
   <details>
   <summary>Show Answer</summary>
   **B) To share and find sample code for Cisco platforms and APIs** - Code Exchange is a repository of community-contributed code examples.
   </details>
   <br/>

3. Fill in the blank: Cisco DevNet __________ Labs provide step-by-step tutorials for learning network automation.
   <details>
   <summary>Show Answer</summary>
   **Learning** - Learning Labs offer guided, hands-on tutorials for various DevNet topics.
   </details>
   <br/>
---

## 3.8 Apply Concepts of Model Driven Programmability (YANG, RESTCONF, and NETCONF) in a Cisco Environment

### Overview
**ELI5:** Model-driven programmability is like using a menu at a restaurant—the menu (YANG model) tells you exactly what you can order and how, so everyone knows what to expect. No need to guess or speak different languages.

**Summary:**
**Model-driven programmability** uses standardized data models (**YANG**) accessed through standard protocols (**RESTCONF/NETCONF**) to configure and monitor network devices. This approach replaces CLI screen scraping with structured, validated, and vendor-neutral automation.

**The Three Components:**

**1. YANG (Yet Another Next Generation)**
- Data modeling language (like a schema)
- Defines what data exists and how it's structured
- Specifies data types, constraints, and relationships
- Think of it as the "contract" between you and the device

**YANG Model Structure:**
```
module: ietf-interfaces
  +--rw interfaces
     +--rw interface* [name]
        +--rw name            string
        +--rw type            identityref
        +--rw enabled?        boolean
        +--ro oper-status?    enumeration
```

**YANG Model Types:**
- **Native:** Cisco-IOS-XE-native, Cisco-NX-OS-native (vendor-specific)
- **OpenConfig:** openconfig-interfaces (vendor-neutral)
- **IETF:** ietf-interfaces, ietf-ip (standards-based)

**2. RESTCONF**
- REST API that uses YANG models
- HTTP methods map to operations:
  - GET = retrieve data
  - POST = create resource
  - PUT = replace resource
  - PATCH = update resource
  - DELETE = remove resource
- URL structure: `https://device/restconf/data/<yang-module>:<path>`
- Data format: JSON or XML

**3. NETCONF**
- Network Configuration Protocol (RFC 6241)
- XML-based RPC protocol over SSH
- Operations: `<get>`, `<get-config>`, `<edit-config>`, `<delete-config>`
- Transactional: Changes can be rolled back on error
- Candidate configuration: Test before committing

**Key Benefits:**
- **Structured data:** JSON/XML instead of CLI text parsing
- **Validation:** Device rejects invalid data before applying
- **Vendor-neutral:** Same models across vendors (OpenConfig, IETF)
- **Programmatic:** Designed for automation, not humans
- **Discoverable:** Query device for supported models

**RESTCONF vs NETCONF:**

| Feature | RESTCONF | NETCONF |
|---------|----------|---------|
| Protocol | HTTP/HTTPS | SSH |
| Port | 443 | 830 |
| Data Format | JSON/XML | XML only |
| Operations | REST methods | XML RPCs |
| Learning Curve | Easier | Steeper |
| Transactions | No | Yes (rollback) |
| Best For | Quick automation | Enterprise config |

### Example: NETCONF - Get and Update Interface

```python
from ncclient import manager
import xmltodict

# Connect to IOS XE device
device = {
    "host": "sandbox-iosxe-latest-1.cisco.com",
    "port": 830,
    "username": "developer",
    "password": "C1sco12345",
    "hostkey_verify": False
}

with manager.connect(**device) as m:
    # Get interface configuration
    filter = """
    <filter>
      <interfaces xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces">
        <interface>
          <name>GigabitEthernet1</name>
        </interface>
      </interfaces>
    </filter>
    """
    
    result = m.get_config(source="running", filter=filter)
    data = xmltodict.parse(result.xml)
    print("Current config:", data)
    
    # Update interface description
    config = """
    <config>
      <interfaces xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces">
        <interface>
          <name>GigabitEthernet1</name>
          <description>Configured via NETCONF</description>
        </interface>
      </interfaces>
    </config>
    """
    
    m.edit_config(target="running", config=config)
    print("Interface description updated")
```

---

### Sample Exam Questions

1. What is the main benefit of model-driven programmability in network automation?
   - A) It makes networks faster
   - B) It provides consistent, automated management using standard data models
   - C) It eliminates the need for authentication
   - D) It reduces hardware costs
   <details>
   <summary>Show Answer</summary>
   **B) It provides consistent, automated management using standard data models** - Model-driven approaches ensure predictable, vendor-neutral automation.
   </details>
   <br/>

2. Which protocols use YANG models for network device configuration? (Choose two)
   - A) SNMP
   - B) NETCONF
   - C) RESTCONF
   - D) Telnet
   <details>
   <summary>Show Answer</summary>
   **B) NETCONF and C) RESTCONF** - Both protocols use YANG data models to structure device configuration and operational data.
   </details>
   <br/>

3. Fill in the blank: In network automation, a YANG __________ defines the structure, data types, and rules for device configuration.
   <details>
   <summary>Show Answer</summary>
   **model** (or schema) - YANG models provide the blueprint for network device data.
   </details>
   <br/>
---

## 3.9 Construct Code to Perform a Specific Operation Based on a Set of Requirements and Given API Reference Documentation

### Overview
**ELI5:** Writing code from API docs is like following IKEA instructions—the manual (docs) shows you what pieces you have (endpoints), what tools you need (authentication), and how to assemble everything (request structure) to build what you want.

**Summary:**
Constructing API code requires a **systematic workflow**: analyze requirements, read documentation, plan the code structure, implement with error handling, and test thoroughly. This process applies to any Cisco platform API.

**5-Step Development Process:**

**Step 1: Analyze Requirements**
- What is the task? (retrieve data, create resource, update config)
- Which platform/API? (Meraki, DNA Center, Webex, IOS XE)
- Required inputs? (IDs, names, parameters)
- Expected output? (JSON data, success/failure, specific fields)

**Step 2: Read API Documentation**
- Locate the correct endpoint: `/api/v1/organizations/{orgId}/devices`
- HTTP method: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Authentication: API key, token, Basic Auth
- Required headers: `Authorization`, `Content-Type`, `Accept`
- Parameters: Path (in URL), query (after `?`), body (JSON payload)
- Response format: Status codes, JSON structure
- Constraints: Rate limits, pagination, required fields

**Step 3: Plan Code Structure**
```python
# 1. Import libraries
import requests, os

# 2. Set up authentication
api_key = os.environ.get('API_KEY')

# 3. Define URL and headers
url = f"https://api.example.com/endpoint"
headers = {"Authorization": f"Bearer {api_key}"}

# 4. Make request with error handling
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    data = response.json()
except Exception as e:
    print(f"Error: {e}")
```

**Step 4: Implement**
- Use functions for reusability
- Add error handling (`try/except`, status code checks)
- Validate inputs before API call
- Use environment variables for credentials
- Parse and return structured data

**Step 5: Test**
- Valid inputs → Success path
- Invalid auth → 401 error handling
- Missing resources → 404 handling
- Rate limits → 429 retry logic
- Use DevNet Sandboxes for safe testing

**Common Patterns by Operation:**

| Task | Method | Key Points |
|------|--------|------------|
| Get list | GET | Pagination, filtering |
| Get specific item | GET | ID in path, 404 handling |
| Create resource | POST | Body payload, 201 response |
| Update resource | PUT/PATCH | ID in path, full vs partial |
| Delete resource | DELETE | ID in path, 204 response |

### Example: Multi-Step Workflow - DNA Center Device Report

**Requirement:** "Get authentication token from DNA Center, retrieve all network devices, and generate a summary report of device types."

```python
import requests
from requests.auth import HTTPBasicAuth
from collections import Counter
import os

def get_dnac_token(base_url, username, password):
    """Get authentication token from DNA Center."""
    auth_url = f"{base_url}/dna/system/api/v1/auth/token"
    
    response = requests.post(
        auth_url,
        auth=HTTPBasicAuth(username, password),
        verify=False
    )
    response.raise_for_status()
    return response.json()['Token']

def get_network_devices(base_url, token):
    """Retrieve all network devices."""
    devices_url = f"{base_url}/dna/intent/api/v1/network-device"
    headers = {
        "X-Auth-Token": token,
        "Content-Type": "application/json"
    }
    
    response = requests.get(devices_url, headers=headers, verify=False)
    response.raise_for_status()
    return response.json()['response']

def generate_device_report(devices):
    """Generate summary report of device types."""
    device_types = [d['type'] for d in devices if 'type' in d]
    type_counts = Counter(device_types)
    
    print(f"\nDevice Summary Report")
    print(f"Total Devices: {len(devices)}\n")
    print("Device Types:")
    for device_type, count in type_counts.most_common():
        print(f"  {device_type}: {count}")

def main():
    # Configuration
    base_url = "https://sandboxdnac.cisco.com"
    username = os.environ.get('DNAC_USER', 'devnetuser')
    password = os.environ.get('DNAC_PASS', 'Cisco123!')
    
    try:
        # Step 1: Get token
        print("Authenticating...")
        token = get_dnac_token(base_url, username, password)
        
        # Step 2: Get devices
        print("Retrieving devices...")
        devices = get_network_devices(base_url, token)
        
        # Step 3: Generate report
        generate_device_report(devices)
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

---

### Sample Exam Questions

1. What is the first step when constructing code to interact with a Cisco API?
   - A) Write the code immediately
   - B) Read the API reference documentation to understand endpoints, authentication, and parameters
   - C) Test random API calls
   - D) Install all available Python packages
   <details>
   <summary>Show Answer</summary>
   **B) Read the API reference documentation to understand endpoints, authentication, and parameters** - Always start by understanding the API's requirements and structure.
   </details>
   <br/>

2. Where should you store API credentials in production code for security best practices?
   - A) Hardcoded in the source code
   - B) In comments at the top of the file
   - C) In environment variables or a secrets manager
   - D) In the README file
   <details>
   <summary>Show Answer</summary>
   **C) In environment variables or a secrets manager** - Never hardcode credentials in source code; use secure storage methods.
   </details>
   <br/>

3. Which HTTP method should you use to create a new resource in a REST API?
   - A) GET
   - B) PUT
   - C) POST
   - D) DELETE
   <details>
   <summary>Show Answer</summary>
   **C) POST** - POST is used to create new resources; PUT is for updating/replacing existing resources.
   </details>
   <br/>

4. Fill in the blank: An API operation is called "________" if it produces the same result when executed multiple times.
   <details>
   <summary>Show Answer</summary>
   **idempotent** - GET, PUT, and DELETE are idempotent; POST is not (creates new resources each time).
   </details>
   <br/>
---

**End of Section 3: Cisco Platforms and APIs**
