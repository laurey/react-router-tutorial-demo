import React, { useMemo } from "react";
import classNames from "classnames";
import { Button, Icon } from "antd";
import { getPageQuery } from "../utils/utils";
import styles from "./redirect.module.scss";

function RedirectProxy(props) {
  const { link = "/" } = getPageQuery();
  const target = useMemo(() => decodeURIComponent(link), [link]);

  return (
    <div className={classNames(styles["flex-box"], styles.container)}>
      <div className={classNames(styles["box-item"], styles.left)}>
        <Icon type="warning" className={styles.warning} />
      </div>
      <div
        className={classNames(
          styles["box-item"],
          styles.right,
          styles["flex-box"]
        )}
      >
        <div className={classNames(styles["box-item"])}>提醒您：</div>
        <div className={classNames(styles["box-item"])}>
          以下页面无法确认安全性
        </div>
        <div className={classNames(styles["box-item"])}>{target}</div>
        <div className={classNames(styles["box-item"])}>
          如要继续访问，请点击下方按钮
        </div>
        <Button
          type="link"
          href={target}
          className={styles.linkBtn}
          target="_blank"
          rel="nofollow noreferrer external"
        >
          继续访问
        </Button>
      </div>
    </div>
  );
}

export default RedirectProxy;
