import { object, string, boolean } from "yup";

const EMAIL = "Please input valid email";
const REQUIRED = "This field is required";
export const signUpFormValidation = object().shape({
  email: string()
    .email(EMAIL)
    .required(REQUIRED)
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      EMAIL
    ),
  password: string()
    .required(REQUIRED)
    .min(6, "Password length must be at least 6 characters")
    .max(20, "Password length must be no more 20 characters")
    .matches(
      /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
      "Password need at least one special character"
    )
    .matches(/^.*[A-Z].*$/, "Password need at least one capital letter"),
  name: string().required(REQUIRED),
  phone: string()
    .required(REQUIRED)
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Please input valid phone number"
    ),
  terms: boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});
