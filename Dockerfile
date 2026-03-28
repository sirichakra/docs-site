FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y curl

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]