
## 🌾 **Fasal Suraksha – The Modern Solution for Crop Protection**

### 📌 **Overview**

Fasal Suraksha is a **multilingual mobile application** designed to help farmers protect their crops by providing **real-time weather-based disease alerts**, **crop registration**, and **NDVI-based crop health analysis**.
The system integrates a **React Native frontend (Expo)**, a **Node.js backend**, and an **SMS alert feature** to ensure timely information delivery.

---

### ✅ **Key Features**

* 🌐 **Multilingual Support** – Farmers can select their preferred language.
* 🧾 **User Management** – Secure Sign-Up, Login with OTP verification, and password validation.
* 🛠 **Crop Registration** – Easy registration with a user-friendly interface.
* 🌦 **Weather Integration** – Fetches live weather data based on user location.
* 📲 **SMS Alerts** – Sends crop disease prevention tips via SMS based on weather conditions.
* 🛰 **NDVI Analysis** – Uses Sentinel Hub API for crop health monitoring.
* 🔐 **Unique User ID System** – For storing language preference and user metadata.

---

### 🛠 **Tech Stack**

**Frontend:**

* React Native (Expo)
* JavaScript
* React Navigation

**Backend:**

* Node.js & Express
* Sentinel Hub API for NDVI calculations

**Database:**

* PostgreSQL / MongoDB (Based on your setup)

**Other Tools:**

* Twilio / Any SMS API for alerts
* OpenWeather API (for weather data)
* Figma for UI design

---

### 📂 **Project Structure**

```
fasal-suraksha/
│
├── fasal_suraksha Frotend/       # React Native App (Expo)
├── fasal_suarksha_backend/       # Node.js Backend (API & NDVI)
├── sms-backend/                  # SMS Notification System
└── README.md                     # Project Documentation
```

---

### 🚀 **Installation**

#### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/fasal-suraksha.git
cd fasal-suraksha
```

#### **2. Install Frontend Dependencies**

```bash
cd "fasal_suraksha Frotend"
npm install
```

#### **3. Install Backend Dependencies**

```bash
cd ../fasal_suarksha_backend
npm install
```

#### **4. Run the Frontend (Expo)**

```bash
npm start
```

#### **5. Run the Backend**

```bash
node server.js
```

---

### ⚙ **Environment Variables**

Create a `.env` file in the backend with:

```
PORT=5000
OPENWEATHER_API_KEY=your_api_key
SENTINELHUB_API_KEY=your_api_key
SMS_API_KEY=your_api_key
```

---

### 🖼 **Screenshots**

(Add app screenshots here)

* Language Selection Page
* Home Page
* Crop Registration Page
* Weather Alert SMS

---

### 📢 **Future Enhancements**

* ✅ AI-based disease prediction
* ✅ Voice-based assistant for farmers
* ✅ Offline mode support

---

### 👨‍💻 **Contributors – The AgroTech Avengers**

* **Miss. Nouf Akhlaq Ahmed Bamne** – Team Lead, Backend Developer
* **Mr. Sourav Sachin Pujari** – Frontend Developer
* **Miss. Mahin Mohamed Mohsin Dhansay** – Backend Developer
* **Miss. Sharwari Naresh Shinde** – Project Coordinator
* **Mr. Lavesh Sanjay Avhad** – Frontend Developer
* **Mr. Prayag Sandip Jangam** – Version Control & Figma Designer

---

### 📜 **License**

This project is licensed under the **MIT License**.
