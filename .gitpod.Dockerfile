FROM gitpod/workspace-full

#local user
USER gitpod

RUN npm i @cloudflare/wrangler -g

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN /home/gitpod/.deno/bin/deno completions bash > /home/gitpod/.bashrc.d/90-deno &&     echo 'export DENO_INSTALL="/home/gitpod/.deno"' >> /home/gitpod/.bashrc.d/90-deno &&     echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> /home/gitpod/.bashrc.d/90-deno

RUN /home/gitpod/.deno/bin/deno run -A https://deno.land/x/lume/install.ts
