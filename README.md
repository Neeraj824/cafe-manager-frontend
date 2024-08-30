# cafe-manager-backend
cafe-manager-frontend

git clone [https://github.com/Neeraj824/cafe-manager-frontend.git](https://github.com/Neeraj824/cafe-manager-frontend.git)

cd cafe-manager-frontend

npm install

npm run dev

# Production Mode

npm run build

npm start

touch .env.local
touch .env.development
touch .env.production

# Define the Backend URL
REACT_APP_API_URL=http://localhost:3000/api

# Environment type
REACT_APP_ENV=development

# Debugging or testing key
REACT_APP_DEBUG=true
