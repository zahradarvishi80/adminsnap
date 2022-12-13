FROM node:17.3.1
RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli
RUN mkdir /app
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]