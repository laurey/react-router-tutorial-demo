import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import IconFont from '@/components/IconFont';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches, isMainMenu, getFlatMenuKeys } from './SiderMenuUtils';
import { isUrl } from '@/utils/utils';
import styles from './index.less';

const { SubMenu } = Menu;

const getIcon = icon => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className={classNames(styles.icon, 'sider-menu-item-img')} />
          )}
        />
      );
    }

    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }

    return <Icon type={icon} />;
  }

  return icon;
};

export default class BaseMenu extends PureComponent {
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys, menuData } = this.props;
    return urlToList(pathname)
      .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
      .map(item => {
        if (!item || isMainMenu(menuData, item)) {
          return item;
        }

        let menu;

        for (const menuItem of menuData) {
          menu = menuItem.children.find(minorMenu => {
            return (
              (minorMenu && getMenuMatches(getFlatMenuKeys([minorMenu]), item)[0]) ||
              (minorMenu.children && getMenuMatches(getFlatMenuKeys(minorMenu.children), item)[0])
            );
          });
          if (menu) {
            break;
          }
        }

        if (!menu) {
          return menu;
        }

        const path = menu.key || menu.path;
        if (isMainMenu(menuData, path)) {
          return item;
        }

        return path;
      })
      .filter(item => item);
  };

  getSubMenuTitle = item => {
    const icon = getIcon(item.icon);
    const { name } = item;
    return (
      <a>
        {icon}
        <span>{name}</span>
      </a>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      return (
        <SubMenu title={this.getSubMenuTitle(item)} key={item.path}>
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }

    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      mode,
      theme,
      openKeys,
      className,
      collapsed,
      location: { pathname },
    } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }

    const { handleOpenChange, style, menuData } = this.props;
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal',
    });

    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        inlineIndent={16}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        className={cls}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
