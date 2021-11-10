let app = require("../../app");

let request = require("supertest");

describe("test productController", ()=>{
    it("create Product", (done)=>{
        let data = {
            pname: "A Product",
            description: "Anew Product",
            price: 250,
            stock:250,
            pimage:"url",
            offer:false}
        request(app).post("/products/createProduct").send(data)
        .expect(data =>  {
            expect(data.body.msg).toBe("ACCESS DENIED")
          
        }).end(err => err ? done.fail(err) : done())
    })

    xit("create Product", (done)=>{
        let data = {
            pname: "A Product",
            description: "A new Product",
            price: 250,
            stock:250,
            pimage:"url",
            offer:false}
        request(app).post("/products/createProduct").send(data)
        .expect(data =>  {
            expect(data.body.data.pname).toBe("A Product")
            expect(data.body.data.description).toContain("A new Product")
            expect(data.body.data.offet).toBeFalsy()
            expect(data.body.data.price).toBe(250) 
        }).end(err => err ? done.fail(err) : done())
    })

    it("get Products", (done)=>{
        request(app).get("/products/getAllProducts?page=1&limit=5")
        .expect(data => {
           expect(data.body.products.length).toBe(5) 
        }).end(e=> e ? done.fail(e) : done())
        
    })
    })