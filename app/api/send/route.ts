import { EmailTemplate } from '@/components/contact/components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullname, email, company, phone, message } = body;

        const { data, error } = await resend.emails.send({
            from: 'Contacto Web <onboarding@resend.dev>', // Cambia esto tras verificar tu dominio
            to: ['[EMAIL_ADDRESS]'], // Donde recibirás los mensajes
            subject: `Nuevo mensaje de ${fullname}`,
            react: EmailTemplate({
                firstName: fullname,
                message: message,
                email: email,
                phone: phone,
                company: company
            }) as React.ReactElement,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}