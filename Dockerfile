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

# start from scratch
FROM alpine 

# Copy our static executable
COPY --from=go-builder /go/bin/notes /go/bin/notes
COPY ./interface/build /go/bin/interface/build
WORKDIR /go/bin/
ENTRYPOINT ["/go/bin/notes"]
EXPOSE 1313