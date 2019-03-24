const User = require('../../src/models/user.js')

console.log('starting test')

/*

A new user should have a name

*/

test("Name, Email, PW are required fields",  () => {
  return
})

test("Name, Email, PW available in object after construction", () => {
  demoUser =  new User({
    name: "Jason",
    email: "Jason@George.com",
    password: "TestPW"
  })
  expect(demoUser.name).toBe("Jason")
  expect(demoUser.password).toBe("TestPW")
  expect(demoUser.email).toBe("Jason@George.com")

})
