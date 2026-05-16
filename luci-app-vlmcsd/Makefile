include $(TOPDIR)/rules.mk
PKG_NAME:=luci-app-vlmcsd
PKG_VERSION:=1.0
PKG_RELEASE:=1
PKG_ARCH:=all
PKG_MAINTAINER:=nick <nick@example.com>
PKG_LICENSE:=MIT
PKG_DEPENDS:=+vlmcsd +luci-base
include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/luci/luci.mk
define Package/luci-app-vlmcsd/install
	$(CP) ./root/* $(1)/
	chmod +x $(1)/etc/init.d/vlmcsd
endef
$(eval $(call BuildPackage,luci-app-vlmcsd))
