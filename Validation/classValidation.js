const {body,param}= require("express-validator");
 exports.postValidation = [
   body("id").isNumeric().withMessage("class id is required"),
   body("fullname").isString().withMessage("class name is required"),
   body("supervisor").isMongoId().withMessage("Teacher Id Is Invalid"),
   body("children").isArray().withMessage("Children Is Missing"),
   body("children.*").isInt().withMessage("Children ID is Invalid"),
 ];

 exports.patchValidation = [
   body("id").isNumeric().withMessage("Class Id should be Entered"),
   body("fullName")
     .optional()
     .isString()
     .withMessage("Class Name should be string"),
   body("supervisor")
     .optional()
     .isMongoId()
     .withMessage("Teacher Id Is Invalid"),
   body("children").optional().isArray().withMessage("Children Is Missing"),
   body("children.*").optional().isInt().withMessage("Children ID is Invalid"),
 ];

 exports.validateClassId = [
   param("id").isNumeric().withMessage("Class Id should be Entered"),
 ];

 exports.deleteClass = [
   body("id").isNumeric().withMessage("Class Id should be Entered"),
 ];
