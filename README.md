 # Contract Management Platform — Frontend

##  Project Overview

This is the **frontend application** of a **Contract Management Platform** built with **React**, **TypeScript**, and **Tailwind CSS**.  
It demonstrates product thinking, clean UI design, state management, and structured architecture — all built from scratch with no UI templates provided.

Users can:
- Create **Blueprints** (reusable contract templates)
- Generate **Contracts** from those blueprints
- Fill values for contract fields
- View contracts in a **Dashboard**
- Track contract status

> This is a frontend-only app; state is stored in React Context and does not persist after refresh.

---

##  Live Demo

https://contract-management-frontend-pi.vercel.app/

---

##  Tech Stack

- **React** (component-based UI)
- **TypeScript** (type safety)
- **React Router DOM** (navigation)
- **Tailwind CSS** (utility-first styling)
- **React Context** (global state for contracts & blueprints)

---

##  Folder Structure

src/
├── components/     # Reusable components (Navbar, Buttons, etc.)
├── context/        # AppContext for global state
├── pages/          # Page components (Home, Dashboard, Blueprints, Contracts)
├── types/          # TypeScript types
├── App.tsx         # Routes
├── main.tsx        # App entry
└── index.css       # Tailwind import


---

##  Features

###  Blueprint Creation
- Create templates with configurable fields
- Supported field types: Text, Date, Checkbox, Signature

###  Contract Creation
- Select a blueprint to generate a contract
- Fill in field values
- New contracts appear in the Dashboard automatically

###  Dashboard
- Shows a list of all created contracts
- Displays contract name, blueprint, status, and date
- Empty state shows a message if no contracts exist

###  Navigation
- Global Navbar with links to Home, Dashboard, Blueprints, Contracts

---

##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejasDeore24/contract-management-frontend.git
   cd contract-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open app in browser
http://localhost:5173

---

 **Steps to finalize quickly:**

1. Copy this entire content.  
2. Open your local project → **edit `README.md`** → paste it.  
3. Commit and push:

```bash
git add README.md
git commit -m "Add final README for assignment"
git push
