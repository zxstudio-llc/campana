'use client'

import { useCallback } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
}

const MIN_READABLE_TIME: Record<string, number> = {
    biography: 3.5,
    about: 3.5,
    investment: 3.5,
    timelines: 2.5,
    activos: 1.5,
    our_values: 1.5,
    projects: 1.5,
}

export function useScrollToSection() {
    const scrollTo = useCallback((id: string) => {
        if (typeof window === 'undefined') return

        const el = document.getElementById(id)
        if (!el) return

        const targetY = el.getBoundingClientRect().top + window.scrollY
        const distance = Math.abs(targetY - window.scrollY)
        const duration = Math.min(Math.max(distance / 800, 2), 6)

        gsap.to(window, {
            scrollTo: {
                y: targetY,
                autoKill: false,
            },
            duration,
            ease: 'power2.inOut',
            onComplete: () => {
                ScrollTrigger.refresh()

                ScrollTrigger.getAll().forEach((st) => {
                    const triggerEl = st.trigger as HTMLElement
                    if (!triggerEl || !st.animation) return

                    const triggerTop = triggerEl.getBoundingClientRect().top + window.scrollY
                    const sectionId = triggerEl.id

                    if (triggerTop <= window.scrollY + window.innerHeight && sectionId === id) {
                        const tl = st.animation as gsap.core.Timeline
                        const total = tl.duration()
                        const currentProgress = tl.progress()

                        const minTime = MIN_READABLE_TIME[sectionId] ?? 0
                        const minProgress = minTime / total

                        if (currentProgress < minProgress) {
                            gsap.to(tl, {
                                progress: minProgress,
                                duration: 1.5,
                                ease: 'power2.out',
                            })
                        }
                    }
                })
            },
        })
    }, [])

    return scrollTo
}