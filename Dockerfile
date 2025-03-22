# Build stage
FROM node:18-alpine as builder

WORKDIR /dropper

COPY package*.json ./
COPY jsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /dropper

# Install serve globally to serve the app in production
RUN npm install -g serve

# Copy the built files from the builder stage
COPY --from=builder /dropper/dist ./dist

# Copy the entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 8000

# Start the app using the entrypoint script
ENTRYPOINT [ "/dropper/entrypoint.sh" ]
