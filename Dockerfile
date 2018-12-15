# STEP 1 build executable binary

FROM golang:alpine as go-builder

# Install git
# RUN apk add --update gcc musl-dev git
RUN apk add --update git

COPY . $GOPATH/src/git.labs.daneshvar.studio/daneshvar/notes/
WORKDIR $GOPATH/src/git.labs.daneshvar.studio/daneshvar/notes/

#get dependancies
#you can also use dep
RUN go get -d -v 

#build the binary
RUN go build -o /go/bin/notes

# STEP 2 build interface
FROM node:dubnium-alpine as react-builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ./interface /usr/src/app
RUN npm install --silent
# RUN npm install react-scripts@1.1.1 -g --silent
RUN npm run build-js

# STEP 3 build a small image

# start from scratch
FROM alpine 

# Copy our static executable
COPY --from=go-builder /go/bin/notes /go/bin/notes
COPY --from=react-builder /usr/src/app/build /go/bin/interface/build
WORKDIR /go/bin/
ENTRYPOINT ["/go/bin/notes"]
EXPOSE 1313