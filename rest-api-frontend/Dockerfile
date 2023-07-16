# Base image
FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./ 


# Install dependencies
RUN npm install --production   

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Create a new image for serving the built app
FROM nginx:1.21-alpine

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
