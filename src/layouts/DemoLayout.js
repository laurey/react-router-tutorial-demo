import React, { Component } from "react";
import { Layout } from "antd";

import TopHeader from "../components/TopHeader";
import Footer from "./Footer";
import styles from "./styles.less";
import logo from "../assets/logo.png";

const { Content } = Layout;

class UserLayout extends Component {
  componentDidMount() {
    this.triggerResizeEvent();
  }

  componentWillUnmount() {
    if (this.handler) {
      this.handler.cancel();
    }
  }

  handleMenuCollapse = (collapsed) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "global/changeLayoutCollapsed",
    //   payload: collapsed,
    // });
    this.triggerResizeEvent();
  };

  /* eslint-disable*/
  triggerResizeEvent() {
    // const event = document.createEvent("HTMLEvents");
    // event.initEvent("resize", true, false);
    // window.dispatchEvent(event);
    this.handler = _.debounce(this.handleResize, 600);
  }

  handleResize() {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      children,
      menuData,
      isMobile,
      location: { pathname },
    } = this.props;

    return (
      <div className="demo-layout-container">
        <Layout>
          <TopHeader
            logo={logo}
            layout={{ navHeight: 64 }}
            menuData={menuData}
            isMobile={isMobile}
            hasSiderMenu={false}
            mode="horizontal"
            handleMenuCollapse={this.handleMenuCollapse}
            {...this.props}
          />
          <Content style={{ margin: "24px 24px 0", height: "100%" }}>
            <div className={styles.container}>
              <div className={styles.content}>{children}</div>
            </div>
          </Content>
          <Footer>This is Demo Layout Footer </Footer>
        </Layout>
      </div>
    );
  }
}

// export default connect(({ global, setting, menu: menuModel }) => ({
//   menuData: global.menuData,
//   breadcrumbNameMap: menuModel.breadcrumbNameMap,
//   ...setting,
// }))((props) => (
//   <Media query="(max-width: 599px)">
//     {(isMobile) => <UserLayout {...props} isMobile={isMobile} />}
//   </Media>
// ));
export default UserLayout;
