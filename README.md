# **HireMe**



###### An AI-powered Resume Builder \& ATS Score Checker

###### 

###### HireMe helps job seekers create professional resumes in minutes and instantly get insights into how well their resume performs against Applicant Tracking Systems (ATS). Built with MERN stack and AI integration, it’s designed to be simple, fast, and effective.



##### 📂 Project Structure

HireMe/

│── client/                 # React frontend

│   ├── package.json

│   ├── package-lock.json

│   ├── README.md

│   ├── public/

│   └── src/

│       ├── Components/

│       │   ├── Navbar.js

│       │   ├── Footer.js

│       │   ├── ATS.js

│       │   ├── ResumeForm.js

│       │   ├── ResumePreview.js

│       │

│       ├── Styles/

│       │   ├── Navbar.css

│       │   ├── Footer.css

│       │   ├── ResumeForm.css

│       │   ├── ResumePreview.css

│       │   ├── ATS.css

│       │   ├── ResumeLayout.css

│       │

│       └── other default React files

│

│── server/                 # Node.js backend

│   ├── src/

│   │   ├── config/db.js

│   │   ├── models/Resume.js

│   │   ├── routes/resumeRoutes.js

│   │   ├── controllers/resumeController.js

│   │   ├── services/atsService.js

│   │   └── utils/extractData.js

│   ├── server.js

│   ├── .env

│   └── package.json



##### ✨ Features



✅ Create and preview resumes instantly

✅ Get AI-powered ATS scores and feedback

✅ Clean and responsive UI with React

✅ Secure backend with Node.js \& MongoDB

✅ Easy-to-extend architecture (export to PDF, etc.)



##### 🛠️ Tech Stack



Frontend (client): React, CSS Modules

Backend (server): Node.js, Express.js, MongoDB

AI Integration: Groq API (for ATS scoring logic)



##### 🚀 Getting Started

###### 1️⃣ Clone the Repository

git clone https://github.com/your-username/HireMe.git

cd HireMe



###### 2️⃣ Setup Backend

cd server

npm install





*Create a .env file in /server with:*



MONGO\_URI=your\_mongo\_connection\_string

AI\_API\_KEY=your\_groq\_or\_openai\_key

PORT=5000





*Start the server:*



npm start



###### 3️⃣ Setup Frontend

cd client

npm install

npm start





Frontend will run on http://localhost:3000



Backend will run on http://localhost:5000



##### 🤝 Contributing



Pull requests are welcome! Feel free to fork this project and make improvements.



##### 📜 License



This project is licensed under the MIT License.

