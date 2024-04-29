FROM ghost:5-alpine

RUN apk add --update --quiet --no-cache

COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

COPY ./litestream.yml /etc/litestream.yml
COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]