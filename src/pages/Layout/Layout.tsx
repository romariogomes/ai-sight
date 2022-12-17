import React from "react";
import { ThemeProvider } from "styled-components";
import { Header } from "components/Header";
import { Container } from "./styles";
import { themeConfig } from "./theme";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={themeConfig}>
    {/* <Container>
      <Header />
      {children}
    </Container> */}
    <div className="container py-4">{children}</div>
  </ThemeProvider>
);
