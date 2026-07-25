# Catalyst Deployment Guide

This directory contains the configuration files for deploying Crime Lens AI to Zoho Catalyst.

## Prerequisites

- Catalyst CLI installed (`npm install -g zcatalyst-cli`)
- Valid Catalyst account
- PostgreSQL database instance (Catalyst PostgreSQL service)
- Domain name configured (optional)

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Backend
DATABASE_URL=postgresql://user:password@hostname:5432/databasename
SECRET_KEY=your-secret-key-change-this-in-production
ENV=production

# Frontend
VITE_API_URL=https://your-backend-url.com/api
```

## Deployment Steps

### 1. Install Catalyst CLI
```bash
npm install -g zcatalyst-cli
catalyst init
```

### 2. Configure Project
```bash
cd deployment/catalyst
```

### 3. Build Frontend
```bash
cd ../../frontend
npm install
npm run build
```

### 4. Deploy Backend
```bash
cd ../deployment/catalyst
catalyst deploy backend
```

### 5. Deploy Frontend
```bash
catalyst deploy frontend
```

### 6. Configure Environment Variables
```bash
catalyst env set DATABASE_URL=your-database-url
catalyst env set SECRET_KEY=your-secret-key
catalyst env set VITE_API_URL=your-api-url
```

### 7. Run Database Migrations
```bash
catalyst exec backend alembic upgrade head
```

### 8. Seed Database (Optional)
```bash
catalyst exec backend python seed_database.py
catalyst exec backend python seed_cases.py
```

## Monitoring

- View logs: `catalyst logs`
- Check status: `catalyst status`
- Scale resources: `catalyst scale`
- View metrics: `catalyst metrics`

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL format
- Check PostgreSQL service is running
- Ensure database credentials are correct

### Frontend Connection Issues
- Check VITE_API_URL points to correct backend URL
- Verify backend service is running
- Check CORS configuration in backend

### Build Errors
- Check build logs in Catalyst dashboard
- Ensure all dependencies are in requirements.txt
- Verify Python/Node versions match requirements

### Health Check Failures
- Ensure /health endpoint is accessible
- Check service port configuration
- Verify resource allocation

## Service URLs

After deployment, your services will be available at:
- Backend: `https://backend-project-id.apps.catalystcloud.com`
- Frontend: `https://frontend-project-id.apps.catalystcloud.com`

## Scaling

To scale your application:
```bash
catalyst scale backend --cpu 2 --memory 4GB
catalyst scale frontend --cpu 1 --memory 2GB
```

## Rollback

To rollback to previous version:
```bash
catalyst rollback
```
