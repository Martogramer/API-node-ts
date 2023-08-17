import request from "supertest";
import { Express } from "express";
import Database from "../Database";
import App from "../App";
import { categoryHelper, managerHelper } from "./helper/helper";
import mongoose, { isValidObjectId } from "mongoose";

describe("test Category", () => {
   let app: Express;
   let db: Database;
   let api: request.SuperTest<request.Test>;

   beforeAll(async () => {
      app = App.getInstances().getApp();
      db = Database.getInstance();
      api = request(app);
      await db.connect();
   });

   beforeEach(async () => {
      await managerHelper.categorymanager.getModel().deleteMany({});
   });

   afterAll(async () => {
      await managerHelper.categorymanager.getModel().deleteMany({});
      await mongoose.disconnect();
   });

   describe("test the get all category", () => {
      test("should return an array of category", async () => {
         const res = await api.get("/api/v1/categories").expect("Content-Type", /application\/json/);

         expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);

      });

      test("should return an array of category", async () => {
         await managerHelper.categorymanager.create(categoryHelper);

         const res = await api.get("/api/v1/categories").expect("Content-Type", /application\/json/);

         expect(res.status).toBe(200);
         expect(res.body.length).toBe(1);
         expect(res.body[0].name).toBe("XXXXXXXXXXXXXX");
      
      })
   });
   describe("test the get category by id", () => {
      test("should return an category", async () => {
         const category = await managerHelper.categorymanager.create(categoryHelper);

         const res = await api.get(`/api/v1/category/${category._id}`).expect("Content-Type", /application\/json/);

         expect(res.status).toBe(200);
         expect(res.body.name).toBe("XXXXXXXXXXXXXX");
      
      })

      test('should return 404 if category not found', async () => {
         const res = await api.get(`/api/v1/category/${new mongoose.Types.ObjectId()}`).expect("Content-Type", /application\/json/);

         expect(res.status).toBe(404);
         expect(res.body.message).toBeDefined();
         expect(res.body.message).toContain("Category not found");
      
      })
   
   })
   describe("test the create category", () => {
      test("should return an category", async () => {
         const res = await api.post("/api/v1/category").send(categoryHelper).expect("Content-Type", /application\/json/);

         expect(res.status).toBe(201);
         expect(res.body._id).toBeDefined();
         expect(isValidObjectId(res.body._id)).toBeTruthy()
         
      
      })
   
   })
   describe("test the update category", () => {
      test("should return an category", async () => {
         const category = await managerHelper.categorymanager.create(categoryHelper);

         const res = await api.put(`/api/v1/category/${category._id}`).send(categoryHelper).expect("Content-Type", /application\/json/);

         expect(res.status).toBe(200);
         expect(res.body.name).toBe("XXXXXXXXXXXXXX");
      
      })
   
   
   })
   describe("test the delete category", () => {
      test("should return an category", async () => {
         const category = await managerHelper.categorymanager.create(categoryHelper);

         const res = await api.delete(`/api/v1/category/${category._id}`)

         expect(res.status).toBe(204);
        //  expect(res.body.name).toBe("XXXXXXXXXXXXXX");
      
      })
   
   
   
   })
});
