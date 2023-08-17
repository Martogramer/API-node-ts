import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import morgan from "morgan";
import Database from "./Database";
import UserRoutes from "./routes/Users.routes";
import CategoryRouter from "./routes/Category.routes";
import ProductRoutes from "./routes/Product.routes";
import PaymentRouter from "./routes/Payment.routes";

export default class App {
   private static instance: App;
   private app: Express;
   private corsOptions: CorsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   };
   private database: Database;

   private userRoutes: UserRoutes;
   private categoryRoutes: CategoryRouter;
   private productRoutes: ProductRoutes;
   private paymentRoutes: PaymentRouter;

   private constructor() {
      this.app = express();
      this.database = Database.getInstance();
      this.userRoutes = UserRoutes.getInstance();
      this.categoryRoutes = CategoryRouter.getInstance();
      this.productRoutes = ProductRoutes.getInstance();
      this.paymentRoutes = PaymentRouter.getInstance();

      this.middlewares();
      this.databaseConnection();
      this.routes();
   }

   private middlewares() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(cors(this.corsOptions));
      this.app.use(morgan("dev"));
   }

   private async databaseConnection() {
      const prueba = await this.database.connect();

      return prueba;
   }

   private routes = () => {
      this.app.get("/", (req, res) => {
         return res
            .json({
               users: {
                  "GET all": "/api/v1/users",
                  "GET, PUT, DELETE": "/api/v1/user/:idUser",
                  POST: "/api/v1/user/signUp",
                  "POST ": "/api/v1/user/signIn",
               },
               products: {
                  "GET all": "/api/v1/products",
                  "GET, PUT, DELETE": "/api/v1/product/:idProduct",
                  POST: "/api/v1/product",
               },
               categories: {
                  "GET all": "/api/v1/categories",
                  "GET, PUT, DELETE": "/api/v1/category/:idCategory",
                  POST: "/api/v1/category",
               },
               payment: {
                  POST: "/api/v1/createPayment",
               },
            })
            .status(200);
      });

      this.app.use("/api/v1", this.userRoutes.getRouter());

      this.app.use("/api/v1", this.categoryRoutes.getRouter());

      this.app.use("/api/v1", this.productRoutes.getRouter());

      this.app.use("/api/v1", this.paymentRoutes.getRouter());
   };

   public getApp() {
      return this.app;
   }

   public static getInstances() {
      if (!App.instance) {
         App.instance = new App();
      }
      return App.instance;
   }
}
