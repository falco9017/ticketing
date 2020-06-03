#Specify a base image
#node:alpine is a lighweight linux container with node and npm installed
FROM node:alpine

#create a work directory
WORKDIR /app

#import ONLY package.json into container
#this is done so that if this does not change
#then npm install do not run every time
COPY package.json .
#install dependencies
RUN npm install

#then import the rest of files
COPY . .

#default command
#The CMD instruction has three forms:
#CMD ["executable","param1","param2"] (exec form, this is the preferred form)
#CMD ["param1","param2"] (as default parameters to ENTRYPOINT)
#CMD command param1 param2 (shell form)
CMD [ "npm", "start" ]