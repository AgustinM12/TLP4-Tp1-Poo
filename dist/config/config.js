"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = exports.URI = exports.PORT = void 0;
// PORT=5000
// SECRET=123456
// URI=mongodb://127.0.0.1:27017/POO
exports.PORT = process.env.PORT || "5000";
exports.URI = process.env.URI || "mongodb://127.0.0.1:27017/POO";
exports.secretKey = process.env.SECRET || "123456";
//# sourceMappingURL=config.js.map