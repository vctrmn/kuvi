FROM node:lts-alpine as frontend-builder
WORKDIR '/app'
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM node:lts-alpine as backend-builder
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install
COPY ./backend/ .
RUN npm run build

FROM node:lts-alpine
WORKDIR '/app'
COPY --from=frontend-builder /app/build /app/client
COPY ./backend/package*.json ./
RUN npm install
COPY --from=backend-builder /app/dist ./
EXPOSE 5000
CMD ["node", "index.js"]