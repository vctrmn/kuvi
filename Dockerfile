FROM node:lts-alpine as front-builder
WORKDIR '/app'
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

FROM node:lts-alpine
WORKDIR '/app'
COPY --from=front-builder /app/build /app/client
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend/ .
EXPOSE 5000
CMD ["node", "index.js"]