# Zoho Catalyst Deployment Guide

This guide will help you deploy the Crime Lens AI application to Zoho Catalyst cloud platform.

## Prerequisites

1. **Zoho Catalyst Account**
   - Sign up at https://www.zoho.com/catalyst/
   - Create a free or paid account

2. **Catalyst CLI**
   ```bash
   npm install -g zcatalyst-cli
   ```

3. **Git Repository**
   - Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

4. **PostgreSQL Database**
   - Use Catalyst's PostgreSQL service or external database

## Step-by-Step Deployment

### 1. Prepare Your Project

```bash
# Clone your repository
git clone <your-repo-url>
cd crime-lens-ai

# Build the frontend
cd frontend
npm install
npm run build
cd ..
```

### 2. Initialize Catalyst Project

```bash
# Login to Catalyst
catalyst login

# Initialize Catalyst project
catalyst init
```

### 3. Configure Backend Service

Create a file `catalyst.json` in the project root:

```json
{
  "name": "crime-lens-ai",
  "version": "1.0.0",
  "description": "Crime Intelligence & Analytics Platform",
  "services": {
    "backend": {
      "type": "python",
      "build": "./backend",
      "port": 8000,
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "SECRET_KEY": "${SECRET_KEY}",
        "ENV": "production"
      },
      "resources": {
        "cpu": "1",
        "memory": "2GB"
      },
      "health_check": {
        "path": "/health",
        "interval": 30,
        "timeout": 10
      }
    },
    "frontend": {
      "type": "node",
      "build": "./frontend",
      "port": 3000,
      "env": {
        "VITE_API_URL": "${API_URL}"
      },
      "resources": {
        "cpu": "0.5",
        "memory": "1GB"
      },
      "health_check": {
        "path": "/",
        "interval": 30,
        "timeout": 10
      }
    }
  }
}
```

### 4. Create Procfile

Create a `Procfile` in the backend directory:

```bash
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### 5. Deploy Backend

```bash
# Deploy backend service
catalyst deploy backend

# Set environment variables
catalyst env set DATABASE_URL=postgresql://user:password@host:5432/dbname
catalyst env set SECRET_KEY=your-secret-key
catalyst env set ENV=production
```

### 6. Run Database Migrations

```bash
# Execute database migrations
catalyst exec backend alembic upgrade head

# Seed database with initial data
catalyst exec backend python seed_database.py
catalyst exec backend python seed_cases.py
```

### 7. Deploy Frontend

```bash
# Build frontend for production
cd frontend
npm run build
cd ..

# Deploy frontend service
catalyst deploy frontend

# Set frontend environment variable
catalyst env set VITE_API_URL=https://your-backend-url.apps.catalystcloud.com/api
```

### 8. Verify Deployment

```bash
# Check service status
catalyst status

# View logs
catalyst logs

# Test health endpoints
curl https://your-backend-url.apps.catalystcloud.com/health
curl https://your-frontend-url.apps.catalystcloud.com/
```

## Database Setup

### Option 1: Catalyst PostgreSQL Service

1. Go to Catalyst Console
2. Navigate to Services > PostgreSQL
3. Create a new PostgreSQL instance
4. Get the connection string
5. Use it as DATABASE_URL

### Option 2: External Database

1. Use any PostgreSQL hosting service
2. Get the connection string
3. Set it as DATABASE_URL environment variable

## Environment Variables

Required environment variables:

```env
# Backend
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=your-secret-key-here
ENV=production

# Frontend
VITE_API_URL=https://backend-url.apps.catalystcloud.com/api
```

## Custom Domain (Optional)

1. Go to Catalyst Console
2. Navigate to your service
3. Click on "Custom Domain"
4. Add your domain
5. Configure DNS records

## Monitoring and Scaling

### View Logs
```bash
catalyst logs
catalyst logs backend
catalyst logs frontend
```

### Scale Services
```bash
catalyst scale backend --cpu 2 --memory 4GB
catalyst scale frontend --cpu 1 --memory 2GB
```

### View Metrics
```bash
catalyst metrics
```

## Troubleshooting

### Build Failures
- Check build logs: `catalyst logs`
- Verify all dependencies are in requirements.txt
- Ensure Python/Node versions are compatible

### Database Connection Issues
- Verify DATABASE_URL format
- Check database credentials
- Ensure database is accessible from Catalyst

### Frontend Connection Issues
- Verify VITE_API_URL is correct
- Check CORS configuration in backend
- Ensure backend is running

### Health Check Failures
- Verify health endpoint is accessible
- Check service port configuration
- Review resource allocation

## Cost Optimization

- Use appropriate resource allocation
- Enable auto-scaling if needed
- Monitor usage regularly
- Clean up unused resources

## Security Best Practices

1. Use strong SECRET_KEY
2. Enable HTTPS for all services
3. Use environment variables for sensitive data
4. Regularly update dependencies
5. Monitor for security vulnerabilities
6. Implement rate limiting
7. Use secure database connections

## Backup and Recovery

### Database Backup
```bash
# Export database
catalyst exec backend pg_dump $DATABASE_URL > backup.sql

# Import database
catalyst exec backend psql $DATABASE_URL < backup.sql
```

### Application Backup
- Catalyst provides automatic backups
- Configure backup retention policy
- Test recovery procedures regularly

## Support

- Catalyst Documentation: https://www.zoho.com/catalyst/help/
- Catalyst Community: https://www.zoho.com/catalyst/community/
- Contact Support: support@zohocatalyst.com
