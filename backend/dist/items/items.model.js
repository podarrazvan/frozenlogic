"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose = require("mongoose");
exports.ItemSchema = new mongoose.Schema({
    data: { type: String, require: true },
    children: [{ type: String }],
    isChild: { type: Boolean, require: true },
    childOf: { type: String }
});
//# sourceMappingURL=items.model.js.map