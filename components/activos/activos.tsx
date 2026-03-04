"use client"

import { Showcase } from "./components/showcase"
import { NumberTicker } from "@/components/ui/number-ticker"
import { ActivoEstrategico } from "@/lib/wordpress.d"


interface Props {
    title?: string
    description?: string
    activos: ActivoEstrategico[]
}

export function ActivosSection({
    title,
    description,
    activos,
}: Props) {
    if (!Array.isArray(activos)) return null;
    const activosOrdenados = [...activos].sort((a, b) => a.id - b.id);
    const content = activosOrdenados.map((item) => {
        const rawAmount = item.acf?.amount || ""

        const numericValue = Number(
            rawAmount.replace(/[^0-9]/g, "")
        )

        const hasDollar = rawAmount.includes("$")
        const hasPlus = rawAmount.includes("+")
        const hasK = rawAmount.toUpperCase().includes("K")
        const hasM = rawAmount.toUpperCase().includes("M")

        return {
            title: item.acf?.title,
            description: item.acf?.description,
            renderContent: (
                <div className="flex flex-col items-center">
                    <div className="flex items-baseline">
                        {hasDollar && (
                            <span className="text-white text-[120px] md:text-[200px] font-bold">
                                $
                            </span>
                        )}

                        {hasPlus && (
                            <span className="text-white text-[120px] md:text-[200px] font-bold">
                                +
                            </span>
                        )}

                        <NumberTicker
                            value={numericValue}
                            className="text-[120px] md:text-[200px] font-bold tracking-tighter text-white leading-none"
                        />

                        {hasK && (
                            <span className="text-white text-[120px] md:text-[200px] font-bold">
                                K
                            </span>
                        )}

                        {hasM && (
                            <span className="text-white text-[120px] md:text-[200px] font-bold">
                                M
                            </span>
                        )}
                    </div>
                </div>
            ),
        }
    })

    return (
        <section className="py-24 md:px-28">
            <div className="max-w-screen mx-auto mb-16 text-center">
                <h2 className="text-white text-5xl md:text-8xl font-black uppercase">
                    {title}
                </h2>

                {description && (
                    <p className="text-white text-base md:text-xl font-semibold mt-4">
                        {description}
                    </p>
                )}
            </div>

            <Showcase content={content} />
        </section>
    )
}