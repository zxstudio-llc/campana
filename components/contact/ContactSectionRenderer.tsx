import type { ContactSection } from "@/lib/wordpress.d"
import ContactSectionCompany from "./components/ContactSectionCompany"

interface Props {
    sections: ContactSection
}

export async function ContactSectionRenderer({ sections }: Props) {
    if (!sections) return null

    return <ContactSectionCompany title={sections.title} subtitle={sections.subtitle} phone={sections.phone} mail={sections.mail} />
}