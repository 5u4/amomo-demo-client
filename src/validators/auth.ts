import * as yup from "yup";

export const username = yup
  .string()
  .required()
  .min(3)
  .max(16)
  .lowercase()
  .matches(/[0-9a-z]*/);

export const email = yup
  .string()
  .required()
  .email()
  .max(64);

export const password = yup
  .string()
  .required()
  .min(6)
  .max(32);
