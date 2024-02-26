const express = require("express");
const controller = require("./../Controller/classController");
const validation = require("../core/validation/validationMW");
const classValidation = require("./../Validation/classValidation");
const {
  checkAdmin,
  checkTeacherAndAdmin,
} = require("./../core/auth/authenticationMW");
const router = express.Router();

router
  .route("/class")
  .all(checkAdmin)
  .get(controller.getAllClasses)
  .post(classValidation.postValidation, validation, controller.addClass)
  .patch(classValidation.patchValidation, validation, controller.updateClass)
  .delete(classValidation.deleteClass, validation, controller.deleteClass);
router.get(
  "/class/:id",
  checkAdmin,
  classValidation.validateClassId,
  validation,
  controller.getClass
);
router.get(
  "/classChildren/:id",
  checkAdmin,
  classValidation.validateClassId,
  validation,
  controller.getClassChildren
);
router.get(
  "/classTeacher/:id",
  checkAdmin,
  classValidation.validateClassId,
  validation,
  controller.getClassTeacher
);

module.exports = router;
