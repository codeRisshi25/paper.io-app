# Paper.io - Modern Blog Editing/Publishing Platform

![Paper.io Logo](https://placeholder.com/logo)

## Overview

Paper.io is a full-stack blogging platform that makes it easy to create, edit, and publish stunning blogs. Built with React, Next.js, Node.js, and MongoDB, Paper.io offers an intuitive rich text editor and streamlined workflow for content creators.

## Features

- **User Authentication**: Secure login and registration system
- **Rich Text Editor**: Create beautifully formatted blog posts
- **Draft Management**: Save drafts and publish when ready
- **Blog Management**: Organize, edit, and delete your published content
- **Tag Support**: Categorize your blogs with tags for better organization
- **Responsive Design**: Beautiful interface that works on all devices
- **Dark/Light Mode**: Choose your preferred theme

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Motion for animations

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cookie-based sessionsPublishing.

## Project Structure

```
blogforge-app/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js application routes
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── providers/     # Context providers
│   │   └── lib/           # Utility functions and types
│   └── public/            # Static assets
│
└── backend/               # Express.js backend application
    ├── config/            # Configuration files
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware
    ├── models/            # Database models
    ├── routes/            # API routes
    └── services/          # Business logic
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/paper-io.git
cd paper-io
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
```
# Create a .env file in the backend directory
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/paperio
CLIENT_URL=http://localhost:5173
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Set up frontend environment:
```
# Create a .env.local file in the frontend directory
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Running the Application

#### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

#### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production servers:
```bash
# Frontend
npm run start

# Backend
npm run start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout a user

### Blogs
- `POST /api/blogs/drafts` - Save a blog draft
- `POST /api/blogs/publish/:blogId` - Publish a draft blog
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:blogId` - Get a specific blog
- `GET /api/blogs/my-blogs` - Get current user's blogs
- `DELETE /api/blogs/:blogId` - Delete a blog

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the beautiful component library
- Next.js team for the amazing React framework
- MongoDB for the flexible document database

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

If you have any questions, feel free to reach out to us at contact@paper.io.

Similar code found with 2 license types