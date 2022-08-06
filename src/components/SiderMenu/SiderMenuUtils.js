import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

export const isMainMenu = (menuData, key) =>
  menuData.some(item => {
    if (key) {
      return item.key === key || item.path === key;
    }
    return false;
  });

export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys,
    menuData,
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .map(item => {
      if (!item || isMainMenu(menuData, item)) {
        return item;
      }

      const menu = menuData.find(menuItem => {
        return menuItem.children && getMenuMatches(getFlatMenuKeys(menuItem.children), item)[0];
      });

      return menu.key || menu.path;
    })
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ['/']);
};
