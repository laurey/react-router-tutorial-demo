import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";
import { Card } from "antd";
import FancyLink from "../components/FancyLink";

function Home(props) {
  const match = useRouteMatch("/:name");
  const logTo = useMemo(() => {
    const { url } = match || {};

    const path = {
      pathname: "/logout",
    };

    if (!url) {
      return path;
    } else if (url === "/comments") {
      Object.assign(path, {
        state: {
          redirect: {
            to: {
              pathname: "/signup",
              search: "?sort=name",
              hash: "#the-hash",
              state: { fromDashboard: true },
            },
          },
        },
      });
    } else if (url === "/posts") {
      Object.assign(path, {
        pathname: "/signout",
        state: {
          redirect: {
            to: "/?from=posts#hash",
          },
        },
      });
    }

    return path;
  }, [match]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{props.location ? "has location prop" : "no location prop"}</p>
      <p>pathname: {props.location?.pathname ?? "has no location pathname"}</p>
      <div className="rtc-page-header-wrapper-header">
        <Card style={{ marginBottom: 10 }} bordered={false}>
          <ul style={{ marginTop: 20 }}>
            <li>
              <FancyLink
                title="sign out page"
                to="/signout"
                name="SignOut with nothing"
              />
            </li>
            <li>
              <Link title="log out" to={logTo}>
                Log out
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/signout",
                  state: {
                    redirect: {
                      to: "/counter?target=to+counter+page#hash",
                    },
                  },
                }}
              >
                Log out with redirect state
              </Link>
            </li>
            <li>
              <FancyLink
                activeOnlyWhenExact
                name="GitHub"
                target="_blank"
                to="https://www.github.com/search?q=react+%E6%95%99%E7%A8%8B"
              />
            </li>
            <li>
              <FancyLink.AnchorLink
                href="/demo?title=ios"
                name="Demo"
                title="Demo page"
              />
            </li>
            <li>
              <FancyLink
                target="_blank"
                title="Join us"
                to="/join"
                name={<b>Join</b>}
              />
            </li>
            <li>
              <FancyLink
                to="/exception"
                name="Exception"
                title="This is a 404 page"
              />
            </li>
            <li>
              <FancyLink
                to={`/logout?redirect=${encodeURIComponent(
                  "/signup?msg=redirect+message"
                )}`}
                name="SignOut with redirect query param"
              />
            </li>
            <li>
              <FancyLink
                to={{
                  pathname: "/exception/401",
                }}
                name="Exception401"
              />
            </li>
            <li>
              <FancyLink.AnchorLink
                name={<strong>Google</strong>}
                target="_blank"
                href="https://www.google.com/search?q=js+es2020"
              />
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

Home.propTypes = {
  title: PropTypes.string,
};

export default Home;
