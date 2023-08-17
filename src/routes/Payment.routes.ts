import { Router } from "express";
import PaymentController from "../mercadoPago/Payment.controller";



export default class PaymentRouter {
    private static instance: PaymentRouter;
    private router: Router;
    private paymentController: PaymentController;

    private constructor() {
        this.router = Router();
        this.paymentController = PaymentController.getInstance();
        this.configRouter()   
    }


    private configRouter=()=>{
        this.router.post('/createPayment', this.paymentController.makePayment);
        this.router.get('/successPayment', this.paymentController.successPayment);
        this.router.get('/failurePayment', this.paymentController.failurePayment);
        this.router.get('/pendingPayment', this.paymentController.pendingPayment);
    }
    public getRouter(): Router {
        return this.router;
    }

    public static getInstance(): PaymentRouter {
        if (!PaymentRouter.instance) {
            PaymentRouter.instance = new PaymentRouter();
        }
        return PaymentRouter.instance;
    
    }
    
}