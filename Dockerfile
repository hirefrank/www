FROM ghost:5-alpine

RUN apk add --update --quiet --no-cache supervisor rclone

ARG LITESTREAM_ACCESS_KEY_ID
ARG LITESTREAM_SECRET_ACCESS_KEY
ARG LITESTREAM_ENDPOINT
ARG LITESTREAM_BUCKET
ARG database__connection__filename

COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisord.conf

# RUN echo '*/15 * * * * rclone sync -L /var/lib/ghost/content cloudflare:content/ --exclude=data/** >/proc/1/fd/1 2>&1' > /etc/crontabs/root

RUN mkdir -p /root/.config/rclone && \
    echo "[cloudflare]" > /root/.config/rclone/rclone.conf && \
    echo "type = s3" >> /root/.config/rclone/rclone.conf && \
    echo "provider = Other" >> /root/.config/rclone/rclone.conf && \
    echo "env_auth = false" >> /root/.config/rclone/rclone.conf && \
    echo "access_key_id = ${LITESTREAM_ACCESS_KEY_ID}" >> /root/.config/rclone/rclone.conf && \
    echo "secret_access_key = ${LITESTREAM_SECRET_ACCESS_KEY}" >> /root/.config/rclone/rclone.conf && \
    echo "endpoint = ${LITESTREAM_ENDPOINT}/${LITESTREAM_BUCKET}" >> /root/.config/rclone/rclone.conf

RUN mkdir -p /etc && \
    { \
    echo "dbs:"; \
    echo "  - path: ${database__connection__filename}"; \
    echo "    replicas:"; \
    echo "      - type: s3"; \
    echo "        endpoint: ${LITESTREAM_ENDPOINT}"; \
    echo "        bucket: ${LITESTREAM_BUCKET}"; \
    } > /etc/litestream.yml

COPY ./entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

# ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]