```markdown
# 🎓 Online Course Platform - Frontend

A responsive, scalable, and dynamic frontend interface for an online course platform built with **React 19**, **Vite**, and **Tailwind CSS**. The system implements role-based user interfaces (RBAC) for Admin, Tutor, and Student roles, providing a seamless educational and management experience.

> **📢 Team Project Shoutout:** > This frontend application is part of a comprehensive team project (Software Engineering Course). While the project was built collaboratively, **the features and pages highlighted in the "My Contributions" section below were solely developed by me.** For the backend implementation, please check out our [Backend Repository](#) (link to your team's BE repo).

![Demo GIF](demo.gif)

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [My Contributions & Features](#my-contributions--features)
- [Architecture & Routing](#architecture--routing)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)

---

## 🎯 Overview

This frontend application consumes the RESTful Express.js Backend API to support:
- **Multi-role navigation**: Distinct portals for Admin, Tutor, and Student.
- **Course management UI**: Interfaces for creating, viewing, and approving courses.
- **Interactive learning space**: Student dashboards for tracking progress and reviewing courses.
- **Modern UI/UX**: Accessible and responsive components utilizing Radix UI and Tailwind CSS.

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Core UI** | React | 19.x |
| **Build Tool** | Vite | 7.x |
| **Styling** | Tailwind CSS | 3.x / 4.x |
| **UI Components**| Radix UI | Latest |
| **Routing** | React Router DOM | 7.x |
| **HTTP Client** | Axios | 1.x |
| **Icons** | Lucide React | Latest |
| **Linting** | ESLint | 9.x |

---

## ✨ My Contributions & Features

As a Front-End Developer on this project, I was directly responsible for designing and implementing the following core pages and logical flows:

### 👨‍🏫 Tutor Portal (Instructor)
- ✅ **Tutor Dashboard**: Built the analytics overview interface displaying course metrics and key performance indicators.
- ✅ **Add Course**: Developed the complex multi-step form for course creation, integrating modular inputs for course metadata and lesson structures.
- ✅ **My Course**: Created the management interface for tutors to view, filter, and track their published or drafted courses.

### 👨‍🎓 Student Portal
- ✅ **Student Profile**: Implemented the user settings and profile management page.
- ✅ **My Learning (My Course)**: Built the interactive course viewer where students can access enrolled lessons and track their learning progress.
- ✅ **Review Course**: Developed the UI for submitting and reading course ratings and feedback.

### 🛡️ Admin Portal
- ✅ **Course Approval Dashboard**: Implemented the administrative interface for reviewing pending courses, complete with approve/reject action workflows.

---

## 🏗️ Architecture & Routing

The project follows a **component-driven architecture** for maintainability and reusability:

```text
User Action → Page Component → Services (Axios) → Backend API
                    ↓
            State Update (React)
                    ↓
              UI Re-rendering

```

### 1. Component Abstraction

* **UI Atoms**: Reusable accessible components built with Radix UI and Tailwind (e.g., Dialogs, Accordions, Tabs).
* **Layouts**: Role-specific wrappers (TutorLayout, AdminLayout, StudentLayout) containing dedicated sidebars and navbars.

### 2. Client-Side Routing & Protection

Utilized `react-router-dom` to handle single-page navigation and protect routes based on authentication state and user roles (RBAC):

* Unauthenticated users are redirected to `/login`.
* Students attempting to access `/admin` or `/tutor` routes are caught by a protected route wrapper and redirected to an unauthorized page.

---

## 📁 Project Structure

```text
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, global stylesheets
│   ├── components/        # Shared UI components (Buttons, Modals)
│   │   ├── ui/            # Radix UI wrapper components
│   │   └── layout/        # Navbar, Sidebar components
│   ├── pages/             # Route-level components
│   │   ├── admin/         # CourseApproval.jsx
│   │   ├── student/       # Profile.jsx, MyCourse.jsx, ReviewCourse.jsx
│   │   ├── tutor/         # Dashboard.jsx, AddCourse.jsx, MyCourse.jsx
│   │   └── auth/          # Login, Register
│   ├── services/          # Axios instances and API endpoint definitions
│   ├── routes/            # React Router configurations (PrivateRoutes)
│   ├── hooks/             # Custom React Hooks
│   ├── utils/             # Helper functions (date formatting, etc.)
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind design system configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file

```

---

## 🚀 Setup & Installation

### Prerequisites

* **Node.js**: v18 LTS or higher
* **npm** or **yarn**

### Step 1: Clone Repository

```bash
git clone https://github.com/breadncatto/CourseCamp-Frontend.git
cd CourseCamp-Frontend

```

### Step 2: Install Dependencies

```bash
npm install

```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env  # Or create manually based on the section below

```

### Step 4: Start Development Server

```bash
npm run dev

```

The application will be running at `http://localhost:5173/` (or port specified by Vite).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables to connect to the backend server:

```ini
# API Connection
VITE_API_BASE_URL="http://localhost:3000/api"

# Feature Flags / App Configs
VITE_APP_NAME="CourseCamp Frontend"

```

---

## 💻 Development Workflow

### Feature Branching

```bash
# Create a new branch for a feature
git checkout -b feature/tutor-dashboard

# Commit changes
git add .
git commit -m "feat: implement tutor dashboard layout and metrics"

# Push to remote
git push origin feature/tutor-dashboard

```

### Testing UI

* Run `npm run lint` to ensure code quality via ESLint.
* Ensure all responsive breakpoints (Tailwind `sm`, `md`, `lg`) are verified using Chrome DevTools.

---

**Last Updated**: June 2026

**Maintained by**: DATH Team
