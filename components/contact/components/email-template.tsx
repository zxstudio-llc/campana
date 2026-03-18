import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    message: string;
    email: string;
    phone: string;
    company?: string;
}

export function EmailTemplate({ firstName, message, email, phone, company }: EmailTemplateProps) {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Nuevo contacto desde la web</h1>
            <p><strong>Nombre:</strong> {firstName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
            {company && <p><strong>Empresa:</strong> {company}</p>}
            <hr />
            <p><strong>Mensaje:</strong></p>
            <p>{message}</p>
        </div>
    );
}