import Joi from "joi";
import { useFormik } from "formik";
import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

function SignUpBiz() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { user, signUp, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
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
        confirmPassword: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .label("Confirm Password")
          .messages({
            "any.only": "The confirmation password must match the password.",
          }),
        phone: Joi.string()
          .pattern(/^[0-9]{10}$/)
          .required()
          .label("Phone"),
        country: Joi.string().min(2).max(255).required().label("Country"),
        state: Joi.string().allow("").max(255).label("State"), // שדה אופציונלי
        city: Joi.string().min(2).max(255).required().label("City"),
        street: Joi.string().allow("").max(255).label("Street"), // שדה אופציונלי
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
        await signUp({
          name: values.name,
          email: values.email,
          password: values.password,
          biz: true,
        });
        await login({ email: values.email, password: values.password });
        navigate("/my-cards");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        } else {
          setServerError("An unexpected error occurred.");
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <PageHeader
        title="Sign Up for Business Account"
        description="Create your business account now! Enjoy exclusive features tailored for your business needs."
      />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="row">
          <div className="col-12">
            <Input
              {...form.getFieldProps("name")}
              type="text"
              label="Name"
              placeholder="John Doe"
              required
              error={form.touched.name && form.errors.name}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("email")}
              type="email"
              label="Email"
              placeholder="john@doe.com"
              required
              error={form.touched.email && form.errors.email}
            />
          </div>
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("phone")}
              type="tel"
              label="Phone"
              placeholder="0501234567"
              required
              error={form.touched.phone && form.errors.phone}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("country")}
              type="text"
              label="Country"
              placeholder="Country"
              required
              error={form.touched.country && form.errors.country}
            />
          </div>
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("city")}
              type="text"
              label="City"
              placeholder="City"
              required
              error={form.touched.city && form.errors.city}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("state")}
              type="text"
              label="State (optional)"
              placeholder="State"
              error={form.touched.state && form.errors.state}
            />
          </div>
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("street")}
              type="text"
              label="Street (optional)"
              placeholder="Street"
              error={form.touched.street && form.errors.street}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("password")}
              type="password"
              label="Password"
              required
              error={form.touched.password && form.errors.password}
            />
          </div>
          <div className="col-md-6">
            <Input
              {...form.getFieldProps("confirmPassword")}
              type="password"
              label="Confirm Password"
              required
              error={
                form.touched.confirmPassword && form.errors.confirmPassword
              }
            />
          </div>
        </div>

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-dark"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpBiz;
