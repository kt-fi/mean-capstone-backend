let app = require("../../app");

let request = require("supertest");


describe("test userController", ()=>{
    it("create User", (done)=>{
        let data = {uid: 234, uname:"Chris", email:"chris773@chris.com", utype:"user", password:"password"}
        request(app).post("/users/createUser").send(data)
        .expect(data =>  {
            expect(data.body.data.uname).toBe("Chris")
            expect(data.body.data.email).toContain("@")
            expect(data.body.data.password).toBeTruthy()  
        }).end(err => err ? done.fail(err) : done())
    })

    it("get User", (done)=>{
        let data = {email:"admin@admin.com", password: "admin123"}
        request(app).post("/users/getUser").send(data)
        .expect(data => {
            expect(data.body.user.uname).toBe("Admin")
           }).end(err => err ? done.fail(err) : done())
    })
})

