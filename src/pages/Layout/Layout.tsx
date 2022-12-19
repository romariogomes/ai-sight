import React from "react";
import { ThemeProvider } from "styled-components";
import { themeConfig } from "./theme";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={themeConfig}>
    <div className="container py-4">{children}</div>
  </ThemeProvider>
);
