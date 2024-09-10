"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = exports.URI = exports.PORT = void 0;
require("dotenv/config");
// PORT=5000
// SECRET=123456
// URI=mongodb://127.0.0.1:27017/POO
exports.PORT = process.env.PORT;
exports.URI = process.env.URI;
exports.secretKey = process.env.SECRET;
//# sourceMappingURL=config.js.map