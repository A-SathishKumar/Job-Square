# Job Square — Enterprise Architecture & Security Documentation

**Platform:** Executive HR Advisory & Strategic Human Capital Platform  
**Architecture Paradigm:** Domain-Driven Design (DDD) & MERN-Stack Full-Stack Architecture  
**Security Standard:** OWASP Top 10 Native Hardening & Zero-Vulnerability Compliance  

---

## 1. System Architecture Overview

Job Square is structured into a modular, decoupled full-stack architecture engineered for high-availability enterprise advisory mandates, confidential lead triage, and empirical research delivery.

```
job-square/
├── server/
│   ├── config/
│   │   └── db.ts                 # Multi-tier persistence adapter (MongoDB + In-Memory Failover)
│   ├── middleware/
│   │   ├── authMiddleware.ts     # JWT, HTTP-only cookie parsing, RBAC authorization
│   │   ├── errorMiddleware.ts    # Centralized sanitized error handler (OWASP A05)
│   │   ├── rateLimiter.ts        # Tiered rate limiting (General API: 100/15m; Sensitive: 10/15m)
│   │   └── sanitizeMiddleware.ts # NoSQL injection prevention & XSS script sanitizer
│   ├── models/
│   │   ├── Consultation.ts       # Advisory inquiry entity, indexing, reference code generator
│   │   ├── Practice.ts           # 5 Strategic practices, deliverables, quantitative metrics
│   │   ├── Whitepaper.ts         # Research dossiers, downloads counter, preview generator
│   │   ├── CaseStudy.ts          # Cross-industry proof points & attributable testimonials
│   │   └── User.ts               # Executive partner & admin schema (bcrypt 12 rounds, lockout)
│   ├── controllers/
│   │   ├── authController.ts     # Executive session authentication, lockout tracking
│   │   ├── consultationController.ts # Booking validation, reference assignment, email alerts
│   │   └── practiceController.ts # Practices, research downloads, and case filtering
│   ├── routes/
│   │   ├── authRoutes.ts         # Auth route bindings with strict rate limiting
│   │   ├── consultationRoutes.ts # Public inquiry capture & protected partner triage
│   │   └── practiceRoutes.ts     # Public practice & research endpoints
│   ├── utils/
│   │   ├── logger.ts             # Structured JSON logger with security audit categorization
│   │   └── sendEmail.ts          # Corporate transactional email dispatch utility
│   ├── .env.example              # Production environment specifications
│   └── server.ts                 # Standalone backend service entry point
├── src/
│   ├── api/
│   │   └── apiClient.ts          # Typed fetch client with credentials & error handling
│   ├── components/
│   │   ├── Navbar.tsx            # Top Bar Contract (Wordmark · 4 Nav Links · 1 Primary Action)
│   │   ├── Hero.tsx              # 2-Column executive focal point & 4-pillar proof strip
│   │   ├── PracticeTabs.tsx      # Tabbed navigator for 5 strategic practices
│   │   ├── Methodology.tsx       # 4-Step HR transformation roadmap (Discovery to Governance)
│   │   ├── CaseStudies.tsx       # Filterable cross-industry proof cases & testimonials
│   │   ├── Insights.tsx          # Downloadable research publications & preview modal
│   │   ├── ConsultationModal.tsx # Multi-step booking modal with instant reference receipt
│   │   ├── AdvisoryPortal.tsx    # Protected Managing Partner dashboard & triage workflow
│   │   └── Footer.tsx            # Fiduciary disclosures, global desks, legal notices
│   ├── hooks/
│   │   └── useConsultation.ts    # Custom React hook for corporate lead capture
│   ├── assets/images/            # High-fidelity visual assets generated via Gemini
│   ├── App.tsx                   # Top-level client composition
│   ├── main.tsx                  # React 19 entry point
│   └── index.css                 # Tailwind CSS v4 styling & typography
├── server.ts                     # Full-stack production entry point (Express + Vite Middlewares)
├── docker-compose.yml            # Multi-service container orchestration (Mongo, API, Web)
├── Dockerfile.backend            # Non-root multi-stage container for backend service
└── Dockerfile.frontend           # Multi-stage Nginx container with SPA routing
```

---

## 2. OWASP Top 10 Security Architecture

| OWASP Vulnerability | Implementation in Job Square |
| :--- | :--- |
| **A01: Broken Access Control** | `authMiddleware.ts` verifies JWT tokens signed with HS256 secret. `authorize('admin', 'partner')` strictly guards partner triage endpoints and prevents horizontal privilege escalation. |
| **A02: Cryptographic Failures** | Passwords hashed using `bcryptjs` with 12 computational rounds (`hashPassword`). JWT tokens delivered in `httpOnly`, `secure`, `sameSite: 'lax'` cookies. IP addresses hashed via SHA-256 with secret salt (`hashIp`). |
| **A03: Injection (NoSQL & SQL)** | `sanitizeMiddleware.ts` automatically traverses incoming `req.body`, `req.query`, and `req.params`, stripping keys prefixed with `$` or containing `.` operators. Prevents prototype pollution (`__proto__`, `constructor`, `prototype`). |
| **A04: Insecure Design** | Anti-enumeration defenses in login workflows, structured audit logging for security alerts, reference code abstraction (`JS-ADV-XXXX`) preventing sequential ID scanning. |
| **A05: Security Misconfiguration** | `helmet` configured with strict Content Security Policy (CSP), frameguard, referrer policy, HSTS headers. Rate limits enforced on general and sensitive endpoints (`express-rate-limit`). |
| **A06: Vulnerable & Outdated Components** | Minimal vetted dependencies, audited lockfile, zero runtime deprecated packages. |
| **A07: Identification & Auth Failures** | Account lockout mechanism after 5 consecutive failed attempts (`MAX_LOGIN_ATTEMPTS`) for 15 minutes (`isAccountLocked`). Strict password strength validation. |
| **A08: Software & Data Integrity** | Input payload size caps (`150kb`) preventing buffer overflow DoS. Multi-stage Docker containers with non-root runtime users. |
| **A09: Security Logging & Monitoring** | `logger.ts` outputs structured JSON with severity tags (`security`, `audit`, `error`). Logs authentication failures, unauthorized access attempts, and mandate status mutations. |
| **A10: Server-Side Request Forgery (SSRF)** | Sanitized client redirection and whitelist-governed CORS policies (`ALLOWED_ORIGINS`). |

---

## 3. Executive UI/UX Design System Specifications

1. **Top Bar Contract**:
   - Zone 1: Single-element brand wordmark ("Job Square") with monogram mark.
   - Zone 2: 4 single-line clean navigation links with subtle hover underlines ("Strategic Practices", "Advisory Methodology", "Impact & Case Studies", "Executive Insights") + Partner Portal trigger.
   - Zone 3: 1 primary action ("Book Advisory Session").
2. **Typography**:
   - Primary: Plus Jakarta Sans for executive presence and readability.
   - Numerals & Metrics: Tabular figures (`tabular-nums` / JetBrains Mono) ensuring consistent vertical alignment across tables and metric cards.
3. **Zero-Pill Discipline**:
   - Metadata rendered as clean, unboxed text separated by typographic middots (`·`).
   - Cards lead directly with titles; no pill badge sandwiches or decorative pulsing green dots.
4. **Imagery & Scrims**:
   - High-fidelity visual assets with measured gradient scrim overlays to maintain a minimum 4.5:1 text-to-contrast ratio.
