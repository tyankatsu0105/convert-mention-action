"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
/**
 * Find package.json with path.
 * @param path
 */
exports.findPackageJson = (path) => {
    return fs_1.default.readFileSync(path_1.join(path, 'package.json')).toString();
};
/**
 * Get version field within package.json
 * @param path
 */
exports.getPackageVersion = (path) => {
    const packageJson = exports.findPackageJson(path);
    return JSON.parse(packageJson).version;
};
