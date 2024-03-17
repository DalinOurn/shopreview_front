FROM node:14-alpine as builder
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install
# Copy rest of the files
COPY . /app/

# Build the project
RUN npm run build

FROM nginx:1.25.4-alpine3.18 as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE 81
ENTRYPOINT ["nginx", "-g", "daemon off;"]
