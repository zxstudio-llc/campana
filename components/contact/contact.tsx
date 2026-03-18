"use client";
import Container from "./components/container";
import { Facebook, Instagram, Linkedin, Mail, Phone, X } from "lucide-react";
import { ContactForm } from "./components/contact-form";
import { motion, Variants } from "motion/react";

interface ContactSectionProps {
    title?: string;
    subtitle?: string;
    phone?: string;
    mail?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
    linkedin?: string;
    highlight?: string;
}

const ContactPageSection = ({ title, subtitle, phone, mail, instagram, facebook, x, linkedin, highlight }: ContactSectionProps) => {

    const socialLinks = [
        { icon: Instagram, url: instagram, label: "Instagram" },
        { icon: Facebook, url: facebook, label: "Facebook" },
        { icon: X, url: x, label: "X" },
        { icon: Linkedin, url: linkedin, label: "LinkedIn" },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any
            }
        },
    };

    return (
        <section className="py-20 md:py-24 overflow-hidden bg-campana-bg">
            <Container className="w-screen px-4">

                {/* SUBTITLE: Centrado en la web con máxima fuerza */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1] as any
                    }}
                    className="w-full mb-10 md:mb-20"
                >
                    <h3 className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text text-transparent text-center text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight max-w-7xl mx-auto leading-[1.1]">
                        {subtitle}
                    </h3>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                        className="h-[1px] bg-neutral-300 mx-auto mt-12 max-w-5xl"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-top max-w-7xl mx-auto px-6 md:px-8 ">

                    {/* Columna Izquierda con Cascada (Stagger) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-7 flex flex-col space-y-4 md:space-y-8 text-center lg:text-left"
                    >
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h2 className="text-5xl md:text-8xl font-black text-[#001D3D] tracking-tighter leading-none uppercase">
                                {title}
                            </h2>
                            <p className="text-gray-700 text-xl lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed md:leading-[1.3] text-justify lg:text-left">
                                {highlight}
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-6 pt-4">
                            <a
                                href={`mailto:${mail}`}
                                className="group/contact flex items-center justify-center lg:justify-start gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#001D3D] flex items-center justify-center transition-colors group-hover/contact:bg-white group-hover/contact:border-[#001D3D] group-hover/contact:border">
                                    <Mail className="w-5 h-5 text-white transition-colors group-hover/contact:text-[#001D3D]" />
                                </div>
                                <span className="text-[#001D3D] transition-colors group-hover/contact:text-[#001D3D] font-bold uppercase text-sm tracking-wide">
                                    {mail}
                                </span>
                            </a>

                            <a
                                href={`tel:${phone}`}
                                className="group/contact flex items-center justify-center lg:justify-start gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#001D3D] flex items-center justify-center transition-colors group-hover/contact:bg-white group-hover/contact:border-[#001D3D] group-hover/contact:border">
                                    <Phone className="w-5 h-5 text-white transition-colors group-hover/contact:text-[#001D3D]" />
                                </div>
                                <span className="text-[#001D3D] transition-colors group-hover/contact:text-[#001D3D] font-bold uppercase text-sm tracking-wide">
                                    {phone}
                                </span>
                            </a>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                            {socialLinks.map((social, index) => (
                                social.url && (
                                    <motion.a
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-[#001D3D] flex items-center justify-center transition-shadow shadow-md hover:shadow-indigo-500/20"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-white" />
                                    </motion.a>
                                )
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Columna Derecha: Formulario (Protagonista) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 15,
                            delay: 0.5
                        }}
                        className="lg:col-span-5 w-full"
                    >
                        <ContactForm />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
};

export default ContactPageSection;