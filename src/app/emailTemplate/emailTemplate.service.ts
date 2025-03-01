import { eq } from "drizzle-orm";

import DrizzleService from "@/databases/drizzle/service";
import { EmailTemplateSchemaType } from "@/databases/drizzle/types";
import { emailTemplates } from "@/models/drizzle/emailTemplate.model";
import { ServiceApiResponse, ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class EmailTemplateService extends DrizzleService {
	async retrieveEmailTemplate(name: string): Promise<ServiceApiResponse<EmailTemplateSchemaType>> {
		try {
			const template = await this.db.query.emailTemplates.findFirst({
				where: eq(emailTemplates.name, name)
			});

			if (!template) {
				return ServiceResponse.createRejectResponse(
					status.HTTP_404_NOT_FOUND,
					"Email template not found"
				);
			}

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"Email template retrieved successfully",
				template
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
