import nodemailer from "nodemailer";

interface EmailService {
	email: string;
	emailSubject: string;
	template: string;
	user?: string;
	password?: string;
	emailFrom?: string;
}

const sendEmail = async ({
	email,
	emailSubject,
	template,
	user = process.env.EMAIL_SERVER_USER,
	password = process.env.EMAIL_SERVER_PASSWORD,
	emailFrom = process.env.EMAIL_FROM
}: EmailService) => {
	// Configure your email transporter (replace placeholders with actual values)
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_SERVER_HOST,
		port: Number(process.env.EMAIL_SERVER_PORT),
		auth: {
			user,
			pass: password
		},
		secure: false
	});

	// Email content
	const mailOptions = {
		from: emailFrom,
		to: email,
		reply_to: emailFrom,
		subject: emailSubject,
		html: template
	};

	// Send the email
	try {
		const report = await transporter.sendMail(mailOptions);
		console.log("Email sent: %s", report.messageId);
		return Promise.resolve(report);
	} catch (error) {
		return Promise.reject(error);
	}
};

export default sendEmail;
