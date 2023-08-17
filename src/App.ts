import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import morgan from "morgan";
import Database from "./Database";
import UserRoutes from "./routes/Users.routes";
import CategoryRouter from "./routes/Category.routes";
import ProductRoutes from "./routes/Product.routes";

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

   private constructor() {
      this.app = express();
      this.database = Database.getInstance();
      this.userRoutes = new UserRoutes();
      this.categoryRoutes = new CategoryRouter();
      this.productRoutes = new ProductRoutes();

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
          "GET, PUT, DELETE":        "/api/v1/user/:idUser" ,
                  "POST": "/api/v1/user/signUp",
                  "POST ": "/api/v1/user/signIn",
               },
               products: {
                  "GET all": "/api/v1/products",
                "GET, PUT, DELETE":  "/api/v1/product/:idProduct" ,
              "POST":     "/api/v1/product",
               },
               categories: {
                  "GET all": "/api/v1/categories",
                  "GET, PUT, DELETE":"/api/v1/category/:idCategory" ,
               "POST":    "/api/v1/category",
               },
            })
            .status(200);
      });

      this.app.use("/api/v1", this.userRoutes.getRouter());

      this.app.use("/api/v1", this.categoryRoutes.getRouter());

      this.app.use("/api/v1", this.productRoutes.getRouter());
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
