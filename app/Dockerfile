FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run build

ENV HOST=0.0.0.0
EXPOSE 5000

CMD [ "npm", "run", "dev" ]
#CMD [ "npx", "vite", "dev", "--host" ]