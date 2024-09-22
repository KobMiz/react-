import React, { useState } from "react";
import PageHeader from "../components/common/pageHeader";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../components/common/input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config.json";
import http from "../services/httpService";

const CreateCard = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizPhone: "",
      bizImage: "",
      bizState: "",
      bizCountry: "",
      bizCity: "",
      bizStreet: "",
      bizEmail: "", 
      bizWeb: "", 
    },
    validationSchema: Yup.object({
      bizName: Yup.string()
        .min(2, "Business Name must be at least 2 characters")
        .max(255, "Business Name must be at most 255 characters")
        .required("Business Name is required"),
      bizDescription: Yup.string()
        .min(2, "Business Description must be at least 2 characters")
        .max(1024, "Business Description must be at most 1024 characters")
        .required("Business Description is required"),
      bizPhone: Yup.string()
        .min(9, "Business Phone must be at least 9 characters")
        .max(10, "Business Phone must be at most 10 characters")
        .matches(/^0[2-9]\d{7,8}$/, "Invalid phone number")
        .required("Business Phone is required"),
      bizEmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      bizWeb: Yup.string().url("Invalid URL").notRequired(), 
      bizState: Yup.string()
        .min(2, "State must be at least 2 characters")
        .required("State is required"),
      bizCountry: Yup.string()
        .min(2, "Country must be at least 2 characters")
        .required("Country is required"),
      bizCity: Yup.string()
        .min(2, "City must be at least 2 characters")
        .required("City is required"),
      bizStreet: Yup.string()
        .min(2, "Street must be at least 2 characters")
        .required("Street is required"),
      bizImage: Yup.string()
        .min(11, "Business Image URL must be at least 11 characters")
        .max(1024, "Business Image URL must be at most 1024 characters")
        .url("Invalid URL")
        .notRequired(),
    }),

    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await http.post(`${apiUrl}/cards`, values);
        toast.success("Card created successfully!");
        navigate("/my-cards");
      } catch (error) {
        console.error(
          "Error creating card:",
          error.response?.data || error.message
        );
        setServerError(
          "Failed to create card. Please check your input and try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <PageHeader
        title="Create Business Card"
        description="Create a new business card for your company."
      />
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}
          <form onSubmit={form.handleSubmit} autoComplete="off">
            <Input
              {...form.getFieldProps("bizName")}
              label="Business Name"
              error={form.touched.bizName && form.errors.bizName}
            />
            <Input
              {...form.getFieldProps("bizDescription")}
              label="Business Description"
              error={form.touched.bizDescription && form.errors.bizDescription}
            />

            <div className="row">
              <div className="col-md-6">
                <Input
                  {...form.getFieldProps("bizState")}
                  label="State"
                  error={form.touched.bizState && form.errors.bizState}
                />
              </div>
              <div className="col-md-6">
                <Input
                  {...form.getFieldProps("bizCountry")}
                  label="Country"
                  error={form.touched.bizCountry && form.errors.bizCountry}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  {...form.getFieldProps("bizCity")}
                  label="City"
                  error={form.touched.bizCity && form.errors.bizCity}
                />
              </div>
              <div className="col-md-6">
                <Input
                  {...form.getFieldProps("bizStreet")}
                  label="Street"
                  error={form.touched.bizStreet && form.errors.bizStreet}
                />
              </div>
            </div>

            <Input
              {...form.getFieldProps("bizPhone")}
              label="Business Phone"
              error={form.touched.bizPhone && form.errors.bizPhone}
            />
            <Input
              {...form.getFieldProps("bizImage")}
              label="Business Image (URL)"
              error={form.touched.bizImage && form.errors.bizImage}
            />
            <Input
              {...form.getFieldProps("bizEmail")}
              label="Business Email"
              error={form.touched.bizEmail && form.errors.bizEmail}
            />
            <Input
              {...form.getFieldProps("bizWeb")}
              label="Business Website"
              error={form.touched.bizWeb && form.errors.bizWeb}
            />

            <div className="text-center mt-3">
              <button
                type="submit"
                disabled={!form.isValid || isLoading}
                className="btn btn-dark"
              >
                {isLoading ? "Creating Card..." : "Create Card"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
