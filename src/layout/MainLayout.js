import { Stack } from "@mui/material";
import React from "react";

import Header from "./Header";

function MainLayout({ children }) {
  return (
    <Stack spacing={2}>
      <Header></Header>
      <main>{children}</main>
    </Stack>
  );
}

export default MainLayout;
