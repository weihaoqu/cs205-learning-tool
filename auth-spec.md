# Authentication & Usage Analytics Specification

## Initial Idea
Add a login system so students authenticate with their @monmouth.edu email, and an instructor dashboard so Dr. Qu can see student usage data (page visits, time spent, quiz scores, engagement trends).

---

## Overview

### Problem
The CS205 Learning Tool currently has no user accounts. Quiz scores are stored in localStorage and lost when students switch devices. The instructor has no visibility into which students are using the tool, what they're studying, or how they're performing.

### Goals
1. Require student authentication (email + password, @monmouth.edu domain only)
2. Track comprehensive usage data: page visits, time spent, quiz scores, slide views
3. Provide a full analytics dashboard for the instructor at `/admin`
4. Persist quiz results server-side (replace localStorage-only approach)

### Constraints
- Deployed on a single EC2 t2.micro with Docker Compose
- ~30 students per semester
- Must work under the `/cs205` basePath
- No external auth providers (self-hosted)

---

## Users & Roles

### Student
- Registers with @monmouth.edu email + password
- Must log in to access any page (all routes protected)
- Cannot see analytics or other students' data
- Quiz results saved to their account automatically

### Instructor (Admin)
- Hardcoded admin email: `wqu@monmouth.edu`
- Registers like a normal user, but gets admin privileges automatically
- Access to `/admin` dashboard with full class analytics
- Can view per-student drill-down data

---

## Functional Requirements

### F1: Registration
- **Fields**: Full name, email (@monmouth.edu), password
- **Validation**:
  - Email must end with `@monmouth.edu` (case-insensitive)
  - Password minimum 8 characters
  - Email must be unique (no duplicate accounts)
- **No email verification** — trust the domain restriction
- **On success**: Auto-login and redirect to home page
- **Route**: `/register`

