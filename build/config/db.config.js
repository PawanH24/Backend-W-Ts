"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = (DB_URI) => mongoose_1.default
    .connect(DB_URI, {
    //dbName: "JobSeeker",
    autoCreate: true,
})
    .then(() => {
    console.log("Database is connected");
})
    .catch((error) => {
    console.log("Database connection error", error);
});
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=db.config.js.map