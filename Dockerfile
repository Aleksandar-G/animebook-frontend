FROM node:16-alpine as deps

COPY package.json package-lock.json ./
# download dependencies
RUN npm ci

FROM deps as builder

# copy source code
COPY . .
RUN npm run build


FROM node:16-alpine
# compile code
COPY --from=builder public ./public
COPY --from=builder .next ./.next
COPY --from=builder node_modules ./node_modules
COPY --from=builder package.json ./package.json

CMD [ "npm", "start" ]