# Use a lightweight Node.js image based on Alpine Linux
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your application source code into the container
COPY . .

# Expose the port the application will run on (8080)
EXPOSE 8080

# Start the application using the start script defined in package.json
CMD ["npm", "start"]
