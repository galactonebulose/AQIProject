# Software Requirements Documentation
## Air Quality Index Database Management System

### Version: 1.0

---

## 1. Technology Stack Overview

### 1.1 Database Technology
- **Primary Database**: Oracle Database
- **Database Design**: Relational model with BCNF normalization
- **Data Management**: SQL queries for data operations
- **Integration**: RESTful API connectivity

### 1.2 Frontend Technology
- **Framework**: Next.js (React-based)
- **UI Standards**: Next.js component library standards
- **Authentication**: Secure user login system
- **Features**: Interactive maps, dashboards, real-time data visualization
- **Responsive Design**: Multi-device compatibility

### 1.3 Backend Technology
- **Framework**: Express.js (Node.js)
- **API Design**: RESTful API principles
- **Security**: HTTPS implementation for secure data transfer
- **Authentication**: Password hashing and role-based access control
- **Data Processing**: Real-time sensor data processing

---

## 2. System Architecture

### 2.1 Three-Tier Architecture

#### Presentation Layer
- User interfaces for different stakeholders
- Public access for general users
- Administrative interfaces for system management
- Health professional dashboards
- Environmental agency reporting tools

#### Application Layer
- Business logic components
- Raw sensor data processing
- AQI value calculations
- Health advisory generation
- User interaction management

#### Data Layer
- Oracle database management system
- Air quality measurements storage
- Monitoring station information
- Geographic data management
- Weather parameters storage
- Health guidelines database
- User feedback system

---

## 3. Database Requirements

### 3.1 Core Tables

#### Users Table
- **Primary Key**: UserID
- **Attributes**: FirstName, LastName, Password (hashed), AccountStatus, Mail, PhoneNumber
- **Purpose**: User authentication and contact management

#### City Table
- **Primary Key**: CityID
- **Attributes**: Name, State, Urban_Rural, Lat_Long, Population
- **Purpose**: Geographic and demographic data storage

#### Monitoring Station Table
- **Primary Key**: StationID
- **Attributes**: Lat_Long, Active_Time, DateOfInstallation, AQI
- **Purpose**: Physical monitoring equipment management

#### Weather Table
- **Primary Key**: WeatherID
- **Attributes**: Temp, Humidity, WindSpeed, Rainfall, Timestamp, Category
- **Purpose**: Meteorological data correlation with air quality

#### Health Advice Table
- **Primary Key**: AdvisoryID
- **Attributes**: HealthEffects, Precautions, AgeAffected
- **Purpose**: Health recommendations based on pollution levels

#### Feedback Table
- **Foreign Key**: UserID
- **Attributes**: Comments, Date
- **Purpose**: User feedback collection and system improvement

### 3.2 Database Features
- **Normalization**: BCNF (Boyce-Codd Normal Form)
- **Data Integrity**: Foreign key constraints and triggers
- **Performance**: Optimized queries with response time < 2 seconds
- **Security**: Data encryption and access control

---

## 4. Frontend Requirements

### 4.1 User Interface Features
- **Authentication System**: Secure login/logout functionality
- **Interactive Map**: Visual representation of AQI levels across India
- **City Search**: Efficient city-specific data retrieval
- **Dashboard Views**: Comprehensive air quality metrics display
- **Health Advisory Section**: Age-specific recommendations
- **Feedback System**: User comment and suggestion submission

### 4.2 Display Components
- **AQI Values**: Real-time air quality index display
- **Weather Data**: Temperature, humidity, wind speed, rainfall
- **Health Warnings**: Color-coded alerts based on pollution levels
- **Trend Analysis**: Historical data visualization
- **Mobile Responsive**: Cross-device compatibility

---

## 5. Backend Requirements

### 5.1 API Endpoints
- **User Management**: Authentication, registration, profile management
- **Data Retrieval**: City data, station information, weather data
- **AQI Calculations**: Real-time air quality index computation
- **Health Advisories**: Dynamic recommendation generation
- **Feedback Processing**: User comment handling and moderation

### 5.2 Data Processing
- **Real-time Updates**: Continuous sensor data integration
- **Correlation Analysis**: Weather and pollution level relationships
- **Automated Calculations**: Average humidity, temperature, AQI computation
- **Error Handling**: Exception management for missing data
- **Data Validation**: Content filtering and integrity checks

---

## 6. Integration Requirements

### 6.1 External Systems
- **Monitoring Stations**: Integration with environmental monitoring equipment
- **IoT Sensors**: Support for Internet of Things devices
- **Weather Services**: Meteorological data integration
- **Government APIs**: National air quality data synchronization

### 6.2 Communication Protocols
- **HTTPS**: Secure data transmission
- **RESTful APIs**: Standardized communication interfaces
- **JSON**: Data exchange format
- **SQL**: Database query language

---

## 7. Performance Requirements

### 7.1 Response Time
- **Database Queries**: < 2 seconds for most operations
- **API Responses**: < 1 second for standard requests
- **Real-time Updates**: < 5 minutes for sensor data refresh
- **User Interface**: Immediate response for user interactions

### 7.2 Scalability
- **Multi-city Support**: Expandable to accommodate new locations
- **Concurrent Users**: Support for multiple simultaneous users
- **Data Volume**: Efficient handling of high-frequency sensor data
- **Growth Capacity**: Infrastructure ready for system expansion

---

## 8. Security Requirements

### 8.1 Authentication & Authorization
- **Password Security**: Secure hashing algorithms
- **Role-based Access**: Different permission levels for users
- **Session Management**: Secure user session handling
- **Data Privacy**: Compliance with data protection regulations

### 8.2 Data Protection
- **Encryption**: Sensitive data encryption at rest and in transit
- **Access Control**: Restricted database access
- **Audit Trails**: User action logging and monitoring
- **Backup & Recovery**: Data backup and disaster recovery procedures