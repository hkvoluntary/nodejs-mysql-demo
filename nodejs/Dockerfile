FROM node:16
RUN apt-get update && apt-get install -y --no-install-recommends \
vim \
net-tools

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY src /app
COPY .env /app



EXPOSE 3000
CMD [ "node", "index.js" ]
