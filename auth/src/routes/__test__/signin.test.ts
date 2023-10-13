import request from "supertest";
import app from "../../app";

it("responds with a cookie on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-cookie")).toBeDefined();
});

it("fails when email that does not exist is supplied", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "dhvhdsvhdv",
    })
    .expect(400);
});

// it('return a 400 with an invalid password', async () => {
//     return request(app)
//     .post('/api/users/signup')
//     .send({
//         email: 'test@test.com',
//         password: 'p'
//     })
//     .expect(400)

// })

// it('return a 400 with missing credentials', async () => {
//     await request(app)
//     .post('/api/users/signup')
//     .send({
//         email: 'test@test.com'
//     })
//     .expect(400)

//     await request(app)
//     .post('/api/users/signup')
//     .send({
//         password: 'vfvdgrfg'
//     })
//     .expect(400)

// })

// it('disallows duplicate emails' , async () => {
//     await request(app)
//     .post('/api/users/signup')
//     .send({
//         email: 'test@test.com',
//         password: 'password'
//     })
//     .expect(201)

//     await request(app)
//     .post('/api/users/signup')
//     .send({
//         email: 'test@test.com',
//         password: 'password'
//     })
//     .expect(400)
// })

// it('sets a cookie after successful signup' , async () => {
//     const response = await request(app)
//     .post('/api/users/signup')
//     .send({
//         email: 'test@test.com',
//         password: 'password'
//     })
//     .expect(201);

//     expect(response.get('Set-Cookie')).toBeDefined()
// })
