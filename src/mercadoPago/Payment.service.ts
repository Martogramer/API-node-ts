import mercadopago from "mercadopago";
import { MercadoPago } from "mercadopago/interface";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { PreferenceCreateResponse } from "mercadopago/resources/preferences";
import config from "../config/config";

// mercadopago.configure({access_token: 'TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994'})

export default class PaymentService {
   private static instance: PaymentService;
   private mp: MercadoPago;
   private preference: CreatePreferencePayload;

  private constructor() {
      this.mp = mercadopago;
      this.preference = {};
      this.mp.configure({
         access_token:
            "TEST-5290894943630049-070117-211fea6e87d83f8ab0769bbc6f6087b0-220603994",
      });
   }

   public  createPayment= async (data: any)=> {
      const {title, unit_price, quantity}= data
      this.preference = {
         items: [
            {
               title,
               unit_price,
               quantity
            },
         ],
         payment_methods: {
            excluded_payment_types: [
               {
                  id: "atm",
               },
            ],
            installments: 1,
         },
         back_urls: {
            success: `http://localhost:${config.port}/api/v1/successPayment`,
            failure: `http://localhost:${config.port}/api/v1/failurePayment`,
            pending: `http://localhost:${config.port}/api/v1/pendingPayment`,
         },
         auto_return: "approved",
      };

      const responsePyment: PreferenceCreateResponse =
         await this.mp.preferences.create(this.preference);
      // console.log(responsePyment);
      return responsePyment.body.init_point;
   }

   public static getInstance(): PaymentService {
      if (!PaymentService.instance) {
         PaymentService.instance = new PaymentService();
      }
      return PaymentService.instance;
   
   }
}
