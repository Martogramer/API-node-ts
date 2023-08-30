import { Request, Response } from "express";
import UserManager from "../models/users/manager/UserManager";
import UserService from "../services/Users.service";
import UserDTO from "../models/users/DTO/User.DTO";
import UserBuilder from "../models/users/build/User.build";

export default class AuthControllers {
   private static instance: AuthControllers;
   private userManager: UserManager;
   private userService: UserService;
   private userBuilder: UserBuilder;

   private constructor() {
      this.userManager = UserManager.getInstance();
      this.userService = UserService.getInstance();
      this.userBuilder = new UserBuilder();
   }

   signUp = async (req: Request, res: Response) => {
      const { email, username, password, name, confirmPassword } = req.body;

      if (!email || !username || !password || !name) {
         return res
            .status(400)
            .json({ message: "Please, send all the fields" });
      }
      if (password !== confirmPassword) {
         return res.status(400).json({ message: "The passwords do not match" });
      }

      

      const newUser: UserDTO = this.userBuilder
         .withEmail(email)
         .withName(name)
         .withPassword(password)
         .withUsername(username)
         .build();

      try {
         const user = await this.userService.createService(newUser);

         if ("status" in user) {
            return res
               .status(user["status"])
               .json({ message: user["message"] });
         }

         return res.status(201).json(user);
      } catch (error) {
         console.log(error);
         return res.status(500).json({ error: error });
      }
   };

   signIn = async (req: Request, res: Response) => {
      const { email, password } = req.body;

      if (!email || !password) {
         return res
            .status(400)
            .json({ message: "Please, send all the fields" });
      }
      
      try {
         const userLogin: any = await this.userService.loginService(
            email,
            password
         );

         if ("status" in userLogin) {
            return res
               .status(userLogin["status"])
               .json({ message: userLogin["message"] });
         }

         return res.status(200).json({ token: userLogin.token });
      } catch (error) {
         console.error(error);
         return res.status(500).json({ error: error });
      }
   };

   // registerAdmin = async (req: Request, res: Response) => {
   //    try {
   //       const { email, password, username, confirmPassword } = req.body;

   //       if (!email || !password || !username)
   //          return res.status(400).json({ msg: "Please, send all the fields" });

   //       if (password !== confirmPassword)
   //          return res.status(400).json({ msg: "The passwords do not match" });

   //       const admin = await this.userManager.createAdmin(
   //          email,
   //          password,
   //          username
   //       );

   //       return res.status(201).json(admin);
   //    } catch (error) {
   //       return res.status(500).json({ error: messageError(error) });
   //    }
   // };

   // updateCredentials = async (req: Request, res: Response) => {
   //    try {
   //       const user = await this.userManager.getById(req.params.id);
   //       if (!user) {
   //          return res.status(404).json({ msg: "The user does not exist" });
   //       }
   //       const updatedUser = await this.userManager.update(
   //          req.params.id,
   //          req.body
   //       );
   //       return res.status(200).json(updatedUser);
   //    } catch (error) {
   //       return res.status(500).json({ error: messageError(error) });
   //    }
   // };

   public static getInstance(): AuthControllers {
      if (!AuthControllers.instance) {
         AuthControllers.instance = new AuthControllers();
      }
      return AuthControllers.instance;
   }
}
