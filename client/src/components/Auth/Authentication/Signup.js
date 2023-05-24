import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { sendNewUser } from "../../../store/actions";
import MainNavigation from "../../Layout/MainNavigation";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import classes from "./Signup.module.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (data) => {
    const result = dispatch(sendNewUser(data));
    console.log(result);
    navigate("/");
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  };
  const ValidationSchema = Yup.object().shape({
    firsname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    email: Yup.string()
      .email()
      .required(),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required(),
    mobile: Yup.number().required(),
    password: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum")
      .required(),
    confirmpassword: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum")
      .required(),
  });
  return (
    <Fragment>
      <MainNavigation />
      <div className="">
        <h3>Sign Up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className="">
            <label htmlFor="">FirstName</label>
            <ErrorMessage
              className={classes.errorMessage}
              name="firstname"
              component="span"
            />
            <Field placeholder="first name" name="firstname" id="firstname" />
            <label htmlFor="">Lastname</label>
            <ErrorMessage
              className={classes.errorMessage}
              name="lastname"
              component="span"
            />
            <Field placeholder="Last name" name="lastname" id="lastname" />
            <label htmlFor="">Email</label>
            <br />
            <ErrorMessage
              className={classes.errorMessage}
              name="email"
              component="span"
            />
            <Field placeholder="Email" name="email" id="email" />
            <label htmlFor="">Password</label>
            <br />

            <ErrorMessage
              className={classes.errorMessage}
              name="password"
              component="span"
            />
            <Field
              placeholder="password"
              name="password"
              type="password"
              id="password"
            />
            <label htmlFor="">Confirm Password</label>
            <br />

            <ErrorMessage
              className={classes.errorMessage}
              name="confirmpassword"
              component="span"
            />
            <Field
              name="confirmpassword"
              placeholder="Confirm password"
              id="confirmpassword"
            />

            <label htmlFor="">address</label>
            <br />

            <ErrorMessage
              className={classes.errorMessage}
              name="address"
              component="span"
            />
            <Field placeholder="address" name="address" id="address" />

            <label htmlFor="">mobile</label>
            <br />

            <ErrorMessage
              className={classes.errorMessage}
              name="mobile"
              component="span"
            />
            <Field placeholder="mobile" name="mobile" id="mobile" />

            <button type="submit" className="btn btn-primary btn-block ">
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
};

export default Signup;
