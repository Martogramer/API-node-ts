import { Router } from "express";
import UserController from "../controllers/Users.controllers";
import AuthControllers from "../controllers/Auth.controllers";


export default class UserRoutes{
    private static instance: UserRoutes;
    private userController: UserController
    private authController: AuthControllers
    private routes: Router
    

     constructor(){
        this.routes = Router();
        this.userController = UserController.getInstance()
        this.authController = AuthControllers.getInstance()
        this.configRouters();    
    }

    private configRouters=()=>{
        this.routes.get('/users', this.userController.getUsers)
        this.routes.get('/user/:idUser', this.userController.getUserById)
        this.routes.post('/signUp', this.authController.signUp )
        this.routes.post("/signIn", this.authController.signIn);
        // this.routes.put('/user/:id', this.userController.updateUser)
    }


    public  getRouter(){
        return this.routes;
    
    }

    public static getInstance(): UserRoutes{
        if(!UserRoutes.instance){
            UserRoutes.instance = new UserRoutes();
        }
        return UserRoutes.instance;
    
    }
}
