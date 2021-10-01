import React, { useCallback, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Card, Layout, Radio } from "antd";

import useBasicLayoutContext from "../contexts/useBasicLayoutContext";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../components/NotFound";
import FooterLayout from "./FooterLayout";
import Header from "./HeaderLayout";
import Demo from "../pages/Demo";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import LogOut from "../pages/LogOut";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Counter from "../pages/Counter";
import Secret from "../pages/Secret";
import Todos from "../pages/Todos";
import Exception from "../pages/Exception";
import RedirectProxy from "../pages/RedirectProxy";

import styles from "./styles.scss";
import logo from "../assets/logo.png";

const HeaderLayout = React.memo(Header);

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

  return (
    <Layout className="rtc-layout rtc-basic-layout">
      <HeaderLayout
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
                    <Radio.Button value="b">Shanghai</Radio.Button>
                    <Radio.Button value="c">Beijing</Radio.Button>
                    <Radio.Button value="a">Hangzhou</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                  </Radio.Group>
                </div>
              }
            >
              <div>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/home" render={(props) => <Home {...props} />} />
                  <Route path="/counter" component={Counter} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/login" component={LogIn} />
                  <Route path="/demo" component={Demo} />
                  <Route path="/todos" component={Todos} />
                  <Route path="/redirect" component={RedirectProxy} />
                  <Route path="/signout" component={LogOut} />
                  <Route
                    path="/logout"
                    children={({ location, ...rest }) => (
                      <Redirect
                        {...rest}
                        to={{
                          pathname: "/signout",
                          state: location.state,
                          search: location.search,
                        }}
                      />
                    )}
                  />
                  <Route path="/exception/:type?" component={Exception} />
                  <PrivateRoute path="/secret" component={Secret} />
                  <Redirect from="/join" to="/signup" />
                  <Route children={<NotFound />} />
                </Switch>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
      <FooterLayout>Footer ©2021</FooterLayout>
    </Layout>
  );
}

export default BasicLayout;
