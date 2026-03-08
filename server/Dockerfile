FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY app.js ./
CMD ["npm", "start"]