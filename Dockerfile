FROM node:24-alpine
WORKDIR /money-tracker
ADD . /money-tracker
EXPOSE 3000
CMD ["npm", "run", "start"]
