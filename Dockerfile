FROM ghost:5-alpine

RUN apk add --update --quiet --no-cache rclone

RUN echo '*/15 * * * * rclone sync /var/lib/ghost/content s3:cloudflare --exclude ghost.db --s3-access-key-id=$LITESTREAM_ACCESS_KEY_ID --s3-secret-access-key=$LITESTREAM_SECRET_ACCESS_KEY >/proc/1/fd/1 2>&1' > /etc/crontabs/root

COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

COPY ./rclone.conf /root/.config/rclone/rclone.conf
COPY ./litestream.yml /etc/litestream.yml
COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]