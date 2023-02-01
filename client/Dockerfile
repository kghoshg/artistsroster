FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./src ./src
COPY ./public ./public
RUN yarn install 
EXPOSE 3000
CMD ["yarn","start"]