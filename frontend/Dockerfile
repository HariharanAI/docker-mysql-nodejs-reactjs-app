# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Install 'serve' globally
RUN npm install -g serve

# Copy the rest of the application
COPY . .

# Build the React.js application
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Start the React app using serve
CMD ["serve", "-s", "build", "-l", "3000"]

