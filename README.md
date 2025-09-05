# Next.js Service

A modern full-stack Next.js application with a beautiful Tailwind CSS frontend and powerful backend API endpoints.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📝 **TypeScript** for type safety
- 🔌 **RESTful API** endpoints
- 📱 **Responsive design**
- ⚡ **Fast performance**

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/krish/Desktop/Coding/AdhyyanEscapeRoom
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:push
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The application includes several backend API endpoints that can be tested via curl or the frontend interface:

### 1. Hello Endpoint
- **GET** `/api/hello` - Returns a simple greeting
- **POST** `/api/hello` - Accepts JSON data and returns it

```bash
# GET request
curl http://localhost:3000/api/hello

# POST request
curl -X POST http://localhost:3000/api/hello \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "message": "Hello World"}'
```

### 2. Users Endpoint
- **GET** `/api/users` - Returns a list of users (supports query parameters)
- **POST** `/api/users` - Creates a new user

```bash
# GET all users
curl http://localhost:3000/api/users

# GET users with limit
curl http://localhost:3000/api/users?limit=2

# GET users by role
curl http://localhost:3000/api/users?role=admin

# POST new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com", "role": "user"}'
```

### 3. Status Endpoint
- **GET** `/api/status` - Returns system health information
- **POST** `/api/status` - Returns operational status with received data

```bash
# GET status
curl http://localhost:3000/api/status

# POST status check
curl -X POST http://localhost:3000/api/status \
  -H "Content-Type: application/json" \
  -d '{"service": "web-app", "version": "1.0.0"}'
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── hello/
│   │   │   └── route.ts
│   │   ├── users/
│   │   │   └── route.ts
│   │   └── status/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## Frontend Features

- Modern, responsive landing page
- Interactive API testing interface
- Beautiful gradient design
- Mobile-friendly navigation
- Real-time API response display

## Backend Features

- RESTful API endpoints
- JSON request/response handling
- Query parameter support
- Error handling
- System health monitoring
- Memory usage tracking

## Deployment

### Local Production Build

To test production build locally:

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

The application will be available at `http://localhost:3000`.

### Deploy to Render

This application is configured for easy deployment on Render with persistent SQLite database:

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service**:
   - **Build Command**: `./build.sh`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `DATABASE_URL`: `file:/opt/render/project/src/production.db`

4. **Enable Persistent Disk** (Important for database):
   - In your service settings, add a persistent disk
   - Mount path: `/opt/render/project/src`
   - Size: 1GB (or more as needed)

5. **Deploy**: Click "Create Web Service"

The `render.yaml` file is included for Infrastructure as Code deployment.

### Database Persistence

- **Development**: Uses `./prisma/dev.db` (SQLite file)
- **Production**: Uses persistent disk storage on Render
- **Data**: Automatically seeds with initial users on first deployment
- **Backup**: Database file is stored on Render's persistent disk

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
