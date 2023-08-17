import { ObjectId } from "mongoose";
import { Document } from "mongoose";



export default interface IProduct extends Document{
    name: string;
    description: string;
    price: number;
    image?: string[] ;
    stock: number;
    size: string | undefined;
    statusProduct: boolean;
    category: ObjectId;
}