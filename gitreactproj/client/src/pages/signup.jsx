import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import { createUser } from "../services/usersService";
import { useAuth } from "../contexts/auth.context";

function Signup() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        name: Joi.string().min(2).max(255).required().label("Name"),
        email: Joi.string()
          .min(6)
          .max(255)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email"),
        password: Joi.string().min(6).max(1024).required().label("Password"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) return null;

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      console.log("Form submitted with values: ", values); 
      try {
        await signUp({ ...values, biz: false });
      
        navigate("/signin");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError("Email is taken");
        }
      }
    },
  });

  return (
    <div className="container">
      <PageHeader title="Sign Up" description="Open a new account now!" />

      <form
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
        style={{ marginTop: 50 }}
      >
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          placeholder="Your full name"
          required
          error={form.touched.name && form.errors.name}
        />
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          placeholder="your@email.com"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />

        <button
          type="submit"
          disabled={!form.isValid}
          className="btn btn-dark mt-3"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
