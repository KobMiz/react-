import React, { useEffect } from "react";
import PageHeader from "../components/common/pageHeader";
import Joi from "joi-browser";
import { useNavigate, useParams } from "react-router-dom";
import cardService from "../services/cardsService";
import Input from "../components/common/input";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizState: Joi.string().min(3).max(400).required(),
    bizCountry: Joi.string().min(3).max(400).required(),
    bizCity: Joi.string().min(2).max(400).required(),
    bizStreet: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/)
      .required(),
    bizImage: Joi.string().min(11).max(1024).uri().allow(""),
    bizEmail: Joi.string().email().required(), 
    bizWeb: Joi.string().uri().allow(""), 
  };

  const formik = useFormik({
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizState: "",
      bizCountry: "",
      bizCity: "",
      bizStreet: "",
      bizPhone: "",
      bizImage: "",
      bizEmail: "", 
      bizWeb: "", 
    },
    validationSchema: Joi.object(schema),
    onSubmit: async (values) => {
      try {
        console.log("Updating card with values:", values);
        await cardService.updateCard(id, values);
        toast.success("Card is updated");
        navigate("/my-cards");
      } catch (error) {
        toast.error(
          "Failed to update card: " +
            (error.response ? error.response.data : error.message)
        );
      }
    },
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data: card } = await cardService.getCard(id);
        formik.setValues(mapToViewModel(card));
      } catch (error) {
        toast.error("Failed to fetch card details");
      }
    };

    fetchCard();
  }, [id]);

  const mapToViewModel = (card) => ({
    bizName: card.bizName,
    bizDescription: card.bizDescription,
    bizPhone: card.bizPhone,
    bizImage: card.bizImage,
    bizState: card.bizState,
    bizCountry: card.bizCountry,
    bizCity: card.bizCity,
    bizStreet: card.bizStreet,
    bizEmail: card.bizEmail, 
    bizWeb: card.bizWeb, 
  });

  return (
    <div className="container mt-5 d-flex align-items-center text-center">
      <div className="col-lg-6 mx-auto">
        <PageHeader titleText="Edit Card Form" />
        <div className="row">
          <div className="col-12">
            <p>Fill out card details here</p>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizName")}
                label="Business Name"
                error={formik.touched.bizName && formik.errors.bizName}
              />
            </div>
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizDescription")}
                label="Business Description"
                error={
                  formik.touched.bizDescription && formik.errors.bizDescription
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizState")}
                label="Business State"
                error={formik.touched.bizState && formik.errors.bizState}
              />
            </div>
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizCountry")}
                label="Business Country"
                error={formik.touched.bizCountry && formik.errors.bizCountry}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizCity")}
                label="Business City"
                error={formik.touched.bizCity && formik.errors.bizCity}
              />
            </div>
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizStreet")}
                label="Business Street"
                error={formik.touched.bizStreet && formik.errors.bizStreet}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizPhone")}
                label="Business Phone"
                error={formik.touched.bizPhone && formik.errors.bizPhone}
              />
            </div>
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizImage")}
                label="Business Image (URL)"
                error={formik.touched.bizImage && formik.errors.bizImage}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizEmail")}
                label="Business Email"
                error={formik.touched.bizEmail && formik.errors.bizEmail}
              />
            </div>
            <div className="col-md-6">
              <Input
                {...formik.getFieldProps("bizWeb")}
                label="Business Website"
                error={formik.touched.bizWeb && formik.errors.bizWeb}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <button type="submit" className="btn btn-dark mt-3 ">
              Update Card
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2 mt-3"
              onClick={() => navigate("/my-cards")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
