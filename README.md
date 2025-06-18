# AQI Database Management System

A comprehensive Air Quality Index (AQI) monitoring and management system built with Next.js, Express.js, and Oracle Database.

## 🌟 Project Overview

The AQI Database Management System is designed to monitor, analyze, and disseminate air quality information across various cities in India. The system provides real-time air quality data, weather correlations, personalized health advisories, and user feedback mechanisms to support public health decision-making.
## 🛠️ Technology Stack

- **Frontend**: Next.js (React framework)
- **Backend**: Express.js (Node.js)
- **Database**: Oracle Database
- **Architecture**: Three-tier architecture

## ✨ Key Features

- 🗺️ **Interactive AQI Map**: Visual representation of air quality across India
- 📊 **Real-time Monitoring**: Live air quality data from monitoring stations
- 🏥 **Health Advisories**: Personalized health recommendations based on AQI levels
- 🌤️ **Weather Integration**: Correlation between weather patterns and air quality
- 👤 **User Management**: Secure authentication and role-based access
- 💬 **Feedback System**: User feedback collection and moderation
- 📱 **Responsive Design**: Cross-device compatibility

## 🏗️ System Architecture

The system implements a three-tier architecture:

1. **Presentation Layer**: Next.js frontend with interactive dashboards
2. **Application Layer**: Express.js backend with business logic
3. **Data Layer**: Oracle database with normalized schema (BCNF)

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager  
- **Oracle Database** (19c or later)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/galactonebulose/AQIProject.git
cd AQIProject
```

### 2. Install Dependencies

For the frontend (Next.js):
```bash
# Navigate to the frontend directory
cd frontend
npm install
# or
yarn install
```

For the backend (Express.js):
```bash
# Navigate to the backend directory  
cd backend
npm install
# or
yarn install
```

### 3. Database Setup

#### Oracle Database Configuration

1. **Install Oracle Database** (if not already installed)
2. **Create Database User:**
   ```sql
   CREATE USER aqi_user IDENTIFIED BY your_password;
   GRANT CONNECT, RESOURCE TO aqi_user;
   GRANT CREATE SESSION TO aqi_user;
   ```

3. **Create Database Tables:**
   ```sql
   -- Execute the provided SQL schema file
   @database/schema.sql
   ```

4. **Configure Database Connection:**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_PORT=1521
   DB_SERVICE=xe
   DB_USER=aqi_user
   DB_PASSWORD=your_password
   ```

### 4. Environment Configuration

#### Frontend Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
```

#### Backend Environment (.env)
```env
PORT=3001
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=xe
DB_USER=aqi_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### 5. Run the Application

#### Start the Backend Server
```bash
cd backend
npm run dev
# or
yarn dev
```
The backend server will start on `http://localhost:3001`

#### Start the Frontend Application
```bash
cd frontend
npm run dev
# or  
yarn dev
```
The frontend application will start on `http://localhost:3000`

## 📖 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:3000`

2. **User Registration**: Create a new account or use existing credentials

3. **Explore Features**:
   - View the interactive AQI map of India
   - Search for specific cities
   - Check detailed air quality metrics
   - Read personalized health advisories
   - Provide feedback on the system

4. **Administrative Access**: Contact system administrators for elevated privileges

## 🗃️ Database Schema

The system uses a normalized Oracle database with the following main tables:

- **Users**: User authentication and profile information
- **City**: Geographic and demographic data
- **MonitoringStation**: Physical monitoring equipment data
- **Weather**: Meteorological readings
- **HealthAdvice**: Health recommendations and guidelines
- **Feedback**: User comments and suggestions

## 🔧 Development
### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
