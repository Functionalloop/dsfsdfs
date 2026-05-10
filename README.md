# Traveloop

Traveloop is a comprehensive, full-stack travel planning and management platform designed to help users explore destinations, build robust itineraries, and manage their trips effortlessly.

## Features

- **Interactive Dashboards**: Advanced administrative and user dashboards.
- **Dynamic Trip Planning**: Filter cities by region and budget, add to itineraries.
- **Real-time Data Sync**: Powered by Firebase Firestore for robust cloud synchronization.
- **Authentication**: Secure user login with Firebase Authentication.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Lucide Icons for a beautiful, responsive experience.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A Firebase project with Firestore and Authentication enabled

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd FuntionalTraval
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Ensure you have a `.env` file in the root directory with your Firebase configuration. You can use `.env.example` as a template.

4. **Run the Application**:
   Start the frontend:
   ```bash
   npm run dev
   ```
   Start the backend (in a separate terminal):
   ```bash
   npm run dev:backend
   ```

### Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: Firebase Firestore
