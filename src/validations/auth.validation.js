/*======================= Auth Validation ==========================*/
export const loginSchema = {
	type: "object",
	properties: {
		email: {
			type: "string",
			format: "email",
			minLength: 5,
			maxLength: 50,
		},
		password: {
			type: "string",
			minLength: 6,
			maxLength: 16,
		},
	},
	required: ["email", "password"],
	additionalProperties: false,
};
