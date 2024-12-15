import React from "react";

import HomePage from "../pages/HomePage";
import MainLayout from "../layout/MainLayout";
import SigninPage from "../pages/SigninPage";

const routes = [
  {
    path: "/",
    element: <SigninPage />,
  },
  {
    path: "/home",
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
];

export default routes;
