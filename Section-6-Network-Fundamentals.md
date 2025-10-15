# Section 6: Network Fundamentals

## Summary
Section 6 covers essential networking concepts that developers need to understand for building network-aware applications and troubleshooting connectivity issues:

1. MAC addresses and VLANs (Layer 2 addressing and network segmentation)
2. IP addresses, routes, subnet masks, and gateways (Layer 3 addressing and routing)
3. Common networking components and their functions (switches, routers, firewalls, load balancers)
4. Interpreting network topology diagrams
5. Management, data, and control plane functions
6. IP services (DHCP, DNS, NAT, SNMP, NTP)
7. Common protocol ports (SSH, HTTP, HTTPS, NETCONF, etc.)
8. Troubleshooting application connectivity issues
9. Understanding how network constraints affect applications (bandwidth, latency, jitter)

**Practice Resources:**
- Cisco Packet Tracer - network simulation and visualization
- Python `ipaddress` module documentation
- Wireshark - packet analysis and protocol inspection
- Online subnet calculators and CIDR tools
- Cisco DevNet Sandboxes for network device access
- Network troubleshooting practice labs

---

## 6.1 Describe the Purpose and Usage of MAC Addresses and VLANs

### Overview
**ELI5:** MAC addresses are like the serial numbers on network cards—permanent and unique to each device. VLANs are like creating separate networks within one physical network, like having different Wi-Fi networks for guests and employees on the same router.

**Summary:**
**MAC (Media Access Control) addresses** are Layer 2 hardware identifiers assigned to network interfaces. **VLANs (Virtual Local Area Networks)** logically segment networks to improve security, performance, and management.

### MAC Addresses

**Format:** 48-bit address, written as 6 pairs of hexadecimal digits
- Example: `00:1A:2B:3C:4D:5E` or `00-1A-2B-3C-4D-5E`
- First 3 bytes (24 bits): OUI (Organizationally Unique Identifier) - vendor ID
- Last 3 bytes (24 bits): Device-specific identifier

**Purpose:**
- **Layer 2 addressing:** Identifies devices on local network segment
- **Frame delivery:** Switches use MAC addresses to forward frames to correct port
- **ARP (Address Resolution Protocol):** Maps IP addresses to MAC addresses

**Characteristics:**
- Burned into hardware (ROM) but can be spoofed via software
- Used within local network (doesn't cross routers)
- Unique globally (theoretically, though duplicates exist)

**Example MAC Address Lookup:**
```python
import subprocess

# Get MAC address from IP using ARP
def get_mac_from_ip(ip_address):
    # Ping device first to populate ARP cache
    subprocess.run(['ping', '-n', '1', ip_address], 
                   capture_output=True, timeout=2)
    
    # Query ARP cache
    result = subprocess.run(['arp', '-a', ip_address], 
                          capture_output=True, text=True)
    
    # Parse output for MAC address
    for line in result.stdout.split('\n'):
        if ip_address in line:
            parts = line.split()
            if len(parts) >= 2:
                return parts[1]  # MAC address
    return None

mac = get_mac_from_ip('10.1.1.100')
print(f"MAC Address: {mac}")
```

### VLANs (Virtual Local Area Networks)

**Purpose:**
- **Network Segmentation:** Separate broadcast domains logically
- **Security:** Isolate sensitive traffic (e.g., finance vs guest)
- **Performance:** Reduce broadcast traffic
- **Flexibility:** Group users by function, not physical location

**VLAN Types:**
- **Data VLAN:** User traffic (typical workstations)
- **Voice VLAN:** IP phone traffic (QoS priority)
- **Management VLAN:** Device management traffic
- **Native VLAN:** Untagged traffic on trunk ports (default VLAN 1)

**VLAN Tagging (802.1Q):**
- Inserts 4-byte tag into Ethernet frame
- Tag contains VLAN ID (1-4094, typically 1-1000 used)
- Trunk ports carry multiple VLANs with tags
- Access ports belong to single VLAN (untagged)

### VLAN Configuration Example

```python
# Configure VLANs via NETCONF/RESTCONF
import requests
import os

# Create VLAN via RESTCONF
url = "https://switch.example.com/restconf/data/Cisco-IOS-XE-native:native/vlan"
headers = {
    "Content-Type": "application/yang-data+json",
    "Accept": "application/yang-data+json"
}

vlan_config = {
    "Cisco-IOS-XE-vlan:vlan-list": [
        {
            "id": 10,
            "name": "Engineering"
        },
        {
            "id": 20,
            "name": "Sales"
        }
    ]
}

response = requests.post(url, json=vlan_config, headers=headers,
                        auth=('admin', os.getenv('SWITCH_PASS')),
                        verify=False)

if response.status_code == 201:
    print("VLANs created successfully")
else:
    print(f"Error: {response.status_code}")
```

### MAC Address Table

Switches maintain MAC address tables mapping MAC addresses to ports:

| MAC Address | VLAN | Port | Type |
|------------|------|------|------|
| 00:1A:2B:3C:4D:5E | 10 | Gi0/1 | Dynamic |
| 00:AA:BB:CC:DD:EE | 20 | Gi0/5 | Dynamic |
| 00:11:22:33:44:55 | 10 | Gi0/2 | Static |

---

### Sample Exam Questions

1. What is the primary purpose of a MAC address?
   - A) To route packets across the internet
   - B) To identify network devices at Layer 2 on a local network
   - C) To encrypt data
   - D) To assign IP addresses
   <details>
   <summary>Show Answer</summary>
   **B) To identify network devices at Layer 2 on a local network** - MAC addresses enable switches to forward frames to the correct destination port.
   </details>
   <br/>

2. What is the main benefit of using VLANs?
   - A) Increase network speed
   - B) Logically segment networks for security and management
   - C) Replace physical switches
   - D) Eliminate the need for IP addresses
   <details>
   <summary>Show Answer</summary>
   **B) Logically segment networks for security and management** - VLANs separate broadcast domains and isolate traffic without physical separation.
   </details>
   <br/>

3. How many bytes are in a MAC address?
   - A) 4 bytes
   - B) 6 bytes
   - C) 8 bytes
   - D) 16 bytes
   <details>
   <summary>Show Answer</summary>
   **B) 6 bytes** - MAC addresses are 48 bits (6 bytes), written as 12 hexadecimal digits.
   </details>
   <br/>

4. Fill in the blank: The __________ protocol is used to map IP addresses to MAC addresses on a local network.
   <details>
   <summary>Show Answer</summary>
   **ARP** (Address Resolution Protocol) - ARP resolves Layer 3 (IP) addresses to Layer 2 (MAC) addresses.
   </details>
   <br/>

---

## 6.2 Describe the Purpose and Usage of IP Addresses, Routes, Subnet Masks, and Gateways

### Overview
**ELI5:** IP addresses are like street addresses for computers—they tell where to send data. Routes are the directions, subnet masks define neighborhoods, and gateways are the bridges connecting different neighborhoods.

**Summary:**
**IP addressing** enables devices to communicate across networks. **Routes** determine paths to destinations, **subnet masks** define network boundaries, and **gateways** connect different networks.

### IP Addresses

**IPv4:**
- 32-bit address (4 bytes)
- Dotted decimal notation: `192.168.1.100`
- ~4.3 billion addresses
- Address exhaustion led to IPv6

**IPv6:**
- 128-bit address (16 bytes)
- Hexadecimal notation: `2001:0db8:85a3::8a2e:0370:7334`
- 340 undecillion addresses
- Abbreviated: consecutive zeros replaced with `::`

**IP Address Types:**
- **Public:** Routable on internet (assigned by ISPs)
- **Private:** Not routable on internet (RFC 1918)
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`

### Subnet Masks

**Purpose:** Define which portion of IP address is network vs host

**CIDR Notation:** `/24` means first 24 bits are network portion

**Example:**
- IP: `192.168.1.100`
- Subnet: `255.255.255.0` or `/24`
- Network: `192.168.1.0/24`
- Hosts: `192.168.1.1` - `192.168.1.254` (254 usable)
- Broadcast: `192.168.1.255`

**Common Subnet Masks:**

| CIDR | Subnet Mask | Hosts | Use Case |
|------|------------|-------|----------|
| /24 | 255.255.255.0 | 254 | Small office |
| /25 | 255.255.255.128 | 126 | Departmental |
| /26 | 255.255.255.192 | 62 | Small team |
| /30 | 255.255.255.252 | 2 | Point-to-point links |

### Default Gateway

**Purpose:** Router interface that forwards traffic to other networks

**Function:**
- Device sends packets destined for other networks to gateway
- Gateway routes packets toward destination
- Without gateway, device can only communicate on local network

**Example:** Device `192.168.1.100/24` with gateway `192.168.1.1`
- Destination `192.168.1.50`: Direct (same network)
- Destination `8.8.8.8`: Via gateway (different network)

### Routes

**Purpose:** Define paths to network destinations

**Route Table Example:**
```
Destination      Gateway         Interface    Metric
0.0.0.0/0       192.168.1.1     eth0         100      # Default route
192.168.1.0/24  0.0.0.0         eth0         0        # Directly connected
10.0.0.0/8      192.168.1.254   eth0         50       # Static route
```

**Route Types:**
- **Default Route:** `0.0.0.0/0` - matches all destinations (lowest priority)
- **Directly Connected:** Networks on local interfaces
- **Static Route:** Manually configured
- **Dynamic Route:** Learned via routing protocols (OSPF, BGP)

### Python IP Address Manipulation

```python
import ipaddress

# Parse IP address and network
ip = ipaddress.ip_address('192.168.1.100')
network = ipaddress.ip_network('192.168.1.0/24')

# Check if IP is in network
print(f"{ip} in {network}? {ip in network}")  # True

# Subnet calculations
print(f"Network address: {network.network_address}")
print(f"Broadcast address: {network.broadcast_address}")
print(f"Netmask: {network.netmask}")
print(f"Total hosts: {network.num_addresses}")
print(f"Usable hosts: {network.num_addresses - 2}")

# Iterate through hosts
for host in list(network.hosts())[:5]:  # First 5
    print(f"  Host: {host}")

# Check if address is private
print(f"Is private? {ip.is_private}")
```

---

### Sample Exam Questions

1. What is the primary purpose of a subnet mask?
   - A) Encrypt network traffic
   - B) Define which part of an IP address is the network and which is the host
   - C) Assign IP addresses automatically
   - D) Route packets between networks
   <details>
   <summary>Show Answer</summary>
   **B) Define which part of an IP address is the network and which is the host** - Subnet masks divide IP addresses into network and host portions.
   </details>
   <br/>

2. How many usable host addresses are in a /24 network?
   - A) 254
   - B) 256
   - C) 255
   - D) 253
   <details>
   <summary>Show Answer</summary>
   **A) 254** - A /24 network has 256 total addresses, minus network address and broadcast address = 254 usable.
   </details>
   <br/>

3. What is the function of a default gateway?
   - A) Assign IP addresses to devices
   - B) Forward traffic to networks outside the local subnet
   - C) Block unauthorized traffic
   - D) Cache DNS queries
   <details>
   <summary>Show Answer</summary>
   **B) Forward traffic to networks outside the local subnet** - The default gateway routes packets destined for other networks.
   </details>
   <br/>

4. Fill in the blank: The IP address range __________ is reserved for private networks and not routable on the public internet.
   <details>
   <summary>Show Answer</summary>
   **192.168.0.0/16** (or 10.0.0.0/8 or 172.16.0.0/12) - RFC 1918 defines private address ranges.
   </details>
   <br/>

---

## 6.3 Describe the Function of Common Networking Components

### Overview
**ELI5:** Network components are like parts of a mail system—switches are sorting centers that deliver letters locally, routers are postal services connecting cities, firewalls are security guards checking packages, and load balancers are receptionists distributing work evenly.

**Summary:**
Modern networks use specialized components to handle different functions: **switches** for local connectivity, **routers** for inter-network communication, **firewalls** for security, and **load balancers** for traffic distribution.

### Switches (Layer 2/3)

**Purpose:** Connect devices within a local network

**Function:**
- Forward frames based on MAC addresses (Layer 2)
- Learn MAC addresses and build forwarding tables
- Separate collision domains (each port = collision domain)
- Layer 3 switches can route between VLANs

**Key Features:**
- Port density (24, 48, 96 ports)
- Speed (1Gbps, 10Gbps, 100Gbps)
- PoE (Power over Ethernet) for IP phones, cameras, APs
- VLAN support

**Example:** Access switches connect workstations, distribution switches aggregate access switches, core switches provide high-speed backbone.

### Routers (Layer 3)

**Purpose:** Connect different networks and route packets

**Function:**
- Forward packets based on IP addresses
- Maintain routing tables (static/dynamic routes)
- Connect LANs to WANs (internet)
- Perform NAT (Network Address Translation)
- Enforce ACLs (Access Control Lists)

**Routing Decision Process:**
1. Receive packet
2. Check destination IP
3. Lookup route in routing table (longest prefix match)
4. Forward to next-hop gateway
5. Decrement TTL (Time To Live)

**Example:** Branch office router connects local network to corporate WAN via MPLS or VPN.

### Firewalls (Layer 3-7)

**Purpose:** Control and secure network traffic

**Function:**
- Inspect packets and enforce security policies
- Block unauthorized access (inbound/outbound)
- Stateful inspection (track connections)
- Application-layer filtering (Layer 7)
- VPN termination

**Firewall Types:**
- **Packet Filtering:** Layer 3/4 (IP, port)
- **Stateful:** Tracks connection state (TCP handshakes)
- **Application (Layer 7):** Deep packet inspection (HTTP, DNS content)
- **Next-Gen (NGFW):** IPS, malware detection, app control

**Rule Example:**
```
ALLOW TCP from 10.0.0.0/8 to 192.168.1.100 port 443  # Internal to web server
DENY TCP from 0.0.0.0/0 to 192.168.1.0/24 port 22   # Block external SSH
ALLOW UDP from 8.8.8.8 to 0.0.0.0/0 port 53         # Allow DNS responses
```

### Load Balancers (Layer 4/7)

**Purpose:** Distribute traffic across multiple servers

**Function:**
- Improve availability (failover if server down)
- Improve performance (distribute requests)
- Health checks (monitor server status)
- SSL/TLS termination (offload encryption)
- Session persistence (sticky sessions)

**Load Balancing Algorithms:**
- **Round Robin:** Sequential distribution
- **Least Connections:** Send to server with fewest connections
- **IP Hash:** Use client IP to determine server (session persistence)
- **Weighted:** Distribute based on server capacity

**Example Architecture:**
```
Internet → Firewall → Load Balancer → [Web Server 1]
                                    → [Web Server 2]
                                    → [Web Server 3]
```

### Component Comparison

| Component | OSI Layer | Primary Function | Key Feature |
|-----------|-----------|-----------------|-------------|
| Switch | Layer 2/3 | Local connectivity | MAC learning, VLANs |
| Router | Layer 3 | Inter-network routing | Routing tables, NAT |
| Firewall | Layer 3-7 | Security enforcement | Stateful inspection |
| Load Balancer | Layer 4/7 | Traffic distribution | Health checks, failover |

---

### Sample Exam Questions

1. What is the primary function of a network switch?
   - A) Route packets between different networks
   - B) Forward frames within a local network based on MAC addresses
   - C) Block malicious traffic
   - D) Distribute traffic across servers
   <details>
   <summary>Show Answer</summary>
   **B) Forward frames within a local network based on MAC addresses** - Switches operate at Layer 2, using MAC addresses for local forwarding.
   </details>
   <br/>

2. Which device is responsible for connecting different networks and routing packets based on IP addresses?
   - A) Switch
   - B) Hub
   - C) Router
   - D) Repeater
   <details>
   <summary>Show Answer</summary>
   **C) Router** - Routers operate at Layer 3 and forward packets between networks using IP routing.
   </details>
   <br/>

3. What is the primary purpose of a load balancer?
   - A) Encrypt network traffic
   - B) Distribute incoming traffic across multiple servers
   - C) Assign IP addresses
   - D) Filter spam
   <details>
   <summary>Show Answer</summary>
   **B) Distribute incoming traffic across multiple servers** - Load balancers improve availability and performance by distributing requests.
   </details>
   <br/>

4. Fill in the blank: A __________ firewall tracks the state of network connections and makes filtering decisions based on connection context.
   <details>
   <summary>Show Answer</summary>
   **stateful** - Stateful firewalls maintain connection tables and understand protocols like TCP handshakes.
   </details>
   <br/>

---

## 6.4 Interpret a Network Topology Diagram

### Overview
**ELI5:** Network topology diagrams are like maps showing how computers and network devices connect—circles represent devices, lines are cables, and symbols tell you what type of device it is.

**Summary:**
**Network topology diagrams** visually represent network architecture, showing devices, connections, and hierarchical relationships. Understanding these diagrams is essential for planning, troubleshooting, and documentation.

### Common Topology Symbols

| Symbol | Device | Description |
|--------|--------|-------------|
| 🔲 | Router | Connects different networks |
| ⬡ | Switch | Connects devices in LAN |
| ■ | Firewall | Security enforcement |
| 🖥️ | Server | Provides services |
| 💻 | Workstation | End-user device |
| ☁️ | Cloud/Internet | External connectivity |
| ⚡ | Load Balancer | Traffic distribution |

### Example Topology: Three-Tier Architecture

```
                        Internet
                           |
                      [Firewall]
                           |
                   [Core Switch]
                      /       \
              [Dist SW 1]   [Dist SW 2]
               /      \      /      \
          [Access]  [Access]  [Access]  [Access]
           SW 1      SW 2      SW 3      SW 4
            |         |         |         |
          [Hosts]   [Hosts]   [Hosts]   [Hosts]
```

**Interpretation:**
- **Core Layer:** High-speed backbone (Core Switch)
- **Distribution Layer:** Aggregates access switches, policy enforcement (Dist SW 1/2)
- **Access Layer:** End-device connectivity (Access SW 1-4)
- **Security:** Firewall at network edge
- **Redundancy:** Dual distribution switches for failover

### Example Topology: Data Center

```
                   [Internet]
                       |
              [Edge Router/Firewall]
                       |
              [Core Switch Stack]
                   /      \
          [ToR Switch 1] [ToR Switch 2]
              |    |          |    |
          [Server] [Server] [Server] [Server]
          [Rack 1]          [Rack 2]
```

**Interpretation:**
- **Edge:** Router/firewall for internet connectivity
- **Core:** Redundant core switches for high availability
- **ToR (Top-of-Rack):** Switches in each server rack
- **Servers:** Physical or virtual machines
- **Design:** Leaf-spine architecture for east-west traffic

### Reading Topology Diagrams

**Key Information to Extract:**
1. **Device Types:** Identify routers, switches, firewalls, servers
2. **Connections:** Physical/logical links between devices
3. **Redundancy:** Backup paths, failover connections
4. **Security Zones:** DMZ, internal, external networks
5. **Traffic Flow:** Direction of data movement
6. **IP Addressing:** Subnets assigned to segments

**Common Patterns:**
- **Star:** All devices connect to central switch/hub
- **Mesh:** Multiple paths between devices (redundancy)
- **Hierarchical:** Core/distribution/access layers
- **Ring:** Devices connected in loop (rare in modern networks)

### Diagram Interpretation Example

```
            [ISP Router]
                 |
            [Firewall]
            10.0.0.1/30
                 |
        [Internal Router]
        10.1.1.1/24
          /          \
   [VLAN 10]      [VLAN 20]
   10.1.10.0/24   10.1.20.0/24
   Engineering    Sales
      |              |
   [Hosts]        [Hosts]
```

**What This Shows:**
- External connection via ISP
- Firewall protects internal network
- Internal router segments traffic into VLANs
- VLAN 10 (Engineering): 10.1.10.0/24 subnet
- VLAN 20 (Sales): 10.1.20.0/24 subnet
- VLANs logically separate departments

---

### Sample Exam Questions

1. In a three-tier network architecture, which layer directly connects end-user devices?
   - A) Core layer
   - B) Distribution layer
   - C) Access layer
   - D) Application layer
   <details>
   <summary>Show Answer</summary>
   **C) Access layer** - The access layer provides connectivity to end devices like workstations and printers.
   </details>
   <br/>

2. What does a line connecting two devices in a topology diagram typically represent?
   - A) Wireless interference
   - B) A physical or logical network connection
   - C) Power supply
   - D) Administrative access
   <details>
   <summary>Show Answer</summary>
   **B) A physical or logical network connection** - Lines show network links (cables, fiber, or logical paths).
   </details>
   <br/>

3. What is the purpose of showing multiple paths between devices in a topology diagram?
   - A) Indicate errors in the design
   - B) Show redundancy and failover capabilities
   - C) Represent security boundaries
   - D) Display power connections
   <details>
   <summary>Show Answer</summary>
   **B) Show redundancy and failover capabilities** - Multiple paths provide backup routes if primary links fail.
   </details>
   <br/>

4. Fill in the blank: In a data center topology, __________ switches connect servers within each rack.
   <details>
   <summary>Show Answer</summary>
   **ToR** (Top-of-Rack) or **access** - ToR switches provide connectivity for servers in a rack.
   </details>
   <br/>

---

## 6.5 Describe the Function of Management, Data, and Control Planes

### Overview
**ELI5:** Network planes are like different departments in a company—the control plane is management deciding routes, the data plane is workers moving packages, and the management plane is HR configuring systems and monitoring performance.

**Summary:**
Network devices operate using three functional planes: **control plane** (routing decisions), **data plane** (packet forwarding), and **management plane** (device administration). Understanding these planes is essential for network programmability and troubleshooting.

### Control Plane

**Purpose:** Makes decisions about where traffic should go

**Functions:**
- Build and maintain routing tables
- Run routing protocols (OSPF, BGP, EIGRP)
- Process control packets (routing updates, keepalives)
- Calculate best paths to destinations
- Manage network topology information

**Examples:**
- OSPF calculating shortest path
- BGP exchanging routes with peers
- STP (Spanning Tree Protocol) preventing loops
- ARP resolving IP to MAC addresses

**Traffic:** Control packets (routing updates, hello messages)

**Performance:** CPU-intensive, doesn't need high throughput

### Data Plane (Forwarding Plane)

**Purpose:** Forwards user traffic based on control plane decisions

**Functions:**
- Forward packets based on routing/switching tables
- Apply ACLs (Access Control Lists)
- Perform QoS marking and queuing
- NAT translations
- Packet encapsulation/decapsulation

**Examples:**
- Switching frames based on MAC table
- Routing packets based on routing table
- Applying firewall rules
- Forwarding traffic through VPN tunnel

**Traffic:** User data (web, email, video, etc.)

**Performance:** High throughput, hardware-accelerated (ASICs)

**Key Characteristic:** Fast, simple operations using pre-built tables

### Management Plane

**Purpose:** Administer and monitor network devices

**Functions:**
- Device configuration (CLI, NETCONF, RESTCONF)
- Monitoring and logging (SNMP, Syslog)
- Authentication and authorization
- Firmware upgrades
- Backup and restore configurations

**Examples:**
- SSH/Telnet sessions to configure device
- SNMP polling for interface statistics
- Syslog messages sent to centralized server
- NETCONF/RESTCONF API calls

**Traffic:** Management traffic (SSH, SNMP, NETCONF)

**Performance:** Low throughput, human or automation interaction

### Plane Comparison

| Plane | Purpose | Examples | Performance Needs |
|-------|---------|----------|-------------------|
| **Control** | Make forwarding decisions | OSPF, BGP, STP | CPU-intensive, low bandwidth |
| **Data** | Forward user traffic | Packet switching/routing | High throughput, low latency |
| **Management** | Configure and monitor | SSH, SNMP, NETCONF | Low throughput, secure access |

### Example: Packet Flow Through Planes

**Scenario:** User sends HTTP request to web server

1. **Control Plane (already completed):**
   - Routing protocols built routing table
   - Table shows path to destination network

2. **Data Plane (active):**
   - Packet arrives at router interface
   - Router checks destination IP
   - Looks up route in forwarding table (built by control plane)
   - Forwards packet out correct interface
   - This happens at hardware speed (millions per second)

3. **Management Plane (background):**
   - SNMP collects interface statistics
   - Syslog records forwarding events
   - Administrator may monitor traffic via SSH

### Security Considerations

**Control Plane Protection:**
- Limit which devices can send routing updates
- Authenticate routing protocol messages
- Rate-limit control traffic (prevent DoS)

**Data Plane Protection:**
- Apply ACLs to filter malicious traffic
- Implement QoS to prevent congestion
- Use firewalls for stateful inspection

**Management Plane Protection:**
- Restrict management access (SSH only, specific IPs)
- Use strong authentication (certificates, 2FA)
- Encrypt management traffic (SSH, HTTPS, not Telnet/HTTP)

---

### Sample Exam Questions

1. Which plane is responsible for making routing decisions and building routing tables?
   - A) Data plane
   - B) Control plane
   - C) Management plane
   - D) User plane
   <details>
   <summary>Show Answer</summary>
   **B) Control plane** - The control plane runs routing protocols and calculates best paths.
   </details>
   <br/>

2. What is the primary function of the data plane?
   - A) Configure network devices
   - B) Forward user traffic based on existing tables
   - C) Monitor network performance
   - D) Authenticate users
   <details>
   <summary>Show Answer</summary>
   **B) Forward user traffic based on existing tables** - The data plane performs high-speed packet forwarding using pre-built tables.
   </details>
   <br/>

3. Which protocols are used by the management plane?
   - A) OSPF and BGP
   - B) HTTP and FTP
   - C) SSH, SNMP, and NETCONF
   - D) TCP and UDP
   <details>
   <summary>Show Answer</summary>
   **C) SSH, SNMP, and NETCONF** - Management plane protocols handle device administration and monitoring.
   </details>
   <br/>

4. Fill in the blank: The __________ plane forwards packets at high speed using hardware acceleration like ASICs.
   <details>
   <summary>Show Answer</summary>
   **data** (or forwarding) - The data plane operates at wire speed using specialized hardware.
   </details>
   <br/>

---

## 6.6 Describe IP Services: DHCP, DNS, NAT, SNMP, NTP

### Overview
**ELI5:** IP services are like utilities in a city—DHCP is the city clerk giving out addresses, DNS is the phone book translating names to numbers, NAT is the post office rewriting addresses, SNMP is the city inspector checking buildings, and NTP is the clock tower keeping everyone synchronized.

**Summary:**
**IP services** provide essential network functions: address assignment (DHCP), name resolution (DNS), address translation (NAT), network monitoring (SNMP), and time synchronization (NTP).

### DHCP (Dynamic Host Configuration Protocol)

**Purpose:** Automatically assign IP configuration to devices

**What DHCP Provides:**
- IP address
- Subnet mask
- Default gateway
- DNS server addresses
- Lease time (how long address is valid)

**DHCP Process (DORA):**
1. **Discover:** Client broadcasts "I need an IP address"
2. **Offer:** DHCP server offers available IP
3. **Request:** Client requests offered IP
4. **Acknowledge:** Server confirms assignment

**Benefits:**
- Eliminates manual IP configuration
- Centralized management
- Efficient IP address utilization
- Reduces configuration errors

**Port:** UDP 67 (server), UDP 68 (client)

### DNS (Domain Name System)

**Purpose:** Translate domain names to IP addresses

**Function:**
- Resolves `www.example.com` → `93.184.216.34`
- Hierarchical database system
- Caching for performance

**DNS Record Types:**
- **A:** Domain to IPv4 (`example.com → 192.0.2.1`)
- **AAAA:** Domain to IPv6
- **CNAME:** Alias (`www → webserver.example.com`)
- **MX:** Mail server
- **NS:** Name server
- **PTR:** Reverse lookup (IP to domain)

**DNS Query Example:**
```python
import socket

# Resolve domain to IP
hostname = "www.cisco.com"
ip_address = socket.gethostbyname(hostname)
print(f"{hostname} → {ip_address}")

# Reverse lookup (IP to hostname)
ip = "8.8.8.8"
try:
    hostname = socket.gethostbyaddr(ip)[0]
    print(f"{ip} → {hostname}")
except socket.herror:
    print("Reverse lookup failed")
```

**Port:** UDP/TCP 53

### NAT (Network Address Translation)

**Purpose:** Translate private IP addresses to public IP addresses

**Why NAT:**
- IPv4 address conservation
- Allows multiple devices to share one public IP
- Provides security (hides internal IPs)

**NAT Types:**
- **Static NAT:** 1:1 mapping (one private → one public)
- **Dynamic NAT:** Many:many mapping (pool of public IPs)
- **PAT (Port Address Translation):** Many:1 mapping using ports
  - Most common (home routers)
  - Example: `192.168.1.100:5000 → 203.0.113.1:50001`

**NAT Example:**
```
Internal device: 192.168.1.100 → External server: 93.184.216.34
NAT router translates:
Source: 192.168.1.100:50000 → 203.0.113.1:60000
Destination: 93.184.216.34:80 (unchanged)
```

### SNMP (Simple Network Management Protocol)

**Purpose:** Monitor and manage network devices

**Components:**
- **Manager:** Monitoring system (NMS - Network Management System)
- **Agent:** Software on managed device
- **MIB (Management Information Base):** Database of device information

**SNMP Operations:**
- **GET:** Retrieve value (e.g., interface status)
- **SET:** Modify value (e.g., disable port)
- **TRAP:** Unsolicited alert from device (e.g., link down)

**SNMP Versions:**
- **v1:** Original, insecure (community strings)
- **v2c:** Improved, still insecure
- **v3:** Secure (authentication, encryption) - recommended

**Example SNMP Query:**
```python
from pysnmp.hlapi import *

# Query device uptime via SNMP
result = getCmd(
    SnmpEngine(),
    CommunityData('public'),  # v2c community string
    UdpTransportTarget(('10.1.1.1', 161)),
    ContextData(),
    ObjectType(ObjectIdentity('SNMPv2-MIB', 'sysUpTime', 0))
)

errorIndication, errorStatus, errorIndex, varBinds = next(result)

if not errorIndication:
    for varBind in varBinds:
        print(f"Uptime: {varBind[1]}")
```

**Port:** UDP 161 (agent), UDP 162 (traps)

### NTP (Network Time Protocol)

**Purpose:** Synchronize clocks across network devices

**Why Time Sync Matters:**
- **Logging:** Correlate events across devices
- **Security:** Certificate validation, Kerberos authentication
- **Transactions:** Financial systems, distributed databases
- **Troubleshooting:** Sequence events correctly

**NTP Hierarchy (Stratum):**
- **Stratum 0:** Atomic clock, GPS receiver (reference source)
- **Stratum 1:** NTP servers directly connected to Stratum 0
- **Stratum 2:** Sync from Stratum 1 servers
- **Stratum 3+:** Each level further from source

**NTP Configuration:**
```bash
# Configure NTP server on router
ntp server 129.6.15.28   # NIST time server (Stratum 1)
ntp server 132.163.96.5  # Backup

# Check NTP status
show ntp status
show ntp associations
```

**Port:** UDP 123

### IP Services Summary Table

| Service | Purpose | Port | Protocol |
|---------|---------|------|----------|
| **DHCP** | IP address assignment | 67/68 | UDP |
| **DNS** | Name resolution | 53 | UDP/TCP |
| **NAT** | Address translation | N/A | N/A |
| **SNMP** | Network monitoring | 161/162 | UDP |
| **NTP** | Time synchronization | 123 | UDP |

---

### Sample Exam Questions

1. What is the primary purpose of DHCP?
   - A) Translate domain names to IP addresses
   - B) Automatically assign IP addresses to devices
   - C) Synchronize time across networks
   - D) Monitor device performance
   <details>
   <summary>Show Answer</summary>
   **B) Automatically assign IP addresses to devices** - DHCP eliminates manual IP configuration by dynamically assigning addresses.
   </details>
   <br/>

2. Which service translates domain names (like www.cisco.com) to IP addresses?
   - A) DHCP
   - B) DNS
   - C) NAT
   - D) SNMP
   <details>
   <summary>Show Answer</summary>
   **B) DNS** - The Domain Name System resolves human-readable names to IP addresses.
   </details>
   <br/>

3. What type of NAT allows multiple internal devices to share a single public IP address using different port numbers?
   - A) Static NAT
   - B) Dynamic NAT
   - C) PAT (Port Address Translation)
   - D) Reverse NAT
   <details>
   <summary>Show Answer</summary>
   **C) PAT (Port Address Translation)** - PAT uses ports to multiplex multiple private addresses to one public IP.
   </details>
   <br/>

4. Fill in the blank: __________ is used to monitor network devices and retrieve statistics like interface utilization and CPU usage.
   <details>
   <summary>Show Answer</summary>
   **SNMP** (Simple Network Management Protocol) - SNMP enables centralized monitoring of network infrastructure.
   </details>
   <br/>

---

## 6.7 Recognize Common Protocol Ports

### Overview
**ELI5:** Protocol ports are like different doors into a building—each service (web, email, file transfer) uses its own door number so computers know which service to connect to.

**Summary:**
**Port numbers** identify specific services or applications on a device. Understanding common ports is essential for network configuration, security, and troubleshooting.

**Port Ranges:**
- **0-1023:** Well-known ports (system services)
- **1024-49151:** Registered ports (user applications)
- **49152-65535:** Dynamic/ephemeral ports (temporary client connections)

### Common Protocol Ports

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| **20** | TCP | FTP Data | File Transfer Protocol (data channel) |
| **21** | TCP | FTP Control | File Transfer Protocol (control channel) |
| **22** | TCP | SSH | Secure Shell (encrypted remote access) |
| **23** | TCP | Telnet | Unencrypted remote access (insecure) |
| **25** | TCP | SMTP | Simple Mail Transfer Protocol (send email) |
| **53** | UDP/TCP | DNS | Domain Name System |
| **67/68** | UDP | DHCP | Dynamic Host Configuration Protocol |
| **80** | TCP | HTTP | Hypertext Transfer Protocol (web) |
| **110** | TCP | POP3 | Post Office Protocol (receive email) |
| **123** | UDP | NTP | Network Time Protocol |
| **143** | TCP | IMAP | Internet Message Access Protocol (email) |
| **161/162** | UDP | SNMP | Simple Network Management Protocol |
| **389** | TCP | LDAP | Lightweight Directory Access Protocol |
| **443** | TCP | HTTPS | HTTP Secure (encrypted web) |
| **514** | UDP | Syslog | System logging |
| **830** | TCP | NETCONF | Network Configuration Protocol |
| **3306** | TCP | MySQL | MySQL database |
| **3389** | TCP | RDP | Remote Desktop Protocol |
| **5432** | TCP | PostgreSQL | PostgreSQL database |
| **8080** | TCP | HTTP Alt | Alternative HTTP port (proxies, dev) |
| **8443** | TCP | HTTPS Alt | Alternative HTTPS port |

### DevOps/Automation Ports

| Port | Protocol | Service | Used For |
|------|----------|---------|----------|
| 22 | TCP | SSH | Ansible, remote access |
| 443 | TCP | HTTPS | REST APIs, RESTCONF |
| 830 | TCP | NETCONF | Network device automation |
| 8080 | TCP | HTTP | Jenkins, application servers |
| 9090 | TCP | HTTP | Prometheus monitoring |

### Port Example: Python Port Scanner

```python
import socket

def scan_port(host, port):
    """Check if port is open on host."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0  # 0 means port is open
    except socket.error:
        return False

# Scan common ports
host = "10.1.1.1"
common_ports = {
    22: "SSH",
    23: "Telnet",
    80: "HTTP",
    443: "HTTPS",
    830: "NETCONF"
}

print(f"Scanning {host}...")
for port, service in common_ports.items():
    if scan_port(host, port):
        print(f"✓ Port {port} ({service}) is OPEN")
    else:
        print(f"✗ Port {port} ({service}) is CLOSED")
```

### Security Considerations

**Firewall Rules by Port:**
- **Allow:** Ports 80, 443 (web traffic)
- **Restrict:** Port 22 (SSH) to management networks only
- **Block:** Port 23 (Telnet) - use SSH instead
- **Monitor:** Unusual ports indicate potential malware

**Best Practices:**
- Close unused ports
- Use non-standard ports for security by obscurity (e.g., SSH on 2222)
- Implement port-based ACLs
- Monitor port scans in logs

---

### Sample Exam Questions

1. Which port does SSH use by default?
   - A) 21
   - B) 22
   - C) 23
   - D) 25
   <details>
   <summary>Show Answer</summary>
   **B) 22** - SSH (Secure Shell) uses TCP port 22 for encrypted remote access.
   </details>
   <br/>

2. What is the difference between HTTP (port 80) and HTTPS (port 443)?
   - A) HTTP is faster
   - B) HTTPS uses encryption (TLS/SSL) for secure communication
   - C) HTTP is for file transfer
   - D) HTTPS is only for email
   <details>
   <summary>Show Answer</summary>
   **B) HTTPS uses encryption (TLS/SSL) for secure communication** - HTTPS encrypts web traffic, while HTTP is plaintext.
   </details>
   <br/>

3. Which port does NETCONF typically use?
   - A) 22
   - B) 443
   - C) 830
   - D) 8080
   <details>
   <summary>Show Answer</summary>
   **C) 830** - NETCONF uses TCP port 830 for network device configuration over SSH.
   </details>
   <br/>

4. Fill in the blank: Port __________ is used by SNMP agents to receive queries from network management systems.
   <details>
   <summary>Show Answer</summary>
   **161** - SNMP agents listen on UDP port 161 (traps use port 162).
   </details>
   <br/>

---

## 6.8 Identify the Cause of Application Connectivity Issues

### Overview
**ELI5:** Troubleshooting connectivity is like finding why your mail isn't arriving—check if the address is right, if the path is open, if the door is unlocked, and if someone is home to receive it.

**Summary:**
Application connectivity issues can stem from multiple layers: network (routing, reachability), transport (firewall, ports), and application (service down, authentication). Systematic troubleshooting isolates the problem layer by layer.

### Troubleshooting Methodology

**OSI Model Approach (Bottom-Up):**
1. **Physical/Data Link (L1/L2):** Cable, interface status
2. **Network (L3):** IP addressing, routing
3. **Transport (L4):** Ports, firewalls
4. **Application (L7):** Service status, authentication

### Common Connectivity Issues

#### 1. Physical/Interface Issues

**Symptoms:** No connectivity at all

**Checks:**
```bash
# Check interface status
show ip interface brief
show interfaces status

# Look for:
# - Interface down/down (cable unplugged, hardware failure)
# - Interface down/down (admin down - needs "no shutdown")
# - Errors, CRC errors (bad cable, duplex mismatch)
```

**Python Check:**
```python
import requests

# Check if device is reachable
def check_connectivity(host):
    try:
        response = requests.get(f"https://{host}", timeout=3, verify=False)
        return True
    except requests.exceptions.ConnectionError:
        return False  # Host unreachable
    except requests.exceptions.Timeout:
        return False  # Timeout

if not check_connectivity("10.1.1.1"):
    print("Device unreachable - check network connectivity")
```

#### 2. IP Addressing Issues

**Symptoms:** Ping fails, cannot reach default gateway

**Checks:**
```bash
# Verify IP configuration
ipconfig /all    # Windows
ip addr show     # Linux

# Ping default gateway
ping 192.168.1.1

# Check if IP is on correct subnet
# Device: 192.168.1.100/24, Gateway: 10.1.1.1
# PROBLEM: Different subnets!
```

**Common Issues:**
- Wrong subnet mask
- Incorrect default gateway
- Duplicate IP address
- DHCP failure (APIPA address: 169.254.x.x)

#### 3. Routing Issues

**Symptoms:** Can reach local network but not remote networks

**Checks:**
```bash
# Check routing table
route print        # Windows
ip route show      # Linux
show ip route      # Cisco

# Trace route to destination
tracert 8.8.8.8    # Windows
traceroute 8.8.8.8 # Linux

# Look for:
# - Missing route to destination
# - Wrong next-hop gateway
# - Route points to unreachable interface
```

**Python Route Check:**
```python
import subprocess

def check_route(destination):
    """Check if route exists to destination."""
    try:
        # Windows: tracert, Linux: traceroute
        result = subprocess.run(['tracert', '-h', '5', destination],
                              capture_output=True, text=True, timeout=10)
        if "Destination host unreachable" in result.stdout:
            return False
        return True
    except subprocess.TimeoutExpired:
        return False
```

#### 4. Firewall/ACL Issues

**Symptoms:** Specific ports/services blocked

**Checks:**
- Verify firewall rules allow traffic
- Check ACLs on routers/switches
- Confirm port is open

```python
import socket

def check_port(host, port):
    """Test if specific port is accessible."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex((host, port))
    sock.close()
    
    if result == 0:
        print(f"✓ Port {port} is OPEN")
        return True
    else:
        print(f"✗ Port {port} is CLOSED (firewall or service down)")
        return False

# Test HTTPS connectivity
check_port("api.example.com", 443)
```

#### 5. DNS Issues

**Symptoms:** IP works but hostname doesn't

**Checks:**
```bash
# Test DNS resolution
nslookup www.cisco.com
dig www.cisco.com

# Try alternate DNS
nslookup www.cisco.com 8.8.8.8
```

**Python DNS Check:**
```python
import socket

hostname = "api.example.com"

try:
    ip = socket.gethostbyname(hostname)
    print(f"✓ DNS resolved: {hostname} → {ip}")
except socket.gaierror:
    print(f"✗ DNS resolution failed for {hostname}")
    print("Check: /etc/resolv.conf (Linux) or DNS server settings")
```

#### 6. Application/Service Issues

**Symptoms:** Network OK, but application doesn't respond

**Checks:**
- Service is running
- Correct port/protocol
- Authentication credentials
- API rate limiting

```python
import requests

def diagnose_api_issue(url):
    """Diagnose API connectivity issues."""
    try:
        response = requests.get(url, timeout=5, verify=False)
        
        if response.status_code == 200:
            print("✓ API is accessible and responding")
        elif response.status_code == 401:
            print("✗ Authentication failure - check credentials")
        elif response.status_code == 403:
            print("✗ Authorization failure - insufficient permissions")
        elif response.status_code == 404:
            print("✗ Endpoint not found - check URL")
        elif response.status_code == 429:
            print("✗ Rate limit exceeded - too many requests")
        elif response.status_code >= 500:
            print("✗ Server error - service may be down")
            
    except requests.exceptions.SSLError:
        print("✗ SSL certificate error - try verify=False for testing")
    except requests.exceptions.ConnectionError:
        print("✗ Connection refused - check if service is running")
    except requests.exceptions.Timeout:
        print("✗ Request timeout - network latency or service slow")
```

### Troubleshooting Flowchart

```
Can you ping device?
    NO → Check physical connection, IP configuration
    YES ↓
    
Can you ping default gateway?
    NO → Check IP subnet, gateway configuration
    YES ↓
    
Can you ping external IP (8.8.8.8)?
    NO → Check routing, firewall
    YES ↓
    
Can you resolve DNS (nslookup)?
    NO → Check DNS server configuration
    YES ↓
    
Can you connect to service port?
    NO → Check firewall, ACLs, service status
    YES ↓
    
Does application respond correctly?
    NO → Check authentication, authorization, API syntax
    YES → Problem solved!
```

---

### Sample Exam Questions

1. A device can ping the default gateway but cannot reach external networks. What is the most likely issue?
   - A) Physical cable problem
   - B) Wrong IP address
   - C) Routing issue or firewall blocking traffic
   - D) DNS misconfiguration
   <details>
   <summary>Show Answer</summary>
   **C) Routing issue or firewall blocking traffic** - Local connectivity works (can ping gateway), but routing to external networks is broken.
   </details>
   <br/>

2. An application works when accessed by IP address but fails when using a hostname. What is the likely cause?
   - A) Firewall blocking traffic
   - B) DNS resolution failure
   - C) Wrong subnet mask
   - D) Cable disconnected
   <details>
   <summary>Show Answer</summary>
   **B) DNS resolution failure** - IP connectivity works, but hostname-to-IP translation is failing.
   </details>
   <br/>

3. What does an HTTP 401 status code typically indicate?
   - A) Service is down
   - B) Authentication failure - invalid credentials
   - C) Network unreachable
   - D) Rate limit exceeded
   <details>
   <summary>Show Answer</summary>
   **B) Authentication failure - invalid credentials** - 401 Unauthorized means authentication is required or credentials are invalid.
   </details>
   <br/>

4. Fill in the blank: The __________ command shows the path packets take from source to destination, helping identify routing issues.
   <details>
   <summary>Show Answer</summary>
   **traceroute** (Linux/Mac) or **tracert** (Windows) - These commands display each hop along the route to a destination.
   </details>
   <br/>

---

## 6.9 Explain How Network Constraints Affect Applications

### Overview
**ELI5:** Network constraints are like road conditions affecting deliveries—bandwidth is how wide the road is (more lanes = more traffic), latency is how long the trip takes, and jitter is unpredictable delays like hitting red lights randomly.

**Summary:**
Network performance characteristics directly impact application behavior. **Bandwidth** limits throughput, **latency** adds delay, and **jitter** causes inconsistent timing. Understanding these constraints helps developers build resilient applications and troubleshoot performance issues.

### Bandwidth

**Definition:** Maximum data transfer rate (bits per second)

**Units:**
- Kbps (Kilobits per second): 1,000 bps
- Mbps (Megabits per second): 1,000,000 bps
- Gbps (Gigabits per second): 1,000,000,000 bps

**Impact on Applications:**
- **Video Streaming:** Requires sustained bandwidth
  - SD video: 3-5 Mbps
  - HD video (1080p): 5-8 Mbps
  - 4K video: 25+ Mbps
- **File Downloads:** Time = File Size / Bandwidth
  - 100 MB file @ 10 Mbps = 80 seconds
  - 100 MB file @ 100 Mbps = 8 seconds
- **API Responses:** Large JSON payloads slow with low bandwidth
- **Backups:** Bandwidth limits backup window duration

**Bandwidth Saturation:**
- Multiple applications competing for bandwidth
- Result: All applications slow down
- Solution: QoS (Quality of Service) prioritization

### Latency

**Definition:** Time delay for data to travel from source to destination

**Measurement:** Round-Trip Time (RTT) in milliseconds (ms)

**Latency Sources:**
- **Propagation Delay:** Physical distance (speed of light)
  - Cross-country USA: ~40-60 ms
  - USA to Europe: ~100-150 ms
  - USA to Asia: ~150-250 ms
- **Processing Delay:** Router/switch processing time (< 1 ms)
- **Queuing Delay:** Waiting in buffer queues (variable)
- **Serialization Delay:** Time to transmit bits onto link

**Impact on Applications:**
- **Real-Time Applications:** Very sensitive
  - VoIP: < 150 ms acceptable
  - Video conferencing: < 200 ms acceptable
  - Online gaming: < 50-100 ms ideal
- **Web Applications:** Noticeable degradation
  - Each HTTP request adds RTT
  - Multiple round trips (DNS, TCP handshake, TLS handshake, HTTP)
  - Example: 200 ms latency = 1 second to load page with 5 requests
- **API Calls:** Chatty APIs suffer
  - REST API making 100 sequential calls @ 100 ms latency = 10 seconds!
  - Solution: Batch requests, use GraphQL, cache responses
- **Database Queries:** Query response time increases

**Latency vs Bandwidth:**
- High bandwidth, high latency: Large files transfer fast, but start slowly ("fat pipe")
- Low bandwidth, low latency: Small messages travel quickly, throughput limited ("thin pipe")

### Jitter

**Definition:** Variation in latency (inconsistent delay)

**Measurement:** Standard deviation of latency (ms)

**Example:**
- Low jitter: 50ms, 51ms, 50ms, 52ms, 50ms (consistent)
- High jitter: 50ms, 150ms, 30ms, 200ms, 60ms (inconsistent)

**Impact on Applications:**
- **VoIP/Video:** Severe degradation
  - Audio/video packets arrive irregularly
  - Jitter buffer smooths variations but adds delay
  - High jitter causes choppy audio/video
- **Real-Time Data:** Inconsistent delivery
  - Sensor data arrives out of order
  - Difficult to correlate events
- **APIs:** Unpredictable response times
  - Timeouts may trigger prematurely
  - Retry logic may cause duplication

**Mitigation:**
- QoS: Prioritize real-time traffic
- Jitter buffers: Smooth packet arrival (adds latency)
- Reduce network congestion

### Network Constraint Examples

**Scenario 1: Video Conferencing**
```python
# Check if network meets video conferencing requirements
def check_video_requirements(bandwidth_mbps, latency_ms, jitter_ms):
    """Determine if network supports video conferencing."""
    issues = []
    
    if bandwidth_mbps < 2:
        issues.append("Insufficient bandwidth (need 2+ Mbps)")
    if latency_ms > 200:
        issues.append(f"High latency ({latency_ms}ms > 200ms threshold)")
    if jitter_ms > 30:
        issues.append(f"High jitter ({jitter_ms}ms > 30ms threshold)")
    
    if issues:
        print("❌ Network NOT suitable for video conferencing:")
        for issue in issues:
            print(f"  - {issue}")
        return False
    else:
        print("✅ Network suitable for video conferencing")
        return True

# Test scenarios
check_video_requirements(5, 150, 20)    # Good
check_video_requirements(1, 300, 50)    # Poor
```

**Scenario 2: API Performance**
```python
import time
import requests

def measure_api_performance(url, num_requests=10):
    """Measure API latency and jitter."""
    latencies = []
    
    for i in range(num_requests):
        start = time.time()
        try:
            response = requests.get(url, timeout=5)
            latency = (time.time() - start) * 1000  # Convert to ms
            latencies.append(latency)
        except requests.exceptions.RequestException:
            print(f"Request {i+1} failed")
    
    if latencies:
        avg_latency = sum(latencies) / len(latencies)
        jitter = max(latencies) - min(latencies)
        
        print(f"Average Latency: {avg_latency:.2f} ms")
        print(f"Min/Max: {min(latencies):.2f} / {max(latencies):.2f} ms")
        print(f"Jitter: {jitter:.2f} ms")
        
        if avg_latency > 500:
            print("⚠️ High latency detected - may impact user experience")
        if jitter > 100:
            print("⚠️ High jitter detected - inconsistent performance")

measure_api_performance("https://api.example.com/health")
```

### Application Design Considerations

**For High Latency:**
- Minimize round trips (batch operations)
- Use caching aggressively
- Implement asynchronous patterns
- Show progress indicators

**For Low Bandwidth:**
- Compress data (gzip)
- Minimize payload sizes
- Use efficient data formats (Protocol Buffers vs JSON)
- Implement pagination

**For High Jitter:**
- Implement retry logic with exponential backoff
- Use generous timeouts
- Design for eventual consistency
- Buffer real-time data

### Network Constraints Summary

| Constraint | Measurement | Affects | Sensitive Applications |
|-----------|-------------|---------|----------------------|
| **Bandwidth** | Mbps/Gbps | Throughput | Video, large downloads, backups |
| **Latency** | Milliseconds | Responsiveness | VoIP, gaming, interactive apps |
| **Jitter** | ms variation | Consistency | VoIP, video, real-time data |

---

### Sample Exam Questions

1. What network characteristic measures the maximum data transfer rate?
   - A) Latency
   - B) Jitter
   - C) Bandwidth
   - D) Packet loss
   <details>
   <summary>Show Answer</summary>
   **C) Bandwidth** - Bandwidth measures the maximum throughput in bits per second.
   </details>
   <br/>

2. Which application type is MOST sensitive to network latency?
   - A) Email
   - B) File backup
   - C) Real-time video conferencing
   - D) Static website browsing
   <details>
   <summary>Show Answer</summary>
   **C) Real-time video conferencing** - Interactive real-time applications require low latency for acceptable user experience.
   </details>
   <br/>

3. What does high jitter indicate?
   - A) Consistent network performance
   - B) Low bandwidth
   - C) Variable and inconsistent latency
   - D) Strong signal strength
   <details>
   <summary>Show Answer</summary>
   **C) Variable and inconsistent latency** - Jitter measures variation in packet delay, causing inconsistent performance.
   </details>
   <br/>

4. Fill in the blank: __________ is the time delay for data to travel from source to destination and back, measured in milliseconds.
   <details>
   <summary>Show Answer</summary>
   **Latency** (or RTT - Round-Trip Time) - Latency affects application responsiveness and is critical for real-time applications.
   </details>
   <br/>

---

**End of Section 6: Network Fundamentals**
