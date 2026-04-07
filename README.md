# Cisco DevNet Associate (DEVASC 200-901) Study Guide

This comprehensive study guide covers all exam topics for the Cisco DevNet Associate certification. Each section is organized as a standalone markdown file with detailed explanations, examples, and practice resources.

## 📚 Table of Contents

### [Section 1: Software Development and Design](Section-1-Software-Development.md)
Learn essential software development concepts including:
- Data formats (XML, JSON, YAML) and parsing
- Test-driven development and Red-Green-Refactor cycle
- Software development methodologies (Agile, Lean, Waterfall)
- Code organization (functions, classes, modules)
- Design patterns (MVC, Observer)
- Version control and Git operations

### [Section 2: Understanding and Using APIs](Section-2-APIs.md)
Master API fundamentals and REST API usage:
- REST API requests and HTTP methods
- Webhooks and event-driven patterns
- API constraints (rate limits, pagination)
- HTTP status codes and troubleshooting
- Authentication methods (Basic Auth, API Keys, Bearer Tokens)
- Python requests library for API interaction

### [Section 3: Cisco Platforms and APIs](Section-3-Cisco-Platforms-and-APIs.md)
Explore Cisco platforms and their automation capabilities:
- Cisco SDKs and API documentation
- Network management (Meraki, DNA Center, ACI, SD-WAN, NSO)
- Compute management (UCS Manager, Intersight)
- Collaboration platforms (Webex, CUCM)
- Security platforms (XDR, Firepower, Umbrella, ISE)
- Device-level APIs (IOS XE, NX-OS)
- Model-driven programmability (YANG, RESTCONF, NETCONF)

### [Section 4: Application Deployment and Security](Section-4-Application-Deployment.md)
Understand modern application deployment and security:
- Edge computing benefits
- Deployment models (private/public/hybrid cloud, edge)
- Deployment types (VMs, bare metal, containers)
- CI/CD pipeline components
- Python unit testing
- Docker and containerization
- Application security best practices
- OWASP top threats
- Infrastructure components (firewall, DNS, load balancer)
- Bash commands and DevOps principles

### [Section 5: Infrastructure and Automation](Section-5-Infrastructure-Automation.md)
Learn infrastructure automation tools and concepts:
- Model-driven programmability benefits
- Controller-level vs device-level management
- Network simulation tools (Cisco Modeling Labs, pyATS)
- CI/CD for infrastructure automation
- Infrastructure as Code (IaC) principles
- Ansible for configuration management
- Terraform for infrastructure provisioning
- Cisco NSO capabilities
- RESTCONF, NETCONF, and YANG models
- Code review and sequence diagrams

### [Section 6: Network Fundamentals](Section-6-Network-Fundamentals.md)
Build a strong foundation in networking concepts:
- MAC addresses and VLANs (Layer 2)
- IP addresses, routing, and subnets (Layer 3)
- Network components (switches, routers, firewalls, load balancers)
- Network topology diagrams
- Management, data, and control planes
- IP services (DHCP, DNS, NAT, SNMP, NTP)
- Common protocol ports
- Application connectivity troubleshooting
- Network constraints (bandwidth, latency, jitter)

## 🎯 Exam Information

**Exam Code:** DEVASC 200-901  
**Duration:** 120 minutes  
**Question Format:** Multiple choice, drag-and-drop, fill-in-the-blank, and simulations  
**Passing Score:** Variable (Cisco does not publish exact passing scores)

## 📖 How to Use This Study Guide

1. **Review each section sequentially** - The sections build upon each other
2. **Practice hands-on** - Use Cisco DevNet Sandboxes and Learning Labs
3. **Code along** - Type out and run the example scripts
4. **Test yourself** - Complete the practice exercises in each section
5. **Revisit difficult topics** - Use the summaries for quick review

## Quiz App

This repository also includes a local Quizlet-style study app built from the topics covered in these study notes.

**Location:** `quiz-app/`

**Features:**
- Section-based quizzes or all-sections shuffle mode
- Multiple choice and fill-in-the-blank questions
- Instant answer feedback with explanations
- Score tracking and progress bar
- Retry mode for missed questions only

### Launch the Quiz App

From the repository root in PowerShell, run:

```powershell
.\launch-quiz-app.ps1
```

This opens `quiz-app/index.html` in your default browser.

### How to Use the App

1. Choose a single section or start a shuffled quiz across all sections.
2. Use the checkboxes to include multiple choice questions, fill-in-the-blank questions, or both.
3. Answer each question and review the explanation shown after submission.
4. At the end of the quiz, review missed questions and use **Retry Missed Only** for targeted study.

## 🔗 Additional Resources

- [Cisco DevNet](https://developer.cisco.com/) - Official developer portal
- [DevNet Sandboxes](https://devnetsandbox.cisco.com/) - Free lab environments
- [DevNet Learning Labs](https://developer.cisco.com/learning/) - Guided tutorials
- [DevNet Code Exchange](https://developer.cisco.com/codeexchange/) - Sample code repository
- [Official Exam Topics](https://learningnetwork.cisco.com/s/devasc-exam-topics) - Detailed exam blueprint

## 📝 Study Tips

- **Hands-on practice is essential** - Reading alone won't prepare you for simulations
- **Focus on Python** - It's heavily featured throughout the exam
- **Understand concepts, not just memorization** - The exam tests application of knowledge
- **Use DevNet Sandboxes** - Get comfortable with real Cisco APIs
- **Practice Git commands** - Version control questions are common
- **Learn to read API documentation** - You'll need to interpret docs on the exam

## 🤝 Contributing

Found an error or have a suggestion? Feel free to contribute improvements to this study guide.

## 📄 License

This study guide is provided for educational purposes to help candidates prepare for the Cisco DevNet Associate certification exam.
