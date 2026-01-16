
# Step 1: Build the React app
FROM node:18-alpine AS build
# 

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
# RUN npm cache clean --force
# RUN npm install --verbose
RUN npm install


# Copy the source files
COPY . .

# Build the React app
RUN npm run build

# Use the official Nginx image
FROM nginx:alpine

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React app to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


