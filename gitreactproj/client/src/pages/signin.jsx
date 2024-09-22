import React, { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

function Signin() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // שימוש ב-hook בתוך רכיב פונקציונלי

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(6)
          .max(255)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email"),
        password: Joi.string().min(6).max(1024).required().label("Password"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];
        errors[key] = detail.message;
      }
      return errors;
    },

    async onSubmit(values) {
      try {
        await login(values); 
        navigate("/"); 
      } catch (err) {
        setServerError("Invalid email or password.");
      }
    },
  });

  return (
    <div className="container">
      <PageHeader title="Sign In" description="Sign in to your account" />

      <form
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          gap: 10,
        }}
      >
        {serverError && <div className="alert alert-danger">{serverError}</div>}

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

        <div style={{ marginTop: "1.8vh", marginLeft: "1vw" }}>
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-dark"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
