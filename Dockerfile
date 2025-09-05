# Stage 1: Build the Angular app
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the project
COPY . .

# Build SSR app
RUN npm run build:ssr

# Stage 2: Run the SSR server
FROM node:lts-alpine AS runtime

WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/dist/playground /app/dist/playground

# Copy only necessary files
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

# Set the command to run the server
CMD ["node", "dist/playground/server/main.js"]
