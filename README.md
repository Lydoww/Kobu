# Kōbu - Modern Kanban Board Application

A full-stack Kanban board application built with React and Node.js, featuring drag-and-drop functionality, real-time state management, and a modern UI.

<img width="1891" height="872" alt="image" src="https://github.com/user-attachments/assets/2ca2018d-8d63-47ca-8bd9-b7b8a9755695" />

## 🚀 Live Demo

- **Frontend**: [https://kobu-mu.vercel.app](https://kobu-mu.vercel.app)
- **Backend API**: [https://kobu-production.up.railway.app](https://kobu-production.up.railway.app)

## ✨ Features

- 🔐 **Complete Authentication** - Register, login, logout with JWT
- 📋 **Board Management** - Create, read, update, delete boards
- 📝 **Column & Task Management** - Full CRUD operations
- 🎯 **Drag & Drop** - Move tasks within columns and between columns
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔄 **Real-time State Management** - Instant UI updates
- 🗑️ **Cascade Deletion** - Deleting a board removes all associated data
- 🛡️ **Secure** - HTTPOnly cookies, CORS protection, input validation

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** + **Material-UI (MUI)** - Styling and components
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **@dnd-kit** - Drag and drop functionality
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** + **Express** with TypeScript
- **Prisma ORM** - Database management
- **PostgreSQL** - Database
- **JWT** - Authentication (HTTPOnly cookies)
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Infrastructure
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Railway
- **Database**: PostgreSQL on Railway
- **Containerization**: Docker + Docker Compose for local development

## 📁 Project Structure

```
Kanban/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── types/          # TypeScript types
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vercel.json         # Vercel SPA routing config
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── lib/            # Database connection
│   ├── prisma/             # Database schema and migrations
│   ├── package.json
│   └── Dockerfile
└── docker-compose.dev.yaml # Local development setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lydoww/kanban-kobu.git
   cd kanban-kobu
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:password@postgres:5432/kanban?schema=public
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=http://localhost:5173
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Start with Docker Compose**
   ```bash
   # From project root
   docker-compose -f docker-compose.dev.yaml up -d
   ```

5. **Initialize Database**
   ```bash
   cd server
   docker exec -it server-api-1 sh
   npx prisma db push
   npx prisma generate
   exit
   ```

6. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```

Visit `http://localhost:5173` to see the application.

## 📊 Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  boards    Board[]
}

model Board {
  id          String   @id @default(uuid())
  title       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  owner       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  columns     Column[]
}

model Column {
  id        String   @id @default(uuid())
  title     String
  order     Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  boardId   String
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  tasks     Task[]
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  dueDate     DateTime?
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  columnId    String
  column      Column   @relation(fields: [columnId], references: [id], onDelete: Cascade)
}
```

## 🔐 Authentication Flow

1. **Registration/Login**: User credentials are validated and JWT token is generated
2. **Cookie Storage**: JWT stored in HTTPOnly cookie with secure settings
3. **Cross-Origin**: Configured for Vercel (frontend) ↔ Railway (backend) communication
4. **Protected Routes**: Middleware validates JWT on protected endpoints

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Boards
- `GET /api/boards` - Get user's boards
- `POST /api/board` - Create new board
- `GET /api/board/:id` - Get specific board
- `PUT /api/board/:id` - Update board
- `DELETE /api/board/:id` - Delete board

### Columns
- `GET /api/columns?boardId=:id` - Get board's columns
- `POST /api/column` - Create new column
- `PUT /api/column/:id` - Update column
- `DELETE /api/column/:id` - Delete column

### Tasks
- `GET /api/tasks?columnId=:id` - Get column's tasks
- `POST /api/task` - Create new task
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task
- `POST /api/task/:id/move` - Move task to different column/position

## 🚀 Deployment

### Frontend (Vercel)
The frontend is automatically deployed on Vercel with the `vercel.json` configuration for SPA routing.

### Backend (Railway)
The backend is deployed on Railway with PostgreSQL database and environment variables configured for production.

### Environment Variables

**Backend (Railway)**:
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=...
FRONTEND_URL=https://kobu-mu.vercel.app
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Alexis Helm**
- GitHub: [@Lydoww](https://github.com/Lydoww)
