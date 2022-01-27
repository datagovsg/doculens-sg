FROM node:14-alpine AS node-modules-builder
LABEL maintainer="Open Government Products"

WORKDIR /usr/src/app
RUN apk update && apk add python3 g++ make && rm -rf /var/cache/apk/*
COPY . ./

# Install backend dependencies
RUN cd backend && npm ci && cd ..

# Install frontend dependencies
RUN cd frontend && npm ci && cd ..

# TODO: Remove when server package.json is no longer in parent directory of client
ENV SKIP_PREFLIGHT_CHECK true

# Transpile
RUN npm run on-backend -- build && npm run on-frontend -- build

FROM node:14-alpine

WORKDIR /usr/src/app
ENV PORT 8080

RUN apk update && apk add tini && rm -rf /var/cache/apk/*
COPY --from=node-modules-builder /usr/src/app ./

EXPOSE 8080
ENTRYPOINT ["tini", "--"]
CMD ["npm", "run", "start"]