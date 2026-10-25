FROM node:22-alpine AS build

WORKDIR /app/frontend
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend ./
COPY content /app/content
RUN npm run build

FROM nginx:1.29-alpine AS runtime
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
