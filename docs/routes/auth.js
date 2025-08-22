import responses from "../responses.js";
import httpConstants from "../../src/constants/http.constants.js";

/* ====================== Swagger Documentation Auth Route ====================== */
/** Requests */
export const login = {
	tags: ["Authentication"],
	summary: "User Login",
	description: "Logs in a user.",
	operationId: "user-login",
	requestBody: {
		required: true,
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/Login Request Body",
				},
			},
		},
	},
	responses: {
		200: {
			description: "Success",
			content: {
				"application/json": {
					schema: {
						type: "object",
						properties: {
							code: {
								type: "string",
								description: "Code of the operation.",
								example: httpConstants.CODES.OK,
							},
							state: {
								type: "string",
								description: "State of the operation.",
								example: "SUCCESS",
							},
							message: {
								type: "string",
								description: "Message indicating status of the operation.",
								example: httpConstants.MESSAGES.OK,
							},
							data: {
								type: "object",
								description: "Logged in user details and auth token.",
								example: {
									user: {
										id: 1,
										email: "admin@example.com",
										status: true,
										isAdmin: true,
									},
									token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYVB6MDdGV2hxbGJ6IiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOnsiaWQiOiJuaVN6TmNMdkpJMjEiLCJuYW1lIjoiYWRtaW4ifSwib3JnYW5pemF0aW9uIjoiT1JHX05FVFZJU1MifSwiaWF0IjoxNzQxNjg0MjIyLCJleHAiOjE3NDE2OTUwMjJ9.nA6h24T-jxK5pOoDC2ilGdm16u7I1yBuswbjqEIDIcw",
								},
							},
						},
					},
				},
			},
		},
		...responses,
	},
};
