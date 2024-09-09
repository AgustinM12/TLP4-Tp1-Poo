"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_js_1 = require("../controllers/products.controller.js");
const product_validation_js_1 = require("../validators/product.validation.js");
const sale_validation_js_1 = require("../validators/sale.validation.js");
const jwt_js_1 = require("../helpers/jwt.js");
const router = (0, express_1.Router)();
router.get("/products", sale_validation_js_1.validateHeader, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.getProducts);
router.get("/product/:id", sale_validation_js_1.validateParamsId, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.getProduct);
router.get("/product", product_validation_js_1.validateProductName, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.getProductByName);
router.post("/product", product_validation_js_1.validateCreateProduct, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.createProduct);
router.put("/product/:id", product_validation_js_1.validateUpdateProduct, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.updateProduct);
router.delete("/product/:id", sale_validation_js_1.validateParamsId, jwt_js_1.verifyToken, jwt_js_1.verifyAdminOrSeller, products_controller_js_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map