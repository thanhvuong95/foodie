import * as yup from "yup";
export const schemaSignIn = yup.object().shape({
    email:  yup
            .string()
            .required('Email is required.')
            .matches(
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
               'Email format invalid.'
            ),
    password:   yup
                .string()
                .required("You must specify a password.")
                .matches(
                    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                    'Password minimum 8 characters, at least one letter and one number.'
                ),
  
  });
  export const schemaSignUp = yup.object().shape({
    email:  yup
            .string()
            .required('Email is required.')
            .matches(
               /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
               'Email format invalid.'
            ),
    password:   yup
                .string()
                .required("You must specify a password.")
                .matches(
                    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                    'Password minimum 8 characters, at least one letter and one number.'
                ),
    confirmPassword: yup
                    .string()
                    .required("You must specify a password.")
                    .oneOf([yup.ref('password'), null], 'Passwords must match.')
  });
  export const schemaCheckout = yup.object().shape({
    firstName:  yup
            .string()
            .required('First name is required.'),
    lastName:   yup
                .string()
                .required("Last name is required."),
    address: yup
                    .string()
                    .required("Address cannot be left blank."),
    phone:  yup
            .string()
            .required("You must input phone.")
            .matches(/^[0-9]+$/, "Phone must be only digits.")
            .min(10, 'Phone must be exactly 10 digits.')
            .max(10, 'Phone must be exactly 10 digits.')                                
  });
