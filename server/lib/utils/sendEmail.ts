import {successResponse} from "../modules/common/service";
import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, html, text, res) => {
    nodemailer.createTestAccount(async (err, account) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                // service: process.env.EMAIL_SERVICE,
                port: 587,
                secure: false,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: subject,
                text: text,
                html: html
            });

            console.log("Email sent successfully ✅✅✅");
            console.log(`user: ${account.user}, password: ${account.pass}`);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            return successResponse("Reset password mail sent", { error: false, previewUrl: nodemailer.getTestMessageUrl(info), mail: {email, subject, html, text }}, res)
        } catch (error) {
            console.log(error, "email not sent ❌❌❌");
        }
    })
};