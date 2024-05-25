import joi from "joi";

const userSchema = joi.object({
  fname: joi
    .string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  lname: joi
    .string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  email: joi.string().email().required(),
  location: joi.string().required(),
  gender: joi.string().required(),
  pwd: joi
    .string()
    .required()
    .regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/),
});

export default userSchema;
