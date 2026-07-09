# AI-First CRM HCP Module – Log Interaction Screen

## Overview

This project is an AI-powered Healthcare Professional (HCP) Customer Relationship Management (CRM) module developed as part of the AIVOA.AI Technical Assignment.

The application enables pharmaceutical field representatives to log Healthcare Professional interactions using either:

- Structured Form
- Conversational AI Assistant

The AI Assistant is powered by LangGraph and Groq LLM, which extracts structured information, generates summaries, recommends follow-up actions, and stores interaction data in a MySQL database.

---

# Features

## Structured Interaction Form

Users can manually log HCP interactions with the following details:

- HCP Name
- Specialty
- Organization
- Interaction Type
- Date & Time
- Attendees
- Topics Discussed
- Materials Shared
- Samples Distributed
- HCP Sentiment
- Outcomes
- Follow-up Actions

---

## AI Chat Assistant

Users can describe an interaction in natural language.

Example:

> Met Dr Sharma today at Apollo Hospital. Discussed CardioPlus. Doctor showed positive interest and requested a brochure. Schedule follow-up next week.

The AI Assistant automatically:

- Extracts HCP information
- Generates interaction summary
- Recommends follow-up actions
- Auto-fills the structured form
- Saves interaction into CRM

---

# Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Axios
- CSS
- Google Inter Font

## Backend

- Python
- FastAPI
- SQLAlchemy
- MySQL

## AI

- LangGraph
- Groq API
- Llama 3.3 70B Versatile

---

# LangGraph Workflow

User Input

↓

LangGraph Agent

↓

Extract HCP Details

↓

Generate Interaction Summary

↓

Recommend Follow-up Actions

↓

Save Interaction

↓

Store in MySQL Database

---

# LangGraph Tools

### 1. Log Interaction

Stores structured HCP interaction data into the CRM database.

---

### 2. Edit Interaction

Updates previously logged interaction records.

---

### 3. Extract HCP Details

Extracts:

- HCP Name
- Organization
- Specialty
- Topics Discussed
- Sentiment
- Follow-up Actions

---

### 4. Summarize Interaction

Creates a concise CRM-friendly summary from the conversation.

---

### 5. Recommend Follow-up

Generates AI-powered recommendations for future engagement with the HCP.

---

# Folder Structure

```
aivoa-hcp-crm/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── routes/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   └── app/
│   │
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /interactions | Fetch all interactions |
| POST | /interactions | Create new interaction |
| PUT | /interactions/{id} | Update interaction |
| POST | /ai/chat-log | AI-powered interaction logging |

---

# Database

Database: **MySQL**

Table:

```
interactions
```

Stores:

- HCP Information
- Interaction Details
- AI Summary
- AI Suggested Follow-up
- Sentiment
- Outcomes

---

# Installation

## Clone Repository

```bash
git clone https://github.com/sanketsable21/aivoa-hcp-crm.git

cd aivoa-hcp-crm
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create `.env`

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/aivoa_crm
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Project Workflow

1. User logs interaction using the form or AI Assistant.
2. Frontend sends request to FastAPI backend.
3. LangGraph processes the interaction.
4. Groq LLM extracts structured information.
5. AI generates summary and follow-up recommendations.
6. Data is stored in MySQL.
7. Frontend displays updated interaction history.

---

# Assignment Deliverables

- React Frontend
- Redux State Management
- FastAPI Backend
- LangGraph Agent
- Groq LLM Integration
- MySQL Database
- AI Chat Interface
- Structured Form
- CRUD APIs
- GitHub Repository
- README
- Video Demonstration

---

# Future Improvements

- User Authentication
- Dashboard Analytics
- Voice-to-Text Support
- Calendar Integration
- Notification System
- Multi-user Role Management

---

# Author

**Sanket Sable**

AI-First CRM HCP Module

Developed as part of the **AIVOA.AI Technical Assignment**

---

# License

This project was created solely for the AIVOA.AI Technical Assignment and is intended for evaluation purposes only.