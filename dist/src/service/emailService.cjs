"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/service/emailService.ts
var emailService_exports = {};
__export(emailService_exports, {
  default: () => emailService_default
});
module.exports = __toCommonJS(emailService_exports);
var import_ejs = __toESM(require("ejs"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_path = __toESM(require("path"), 1);
var __dirname = process.cwd();
var templatesPath = import_path.default.join(__dirname, "public/templates");
var sendEmail = async ({
  email,
  emailSubject,
  template,
  data,
  user = process.env.EMAIL_SERVER_USER,
  password = process.env.EMAIL_SERVER_PASSWORD,
  emailFrom = process.env.EMAIL_FROM
}) => {
  const transporter = import_nodemailer.default.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user,
      pass: password
    },
    secure: false
  });
  const html = await import_ejs.default.renderFile(import_path.default.join(templatesPath, `${template}.ejs`), data, {
    async: true
  });
  const mailOptions = {
    from: emailFrom,
    to: email,
    reply_to: emailFrom,
    subject: emailSubject,
    html
  };
  try {
    const report = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", report.messageId);
    return Promise.resolve(report);
  } catch (error) {
    return Promise.reject(error);
  }
};
var emailService_default = sendEmail;
//# sourceMappingURL=emailService.cjs.map