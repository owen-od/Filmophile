import React from "react";
import LoginForm from "../components/forms/loginForm"

export default {
  title: "Login Page/LoginForm",
  component: LoginForm,
};

export const Basic = () => {
  return (
    <LoginForm />
  );
};
Basic.storyName = "Default";