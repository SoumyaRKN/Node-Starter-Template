import { model, Schema } from "mongoose";

/* ====================== Mongoose User Model ====================== */
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
			default: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true },
);

export default model("user", UserSchema);
