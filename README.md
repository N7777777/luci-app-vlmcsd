# luci-app-vlmcsd

OpenWRT LuCI Web UI for vlmcsd (KMS Server)

## Features
- Pre-built static binary for OpenWRT x86_64
- LuCI Web UI (Services > KMS Server)
- procd service with respawn
- ACL support for OpenWRT 23.05+

## Quick Install
```bash
curl -sL URL/install.sh | sh
```

## Manual Install
```bash
scp -r bin root@IP:/tmp/vlmcsd-pkg/
scp -r vlmcsd root@IP:/tmp/vlmcsd-pkg/
scp -r luci-app-vlmcsd root@IP:/tmp/vlmcsd-pkg/
ssh root@IP 'cp -r /tmp/vlmcsd-pkg/* / && /etc/init.d/vlmcsd enable && /etc/init.d/vlmcsd start'
ssh root@IP 'rm -rf /tmp/luci-*; /etc/init.d/rpcd restart; /etc/init.d/uhttpd restart'
```

## Activate Windows
```cmd
slmgr /skms YOUR-ROUTER-IP
slmgr /ato
```

## License: MIT
