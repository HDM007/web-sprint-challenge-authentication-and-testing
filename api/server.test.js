const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
})


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

const testUser = {
  username: "harry",
  password: "badpassword"
}

describe("Testing that all endpoints work", () => {
  describe("Testing the api/auth/register works", () => {
    test("Should create a new user", async () => {
      let res = await request(server).post("/api/auth/register").send(testUser);

      expect(res.body.username).toBe("harry");
      expect(res.body.id).toBe(1);
      expect(res.body.password).toBe("badpassword");
    })

    test("Should be 401 error", async () => {
      let res = await request(server)
      .post("/api/auth/register").send(testUser).expect(401);
    })
  })

describe("Test that endpoints are live and responsive", () => {
  beforeEach(async () => {
    await request(server).post('/api/auth/login').send(testUser)
  })

  test("Registration returns token", async () => {
    let res = await request(server).post('/api/auth/login').send(testUser);

    expect(res.body.token).toBeDefined();
})

})
describe("test that api works", () => {
  describe("Checking GET function", () => {
    let res;
    beforeEach(async () => {
      await request(server).post('/api/auth/register').send(testUser);
    })
    test("User can login and view jokes", async () => {
      res = await request(server).post('/api/auth/login').send(testUser);
      let updatedRes = await request(server).get("/api/jokes").set("Authorization", res.body.token).expect(200)
    })
  })
})

})
