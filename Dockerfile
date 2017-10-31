FROM node
WORKDIR /app
ADD . /app
ENV PORT 3030
EXPOSE 3030
# RUN npm install
ENTRYPOINT ["npm", "start"]
