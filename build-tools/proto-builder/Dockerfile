FROM ubuntu:18.10
RUN apt-get update && apt-get install curl -y && apt-get install unzip
RUN curl -OL https://github.com/google/protobuf/releases/download/v3.3.0/protoc-3.3.0-linux-x86_64.zip
RUN unzip -o protoc-3.3.0-linux-x86_64.zip -d /usr/local bin/protoc
RUN rm -f protoc-3.3.0-linux-x86_64.zip
RUN curl -OL https://github.com/grpc/grpc-web/releases/download/1.0.3/protoc-gen-grpc-web-1.0.3-linux-x86_64
RUN mv ./protoc-gen-grpc-web-1.0.3-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
RUN chmod +x /usr/local/bin/protoc-gen-grpc-web
RUN mkdir -p /build/output
WORKDIR /build
ENTRYPOINT [ "sh", "-c", "protoc -I=. ./$PROTO_FILE --js_out=import_style=commonjs:./output --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./output"]
