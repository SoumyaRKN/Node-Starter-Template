# Use the latest LTS Node.js (v22.18.0 "Jod") — Alpine variant for smaller image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Expose the port (optional, for documentation purposes)
EXPOSE 3000

# Start the app
CMD ["node", "src/main.js"]
