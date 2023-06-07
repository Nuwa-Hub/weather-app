import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  PageWrapper,
  Label,
  Input,
  StyledInlineErrorMessage,
  Submit,
} from "./styles";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Your name is too short")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("The email is incorrect")
    .required("Please enter your email"),
});

function Login() {
  const [formValues, setFormValues] = useState();

  return (
    <PageWrapper>
      <hr />
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          setFormValues(values);

          const timeOut = setTimeout(() => {
            actions.setSubmitting(false);

            clearTimeout(timeOut);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          isValidating,
          isValid,
        }) => {
          return (
            <>
              <Form name="contact" method="post" onSubmit={handleSubmit}>
                <Label htmlFor="email">
                  Email
                  <Input
                    type="email"
                    name="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="email"
                    placeholder="Email"
                    valid={touched.email && !errors.email}
                    error={touched.email && errors.email}
                  />
                </Label>
                <ErrorMessage name="email">
                  {(msg) => (
                    <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>
                  )}
                </ErrorMessage>

                <Label htmlFor="password">
                  Password
                  <Input
                    type="password"
                    name="password"
                    autoCorrect="off"
                    autoComplete="password"
                    placeholder="password"
                    valid={touched.password && !errors.password}
                    error={touched.password && errors.password}
                  />
                </Label>
                {errors.password && touched.password && (
                  <StyledInlineErrorMessage>
                    {errors.password}
                  </StyledInlineErrorMessage>
                )}
                <Submit type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? `Submiting...` : `Submit`}
                </Submit>
              </Form>
            </>
          );
        }}
      </Formik>
    </PageWrapper>
  );
}

export default Login;
