"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import type { FC, PropsWithChildren } from "react";

import "@ant-design/v5-patch-for-react-19";

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider layer>
      <ConfigProvider theme={{ cssVar: true, hashed: false }}>
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdProvider;
