FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./routes ./routes 
COPY ./db ./db
COPY ./.env ./.env
RUN yarn install 
EXPOSE 5000
CMD ["node", "server.js"]