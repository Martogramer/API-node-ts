import UserManager from "../models/users/manager/UserManager";

export default class UserService {
   private static instance: UserService;
   private userManager: UserManager;
   

   private constructor() {
      this.userManager = UserManager.getInstance();
   }

   public getAllService = async () => {
      try {
         const allUser = await this.userManager.getAll();
         return allUser;
      } catch (error) {
         throw error;
      }
   };

   public getByIdService = async (id: string) => {
      try {
         const user = await this.userManager.getById(id);
         return user;
      } catch (error) {
         throw error;
      }
   };

   public createService = async (user: any) => {
      const { email, username, password, name, confirPassword } = user;
     
      const userExists = await this.userManager.getByEmail(email);

      if(userExists) {
         return { status: 409, message: "The user already exists" };
      }

    
      
      try {
         const newUser = await this.userManager.create(user);
         return newUser;
      } catch (error) {
         console.log(error);
         throw error;
      }
   };

   public loginService=async (email:string,password:string) => {
      try {
         

         const user = await this.userManager.getByEmail(email);
         if (user === null) {
            
            return { status: 404, message: "The email does not valid" };
         }
         const isMatch = await user.comparePassword(password);

         if (!isMatch) {
            return { status: 401, message: "The password does not valid" };
         }
         return {token:this.userManager.createToken(user)};
      } catch (error) {
         throw error;
      }
      
   }

   public static getInstance = (): UserService => {
      if (!UserService.instance) {
         UserService.instance = new UserService();
      }
      return UserService.instance;
   };
}
