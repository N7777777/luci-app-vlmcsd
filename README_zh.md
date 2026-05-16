# luci-app-vlmcsd

OpenWRT LuCI Web UI — vlmcsd KMS 服务器模拟器，用于激活 Windows 和 Office。

## 支持的 OpenWRT 版本

- **OpenWRT 19.07**（LuCI 19.x）— 已测试
- **OpenWRT 21.02**（LuCI 21.x）— 已测试
- **OpenWRT 22.03**（LuCI 22.x）— 已测试
- **OpenWRT 23.05**（LuCI 23.x）— 已测试
- **OpenWRT SNAPSHOT** — 理论上支持

架构：**仅支持 x86_64**（二进制为静态编译，无需依赖库）。

## 功能特性

- 预编译静态 vlmcsd 二进制文件，无需安装任何依赖
- LuCI Web 界面（服务 → KMS 服务器）
- procd 服务，支持自动重启（respawn）
- ACL 权限支持（OpenWRT 23.05+）
- 支持 Web 界面和命令行激活

## 快速安装

```bash
curl -sL https://raw.githubusercontent.com/N7777777/luci-app-vlmcsd/main/install.sh | sh
```

## 手动安装

```bash
# 复制二进制和文件到路由器
scp -r bin root@你的路由器IP:/tmp/vlmcsd-pkg/
scp -r vlmcsd root@你的路由器IP:/tmp/vlmcsd-pkg/
scp -r luci-app-vlmcsd root@你的路由器IP:/tmp/vlmcsd-pkg/

# 安装并启动
ssh root@你的路由器IP 'cp -r /tmp/vlmcsd-pkg/* / && /etc/init.d/vlmcsd enable && /etc/init.d/vlmcsd start'

# 重启服务以加载 LuCI 界面
ssh root@你的路由器IP 'rm -rf /tmp/luci-*; /etc/init.d/rpcd restart; /etc/init.d/uhttpd restart 2>/dev/null; true'
```

## 访问方式

- **LuCI Web 界面**：http://你的路由器IP/cgi-bin/luci/admin/services/vlmcsd
- **KMS 端口**：`1688`（TCP）

## 激活 Windows / Office

```cmd
# 设置 KMS 服务器
slmgr /skms 你的路由器IP

# 激活 Windows
slmgr /ato

# Office 激活（如果安装了 Office）
cd C:\Program Files\Microsoft Office\Office16
cscript ospp.vbs /sethst:你的路由器IP
cscript ospp.vbs /act
```

## 源码编译

```bash
# 克隆到 OpenWRT 编译环境
git clone https://github.com/N7777777/luci-app-vlmcsd.git package/luci-app-vlmcsd
# 如果需要 vlmcsd 包，也一并克隆
make menuconfig  # 选中 luci-app-vlmcsd
make -j$(nproc)
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `bin/vlmcsd-x86_64-static` | 静态编译的 vlmcsd 二进制文件 |
| `install.sh` | 一键安装脚本 |
| `vlmcsd/files/vlmcsd.init` | Init 脚本模板 |
| `vlmcsd/files/vlmcsd.uci` | UCI 配置文件模板 |
| `luci-app-vlmcsd/root/etc/init.d/vlmcsd` | Init 启动脚本 |
| `luci-app-vlmcsd/root/etc/config/vlmcsd` | UCI 配置文件 |
| `luci-app-vlmcsd/root/www/luci-static/resources/view/vlmcsd.js` | LuCI Web 界面 |

## 开源协议

MIT License
