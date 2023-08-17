import { Request, Response } from "express";
import UserService from "../services/Users.service";


export default class UserController {
   private static instance: UserController;
   private userService: UserService;

   private constructor() {
      this.userService = UserService.getInstance();
   }

   public getUsers = async (req: Request, res: Response) => {
      try {
         const users = await this.userService.getAllService();
         return res.status(200).json(users);
      } catch (error) {
         return res.status(500).json(error);
      }
   };

   public getUserById = async (req: Request, res: Response) => {
      try {
         const {idUser} = req.params

         const user = await this.userService.getByIdService(idUser);
         if (!user) {
            return res.status(404).json({message:"User not found"});         
         }
         return res.status(200).json(user);
      } catch (error) {
         console.log(error);
         return res.status(500).json(error);
      }
   
   }

 

   public static getInstance(): UserController {
      if (!UserController.instance) {
         UserController.instance = new UserController();
      }
      return UserController.instance;
   }
}
