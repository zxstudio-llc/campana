// utils/scroll-to-section.ts

export function scrollToSection(id: string) {
    const target = document.getElementById(id)
    if (!target) return

    // Importar ScrollTrigger dinámicamente para no romper SSR
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        // Refrescar todos los triggers primero
        ScrollTrigger.refresh()

        // Buscar el ScrollTrigger que corresponde a esta sección
        // o las secciones previas con pin para calcular el offset real
        const allTriggers = ScrollTrigger.getAll()

        // Calcular el scroll total acumulado de los pins anteriores al target
        let extraScroll = 0

        allTriggers.forEach((trigger) => {
            const triggerEl = trigger.trigger as HTMLElement
            if (!triggerEl) return

            // Si este trigger está ANTES del target y tiene pin+pinSpacing
            const triggerTop = triggerEl.getBoundingClientRect().top + window.scrollY
            const targetTop = target.getBoundingClientRect().top + window.scrollY

            if (triggerTop < targetTop && trigger.pin) {
                // El pin añade scroll virtual = end - start
                const start = trigger.start as number
                const end = trigger.end as number
                extraScroll += end - start - (trigger.trigger as HTMLElement).offsetHeight
            }
        })

        const targetScrollY =
            target.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        })
    })
}