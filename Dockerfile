FROM ghost:5-alpine

RUN apk add --update --quiet --no-cache rclone

ARG LITESTREAM_ACCESS_KEY_ID
ARG LITESTREAM_SECRET_ACCESS_KEY

ENV RCLONE_CONFIG_CLOUDFLARE_TYPE=s3
ENV RCLONE_CONFIG_CLOUDFLARE_ACCESS_KEY_ID=$LITESTREAM_ACCESS_KEY_ID 
ENV RCLONE_CONFIG_CLOUDFLARE_SECRET_ACCESS_KEY=$LITESTREAM_SECRET_ACCESS_KEY

RUN echo '*/15 * * * * rclone sync /var/lib/ghost/content cloudflare:content/ --exclude ghost.db >/proc/1/fd/1 2>&1' > /etc/crontabs/root

COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

# COPY ./rclone.conf /root/.config/rclone/rclone.conf
COPY ./litestream.yml /etc/litestream.yml
COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]