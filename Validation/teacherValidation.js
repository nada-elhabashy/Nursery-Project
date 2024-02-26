const { body, param } = require("express-validator");

exports.postValidation = [
  body("id").isMongoId().withMessage("Teacher Id should be Object"),
  body("fullName").isString().withMessage("Teacher Name should be string"),
  body("password")
    .isString()
    .withMessage("Password Must Be Hybrid")
    .isLength({ Min: 4 })
    .withMessage("Password must be > 8"),
  body("email").isEmail().withMessage("Email is Invalid"),
  body("image").optional().isString().withMessage("Image is Invalid"),
];

exports.patchValidation = [
  body("id").isMongoId().withMessage("Teacher Id Must Be included"),
  body("fullName")
    .optional()
    .isString()
    .withMessage("Teacher Name should be string"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password Must Be Hybrid")
    .isLength({ Min: 4 })
    .withMessage("Password must be > 8"),
  body("email").optional().isEmail().withMessage("Email is Invalid"),
  body("image").optional().isString().withMessage("Image is Invalid"),
];

exports.getTeacherValidation = [
  param("id").isMongoId().withMessage("Teacher Id should be Object"),
];

exports.deleteValidation = [
  body("id").isMongoId().withMessage("Teacher Id should be Object"),
];
