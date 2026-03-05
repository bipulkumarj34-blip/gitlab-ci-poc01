POC: Branch-Based CI/CD with GitHub Actions & Docker

This project demonstrates a professional CI/CD workflow where application behavior and secrets change automatically based on the Git branch being deployed.

🚀 Objective
    main branch → Deploys to Production (Uses Prod Secrets).
    develop branch → Deploys to Development (Uses Dev Secrets).
    feature/ branches* → Triggers Build Only (No Deployment).

🛠 Tech Stack
    Runtime: Node.js (Simple Web Server)
    Containerization: Docker (via Rancher Desktop)
    CI/CD: GitHub Actions
    SCM: GitHub
    
📁 Project StructurePlaintextgitlab-github-poc/
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions Pipeline logic
├── index.js            # Node.js Web App
├── Dockerfile          # Container instructions
├── package.json        # Node dependencies
└── README.md           # This documentation

⚙️ Setup Instructions
1. Local Development (Mac)
    Ensure Rancher Desktop is running.Bash# Clone and enter directory
    cd gitlab-github-poc

    # Run locally to test
    npm install
    node index.js
    Visit http://localhost:3000 to see the app.

2. GitHub Environment ConfigurationTo make the pipeline work, the following must be configured in GitHub Settings >     Environments:EnvironmentTarget BranchSecret (API_KEY)devdevelopDEV_SECRET_PASSWORDprodmainPROD_SECRET_PASSWORD

3. Docker Commands (Rancher Desktop)To simulate the environments locally on your Mac:Bash# Build the image
    docker build -t my-poc-app .

    # Run as Development
    docker run -p 3000:3000 -e APP_ENV="Development" -e API_KEY="DEV_LOCAL_123" my-poc-app

    # Run as Production
    docker run -p 3000:3000 -e APP_ENV="Production" -e API_KEY="PROD_LOCAL_456" my-poc-app


🔄 CI/CD Pipeline LogicThe file 
    .github/workflows/deploy.yml handles the automation:
        Build Job: Runs on every push to verify code integrity.
        Deploy-Dev Job: Runs only when code is pushed to develop. It pulls secrets from the dev environment.
        Deploy-Prod Job: Runs only when code is pushed to main. It pulls secrets from the prod environment.
        
🧪 How to Verify the POCPush to a feature branch: 
    * git checkout -b feature/testgit push origin feature/test
    Observation: Only the "Build" job runs in GitHub Actions

Push to develop: 
    * git checkout developgit push origin develop
    Observation: "Build" and "Deploy-Dev" run.

Push to main: 
    * git checkout maingit push origin main
    Observation: "Build" and "Deploy-Prod" run.