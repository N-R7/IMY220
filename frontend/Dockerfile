FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 5173

# Start the server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]