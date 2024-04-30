FROM ghost:5-alpine

ARG LITESTREAM_ACCESS_KEY_ID
ARG LITESTREAM_SECRET_ACCESS_KEY
ARG LITESTREAM_ENDPOINT
ARG LITESTREAM_BUCKET

RUN apk add --update --quiet --no-cache rclone

RUN echo '*/15 * * * * rclone sync /var/lib/ghost/content cloudflare:content/ --exclude ghost.db >/proc/1/fd/1 2>&1' > /etc/crontabs/root

RUN mkdir -p /root/.config/rclone && \
    echo "[cloudflare]" > /root/.config/rclone/rclone.conf && \
    echo "type = s3" >> /root/.config/rclone/rclone.conf && \
    echo "provider = Other" >> /root/.config/rclone/rclone.conf && \
    echo "env_auth = false" >> /root/.config/rclone/rclone.conf && \
    echo "access_key_id = ${LITESTREAM_ACCESS_KEY_ID}" >> /root/.config/rclone/rclone.conf && \
    echo "secret_access_key = ${LITESTREAM_SECRET_ACCESS_KEY}" >> /root/.config/rclone/rclone.conf && \
    echo "endpoint = ${LITESTREAM_ENDPOINT}/${LITESTREAM_BUCKET}" >> /root/.config/rclone/rclone.conf
    
COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

COPY ./litestream.yml /etc/litestream.yml
COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]