"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_controller_js_1 = require("../controllers/sale.controller.js");
const sale_validation_js_1 = require("../validators/sale.validation.js");
const jwt_js_1 = require("../helpers/jwt.js");
const router = (0, express_1.Router)();
router.get("/sales", sale_validation_js_1.validateHeader, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, sale_controller_js_1.getSales);
router.get("/sale/:id", sale_validation_js_1.validateSaleId, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, sale_controller_js_1.getSaleById);
router.get("/saleDate", sale_validation_js_1.validateDate, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, sale_controller_js_1.getSalesByDate);
router.get("/saleByUser/:id", sale_validation_js_1.validateHeader, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, sale_controller_js_1.getSalesByUser);
router.post("/sale", sale_validation_js_1.validateCreateSale, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, sale_controller_js_1.createSale);
exports.default = router;
//# sourceMappingURL=sale.routes.js.map