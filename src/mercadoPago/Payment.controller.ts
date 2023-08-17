import { Request,Response } from "express";
import PaymentService from "./Payment.service";
import PaymentDTO from "./paymentDTO/Payment.DTO";



export default class PaymentController{
    private paymentService:PaymentService;

    private static instance:PaymentController;

    private constructor(){
        this.paymentService = PaymentService.getInstance();
    
    }

    public makePayment = async (req:Request,res:Response)=>{
        const {unit_price,title, quantity}: PaymentDTO= req.body
        try{
            const payment = await this.paymentService.createPayment({unit_price,title, quantity});
            res.status(200).json({init_point:payment});
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    
    }

    public successPayment = async (req:Request,res:Response)=>{
        console.log(req.query)
        try {
            return res.json(200)
        } catch (error) {
            console.log(error)
        }
    }
    public failurePayment = async (req:Request,res:Response)=>{
        console.log(req.query)
        try {
            return res.json(200)
        } catch (error) {
            console.log(error)
        }
    
    }
    public pendingPayment = async (req:Request,res:Response)=>{
        console.log(req.query)
        try {
            return res.json(200)
        } catch (error) {
            console.log(error)
        }
    
    
    }



    public static getInstance():PaymentController{
        if(!PaymentController.instance){
            PaymentController.instance = new PaymentController();
        }
        return PaymentController.instance;
    
    }
}