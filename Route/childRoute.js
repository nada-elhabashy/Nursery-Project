const express = require("express");
const controller = require("./../Controller/childController");
const validation = require("../core/validation/validationMW");
const childValidation = require("../Validation/childValidation");
const { checkAdmin } = require("./../core/auth/authenticationMW");
const router = express.Router();

router
  .route("/child")
  .all(checkAdmin)
  .get(controller.getAllChildren)
  .post(childValidation.postValidation, validation, controller.addChild)
  .patch(childValidation.patchValidation, validation, controller.updateChild)
  .delete(childValidation.deleteValidation, validation, controller.deleteChild);
router.get(
  "/childs/:id",
  checkAdmin,
  childValidation.getChildValidation,
  validation,
  controller.getChild
);

module.exports = router;
