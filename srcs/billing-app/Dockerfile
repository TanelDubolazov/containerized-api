FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Expose the port defined in your billing-app (8081)
EXPOSE 8081

CMD ["npm", "start"]
