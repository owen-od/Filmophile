import React from "react";
import RegisterForm from "../components/forms/registerForm"

export default {
  title: "Register Page/RegisterForm",
  component: RegisterForm,
};

export const Basic = () => {
  return (
    <RegisterForm />
  );
};
Basic.storyName = "Default";