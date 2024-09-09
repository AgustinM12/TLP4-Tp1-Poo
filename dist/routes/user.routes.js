"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validation_1 = require("../validators/user.validation");
const sale_validation_1 = require("../validators/sale.validation");
const jwt_1 = require("../helpers/jwt");
const router = (0, express_1.Router)();
router.get("/userRole/:role", sale_validation_1.validateParamsRole, jwt_1.verifyToken, jwt_1.verifyAdmin, user_controller_1.getUsersByRole);
router.get("/user/:id", sale_validation_1.validateParamsId, jwt_1.verifyToken, jwt_1.verifyAdmin, user_controller_1.getUserById);
router.get("/userNameEmail", user_validation_1.validateNameOrEmail, jwt_1.verifyToken, jwt_1.verifyAdminOrSeller, user_controller_1.getUserByNameOrEmail);
router.post("/client", user_validation_1.validateCliente, user_controller_1.createClient);
router.post("/seller", user_validation_1.validateSeller, jwt_1.verifyToken, jwt_1.verifyAdmin, user_controller_1.createSeller);
router.post("/login", user_validation_1.validateLogin, user_controller_1.login);
router.delete("/user/:id", sale_validation_1.validateParamsId, jwt_1.verifyToken, jwt_1.verifyAdmin, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map