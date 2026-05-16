#!/bin/bash
set -e
ROUTER="${1:-192.168.1.1}"
USER="${2:-root}"
REPO_BASE="$(cd "$(dirname "$0")" && pwd)"
echo "Installing vlmcsd to $ROUTER..."
scp "$REPO_BASE/bin/vlmcsd-x86_64-static" "$USER@$ROUTER:/usr/bin/vlmcsd"
ssh "$USER@$ROUTER" 'cat > /etc/init.d/vlmcsd' < "$REPO_BASE/vlmcsd/files/vlmcsd.init"
ssh "$USER@$ROUTER" 'chmod +x /etc/init.d/vlmcsd && /etc/init.d/vlmcsd enable && /etc/init.d/vlmcsd start'
ssh "$USER@$ROUTER" 'cat > /etc/config/vlmcsd' < "$REPO_BASE/vlmcsd/files/vlmcsd.uci"
ssh "$USER@$ROUTER" 'touch /etc/vlmcsd.ini'
ssh "$USER@$ROUTER" 'mkdir -p /usr/share/rpcd/acl.d /usr/share/luci/menu.d /www/luci-static/resources/view'
ssh "$USER@$ROUTER" 'cat > /usr/share/rpcd/acl.d/luci-app-vlmcsd.json' < "$REPO_BASE/luci-app-vlmcsd/root/usr/share/rpcd/acl.d/luci-app-vlmcsd.json"
ssh "$USER@$ROUTER" 'cat > /usr/share/luci/menu.d/vlmcsd.json' < "$REPO_BASE/luci-app-vlmcsd/root/usr/share/luci/menu.d/vlmcsd.json"
ssh "$USER@$ROUTER" 'cat > /www/luci-static/resources/view/vlmcsd.js' < "$REPO_BASE/luci-app-vlmcsd/root/www/luci-static/resources/view/vlmcsd.js"
ssh "$USER@$ROUTER" 'rm -rf /tmp/luci-* /tmp/luci-module-*/; /etc/init.d/rpcd restart; /etc/init.d/uhttpd restart 2>/dev/null; true'
echo "Done! KMS on port 1688. LuCI: http://$ROUTER/cgi-bin/luci/admin/services/vlmcsd"
