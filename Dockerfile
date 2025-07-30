# Stage 1: Build the Angular SSR application
FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:ssr # This command typically builds both client and server bundles for SSR

# Stage 2: Serve the application
FROM node:lts-alpine

WORKDIR /app

# Copy only the necessary build artifacts from the build stage
COPY --from=build /app/dist/playground/browser ./dist/browser
COPY --from=build /app/dist/playground/server ./dist/server
COPY --from=build /app/dist/playground/package.json ./package.json

# Install production dependencies for the server
RUN npm install --production

# Expose the port your Angular SSR server listens on (default is often 4000)
# EXPOSE 4000

# Command to run the SSR server
CMD ["node", "dist/server/main.js"]