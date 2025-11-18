# Taskee

A modern, full-stack todo web application with authentication built using React, Express, PostgreSQL, and Mantine UI.

## Live Demo

- **Frontend**: [https://taskee-manager.vercel.app/dashboard](https://taskee-manager.vercel.app/dashboard)
- **Backend API**: [https://taskee-k4pn.onrender.com/](https://taskee-k4pn.onrender.com/)

## Features

-  **User Authentication** - Secure JWT-based authentication system
-  **Task Management** - Create, read, update, and delete tasks
-  **Modern UI** - Beautiful interface powered by Mantine UI
-  **Responsive Design** - Works seamlessly on desktop and mobile devices
-  **Protected Routes** - Secure API endpoints and client-side routing
-  **Fast Performance** - Optimized React frontend with efficient backend

##  Tech Stack

### Frontend
- **React 19** - UI library
- **Mantine UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first styling

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

##  Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jayfaculty-design/taskee.git
cd taskee
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/taskee
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Set up the PostgreSQL database:

```bash
# Create database
createdb taskee

# Run migrations (if using migration files)
npm run migrate

# Or manually create tables using your SQL schema
psql -d taskee -f schema.sql
```

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
# or
yarn install
```

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:5173`


##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Author

**Your Name**
- GitHub: [@jayfaculty-design](https://github.com/jayfaculty-design)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/godfred-entsie-952a69223/)
- Email: izfaculty12@gmail.com

##  Acknowledgments

- [Mantine UI](https://mantine.dev/) for the amazing component library
- [React](https://react.dev/) team for the excellent framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [PostgreSQL](https://www.postgresql.org/) for the reliable database


---
