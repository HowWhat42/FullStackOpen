FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm ci

RUN CI=true npm test

RUN npm run build

RUN npm install -g serve

CMD ["server", "build"]