import { getBiographyById } from "@/lib/wordpress"
import BiographyCompany from "./components/biography-company"
import type { Biography } from "@/lib/wordpress.d"

interface Props {
    id?: string
    biographies: Biography[]
    highlight: string
    short_description: string
    description: string
}

export async function BiographyCompanySection({ id, biographies, highlight, short_description, description }: Props) {
    if (!biographies?.length) return null

    const biography = biographies[0]

    return (
        <BiographyCompany
            id={id}
            biography={biography}
            highlight={highlight}
            short_description={short_description}
            description={description}
        />
    )
}