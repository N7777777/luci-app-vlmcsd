include $(TOPDIR)/rules.mk
PKG_NAME:=vlmcsd
PKG_VERSION:=svn1113
PKG_RELEASE:=1
PKG_SOURCE:=vlmcsd-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://github.com/Wind4/vlmcsd/archive/refs/tags/$(PKG_VERSION).tar.gz
PKG_HASH:=skip
PKG_MAINTAINER:=nick <nick@example.com>
PKG_LICENSE:=MIT
include $(INCLUDE_DIR)/package.mk
define Package/vlmcsd
  SUBMENU:=Services
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=KMS Server (vlmcsd)
endef
define Build/Compile
	$(MAKE) $(PKG_JOBS) -C $(PKG_BUILD_DIR) CC="$(TARGET_CC)" LDFLAGS="-static"
endef
define Package/vlmcsd/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/vlmcsd/vlmcsd $(1)/usr/bin/vlmcsd
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/vlmcsd.init $(1)/etc/init.d/vlmcsd
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_DATA) ./files/vlmcsd.uci $(1)/etc/config/vlmcsd
	$(INSTALL_DIR) $(1)/etc
	touch $(1)/etc/vlmcsd.ini
endef
$(eval $(call BuildPackage,vlmcsd))
