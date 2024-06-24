# Use the latest version of Node
FROM node:21.7.0-alpine

# Update dependency cache
RUN apk update && apk upgrade

# Set the working directory
WORKDIR /usr/src/app

# Copy the package file to install deps
COPY package.json .

# Install deps
RUN npm install

# Copy the source code
COPY . .

# Set the variable
ENV NODE_ENV=production

# Expose the port
EXPOSE 8080

# Execute the start script
CMD ["npm", "run", "start:prod"]
