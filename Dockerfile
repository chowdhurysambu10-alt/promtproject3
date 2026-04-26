FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the frontend application
RUN npm run build

# Expose the default port (Cloud Run overrides this with the PORT env variable)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application using tsx
CMD ["npx", "tsx", "server.ts"]
