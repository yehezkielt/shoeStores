const app = require("../app");
const req = require("supertest");
const { User, Shoes, Category } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token; //global token
let access_staff; //global token
beforeAll(async () => {
	// SEEDING
	let user = await User.bulkCreate(
		[
			{
				username: "admin",
				email: "admin@mail.com",
				role: "admin",
				password: "admin",
			},
			{
				username: "staff",
				email: "staff@mail.com",
				role: "staff",
				password: "staff",
			},
		],
		{ individualHooks: true }
	); // perlu ada, jika pakai bulkCreate

	await Category.bulkCreate([
		{
			name: "sneakers",
			name: "loafers",
		},
	]);

	access_token = signToken({ id: user[0].id });
	access_staff = signToken({ id: user[1].id });
});

// Process testing
describe("Read Shoes (public - Site)", () => {
	test("Read success", async () => {
		let res = await req(app).get("/pub-product");
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
});

describe("Create Shoes (Need Authen)", () => {
	test("Forbidden", async () => {
		let dummyData = {
			name: "tes1",
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.post("/shoes")
			.set("Authorization", `Bearer ${access_staff}`)
			.send(dummyData);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			title: "tes1",
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.post("/shoes")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
	test("Validation error", async () => {
		let dummyData = {
			description: "tes1",
			image: "tes1",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.post("/shoes")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Buy Shoes (Need Authen)", () => {
	// test("Payment success", async () => {
	// 	let res = await req(app)
	// 		.post("/shoes/payment/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(201);
	// 	expect(res.body).toHaveProperty("token", res.body.token);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.post("/shoes/payment/30")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
});

describe("Read Shoes (Need Authen)", () => {
	test("Read success", async () => {
		let res = await req(app)
			.get("/shoes")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});
	test("Invalid token", async () => {
		let res = await req(app).get("/shoes").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
	// test("Get data by params", async () => {
	// 	let res = await req(app)
	// 		.get("/shoes/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toBeInstanceOf(Object);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.get("/shoes/30")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body.msg).toBe("Data not found");
	});
});

describe("Update Shoes (Need Authen)", () => {
	// test("Updated success", async () => {
	// 	let dummyData = {
	// 		title: "tes1 update",
	// 		description: "tes1 update",
	// 		image: "tes1 update",
	// 		price: 2000,
	// 		CategoryId: 1,
	// 	};
	// 	let res = await req(app)
	// 		.put("/shoes/1")
	// 		.set("Authorization", `Bearer ${access_token}`)
	// 		.send(dummyData);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toHaveProperty("msg", res.body.msg);
	// });
	test("Data not found", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.put("/shoes/30")
			.set("Authorization", `Bearer ${access_token}`)
			.send(dummyData);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Forbidden", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.put("/shoes/1")
			.set("Authorization", `Bearer ${access_staff}`)
			.send(dummyData);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let dummyData = {
			title: "tes1 update",
			description: "tes1 update",
			image: "tes1 update",
			price: 2000,
			CategoryId: 1,
            quantity: 1,
            size: 41,
		};
		let res = await req(app)
			.put("/shoes/1")
			.set("Authorization", null)
			.send(dummyData);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
});

describe("Delete Shoes (Need Authen)", () => {
	// test("Delete success", async () => {
	// 	let res = await req(app)
	// 		.delete("/shoes/1")
	// 		.set("Authorization", `Bearer ${access_token}`);
	// 	expect(res.status).toBe(200);
	// 	expect(res.body).toHaveProperty("msg", res.body.msg);
	// });
	test("Data not found", async () => {
		let res = await req(app)
			.delete("/shoes/30")
			.set("Authorization", `Bearer ${access_token}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Forbidden", async () => {
		let res = await req(app)
			.put("/shoes/1")
			.set("Authorization", `Bearer ${access_staff}`);
		expect(res.status).toBe(403);
		expect(res.body).toHaveProperty("msg", res.body.msg);
	});
	test("Token null", async () => {
		let res = await req(app).put("/shoes/1").set("Authorization", null);
		expect(res.status).toBe(401);
		expect(res.body.msg).toBe("Invalid Token");
	});
});

// RESET
afterAll(async () => {
	await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
	await Category.destroy({
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});
