import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { Card, Layout, Radio } from "antd";

import useBasicLayoutContext from "../contexts/useBasicLayoutContext";
import Footer from "./Footer";
import HeaderLayout from "./Header";
// import renderRoutes from "../config/renderRoutes";
// import routes from "../config/router.config";
import logo from "../assets/logo.png";
import styles from "./styles.less";

const Header = React.memo(HeaderLayout);

const { Content } = Layout;

function BasicLayout(props) {
  const { isMobile } = props;
  const { currentLayout: layout } = useBasicLayoutContext();
  const { navTheme, fixedHeader } = layout;

  const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};

  const [collapsed, setCollapsed] = useState(false);

  const handleMenuCollapse = useCallback(() => {
    setCollapsed((state) => !state);
  }, [setCollapsed]);

  console.log("aaaaa");

  return (
    <Layout className="rtc-layout rtc-basic-layout">
      <Header
        logo={logo}
        layout={layout}
        theme={navTheme}
        isMobile={isMobile}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        {...props}
      />
      <Layout
        style={{
          overflow: "auto",
          height: `calc(100vh - 132px)`,
          maxHeight: `calc(100vh - 65px * 2)`,
        }}
      >
        <Content
          className={classNames("rtc-page-header-wrapper", styles.content)}
          style={{ padding: 24, ...contentStyle }}
        >
          <div className="rtc-page-header-wrapper-content">
            <Card
              title="This is Title"
              extra={
                <div>
                  <Radio.Group defaultValue="a" buttonStyle="outline">
                    <Radio.Button value="a">Tokyo</Radio.Button>
                    <Radio.Button value="d">Paris</Radio.Button>
                    <Radio.Button value="c">Berlin</Radio.Button>
                  </Radio.Group>
                </div>
              }
            >
              {/* {renderRoutes(routes, props || {})} */}
              {props.children}
            </Card>
          </div>
        </Content>
      </Layout>
      <Footer>Footer ©2021</Footer>
    </Layout>
  );
}

export default BasicLayout;
