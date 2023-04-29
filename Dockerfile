
# Use the Node 16 Alpine image
FROM node:18-alpine

# Install necessary packages and dependencies for sharp compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# Set the environment variable for Node environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create and set the working directory
WORKDIR /opt/

# Copy package.json and yarn.lock files
COPY ./package.json ./yarn.lock ./

# Set the PATH to include node_modules binaries
ENV PATH /opt/node_modules/.bin:$PATH

# Install dependencies
RUN yarn config set network-timeout 600000 -g && yarn install

# Change to the app directory and copy the remaining files
WORKDIR /opt/app
COPY ./ .

# Build the Strapi CMS
RUN yarn build

# Expose port 1337 
EXPOSE 1337

# Start Strapi in development mode
CMD ["yarn", "develop"]
