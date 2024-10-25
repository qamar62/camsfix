# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port used by Vite's preview server
EXPOSE 4173

# Run the Vite preview server to serve the built files
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]
