FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Expose the port for the API Gateway (3000)
EXPOSE 3000

CMD ["npm", "start"]
