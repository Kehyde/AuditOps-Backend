# **AuditOps Backend**

The **AuditOps Backend** is the core API that powers the AuditOps platform. AuditOps is a tool for managing audits, findings, and reports.  
It’s built with **Node.js**, **Express**, and **MongoDB**, providing a secure and scalable backend for the AuditOps web app.

---

## **Table of Contents**
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Setup Instructions](#setup-instructions)  
5. [API Overview](#api-overview)  

---

## **Overview**

The backend handles all business logic, database operations, and API routing for AuditOps.  
It includes support for creating audits, adding findings, exporting PDFs, and tracking audit progress.

---

## **Features**

- Full CRUD functionality for audits and findings  
- MongoDB integration with Mongoose  
- Automatic PDF export of completed audits  
- CORS and Morgan middleware configuration  
- Clean modular structure for scalability  

---

## **Tech Stack**

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Middleware:** CORS, Morgan  
- **Utilities:** dotenv for environment variables  

---

## **Setup Instructions**

### **1. Prerequisites**

Ensure the following are installed:
- Node.js v18+  
- MongoDB (local or Atlas cluster)

---

### **2. Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/auditops-backend.git
cd auditops-backend

# Install dependencies
npm install
```
---

## **API Overview**

### Audits
| Method | Endpoint           | Description                              |
| ------ | ------------------ | ---------------------------------------- |
| GET    | `/audits`          | Get all audits (includes findings count) |
| GET    | `/audits/:auditId` | Retrieve details for a single audit      |
| POST   | `/audits`          | Create a new audit                       |
| POST   | `/audits/:auditId` | Update an existing audit                 |
| DELETE | `/audits/:auditId` | Delete an audit                          |

### Findings
| Method | Endpoint                               | Description                   |
| ------ | -------------------------------------- | ----------------------------- |
| POST   | `/audits/:auditId/findings`            | Add a new finding to an audit |
| POST   | `/audits/:auditId/findings/:findingId` | Update a specific finding     |
| DELETE | `/audits/:auditId/findings/:findingId` | Delete a finding              |

### PDF Exports
| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/audits/:auditId/export` | Export a specific audit as a PDF report |
