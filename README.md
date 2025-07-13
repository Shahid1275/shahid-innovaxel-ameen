# Url Shortner System Task

A MERN stack application that allows:
- **Users**: Create, update, read, and delete Urls and also see the stats and get all the urls.

- ## Installation

# 1 Clone the repository
- git clone https://github.com/Shahid1275/shahid-innovaxel-ameen.git

- # 2 Navigate into the project directory
- cd shahid-innovaxel-ameen

- # 3 List all remote branches to confirm the dev branch exists
- git branch -a

- # 4 Check out the dev branch locally
- git checkout dev

  
- ## Requirements

- Node.js (v20.x or later)
- Mongodb
- `npm`

## Environment Variables

Create a `.env` file in the root of backend directory. The file should contain the following variables:

### Backend (.env, .env.development, .env.production.)

```env
# Backend
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.prexe4i.mongodb.net
PORT=5000

NOTE: change the scripts in package.json depending upon your os to set NODE environment.
```

### Starting the Application

### Backend

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will be running on `http://localhost:5000` by default.

### Frontend

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend application will be running on `http://localhost:5173` by default.


## Database Setup

Ensure you have mongodb or your preferred database set up. Create a database for the appointment application.

1. **Create Database:**

   Connect to your database and create a new database:

2. **Update `.env` File:**

   Update the `MONGODB_URI` variable in the `.env` file with your database credentials.

The passwords are stored in hashed form for security. Ensure your application uses appropriate hashing methods to match this data.

## Features

- **User Dashboard Management**: Manage, edit, and delete urls and also see the stats in a responsive React-based interface.
- **Fully Responsive UI**: Clean and modern design optimized for all devices.
- **Crud Operations**:Create, update, read, and delete and get all urls with stats.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and ensure tests pass.
4. Submit a pull request with a description of your changes.
---
