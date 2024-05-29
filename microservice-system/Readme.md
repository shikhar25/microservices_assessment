# Microservice System

## Overview
This project demonstrates a PubSub architecture using Node.js, Docker, Postgres, and Redis.

## Services
- **Receiver Service**: Accepts JSON data via a POST endpoint, validates it, stores it in a Postgres database, and publishes an event to Redis.
- **Listener Service**: Subscribes to Redis events, processes the events, and stores the data in another Postgres database with an additional `modified_at` timestamp.

## Setup

### Prerequisites
- Docker
- Docker Compose

#### Step To Prepare for Submission

1. **Repository Structure**:
   - `receiver-service/`: Contains the receiver service code and Dockerfile.
   - `listener-service/`: Contains the listener service code and Dockerfile.
   - `docker-compose.yml`: Docker Compose file to orchestrate the services.
   - `README.md`: Documentation file.

2. **GitHub Repository**: If required, create a GitHub repository and push your code there. Make sure to include the `.gitignore` file to exclude `node_modules`, `.env`, and other unnecessary files.

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin shikharSuzukiDigital

# Push to remote repository
git push -u origin shikharSuzukiDigital

