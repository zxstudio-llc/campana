"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label-custom";
import { Input } from "@/components/ui/input-custom";
import { Textarea } from "@/components/ui/textarea-custom";

export const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const payload = {
            fullname: formData.get("fullname"),
            email: formData.get("email"),
            company: formData.get("company"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="lg:col-span-5 relative group w-full">
            {/* Contenedor Principal con Glassmorphism */}
            <div className={cn(
                "relative overflow-hidden p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500",
                "bg-white/5 backdrop-blur-xl border border-white/10", // Efecto Cristal
                "before:absolute before:inset-0 before:bg-linear-to-b before:from-white/10 before:to-transparent before:pointer-events-none" // Brillo sutil superior
            )}>

                {/* Luces de fondo (Liquid Effect) */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C29B4B]/20 rounded-full blur-[100px] group-hover:bg-[#C29B4B]/30 transition-colors duration-700" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors duration-700" />

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <LabelInputContainer>
                        <Label htmlFor="fullname" className="text-black ml-1">Nombre completo</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            required
                            placeholder="Tu nombre"
                            className="bg-white border-white/10 text-black placeholder:text-gray-500 focus:ring-[#C29B4B]/50"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="email" className="text-sm font-medium text-black ml-1 text-left block">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ejemplo@correo.com"
                            className="bg-white border-white/10 text-black placeholder:text-gray-500 focus:ring-[#C29B4B]/50"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="company" className="text-black ml-1">Empresa (Opcional)</Label>
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Nombre de tu empresa"
                            className="bg-white border-white/10 text-black placeholder:text-gray-500 focus:ring-[#C29B4B]/50"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="phone" className="text-black ml-1">Teléfono</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Tu teléfono"
                            className="bg-white border-white/10 text-black placeholder:text-gray-500 focus:ring-[#C29B4B]/50"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="message" className="text-black ml-1">Mensaje</Label>
                        <Textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            placeholder="¿Cómo podemos ayudarte?"
                            className="flex w-full bg-white border border-white/10 rounded-xl px-4 py-3.5 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C29B4B]/50 transition-all resize-none shadow-input"
                        />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group/btn relative block w-full bg-campana-secondary hover:bg-campana-seconday-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider text-sm disabled:opacity-50"
                    >
                        {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                        <BottomGradient />
                    </button>

                    {status === "success" && <p className="text-green-400 text-sm text-center mt-2">¡Enviado con éxito!</p>}
                    {status === "error" && <p className="text-red-400 text-sm text-center mt-2">Error al enviar. Intenta de nuevo.</p>}
                </form>
            </div>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};