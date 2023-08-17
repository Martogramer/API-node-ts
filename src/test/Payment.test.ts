import request from "supertest";
import { Express } from "express";
import App from "../App";
import Database from "../Database";
import mongoose from "mongoose";
import { paymentHelper } from "./helper/helper";


describe("test pyment", () => {
    let app: Express;
    let database: Database;
    let api: request.SuperTest<request.Test>

    beforeAll(async () => {
        app =  App.getInstances().getApp();
        database = Database.getInstance();
        await database.connect();
        api = request(app);
    
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    describe("test pyment", () => {
        test("should return 200", async () => {
            const response = await api.post("/api/v1/createPayment").send(paymentHelper)
            console.log(response.body)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("init_point")
        

        })
    })


})