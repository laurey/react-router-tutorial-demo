import React, { PureComponent, Suspense } from 'react';
import { Layout, Icon } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus, isMainMenu } from './SiderMenuUtils';
import { title } from '@/defaultSettings';
import styles from './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

let firstMount = true;

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      this.setState({
        openKeys: getDefaultCollapsedSubMenus(this.props),
      });
    }
  }

  handleOpenChange = openKeys => {
    const { menuData } = this.props;
    const moreThanOne = openKeys.filter(openKey => isMainMenu(menuData, openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });

    return (
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        trigger={isMobile ? null : <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />}
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={220}
        theme={theme}
        collapsedWidth={65}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
