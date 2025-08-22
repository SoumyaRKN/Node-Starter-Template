import mongoose from "mongoose";
import logger from "../utils/logger.js";

/* ====================== Mongoose ====================== */
const uri = process.env.MONGO_URI;

if (!uri) {
	logger.error("Please provide a valid MONGO_URI in the environment variables");
	process.exit(1);
}

export const connectMongo = async () => {
	try {
		await mongoose.connect(uri, { autoIndex: true });

		logger.info(`Mongoose connected → ${uri}`);
	} catch (error) {
		logger.error("Mongoose connection error:", error);
		process.exit(1);
	}
};

export default mongoose;
