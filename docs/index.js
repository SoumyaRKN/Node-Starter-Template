import tags from "./tags.js";
import paths from "./paths.js";
import schemas from "./schemas.js";
import servers from "./servers.js";

/* ====================== Swagger Documentation ====================== */
export const options = {
	customSiteTitle: "Node Starter Template Documentation",
	customCss: ".swagger-ui .topbar { display: none }",
};

export const documentation = {
	openapi: "3.1.0",
	info: {
		version: "1.0.0",
		title: "Node Starter Template - Documentation",
		description: "REST API documentation for Node Starter Template.",
		termsOfService: "",
		contact: {
			name: "Soumya Prakash Nayak",
			email: "spnayak@zolute.consulting",
		},
		license: {
			name: "Apache 2.0",
			url: "https://www.apache.org/licenses/LICENSE-2.0.html",
		},
	},
	servers,
	tags,
	paths,
	components: {
		schemas,
		securitySchemes: {
			Authorization: {
				type: "apiKey",
				in: "header",
				name: "Authorization",
				description:
					"JWT-based authentication. Include the token as 'Authorization: Bearer <token>' in the request headers.",
			},
		},
	},
	security: [{ Authorization: [] }],
};
