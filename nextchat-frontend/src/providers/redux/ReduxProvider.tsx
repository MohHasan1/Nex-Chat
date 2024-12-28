"use client";
import store from "@/store/redux-store";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
