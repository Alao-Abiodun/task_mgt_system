FROM node:18.18.0-alpine
# enable pnpm via corepack
RUN corepack enable
# create and set working directory inside the container
WORKDIR /usr/app
# copy package.json and package-lock.json to the working directory inside the container 
COPY package*.json ./
# install dependencies
RUN pnpm install
# copy source code
COPY . .
# build source file
RUN pnpm run build
# expose port 3000
EXPOSE 7001
# start app
CMD ["pnpm", "start"]