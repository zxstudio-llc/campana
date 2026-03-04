import Icons from "./icons"
import Link from 'next/link'
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import { TextHoverEffect } from "./text-hover-effect"

const Footer = () => {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-12 px-6 w-full relative overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-start mb-8">

                    {/* Columna 1: Branding Corporativo */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">

                        {/* Contenedor del Logo: Altura fija para alineación perfecta */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/logo.svg"
                                    alt="Grupo Campana Logo"
                                    width={280}
                                    height={90}
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                        </div>
                        {/* Contenido de Texto */}
                        <div className="flex flex-col items-center lg:items-start">
                            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                                Líderes en desarrollo inmobiliario con más de 711 millones en activos.
                                Solidez y confianza en cada inversión.
                            </p>

                            <div className="mt-6 flex flex-col items-center lg:items-start gap-2">
                                <span className="text-xs font-bold text-[#b5934a] tracking-widest uppercase">
                                    Entrega Inmediata
                                </span>
                                <div className="h-[1px] w-12 bg-[#b5934a]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Contenedor para Columnas 2, 3 y 4 */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 pt-2"> {/* pt-2 para nivelar con el logo */}

                        {/* Columna 2: Unidades de Negocio */}
                        <div className="flex flex-col">
                            <h3 className="text-white font-semibold text-sm mb-6 tracking-wider uppercase">
                                Unidades
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="#units" className="hover:text-[#b5934a] transition-colors">Bienes Raíces</Link></li>
                                <li><Link href="#units" className="hover:text-[#b5934a] transition-colors">Salud y Seguros</Link></li>
                                <li><Link href="#units" className="hover:text-[#b5934a] transition-colors">Infraestructura</Link></li>
                                <li><Link href="#units" className="hover:text-[#b5934a] transition-colors">Alimentos</Link></li>
                            </ul>
                        </div>

                        {/* Columna 3: Inversiones */}
                        <div className="flex flex-col">
                            <h3 className="text-white font-semibold text-sm mb-6 tracking-wider uppercase">
                                Inversiones
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="#invest" className="hover:text-[#b5934a] transition-colors">Ecuador</Link></li>
                                <li><Link href="#invest" className="hover:text-[#b5934a] transition-colors">Crecimiento</Link></li>
                                <li><Link href="#invest" className="hover:text-[#b5934a] transition-colors">Plusvalía</Link></li>
                                <li><Link href="#invest" className="hover:text-[#b5934a] transition-colors">Proyectos</Link></li>
                            </ul>
                        </div>

                        {/* Columna 4: Corporativo */}
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <h3 className="text-white font-semibold text-sm mb-6 tracking-wider uppercase">
                                Compañía
                            </h3>
                            <ul className="grid grid-cols-2 md:grid-cols-1 gap-4 text-sm text-gray-400">
                                <li><Link href="#about" className="hover:text-[#b5934a] transition-colors">Historia</Link></li>
                                <li><Link href="#contact" className="hover:text-[#b5934a] transition-colors">Contacto</Link></li>
                                <li className="md:mt-0"><Link href="/privacy" className="hover:text-[#b5934a] transition-colors">Privacidad</Link></li>
                                <li className="md:mt-0"><Link href="/terms" className="hover:text-[#b5934a] transition-colors">Términos</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center justify-center">
                    <TextHoverEffect text="CAMPANA" />
                </div> */}

                {/* Línea final y Copyright */}
                <div className="mt-2 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs tracking-tight">
                        &copy; {new Date().getFullYear()} Grupo Campana. 13 Unidades de Negocio impulsando el futuro.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer