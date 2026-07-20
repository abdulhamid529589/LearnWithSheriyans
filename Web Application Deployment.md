# Web Application Deployment — Scaling Guide
### From Zero to 1 Million+ Users
**Based on:** Sheryians Coding School — Deployment Deep Dive  
**Instructors:** Harsh (Head of Tech), Ankur, Sarang  
**For:** Full-Stack Developers, Backend Engineers, CS/IT Students

---

## Table of Contents

1. [What is Deployment?](#1-what-is-deployment)
2. [Key Metrics — Users, RPS, Concurrency](#2-key-metrics--users-rps-concurrency)
3. [Deployment Platforms Overview](#3-deployment-platforms-overview)
4. [Cloud Providers — IaaS](#4-cloud-providers--iaas)
5. [Level 1 — 0 to 1,000 Users](#5-level-1--0-to-1000-users)
6. [Level 2 — 1,000 to 10,000 Users](#6-level-2--1000-to-10000-users)
7. [Level 3 — 10,000 to 100,000 Users](#7-level-3--10000-to-100000-users)
8. [Level 4 — 100,000 to 1 Million Users](#8-level-4--100000-to-1-million-users)
9. [Level 5 — 1 Million+ Users](#9-level-5--1-million-users)
10. [Architecture Diagrams by Level](#10-architecture-diagrams-by-level)
11. [Cost Optimization Principles](#11-cost-optimization-principles)
12. [Key Concepts Glossary](#12-key-concepts-glossary)
13. [Exam Q&A](#13-exam-qa)

---

## https://youtu.be/bAO5aLZ4oYs

## 1. What is Deployment?

**Deployment** = making your application accessible to the world by running it on a machine connected to the internet (not just your localhost).

### The Localhost Problem

```
Developer's machine:
localhost:3000  →  Only accessible on YOUR laptop

Friend's machine:
localhost:3000  →  Opens THEIR laptop's port 3000
(your app is NOT there)

Result: Your friend cannot access your app
```

### The Solution

```
Upload your app code to a machine on the internet
|
v
That machine gets a PUBLIC IP address
|
v
Anyone can access: http://your-ip:3000
|
v
Add a domain name: https://yourapp.com
|
v
World can access your application
```

### Never Do This

```
❌ Resume with "localhost:3000" as project link
→ Instant rejection — shows no deployment knowledge

✅ Resume with "https://yourproject.vercel.app"
→ Shows real deployment skills
```

---

## 2. Key Metrics — Users, RPS, Concurrency

Understanding these three metrics is fundamental before choosing any deployment setup.

### Concurrency (Active Users)

**Concurrency** = number of users actively using your application at a given moment.

```
1,000 registered users ≠ 1,000 concurrent users

Example:
- Your app has 1,000 registered accounts
- At 2 PM, 50 people are browsing it
- Concurrency = 50 (not 1,000)
```

### RPS — Requests Per Second

**RPS** = how many HTTP requests your server receives every second.

```
Relationship between concurrency and RPS:

Real-world observation: RPS ≈ 2–5% of concurrent users

Why so low?
A user visits your site → loads the page → READS for 2 minutes
During those 2 minutes → zero requests from that user
Only when they click something → new request

Example:
1,000 concurrent users × 2% = ~20 requests per second
```

### Why This Matters

```
Common mistake:
Developer thinks: "1,000 users = 1,000 requests per second"
Reality:          "1,000 users ≈ 20 requests per second"

Consequence of mistake:
→ Orders a massive expensive server for 1,000 concurrent users
→ Wastes 90% of compute capacity
→ Gets fired for over-provisioning
```

### Stress Test vs Concurrency Test

| Test Type | What It Measures | When to Use |
|---|---|---|
| **Concurrency test** | Normal sustained traffic handling | Regular performance validation |
| **Stress test** | Breaking point under extreme load | Launch day / viral event planning |
| **Load test** | Performance at expected peak load | Pre-launch validation |

**Stress test real example:** CBSE board results day, IRCTC ticket booking, IPL live streaming — all cause massive simultaneous traffic spikes.

---

## 3. Deployment Platforms Overview

### Option 1 — Your Own Laptop as Server

**Technically possible, practically expensive:**

```
Requirements:
├── Dedicated internet connection (leased line, not Wi-Fi)
│   → Jio/Airtel leased line: guaranteed speed, no downtime
├── Uninterruptible Power Supply (UPS)
├── Static IP address
└── Always-on (can never shut down)

Cost: Much higher than cloud alternatives
Use case: Learning only, never production
```

### Option 2 — PaaS (Platform as a Service)

The platform handles servers, OS, runtime — you just deploy code.

| Platform | Free Tier | Best For | Notes |
|---|---|---|---|
| **Render** | ✅ Yes | Beginners | Recommended for learning — connect GitHub repo, auto-deploys |
| **Vercel** | ✅ Yes | Frontend + Next.js | Extremely beginner-friendly |
| **Railway** | ✅ Limited | Quick prototypes | Good developer experience |
| **Netlify** | ✅ Yes | Static sites + JAMstack | Excellent CDN |
| **Cloudflare Workers** | ✅ 100K req/day free | Serverless edge functions | Requires Hono.js (not Express.js) |
| **Heroku** | ❌ No | Legacy | Was popular, now paid only |
| **DigitalOcean App Platform** | ❌ No | Production | $12/month minimum |

**Recommendation for beginners: Render**
- Free tier available
- GitHub repo link → auto-deploy
- Beginner-friendly but teaches real concepts

### Option 3 — IaaS (Infrastructure as a Service)

You get raw virtual machines — you configure everything yourself.

| Provider | Strength | Notes |
|---|---|---|
| **AWS** | Ecosystem, most services | Industry standard, developer-friendly |
| **GCP** | AI/ML, data processing | Gemini API, best for data workloads |
| **Azure** | Enterprise integration | Common in corporate environments |
| **DigitalOcean** | Simple, predictable pricing | Good for small-medium scale |
| **Hetzner** | Cheapest VPS | Popular in Europe, good price/performance |

### Option 4 — Bare Metal (Self-Hosted)

```
Buy physical servers → put in a data center → manage everything yourself

Cost comparison example:
Cloud provider: $2,000/month
Bare metal:      $500/month (including electricity, cooling, UPS)

Trade-off:
- Cheaper at scale
- Requires dedicated system administrator
- Full responsibility for hardware failures
- High upfront investment
```

---

## 4. Cloud Providers — IaaS

### AWS (Amazon Web Services)

```
Why AWS dominates:
├── 200+ services available
├── Best documentation
├── Largest community / Stack Overflow answers
├── Free tier (12 months, limited)
├── Developer-focused
└── Most job postings require AWS knowledge

Key AWS services for deployment:
├── EC2          → Virtual machines (the core compute)
├── RDS          → Managed relational databases
├── S3           → Object storage (files, images, backups)
├── ElastiCache  → Managed Redis/Memcached
├── CloudFront   → CDN (content delivery network)
├── ELB          → Elastic Load Balancer
├── Auto Scaling → Automatically add/remove EC2 instances
├── SQS          → Message queue service
├── Lambda       → Serverless functions
└── ECR/ECS/EKS  → Container deployment
```

### GCP (Google Cloud Platform)

```
Strengths:
├── Best for AI/ML workloads
├── Gemini API integration
├── BigQuery for data warehousing
├── Fast networking (Google's own fiber)
└── Competitive pricing on compute

Key GCP services:
├── Compute Engine  → Virtual machines
├── Cloud Run       → Serverless containers
├── Cloud SQL       → Managed databases
├── Vertex AI       → ML platform
├── Pub/Sub         → Message queue
└── Firebase        → Mobile/web backend
```

### Choosing a Cloud Provider

```
Startup / beginner:       Render or Railway (PaaS)
Growing startup:          DigitalOcean or AWS EC2
AI/ML heavy workload:     GCP
Enterprise / Microsoft:   Azure
Cost-sensitive, Europe:   Hetzner
Production at scale:      AWS or GCP
```

---

## 5. Level 1 — 0 to 1,000 Users

### Metrics

```
Users:          0 – 1,000
Concurrency:    0 – 1,000 active users
RPS:            1 – 20 requests/second (2% of concurrency)
Stage:          MVP, startup early stage, personal projects, demo
```

### Architecture

```
[User] → [Single Server] → [Database]

Everything on ONE machine:
├── Web server (Express.js / Node.js)
├── Application code
└── Database (MongoDB / PostgreSQL)

OR use a managed database separately (recommended):
├── Web server → Render/Railway
└── Database   → MongoDB Atlas / Railway PostgreSQL
```

### Recommended Tools

| Component | Tool | Why |
|---|---|---|
| Hosting | Render (free) | Beginner-friendly, auto-deploy from GitHub |
| Database | MongoDB Atlas (free tier) | Managed, no server config needed |
| Alternative | Railway | All-in-one, quick setup |
| Domain | Cloudflare | Free DNS, DDoS protection |

### Bottlenecks at This Level

```
Primary concern: Single Point of Failure

If the one server goes down → entire app is down
If the one database goes down → entire app is down

This is acceptable at this stage because:
├── Few users (low impact)
├── Low cost is priority
├── Speed of development matters more
└── You're validating the product (MVP)
```

### Decision: When to Use Level 1

```
✅ Use Level 1 when:
├── Building an MVP to test market fit
├── < 1,000 active users
├── Personal project / portfolio
├── Startup with limited budget
└── Speed > perfection at this stage
```

### Cost Estimate

```
Render free tier:     $0
MongoDB Atlas free:   $0 (512MB storage)
Total:               $0/month

Paid options:
Render starter:       $7/month
MongoDB Atlas M2:     $9/month  
Total:               ~$16/month
```

---

## 6. Level 2 — 1,000 to 10,000 Users

### Metrics

```
Users:          1,000 – 10,000
Concurrency:    1,000 – 10,000
RPS:            20 – 400 requests/second
Stage:          Growing startup, product-market fit found
```

### Architecture

```
[User] → [Server] → [Database]

Still primarily single server, but:
├── Proper server (VPS with dedicated resources)
├── Database separate from server
├── Consider managed database service
└── Start thinking about assets/CDN
```

### What Changes from Level 1

```
Level 1:    Free tier PaaS (shared resources)
Level 2:    Dedicated VPS (dedicated resources)

Example DigitalOcean Droplet ($12/month):
├── 2 vCPU
├── 2 GB RAM  
├── 60 GB SSD
└── 3 TB bandwidth

This handles ~10,000 users comfortably if code is efficient.
```

### Critical Factor: Code Quality

```
Bad code at Level 2:
- Single API call that hits database 3-4 times
- N+1 query problems
- No indexes on frequently queried fields
- Memory leaks

Result: Even 100 users crash the server

Good code at Level 2:
- Single database call per API endpoint
- Proper indexing
- Connection pooling
- Efficient queries

Result: 10,000 users handled on a $12/month server
```

### Express.js Performance Reality

```
Hello World route (no database):
→ ~15,000 requests/second

Same route with MongoDB query:
→ ~500–1,000 requests/second

Same route with unoptimized query (N+1):
→ ~50–100 requests/second (disaster)

Lesson: Database queries are your bottleneck, not the server.
```

### Recommended Tools

| Component | Tool |
|---|---|
| Server | DigitalOcean Droplet / Render paid |
| Database | MongoDB Atlas M2 ($9/month) or Railway |
| CDN | Cloudflare (free) |
| Static assets | Cloudflare R2 or AWS S3 |

### Bottlenecks at This Level

```
1. Database connection limit
→ Each server instance needs database connections
→ Connection pool fills up under load
→ Error: "MongoPoolExhaustedError"

2. High CPU usage
→ If doing image processing, encryption, complex calculations
→ Need CPU-optimized machine

3. No redundancy
→ Still single point of failure
→ Acceptable at this stage
```

### Decision: When to Move from Level 1 → Level 2

```
Move when you notice:
├── Response times increasing (>500ms regularly)
├── Free tier limits being hit
├── More than ~500 concurrent users
└── Memory warnings from PaaS provider
```

---

## 7. Level 3 — 10,000 to 100,000 Users

### Metrics

```
Users:          10,000 – 100,000
Concurrency:    Up to ~1,000 simultaneous (realistic peak)
RPS:            100 – 1,000 requests/second
Stage:          Product-market fit, growing revenue, Series A startup
```

### Architecture — Major Changes

```
[User]
|
[CDN / Cloudflare]  ← Serves static assets, DDoS protection
|
[Load Balancer]     ← Distributes requests across servers
|        |
[Server 1] [Server 2]  ← Multiple application servers
|        |
[Redis Cache]         ← Centralized in-memory cache
|
[Database]
├── Primary (Reads + Writes)
└── Replica (Reads only)
```

### Load Balancer

```
What it does:
- Receives all incoming requests
- Distributes them across multiple servers
- Health checks: removes unhealthy servers automatically
- Algorithms: Round Robin, Least Connections, IP Hash

Example:
100 RPS → Load Balancer → 50 RPS → Server 1
→ 50 RPS → Server 2

If Server 2 crashes:
100 RPS → Load Balancer → 100 RPS → Server 1 (still works!)
```

### Database Replication

```
Before (Level 2):
[All Reads + Writes] → [Single Database]

After (Level 3):
[Write operations] → [Primary DB]
|
[Replica 1] → [Read operations]
[Replica 2] → [Read operations]

Why?
Most web apps: 80-90% reads, 10-20% writes
Replicas handle read load → Primary only handles writes
→ 3x-5x more database throughput
```

### Redis Cache

```
Without cache:
User requests profile → Hit database → 50ms response

With Redis cache:
User requests profile → Check Redis → HIT → 1ms response
→ Check Redis → MISS → Hit database → Store in Redis → 50ms response

Why Redis at Level 3 (not Level 2)?
Level 2: Single server — can use in-memory cache within the process
Level 3: Multiple servers — need SHARED cache accessible by all servers
Redis provides centralized cache for all server instances
```

### Stateless Servers

```
Important: At Level 3, servers MUST be stateless

Stateful server (BAD):
User logs in → Session stored in Server 1's memory
Next request → Load Balancer sends to Server 2
Server 2 has no session → User logged out!

Stateless server (GOOD):
User logs in → JWT token issued (stored on client)
Next request → Any server can verify JWT
No session storage on server → Works with any server
```

### Recommended Tools

| Component | Tool | Cost |
|---|---|---|
| Cloud | AWS / GCP / DigitalOcean | Varies |
| Load Balancer | AWS ALB / Nginx / HAProxy | $20+/month |
| Servers | 2+ EC2 t3.small instances | ~$15-30/month each |
| Database | MongoDB Atlas M10 / RDS | ~$60-100/month |
| Cache | Redis (AWS ElastiCache) | ~$15/month |
| CDN | CloudFront / Cloudflare | Low |

### Bottlenecks at This Level

```
1. Database write bottleneck
→ All writes go to primary
→ If write-heavy app → primary becomes hot

2. N+1 queries become catastrophic
→ At this scale, every inefficiency is amplified
→ Must index all queried fields

3. Connection pool exhaustion
→ 10 servers × 10 connections each = 100 DB connections
→ Database plan must support that many connections
```

### Decision for Level 3

```
Caching strategy:
├── Use Redis for shared cache across all server instances
├── Cache: user sessions, frequent DB queries, computed results
└── Cache invalidation strategy must be planned

Database strategy:
├── Add read replicas before adding more servers
├── Index ALL fields used in WHERE/find queries
└── Use explain() to analyze slow queries
```

---

## 8. Level 4 — 100,000 to 1 Million Users

### Metrics

```
Users:          100,000 – 1,000,000
Concurrency:    Up to 10,000+ simultaneous
RPS:            1,000 – 15,000+ requests/second
Stage:          Funded startup, established product, Series B+
```

### Architecture — Significant Complexity

```
[User]
|
[CDN Layer]
|
[API Gateway / Load Balancer]
|           |           |
[Service A] [Service B] [Service C]  ← Distributed Monolith
(Main app)  (Payments)  (Notifications)
|              |
[Message Queue] ← Async processing
|
[Worker Nodes]   ← Process queued tasks
|
[Database Cluster]
├── Primary (Writes)
├── Replica 1 (Reads)
├── Replica 2 (Reads)
└── Analytics Replica (Reporting queries)
```

### Distributed Monolith vs Microservices

```
Monolith (Level 1-3):
One codebase, one server, all features in one app

Distributed Monolith (Level 4):
├── Still mostly one codebase
├── Extract 1-2 resource-heavy services into separate deployments
├── Example: Payment service separated from main app
│   → Payment is CPU-intensive (encryption, validation)
│   → Paying for expensive CPU across ALL servers is wasteful
│   → Extract payment to dedicated service with right machine type
└── Server-to-server calls via HTTP or webhooks

True Microservices (Level 4-5):
Many small independent services, each with own database
```

### Message Queues

```
Without queue (synchronous):
User submits order → Wait for: DB write + Email + SMS + Inventory update → Response
Total wait: 3–5 seconds

With queue (asynchronous):
User submits order → DB write → Queue: [Email, SMS, Inventory] → Response (fast!)
Worker processes queue in background: Email sent, SMS sent, Inventory updated

Benefits:
├── User gets instant response
├── Background tasks processed reliably
├── If worker crashes → jobs stay in queue, retry automatically
└── Scale workers independently from web servers
```

### Database Sharding (Introduction)

```
Replication (Level 3): Copy of same data on multiple nodes
Sharding (Level 4):     SPLIT data across multiple nodes

Example sharding strategy:
Users A-M → Database Shard 1
Users N-Z → Database Shard 2

Benefits:
├── Each shard handles half the load
├── Can scale storage independently
└── Queries for specific user hit only one shard

Complexity:
├── Cross-shard queries are expensive
├── Data consistency across shards is complex
├── Resharding (rebalancing) is painful
└── Introduced only when truly necessary
```

### CAP Theorem

```
Any distributed database can only guarantee 2 of 3:

C = Consistency    (every read returns most recent write)
A = Availability   (every request gets a response)
P = Partition Tolerance (works even if network splits)

Real-world choice:
├── Banking app → Choose CP (consistency + partition tolerance)
│   → Never show wrong balance, even if service is temporarily down
│
└── Social media → Choose AP (availability + partition tolerance)
→ Okay to show slightly stale data, never show error page
```

### Recommended Tools

| Component | Tool |
|---|---|
| Cloud | AWS or GCP (mandatory at this scale) |
| Auto Scaling | AWS Auto Scaling Groups |
| Message Queue | AWS SQS / RabbitMQ / Redis Queues |
| Workers | AWS Lambda / EC2 worker fleet |
| Cache | AWS ElastiCache (Redis) |
| Database | MongoDB Atlas M30+ / AWS RDS Multi-AZ |
| CDN | AWS CloudFront |
| Monitoring | AWS CloudWatch + Datadog |

### Bottlenecks at This Level

```
1. Database write contention
→ Multiple services writing to same tables
→ Need to split write paths

2. Synchronous processing blocking threads
→ Heavy computations block web server threads
→ Must move to async queue-based processing

3. Cross-service data consistency
→ Distributed transactions are complex
→ Eventual consistency must be designed for
```

### Cost Reality at Level 4

```
AWS setup for 100K-1M users:
├── 3-5 EC2 t3.medium instances:  $150/month
├── RDS Multi-AZ (db.m5.large):   $200/month  
├── ElastiCache (cache.r6g.large): $100/month
├── ALB Load Balancer:             $25/month
├── CloudFront CDN:                $50/month
├── Data transfer:                 Variable
└── Total:                        ~$500-1,000+/month
```

---

## 9. Level 5 — 1 Million+ Users

### Metrics

```
Users:          1,000,000+
Concurrency:    10,000+ simultaneous
RPS:            10,000 – unlimited (global traffic)
Stage:          Large established company, platform product
Examples:       Hotstar, Swiggy, Zomato, Paytm, MakeMyTrip
```

### Architecture — Full Distributed System

```
[Users globally]
|
[Anycast DNS / GeoDNS]   ← Route users to nearest region
|
[Global CDN]             ← Cloudflare / CloudFront at edge
|
[Regional Load Balancers]
|
[API Gateway]
|
[Microservices]   ← Fully independent services
├── User Service (own DB)
├── Product Service (own DB)  
├── Order Service (own DB)
├── Payment Service (own DB)
├── Notification Service (own DB)
└── Search Service (Elasticsearch)
|
[Kafka / Message Streaming]
|
[Worker Fleets]
|
[Distributed Databases]
├── CockroachDB / Google Spanner (global consistency)
├── Redis Cluster (distributed cache)
└── Data Warehouse (analytics)
|
[Kubernetes Orchestration]
```

### Kubernetes (K8s)

```
What problem it solves:
At Level 4: You manually manage 10-20 servers
At Level 5: You have 100+ services, each needing 3-50 instances
= potentially thousands of containers to manage

Kubernetes does:
├── Container orchestration (decides where to run each service)
├── Auto-scaling (adds containers when RPS spikes)
├── Self-healing (restarts crashed containers automatically)
├── Rolling deployments (update without downtime)
├── Service discovery (services find each other automatically)
└── Load balancing across containers
```

### Kafka (Event Streaming)

```
Why Kafka at Level 5 (not just SQS):
├── Handles millions of events/second (SQS: thousands)
├── Events stored durably for days/weeks (replay if needed)
├── Multiple consumers can read same event independently
├── Real-time stream processing
└── Event sourcing architecture

Example: Hotstar IPL streaming
- 10M concurrent viewers
- Every 5 seconds: viewer position update
- 10M × 1 update/5sec = 2M events/second
- Only Kafka can handle this
```

### CockroachDB

```
Why CockroachDB at Level 5:
├── Distributed SQL database
├── Runs across multiple data centers
├── Survives data center failure automatically
├── Globally consistent (unlike eventual-consistent NoSQL)
└── If entire Mumbai data center catches fire → data safe in Delhi

The "cockroach" in the name: survives anything
```

### Multi-Region Deployment

```
Problem: User in Japan requests data from server in India
→ Data must travel India → undersea fiber cable → Japan
→ Latency: 150-200ms just for physical travel

Solution: Multi-region deployment
├── Servers in India (for Indian users)
├── Servers in Singapore (for SE Asian users)  
├── Servers in US East (for American users)
└── Servers in Europe (for European users)

GeoDNS routes each user to closest region
→ Latency drops from 200ms to <30ms
```

### Bottlenecks at This Level

```
1. Network latency (physical light travel time)
→ Solution: Multi-region, edge computing

2. Region outages
→ AWS Mumbai goes down? Traffic auto-routes to Singapore
→ Design for this: "Design for failure, build for success"

3. Data synchronization across regions
→ Writing user data in India, reading in US
→ Eventual consistency vs strong consistency trade-off

4. Queue overflow
→ Workers can't keep up with queue growth
→ Queue fills → need more workers → need bigger queue
```

### India-Specific Network Reality

```
Packet journey from Bhopal to Japan:
Bhopal → Indore → Mumbai → Singapore → back to Mumbai → Japan

Issues:
├── Inefficient routing within India
├── Limited international cables from India
└── High latency for Indian users accessing global services

Solution: 
AWS Mumbai region exists partly for Indian companies to serve
Indian users without international latency.
```

---

## 10. Architecture Diagrams by Level

### Level 1 Architecture

```
┌─────────┐     HTTP      ┌──────────────────┐     ┌────────────┐
│  User   │ ──────────── │  Single Server   │────│  Database  │
└─────────┘              │  (Render/Railway) │     │  (Atlas)   │
└──────────────────┘     └────────────┘

Cost: $0–$16/month
```

### Level 2 Architecture

```
┌─────────┐              ┌──────────────────┐     ┌────────────┐
│  User   │ ──────────── │   VPS Server     │────│  Managed   │
└─────────┘              │  (DO Droplet)    │     │  Database  │
└──────────────────┘     └────────────┘
|
┌──────────────────┐
│  Object Storage  │  ← Images/files
│  (S3 / R2)       │
└──────────────────┘

Cost: ~$25–$50/month
```

### Level 3 Architecture

```
┌─────────┐    ┌─────────┐    ┌──────────────┐
│  User   │───│   CDN   │───│Load Balancer  │
└─────────┘    └─────────┘    └──────┬───────┘
│
┌───────────┴────────────┐
│                        │
┌──────┴──────┐        ┌────────┴────┐
│  Server 1   │        │  Server 2   │
└─────────────┘        └─────────────┘
│                        │
┌──────┴────────────────────────┘
│
┌──────┴──────┐        ┌────────────────┐
│  Redis Cache │        │ Database       │
└─────────────┘        │ Primary        │
│    └─ Replica  │
└────────────────┘

Cost: ~$150–$300/month
```

### Level 4 Architecture

```
[CDN] → [API Gateway] → [Load Balancer]
│
┌──────────────────┼──────────────────┐
[Main Service]    [Payment Service]   [Email Service]
│                  │
[Message Queue] ←─────────┘
│
[Worker Nodes]
│
[Primary DB] → [Replica 1]
→ [Replica 2]

Cost: $500–$2,000/month
```

---

## 11. Cost Optimization Principles

### The Most Important Rule

```
Right-size your infrastructure to your actual traffic.

Bad: "I'll get the big server now, we'll grow into it"
Good: "I'll get what I need now, scale when metrics demand it"

Analogy:
Bad:  Buy a 500kg rice container for 5kg of rice
Good: Buy a 10kg container, upgrade when you need 50kg
```

### AWS EC2 Spot Instances

```
On-demand instance (normal): $0.10/hour
Spot instance:               $0.03/hour (70% cheaper)

Catch: Spot instances can be terminated with 2-minute warning
when AWS needs the capacity back

Use for: Worker nodes, batch processing, non-critical tasks
Never for: Web servers handling user traffic (they'll go down)
```

### Predictable vs Variable Cost

```
PaaS (Render, Vercel):     $7/month fixed + bandwidth charges
IaaS (EC2):                Variable — you choose the instance

Bandwidth warning:
Outbound data transfer is often the hidden cost
Example: Accidentally served a 20MB PDF 10,000 times
= 200GB outbound = ~$20 extra charge (DigitalOcean)
= ~$18 extra charge (AWS)
Always set billing alerts!
```

### Vertical vs Horizontal Scaling

```
Vertical Scaling (Scale Up):
→ Make ONE machine bigger
→ 2 CPU → 8 CPU
→ 4GB RAM → 32GB RAM
→ Faster but has limits (biggest machine available)
→ Causes downtime during upgrade

Horizontal Scaling (Scale Out):
→ Add MORE machines of the same size
→ 1 server → 3 servers
→ Requires stateless architecture
→ No downtime
→ Theoretically unlimited
→ More complex to manage
```

---

## 12. Key Concepts Glossary

| Term | Definition |
|---|---|
| **RPS** | Requests Per Second — how many HTTP requests hit your server each second |
| **Concurrency** | Number of users actively using the app simultaneously |
| **Load Balancer** | Distributes incoming traffic across multiple server instances |
| **CDN** | Content Delivery Network — serves static files from edge servers near users |
| **Stateless Server** | Server that stores no user session data locally (uses JWT/Redis for sessions) |
| **Vertical Scaling** | Making one machine more powerful (more CPU/RAM) |
| **Horizontal Scaling** | Adding more machines of the same type |
| **Database Replication** | Keeping copies of a database on multiple nodes (one primary, multiple replicas) |
| **Database Sharding** | Splitting data across multiple database nodes based on a key |
| **Message Queue** | Buffer that stores tasks to be processed asynchronously (SQS, RabbitMQ) |
| **Worker Node** | Server that processes tasks from a queue (not handling HTTP requests) |
| **Microservices** | Architecture where each feature is a separate independent service |
| **Distributed Monolith** | Mostly monolith but with 1-3 services extracted for performance |
| **Redis** | In-memory data store used as cache, session store, message queue |
| **Kubernetes (K8s)** | Container orchestration — manages deployment of thousands of containers |
| **Kafka** | Distributed event streaming — handles millions of events/second |
| **CAP Theorem** | Any distributed DB can only guarantee 2 of: Consistency, Availability, Partition Tolerance |
| **Connection Pool** | Pre-established set of database connections reused across requests |
| **Auto Scaling** | Automatically adds/removes server instances based on traffic |
| **Spot Instance** | Cheap cloud VM that can be terminated when provider needs capacity back |
| **VPS** | Virtual Private Server — dedicated virtual machine (unlike shared hosting) |
| **PaaS** | Platform as a Service — cloud handles OS, runtime; you deploy code |
| **IaaS** | Infrastructure as a Service — cloud gives raw VMs; you configure everything |
| **Bare Metal** | Physical servers you own and operate yourself |
| **Region Outage** | When an entire geographic data center becomes unavailable |
| **CockroachDB** | Distributed SQL database designed to survive data center failures |

---

## 13. Exam Q&A

### Q1: What is the difference between RPS and concurrency?

**Concurrency** is the number of users actively using the application simultaneously. **RPS (Requests Per Second)** is the number of HTTP requests the server receives per second. In practice, RPS is approximately 2–5% of concurrency because users spend most of their time reading pages, not clicking — only clicks generate requests. Example: 1,000 concurrent users ≈ 20–50 RPS.

### Q2: What is a load balancer and why is it needed?

A load balancer receives all incoming traffic and distributes it across multiple server instances using algorithms like Round Robin or Least Connections. It is needed when a single server cannot handle the traffic volume, and to eliminate single points of failure — if one server crashes, the load balancer routes traffic to healthy servers automatically.

### Q3: What is the difference between vertical and horizontal scaling?

**Vertical scaling** increases the resources of a single machine (more CPU, RAM). It has a physical limit (biggest available machine) and may require downtime. **Horizontal scaling** adds more machines of the same type. It requires stateless architecture, has no theoretical limit, and allows zero-downtime deployment. At scale, horizontal is preferred because it provides redundancy and unlimited growth.

### Q4: Why must servers be stateless when using a load balancer?

If a server stores user session data in local memory (stateful), the next request from the same user may go to a different server (via load balancer) which has no session data, causing the user to be logged out. Stateless servers store no session data locally — sessions are in Redis or encoded in JWT tokens, so any server can handle any request.

### Q5: What is the difference between database replication and sharding?

**Replication** creates copies of the same data on multiple nodes — one primary accepts writes, replicas serve reads. This scales read throughput but all nodes have the same data. **Sharding** splits the data across multiple nodes based on a key — half the users in shard 1, half in shard 2. This scales both storage and write throughput but adds complexity in cross-shard queries and data consistency.

### Q6: When should you use a message queue?

Use a message queue when: processing takes too long to do synchronously (email sending, image processing), tasks can be processed independently of the user request, you want to decouple services, or you need guaranteed delivery even if downstream services are temporarily down. Example: User places order → database updated → order event queued → workers asynchronously send email, update inventory, notify restaurant.

### Q7: What is CAP Theorem?

CAP Theorem states that a distributed database can only guarantee two of three properties: **Consistency** (all reads reflect the most recent write), **Availability** (every request receives a response), **Partition Tolerance** (system continues operating if network fails between nodes). Banking apps choose CP (never show wrong balance), while social media apps choose AP (okay to show slightly stale data, never show errors).

### Q8: What is Kubernetes and why is it used at Level 5?

Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications. At Level 5 with 100+ microservices each needing multiple instances, manual server management becomes impossible. Kubernetes automatically schedules containers across a cluster, restarts crashed services, scales based on traffic, performs rolling updates without downtime, and handles service discovery.

### Q9: Why is cost optimization critical in deployment decisions?

Cloud costs scale with usage. Over-provisioning wastes company money and can lead to engineers being fired for poor resource management. Under-provisioning causes performance issues and outages. The goal is right-sizing: matching infrastructure capacity to actual traffic needs. Using spot instances for non-critical workloads, starting with PaaS and moving to IaaS as scale demands, and always setting billing alerts to prevent surprise bills.

### Q10: What is the recommended deployment platform for a beginner and why?

**Render** is recommended for beginners because: it has a free tier, supports GitHub integration for automatic deployments, is beginner-friendly without being too abstracted (you still learn real concepts), handles Node.js, Python, Ruby, Docker deployments, and provides managed databases. It avoids the motivation-killing complexity of raw AWS while still teaching genuine deployment workflow.

---

## Summary: Deployment Levels at a Glance

| Level | Users | RPS | Key Tool | Key Change | Bottleneck |
|---|---|---|---|---|---|
| **1** | 0–1K | 1–20 | Render (free) | Single server | Single point of failure |
| **2** | 1K–10K | 20–400 | VPS + managed DB | Dedicated server | DB connection pool |
| **3** | 10K–100K | 100–1K | LB + Redis + Replicas | Multiple servers, cache | DB write load |
| **4** | 100K–1M | 1K–15K | AWS/GCP + Queue + Workers | Distributed services | Data sync, write contention |
| **5** | 1M+ | 10K+ | Kubernetes + Kafka | Full microservices | Network latency, region failures |

---

*Deployment Guide | Next: Hands-on coding — deploying a full-stack app on Render and then AWS EC2*  
*Reference: AWS Well-Architected Framework | DigitalOcean tutorials | Render docs*
