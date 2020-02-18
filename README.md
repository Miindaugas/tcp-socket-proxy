TCP Socket Proxy Server

```
process.env.PROXY_WHITELIST // Your IP (client that connects to proxy)
process.env.PROXY_LOCAL_PORT // Proxy port
process.env.PROXY_REMOTE_PORT // Target port 
process.env.PROXY_REMOTE_HOST // Target ip address
```
Local connections gets redirected to target.