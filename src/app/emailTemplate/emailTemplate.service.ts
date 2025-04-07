import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

import DrizzleService from "@/databases/drizzle/service";
import { EmailTemplateSchemaType } from "@/databases/drizzle/types";
import { emailTemplates } from "@/models/drizzle/emailTemplate.model";
import { ServiceApiResponse, ServiceResponse } from "@/utils/serviceApi";

export default class EmailTemplateService extends DrizzleService {
	async retrieveEmailTemplate(name: string): Promise<ServiceApiResponse<EmailTemplateSchemaType>> {
		try {
			const template = await this.db.query.emailTemplates.findFirst({
				where: eq(emailTemplates.name, name)
			});

			if (!template) {
				return ServiceResponse.createRejectResponse(
					StatusCodes.NOT_FOUND,
					"Email template not found"
				);
			}

			return ServiceResponse.createResponse(
				StatusCodes.OK,
				"Email template retrieved successfully",
				template
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
