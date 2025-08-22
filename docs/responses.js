import httpConstants from "../src/constants/http.constants.js";

/* ====================== Swagger Documentation Common Responses ====================== */
export default {
	400: {
		description: "Bad Request",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.BAD_REQUEST,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.BAD_REQUEST,
						},
						data: {
							type: "object",
							description: "Contains error details encountered during the request.",
							example: {
								errors: [
									{
										instancePath: "/password",
										schemaPath: "#/properties/password/minLength",
										keyword: "minLength",
										params: {
											limit: 6
										},
										message: "must NOT have fewer than 6 characters"
									}
								],
							},
						},
					},
				},
			},
		},
	},
	401: {
		description: "Unauthorized",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.UNAUTHORIZED,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.UNAUTHORIZED,
						},
					},
				},
			},
		},
	},
	403: {
		description: "Forbidden",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.FORBIDDEN,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.FORBIDDEN,
						},
					},
				},
			},
		},
	},
	404: {
		description: "Not Found",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.NOT_FOUND,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.NOT_FOUND,
						},
					},
				},
			},
		},
	},
	409: {
		description: "Conflict",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.CONFLICT,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.CONFLICT,
						},
					},
				},
			},
		},
	},
	410: {
		description: "Gone",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.GONE,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.GONE,
						},
					},
				},
			},
		},
	},
	422: {
		description: "Unprocessable Entity",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.UNPROCESSABLE_ENTITY,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "FAIL",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.UNPROCESSABLE_ENTITY,
						},
					},
				},
			},
		},
	},
	500: {
		description: "Internal Server Error",
		content: {
			"application/json": {
				schema: {
					type: "object",
					properties: {
						code: {
							type: "string",
							description: "Code of the operation.",
							example: httpConstants.CODES.INTERNAL_SERVER_ERROR,
						},
						state: {
							type: "string",
							description: "State of the operation.",
							example: "ERROR",
						},
						message: {
							type: "string",
							description: "Message indicating status of the operation.",
							example: httpConstants.MESSAGES.INTERNAL_SERVER_ERROR,
						},
					},
				},
			},
		},
	},
};
