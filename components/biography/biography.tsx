import { getBiographyById } from "@/lib/wordpress"
import BiographyCompany from "./components/biography-company"
import type { Biography } from "@/lib/wordpress.d"

interface Props {
    biographies: Biography[]
}

export async function BiographyCompanySection({ biographies }: Props) {
    if (!biographies?.length) return null

    const data = await getBiographyById(biographies.map((b) => b.id))

    if (!data?.length) return null

    const biography = data[0]

    return <BiographyCompany biography={biography} />
}