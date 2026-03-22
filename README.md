# 🚀 CampusEventHub
CampusEventHub provides a centralized platform for colleges to host and manage  various events such as sports competitions, hackathons, cultural fests, and workshops.  Students from different colleges can browse upcoming events, register for participation,  and track event details seamlessly.

---

## ✨ Key Features

### 👤 Authentication & Authorization
- JWT-based secure login/signup  
- Role-based access (Student / Admin / Super Admin)  
- Context-based auth handling  

### 📅 Event Management
- Create, update, delete events  
- Categorization (Hackathons, Sports, Cultural, etc.)  
- Event scheduling & location tracking  

### 🔍 Event Discovery
- Advanced filtering (date, category, college)  
- Detailed event pages  

### 📝 Registration System
- One-click event registration  
- Admin approval/rejection system  
- Participant tracking  

### 💬 Community Interaction
- Event feedback & ratings  
- Comments/discussions  

### 📊 Admin Dashboard
- User & event analytics  
- Registration insights  
- System activity monitoring  

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Context API
- Tailwind CSS / CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

**Other Tools**
- JWT Authentication  
- REST APIs  
- Multer (File Uploads)  

---

## 📂 Project Structure

CampusEventHub/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── LICENSE

---

## ⚙️ Installation & Setup

### 🔹 Clone Repository
```bash
git clone https://github.com/your-username/campuseventhub.git
cd campuseventhub
🔹 Backend Setup
cd backend
npm install

Create .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run backend:

npm run dev
🔹 Frontend Setup
cd frontend
npm install
npm run dev

🔗 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/events	Get all events
POST	/api/events	Create event
POST	/api/register	Register for event

🚀 Deployment
Frontend (Vercel)
Import repo
Select /frontend folder
Add environment variables
Deploy
Backend (Render)
Create Web Service
Root directory: /backend
Add environment variables
Deploy

---
## 📈 Future Enhancements
🔔 Real-time notifications
💳 Payment integration
🤖 AI-based recommendations
📱 Mobile app
🧠 What I Learned
Full MERN stack architecture
Authentication using JWT + Context API
REST API development
Role-based access control
Scalable project structuring
🤝 Contributing

Contributions are welcome! Fork the repo and submit a PR.
---

### 📄 License

MIT License
---

### 👨‍💻 Author

Abhishek Agarwal
---

If you like this project, give it a ⭐ on GitHub!
