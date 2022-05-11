# RECORDS APP

## TECH STACK USED:

- BACKEND: NodeJS, Express
- FRONTEND: ReactJS, JSX, HTML, CSS , SCSS(Sass)
- DATABASE: MongoDB
- DEPLOYMENT: Designed to be deployed on HEROKU (However this can be changed to any other deployment platform)

## TO RUN:

1. Create a .env file in the root folder and add values for the following variables : NODE_ENV (Set this to = development), PORT (Set this to = 5000 NOTE: Whatever you set this to must be the same in frontend package.json proxy field example: "proxy":"http://localhost:5000"), MONGODB_URI (Set this to the mongoDB connection string), JWT_SECRET (Set this to a random string), JWT_EXPIRES_IN (You can Set this to a number of days(d) e.g 30d).
2. Run npm install in root folder.
3. Run cd frontend to enter the frontend folder.
4. Run npm install in frontend folder.
5. Run cd .. to return to the root folder.
6. Run npm run dev to start the server and client concurrently.
