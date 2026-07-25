# Crime Lens AI

A professional crime intelligence and analytics platform built with modern web technologies. This system provides comprehensive crime data visualization, AI-powered analysis, and real-time monitoring capabilities for law enforcement agencies.

## 🚀 Features

### Core Functionality
- **Dashboard**: Real-time crime statistics and key performance indicators
- **Analytics**: Comprehensive crime trend analysis with interactive charts
- **AI Chatbot**: Natural language interface for querying crime data
- **Crime Mapping**: Geographic visualization of crime incidents
- **Case Management**: Track and manage criminal cases
- **User Authentication**: Secure login/register system with PostgreSQL integration

### Technical Highlights
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: PostgreSQL with SQLAlchemy ORM
- **API**: FastAPI backend with automatic API documentation
- **Frontend**: React with TypeScript, Tailwind CSS, and Framer Motion
- **Charts**: Recharts for data visualization
- **Maps**: Leaflet for geographic data display
- **Deployment**: Ready for Catalyst cloud deployment

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+
- Git

## 🛠️ Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database configuration:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/crimelens
SECRET_KEY=your-secret-key-here
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication

The application includes a complete authentication system:

### User Registration
- Navigate to `/register`
- Fill in username, email, and password
- Users are stored in PostgreSQL database
- Passwords are hashed using bcrypt

### User Login
- Navigate to `/login`
- Enter credentials
- JWT token is generated and stored in localStorage
- Protected routes require authentication

### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `username` - Unique username
- `hashed_password` - Bcrypt hashed password
- `full_name` - User's full name
- `is_active` - Account status
- `is_admin` - Admin privileges
- `created_at` - Registration timestamp

### Crime Data Tables
- `state` - State information
- `district` - District information
- `unit` - Police units
- `case_master` - Main case records
- `crime_head` - Crime categories
- And more...

## 🚀 Deployment

### Catalyst Deployment

The project is configured for Catalyst deployment:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Catalyst:
```bash
catalyst deploy
```

3. Configure environment variables in Catalyst dashboard:
```env
DATABASE_URL=your-production-database-url
SECRET_KEY=your-production-secret-key
VITE_API_URL=your-production-api-url
```

See `deployment/catalyst/README.md` for detailed deployment instructions.

## 📁 Project Structure

```
crime-lens-ai/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── auth/         # Authentication utilities
│   │   ├── database/     # Database configuration
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── main.py           # FastAPI application entry
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/          # API client functions
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── types/        # TypeScript types
│   └── package.json      # Node dependencies
├── deployment/
│   └── catalyst/         # Catalyst deployment config
└── README.md
```

## 🎨 UI/UX Features

### Professional Design
- Modern glassmorphism UI with dark theme
- Smooth animations using Framer Motion
- Responsive design for all screen sizes
- Professional color scheme with police blue theme
- Interactive charts and data visualizations

### Navigation
- Collapsible sidebar with smooth transitions
- Clear route protection with authentication
- User-friendly error handling
- Loading states for better UX

## 🔧 Configuration

### Backend Configuration
- FastAPI with CORS enabled
- SQLAlchemy with PostgreSQL
- JWT authentication with 30-minute token expiry
- Automatic API documentation with Swagger UI

### Frontend Configuration
- Vite for fast development
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Recharts for data visualization

## 📈 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is proprietary software for law enforcement use.

## 🆘 Support

For technical support or questions, please contact the development team.

## 🔄 Updates

- **v1.0.0** - Initial release with authentication, dashboard, and analytics
- Professional UI with glassmorphism design
- PostgreSQL integration for user management
- Catalyst deployment ready

