import request from "supertest";
import app from "../src/main.js";
import httpConstants from "../src/constants/http.constants.js";

/*======================= Auth Test ==========================*/
describe("Auth", () => {
	it("logs in with correct credentials", async () => {
		const res = await request(app)
			.post("/auth/login")
			.send({ email: "admin@example.com", password: "password" });

		expect(res.statusCode).toBe(httpConstants.STATUS.OK);
		expect(res.body.data.token).toBeDefined();
	});
});
