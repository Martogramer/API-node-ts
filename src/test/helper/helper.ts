import ICategory from "../../models/category/interfaces/Category.interfaces";
import CategoryManager from "../../models/category/manager/Category.manager";
import ProductDTO from "../../models/product/DTO/Product.DTO";
import ProductManager from "../../models/product/manager/Product.manager";
import UserDTO from "../../models/users/DTO/User.DTO";
import UserManager from "../../models/users/manager/UserManager"
import ICRUD  from "../../util/interfaces/CRUD.Interfaces"

const managerHelper = {
    userManagerhelper: UserManager.getInstance(),
    productManager: ProductManager.getInstance(),
    categorymanager: CategoryManager.getInstance()
}

const userHelper= {
    email: "XXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXX",
    username: "XXXXXXXXXXXXXX",
    confirPassword: "XXXXXXXXXXXXXX",
    name: "XXXXXXXXXXXXXX",
 };

 const productHelper: ProductDTO = {
    name: "XXXXXXXXXXXXXX",
    description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXX XXXXXXXXXXXXXX",
    price: 9999,    
    stock: 1,   
    category: "XXXXXXXXXXXXXX"
 }

 const categoryHelper = {
    name: "XXXXXXXXXXXXXX",
 }

 const paymentHelper = {
    title: "XXXXXXXXXXXXXX",
    unit_price: 9999,
    quantity: 100
 }


export{
    managerHelper,
    userHelper,
    productHelper,
    categoryHelper,
    paymentHelper
}