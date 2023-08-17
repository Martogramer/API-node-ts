import "dotenv/config";
import { createTransport } from "nodemailer";



export default{
    port:process.env.NODE_ENV === 'test' ?'http://localhost:1020': process.env.PORT,
    baseURL:  process.env.BASE_URL||'',
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',    
    DB:{
        URI: process.env.NODE_ENV === 'test' ? process.env.DB_URI_TEST || '' : process.env.DB_URI || 'mongodb://localhost:27017/prueba' ,
        
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD
    },

    nodemailerTransport: createTransport({
        service: 'gmail',
        secure: true,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }

    })

}