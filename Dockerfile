# Stage 1: Build the code
FROM node:22-alpine AS builder

# Build-time arguments
ARG VITE_APP_API_BASE_URL
ARG VITE_WEB3FORM_ACCESS_KEY

# Make the arguments available to the build environment
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL
ENV VITE_WEB3FORM_ACCESS_KEY=$VITE_WEB3FORM_ACCESS_KEY

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the application
RUN yarn build

# --------------------------------------------------------

# Stage 2 - PRODUCTION STAGE (Nginx)
FROM nginx:stable-alpine

# Copy built dist folder from builder stage to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (standard HTTP)
EXPOSE 80

# Nginx runs in the foreground by default with this base image
CMD ["nginx", "-g", "daemon off;"]