FROM node:22-alpine

# set working directory

WORKDIR /app

# copy .json file

COPY package*.json ./

RUN npm install

# COPY REST OF THE CODE
COPY . .

EXPOSE 8000

# START THE BACKEND APPLICATION 
CMD ["nodemon", "app.js"]

