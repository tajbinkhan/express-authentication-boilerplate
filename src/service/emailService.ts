import handlebars from "handlebars";
import nodemailer from "nodemailer";

import { EmailTemplateSchemaType } from "@/databases/drizzle/types";

interface EmailService<T> {
	email: string;
	template: EmailTemplateSchemaType;
	data?: T;
	user?: string;
	password?: string;
	emailFrom?: string;
}

const sendEmail = async <T>({
	email,
	template,
	data,
	user = process.env.EMAIL_SERVER_USER,
	password = process.env.EMAIL_SERVER_PASSWORD,
	emailFrom = process.env.EMAIL_FROM
}: EmailService<T>) => {
	try {
		// Compile Handlebars template
		const compiledTemplate = handlebars.compile(template.html);
		const html = compiledTemplate(data);

		// Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT),
			auth: { user, pass: password },
			secure: process.env.EMAIL_SERVER_PORT === "465"
		});

		// Email content
		const mailOptions = {
			from: emailFrom,
			to: email,
			subject: template.subject,
			html
		};

		// Send the email
		const report = await transporter.sendMail(mailOptions);
		console.log("Email sent: %s", report.messageId);
		return report;
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
};

export default sendEmail;
