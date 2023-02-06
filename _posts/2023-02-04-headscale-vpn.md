---
layout: post
title: Headscale VPN
---

To help my [local radio club](http://w7dg.org) remotely control some of the rigs
at the clubhouse, I've deployed a
[headscale](https://github.com/juanfont/headscale) control server to enable
location-agnostic private mesh networking between different sites, services, and
users while leveraging the very nice [Tailscale clients and
technology](https://tailscale.com/download/) developed commercially.

# Location Agnostic

The servers providing access to the remote radios can be located anywhere, and
can move at will. This allows the deployment to be nimble against different ISPs
and network topologies.

Where possible, direct peer-to-peer tunnels will be established, otherwise
different tunneling protocols are used to achieve NAT traversal or relaying.

# Private Mesh Networking

The headscale model presents a single "tailnet" or network namespace, although
ACL policies can be set on the control server to affect traffic routing between
tagged nodes. 

<img src="/images/2023-02-05_w7dg_tailscale.png">

# Deploying the Server

My favorite deployment method these days is `docker compose` and `sqlite` because it 
often just works and nothing further is needed.

```
docker compose up
```

## docker-compose.yml

```
version: '3.4'
services:
  headscale:
    image: headscale/headscale:latest
    volumes:
      - ./config:/etc/headscale/
      - ./data:/var/lib/headscale
    ports:
      - 27896:8080
    command: headscale serve
    restart: unless-stopped
```

## ./config/config.yaml

(short version, see the [example](https://github.com/juanfont/headscale/blob/main/config-example.yaml) config for full commentary)

```
server_url: https://headscale.w7dg.net
listen_addr: 0.0.0.0:8080

private_key_path: /var/lib/headscale/private.key
noise:
  private_key_path: /var/lib/headscale/noise_private.key
ip_prefixes:
  - fd7a:115c:a1e0::/48
  - 100.64.0.0/10
# SQLite config
db_type: sqlite3
db_path: /var/lib/headscale/db.sqlite
dns_config:
  override_local_dns: true
  nameservers:
    - 1.1.1.1
  magic_dns: true
  base_domain: w7dg.net
```

## /etc/nginx/headscale.conf

```
server {
    listen 0.0.0.0:443 ssl;
    listen [::]:443 ssl;
    server_name headscale.w7dg.net;
    ssl_certificate /etc/letsencrypt/live/w7dg.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/w7dg.net/privkey.pem;

    location / {
        proxy_pass http://localhost:27896;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection Upgrade;
    }
    access_log  /var/log/nginx/headscale.access.log  main;
    error_log /var/log/nginx/headscale.error.log warn;
}
```

(ya know, thankfully already had a nice webserver running and SSL certs 😀)

# Create a User

Users control nodes in the tailnet. There is **no authentication in headscale**
by default, users are merely containers for nodes and are used to apply
policies. The admin decides who a node who it will belong to when registering
and can reassign nodes at will.

```
docker compose exec headscale headscale user create foo
```

# Connecting Clients

* On windows, click Start, search for "command prompt", right-click and select
  "Run as Administrator".
* On linux, use `sudo` to run as root.

```
tailscale up --login-server=https://headscale.w7dg.net
```

If it worked, this spits out a nodekey that the user sends to the admin to
register the node / client on the server. If a tailscale login page is seen,
then something is wrong.

## Adding a node

```
docker compose exec headscale headscale node register --user foo --key nodekey:......
```

# Subnet Routing

From a client that wants to share a subnet

```
sudo tailscale up --advertise-routes=192.168.1.0/24 --login-server=https://headscale.w7dg.net
```

## Enable the Routes

```
docker compose exec headscale headscale route list
docker compose exec headscale headscale route enable -r <id>
```

## Accept the Advertisements

From the clients that should connect to the subnets:

```
tailscale up --accept-routes ...
```

# Ease of Use

Hopefully, for a network like ours, onboarding user devices will be relatively infrequent.

However, getting a node key in email, and running a command on a server is
something at least 3 people in the club could easily do. With the
possibilities for easily connecting sites with cellular internet that are
currently unroutable, I'm looking forward to digging deeper and unpacking the ACL policy,
so we can deploy this into "production".

# Next Steps

* Configuring `DERP` / `STUN` infrastructure so that clients unable to connect
  directly can connect through our infrastructure without leeching from tailscale.
* Configuring ACL and testing the whole thing end to end

# Source

* https://techoverflow.net/2022/01/16/how-to-setup-headscale-server-in-5-minutes-using-docker-compose/
* https://github.com/juanfont/headscale
* https://tailscale.com/kb/1019/subnets/
* https://tailscale.com/kb/1118/custom-derp-servers/