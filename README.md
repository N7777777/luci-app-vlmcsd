# luci-app-vlmcsd

OpenWRT LuCI Web UI for vlmcsd — KMS server emulator for activating Windows and Office.

## Supported OpenWRT Versions

- **OpenWRT 19.07** (LuCI 19.x) — tested
- **OpenWRT 21.02** (LuCI 21.x) — tested
- **OpenWRT 22.03** (LuCI 22.x) — tested
- **OpenWRT 23.05** (LuCI 23.x) — tested
- **OpenWRT SNAPSHOT** — should work

Architecture: **x86_64** only (the binary is statically compiled).

## Features

- Pre-built static vlmcsd binary for OpenWRT x86_64 (no dependencies needed)
- LuCI Web UI (Services → KMS Server)
- procd service with respawn support
- ACL permission support (OpenWRT 23.05+)
- activation via web UI or command line

## Quick Install

```bash
curl -sL https://raw.githubusercontent.com/N7777777/luci-app-vlmcsd/main/install.sh | sh
```

## Manual Install

```bash
# Copy binary and files to router
scp -r bin root@YOUR-ROUTER-IP:/tmp/vlmcsd-pkg/
scp -r vlmcsd root@YOUR-ROUTER-IP:/tmp/vlmcsd-pkg/
scp -r luci-app-vlmcsd root@YOUR-ROUTER-IP:/tmp/vlmcsd-pkg/

# Install and start
ssh root@YOUR-ROUTER-IP 'cp -r /tmp/vlmcsd-pkg/* / && /etc/init.d/vlmcsd enable && /etc/init.d/vlmcsd start'

# Restart services to load LuCI
ssh root@YOUR-ROUTER-IP 'rm -rf /tmp/luci-*; /etc/init.d/rpcd restart; /etc/init.d/uhttpd restart 2>/dev/null; true'
```

## Access

- **LuCI Web UI**: http://YOUR-ROUTER-IP/cgi-bin/luci/admin/services/vlmcsd
- **KMS Port**: `1688` (TCP)

## Activate Windows / Office

```cmd
# Set KMS server
slmgr /skms YOUR-ROUTER-IP

# Activate Windows
slmgr /ato

# For Office (if installed)
cd C:\Program Files\Microsoft Office\Office16
cscript ospp.vbs /sethst:YOUR-ROUTER-IP
cscript ospp.vbs /act
```

## Build from Source

```bash
# Clone to OpenWRT build system
git clone https://github.com/N7777777/luci-app-vlmcsd.git package/luci-app-vlmcsd
# Also clone vlmcsd package if needed
make menuconfig  # select luci-app-vlmcsd
make -j$(nproc)
```

## Files

| File | Description |
|------|-------------|
| `bin/vlmcsd-x86_64-static` | Statically compiled vlmcsd binarx |
| `install.sh` | One-command installer |
| `vlmcsd/files/vlmcsd.init` | Init script template |
| `vlmcsd/files/vlmcsd.uci` | UCI config template |
| `luci-app-vlmcsd/root/etc/init.d/vlmcsd` | Init script |
| `luci-app-vlmcsd/root/etc/config/vlmcsd` | UCI config |
| `luci-app-vlmcsd/root/www/luci-static/resources/view/vlmcsd.js` | LuCI JS view |

## License

MIT License
