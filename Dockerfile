FROM ghost:5-alpine

RUN apk add --update --quiet --no-cache rclone

RUN echo '*/15 * * * * rclone sync -L /var/lib/ghost/content cloudflare:content/ --exclude=data/** >/proc/1/fd/1 2>&1' > /etc/crontabs/root

COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

COPY ./litestream.yml /etc/litestream.yml
COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]