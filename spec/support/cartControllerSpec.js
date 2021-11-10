let app = require("../../app");

let request = require("supertest");

describe("test cartController", ()=>{
    it("get user cart", (done)=>{
        request(app).get("/cart/getUserCartList/fd18dcf8ecc")
        .expect(data =>  {
            expect(data.body).toBeDefined()
        }).end(err => err ? done.fail(err) : done())
    })

    it("add product to cart", (done)=>{
        let data = {pid: 15, pname: "Brand New Product", pimage: "Url", quantity: 3, price: 30}
        request(app).put("/cart/addProductToCart/fd18dcf8ecc").send(data)
        .expect(data=>{
        expect(data.body.products[data.body.products.length - 1].pname).toContain("Brand New Product")
        expect(data.body.products[data.body.products.length - 1].pid).toBe('15')
        expect(data.body.products[data.body.products.length - 1].pimage).toContain("Url")
        expect(data.body.products[data.body.products.length - 1].quantity).toBe(3)
        expect(data.body.products[data.body.products.length - 1].price).toBe(30)
        }).end(e=> e ? done.fail(e) : done())
    })
    })