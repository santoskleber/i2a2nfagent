FROM node:21-bullseye-slim

ENV PORT=3425

WORKDIR /

COPY package*.json ./
COPY . .

RUN npm ci

EXPOSE ${PORT}

CMD ["npm", "start"]