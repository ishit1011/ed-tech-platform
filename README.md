# **Learners Ed-Tech Platform**

## **Description**
The Learners Ed-Tech Platform is a comprehensive e-learning solution designed to facilitate seamless online education. This platform implements a secure **Role-Based Access Control (RBAC)** system, ensuring proper authentication and authorization across its user base. It offers features for administrators, educators, and learners, such as course creation, lecture management, secure payments, and user role assignments.

### User Roles
- **Superadmin:** Oversees the entire platform and manages user roles.  
- **Admin (Teacher):** Creates and manages courses and lectures.  
- **User (Student):** Purchases courses and accesses learning materials.  

The platform incorporates secure APIs for authentication, authorization, and core functionality, including **JWT-based user sessions**, **OTP-based verification**, and **Razorpay integration** for secure payments. The frontend, developed using React, ensures an engaging user experience with a robust context-based state management system.

---



## **Setup Instructions (to run locally)**
Clone the project

```bash
  git clone https://github.com/ishit1011/ed-tech-server
```

Install dependencies

```bash
  npm install
```

Clone the repository and navigate to the `server` folder:
   ```bash
   cd server
  npm start
```

Clone the repository and navigate to the `frontend` folder:
   ```bash
  cd frontend
  npm run dev
```

## **Deployed Links**
- **Backend:** [Deployed on Render](https://ed-tech-server-gfhp.onrender.com)
- **Frontend:** [Deployed on Vercel](https://ed-tech-frontend-nine.vercel.app/)

---

## **Role-Based Credentials [accounts already created]**

### Superadmin
- **Email:** `singhishit.06@gmail.com`  
- **Password:** `abc123`  

### Admin (Teacher)
- **Email:** `crossbaredits@gmail.com`  
- **Password:** `abc123`  

### User (Student)
- **Email:** `isingh2_be21@thapar.edu`  
- **Password:** `abc123`  

---

## **API Routes**

### Authentication APIs
- **Register a User:** `POST /user/register`  
- **Verify User:** `POST /user/verify`  
- **Login User:** `POST /user/login`  

### Admin APIs
- **Create a Course:** `POST /course/new`  
- **Add Lectures:** `POST /course/:id`  
- **Delete a Course:** `DELETE /course/:id`  

### User APIs
- **Fetch All Courses:** `GET /course/all`  
- **Purchase a Course:** `POST /course/checkout/:id`  

---

## **Dependencies**

### Backend Dependencies
```json
{
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "crypto": "^1.0.1",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.8.0",
  "mongoose": "^8.5.1",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.14",
  "razorpay": "^2.9.4",
  "uuid": "^10.0.0"
}

```
### Frontend Dependencies
```json
{
  "axios": "^1.7.2",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-google-recaptcha": "^3.1.0",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^5.2.1",
  "react-router-dom": "^6.25.1"
}

```

----

## **My Role in Implementing RBAC**

### Backend Development
- Created and secured APIs for **Authentication** and **Authorization** using JWT.  
- Developed controllers and routes for role-specific functionalities, ensuring precise access control.  
- Designed and implemented models for **Users**, **Courses**, **Lectures**, and **Payments** using MongoDB.  
- Ensured secure password handling using hashing algorithms and session management.  
- Implemented RBAC logic to restrict access based on roles across endpoints.  
- Integrated **Razorpay** for payment processing and built the verification mechanism.  

### Frontend Integration
- Designed user flows for role-based features, such as course purchase (users), lecture management (admins), and dashboard analytics (superadmins).  
- Developed reusable context providers (**CourseContext** and **UserContext**) for efficient data fetching and state management.  

### Security Enhancements
- Enforced **OTP-based verification** for user registration.  
- Applied validation and middleware to protect sensitive endpoints from unauthorized access.  


---

## **Features**

### Authentication & Authorization
- OTP-based user verification for registration.
- JWT-based session management.
- Secure password storage using hashing.

### Role-Based Access Control (RBAC)
- **Superadmin:** Full control, including user role management and platform analytics.
- **Admin (Teacher):** Add and manage courses and lectures.
- **User (Student):** Purchase courses and access enrolled learning materials.

### Course Management
- Add and update courses and lectures.
- Fetch course details and access individual lectures.

### Payment Integration
- Razorpay-powered secure payment system.
- Frontend payment flow with backend verification mechanisms.

### Frontend Features
- Dynamic React-based pages, including Auth, Dashboard, Courses, and Profile pages.
- Context API integration for managing courses and users.

---

## **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Frontend:** React.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payment Gateway:** Razorpay  

---

### **License**
This project is open-source and available under the MIT License.

---