### F2: Login
- **Fields**: Email, password
- **Session**: JWT stored in httpOnly cookie, 7-day expiry
- **On success**: Redirect to the page they were trying to access (or home)
- **On failure**: Show "Invalid email or password" (don't reveal which is wrong)
- **Route**: `/login`

### F3: Logout
- Clear the session cookie
- Redirect to `/login`
- Available from the header (user menu or logout button)

### F4: Route Protection
- **All routes** require authentication except `/login` and `/register`
- Unauthenticated users are redirected to `/login`
- Use Next.js middleware to check the session cookie
- After login, redirect back to the originally requested page

### F5: Usage Tracking
Track the following events server-side:

| Event | Data Captured |
|-------|--------------|
| **Page visit** | userId, page path, timestamp |
| **Page leave / time spent** | userId, page path, duration (seconds) |
| **Quiz attempt** | userId, quizId, score, totalPoints, percentage, answers[], timestamp |
| **Slide view** | userId, slide filename, timestamp |

- Page visit tracking: log on each page navigation
- Time spent: track using `visibilitychange` + `beforeunload` events, send via `navigator.sendBeacon`
- Quiz scores: hook into existing `onComplete` callback in `QuizContainer`
- Slide views: log when a slide deck link is clicked

### F6: Instructor Dashboard (`/admin`)
Only accessible by admin user (wqu@monmouth.edu). Returns 403 for non-admin users.

#### Dashboard Sections:

**1. Overview Cards**
- Total registered students
- Active students (last 7 days)
- Average quiz score across all quizzes
- Total page views this week

**2. Module Completion Rates**
- Bar chart: each module shows % of students who visited at least one page
- Drill-down: click a module to see which specific pages were visited

**3. Quiz Performance**
- Table: each quiz with class average score, highest, lowest, attempt count
- Bar chart: score distribution per quiz (e.g., 0-59%, 60-69%, 70-79%, 80-89%, 90-100%)

**4. Activity Timeline**
- Line chart: daily active users over the past 30 days
- Heatmap or bar chart: activity by hour of day / day of week

**5. Per-Student Drill-Down**
- Searchable/sortable student table: name, email, last active, total time, quiz average
- Click a student to see:
  - Pages visited (with timestamps and time spent)
  - Quiz attempts and scores
  - Slide decks viewed
  - Activity timeline for that student

**6. Data Export**
- Export full analytics as CSV (student list, quiz scores, page visits)

---

## Technical Architecture

### Auth Stack
- **Password hashing**: `bcrypt` (via `bcryptjs` for Node.js)
- **Sessions**: JWT tokens in httpOnly, secure, sameSite cookies
- **JWT library**: `jose` (lightweight, works in Edge runtime for middleware)
- **Middleware**: Next.js `middleware.ts` at the app root to protect all routes

### Database
- **PostgreSQL 16** in Docker Compose (new service alongside app + caddy)
- **ORM**: Prisma (type-safe, great Next.js integration, handles migrations)
- **Volume**: Named Docker volume for data persistence

### Database Schema

```
User
├── id          UUID (PK)
├── name        String
├── email       String (unique, @monmouth.edu)
├── password    String (bcrypt hash)
├── role        Enum: STUDENT | ADMIN
├── createdAt   DateTime
└── lastLoginAt DateTime

PageVisit
├── id          UUID (PK)
├── userId      UUID (FK → User)
├── path        String (e.g., "/modules/graphs/bfs")
├── duration    Int? (seconds, updated on page leave)
├── visitedAt   DateTime
└── leftAt      DateTime?

QuizAttempt
├── id          UUID (PK)
├── userId      UUID (FK → User)
├── quizId      String (e.g., "sorting-deep")
├── score       Int
├── totalPoints Int
├── percentage  Float
├── answers     JSON (array of {questionId, isCorrect, userAnswer, timeTaken})
├── completedAt DateTime

SlideView
├── id          UUID (PK)
├── userId      UUID (FK → User)
├── slideFile   String (e.g., "bfs-explained.html")
├── viewedAt    DateTime
```

### API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Authenticate, set cookie |
| POST | `/api/auth/logout` | Clear cookie |
| GET | `/api/auth/me` | Get current user from cookie |
| POST | `/api/tracking/pagevisit` | Log page visit |
| POST | `/api/tracking/pageleave` | Update duration on page leave |
| POST | `/api/tracking/quiz` | Log quiz attempt |
| POST | `/api/tracking/slide` | Log slide view |
| GET | `/api/admin/overview` | Dashboard summary stats |
| GET | `/api/admin/modules` | Module completion data |
| GET | `/api/admin/quizzes` | Quiz performance data |
| GET | `/api/admin/activity` | Activity timeline data |
| GET | `/api/admin/students` | Student list with summary stats |
| GET | `/api/admin/students/[id]` | Per-student detail |
| GET | `/api/admin/export` | CSV export |

### Docker Compose Changes

Add PostgreSQL service:
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: cs205
      POSTGRES_USER: cs205user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:
```

App service gets new environment variables:
```
DATABASE_URL=postgresql://cs205user:${DB_PASSWORD}@db:5432/cs205
JWT_SECRET=${JWT_SECRET}
ADMIN_EMAIL=wqu@monmouth.edu
```

---

## UI/UX Details

### Login Page (`/login`)
- Centered card with CS205 branding
- Email + password fields
- "Login" button
- Link to "/register" below: "Don't have an account? Register"
- Error message area for invalid credentials

### Register Page (`/register`)
- Centered card with CS205 branding
- Full name, email, password, confirm password fields
- Email field shows hint: "Use your @monmouth.edu email"
- Validation errors shown inline
- Link to "/login" below: "Already have an account? Login"

### Header Changes
- When logged in: Show user's name and a logout button (or dropdown menu) in the header
- When not logged in: Show "Login" link (though they'll be redirected anyway)
- Admin user: Show additional "Dashboard" link in header

### Admin Dashboard (`/admin`)
- Full-width layout (no sidebar)
- Top: Overview stat cards (4 across)
- Middle: Charts section (module completion, quiz scores, activity)
- Bottom: Student table with search/sort
- Each chart section is a Card component
- Use a charting library: `recharts` (already React-based, works well with Next.js)

---

## Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Non @monmouth.edu email | Registration rejected with clear message |
| Duplicate email registration | "An account with this email already exists" |
| Expired JWT (after 7 days) | Redirect to /login, show "Session expired" |
| Admin accesses /admin | Show dashboard |
| Student accesses /admin | 403 Forbidden page |
| Page tracking fails (beacon) | Silent failure — don't break the user experience |
| Database down | Show error page, don't crash the app |
| Password too short | Inline validation on register form |

---

## Implementation Plan

### Phase 1: Database + Auth (Core)
1. Add PostgreSQL to Docker Compose
2. Set up Prisma with schema (User model)
3. Create `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
4. Create `/login` and `/register` pages
5. Add Next.js middleware for route protection
6. Update Header with user name + logout
7. **Verify**: Can register, login, access protected pages, get redirected when not logged in

### Phase 2: Usage Tracking
1. Add PageVisit, QuizAttempt, SlideView models to Prisma schema
2. Create tracking API routes (`/api/tracking/*`)
3. Create a `TrackingProvider` client component that wraps the app:
   - Logs page visits on route changes
   - Tracks time spent via `visibilitychange` / `beforeunload` + `sendBeacon`
4. Hook quiz completion into `/api/tracking/quiz`
5. Hook slide link clicks into `/api/tracking/slide`
6. **Verify**: Page visits and quiz scores appear in the database

### Phase 3: Admin Dashboard
1. Create `/admin` route with auth guard (admin only)
2. Build overview cards (total students, active students, avg quiz score, page views)
3. Build module completion chart (recharts BarChart)
4. Build quiz performance table + score distribution chart
5. Build activity timeline (recharts LineChart)
6. Build student table with search/sort
7. Build per-student detail view
8. Add CSV export endpoint
9. **Verify**: Dashboard shows accurate data, charts render correctly

### Phase 4: Integration + Polish
1. Migrate existing localStorage quiz results to server-side on login
2. Test full flow: register → browse modules → take quiz → view in dashboard
3. Update Docker Compose for production with proper secrets
4. Test deployment on EC2

---

## Dependencies (New Packages)

| Package | Purpose |
|---------|---------|
| `prisma` + `@prisma/client` | Database ORM |
| `bcryptjs` + `@types/bcryptjs` | Password hashing |
| `jose` | JWT creation/verification (Edge-compatible) |
| `recharts` | Charts for admin dashboard |

---

## Success Criteria

- [ ] Students can register and login with @monmouth.edu email
- [ ] All pages require authentication
- [ ] Page visits, time spent, quiz scores, and slide views are tracked
- [ ] Instructor can view full analytics at /admin
- [ ] Per-student drill-down shows complete activity history
- [ ] Data persists across sessions and device switches
- [ ] Works correctly under the /cs205 basePath
- [ ] Deploys successfully on EC2 with Docker Compose
