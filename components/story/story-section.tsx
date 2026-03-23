import { Timeline as TimelineComponent } from "@/components/story/components/timeline"
import { Timeline } from "@/lib/wordpress.d";

interface Props {
    highlight: string
    title: string
    description: string
    subtitle: string
    timelines: Timeline[]
}

export function StoryTimelineSection({
    highlight,
    title,
    description,
    subtitle,
    timelines,
}: Props) {

    if (!timelines?.length) return null

    const data = timelines.map((item) => ({
        title: item.acf.year,
        content: (
            <div>
                <span className="text-xl font-sans font-normal tracking-tighter text-[#001D3D] md:text-[#b8912e] mb-2 ">
                    {(() => {
                        const words = item.acf.title.split(" ");
                        const lastWord = words.pop();
                        return (
                            <>
                                {words.join(" ")}{" "}
                                <span className="font-ivy-presto italic text-xl transition-all">
                                    {lastWord}
                                </span>
                            </>
                        );
                    })()}
                </span>

                <div
                    className="text-sm min-w-[20rem] tracking-tight leading-5 font-sans font-normal"
                    dangerouslySetInnerHTML={{
                        __html: item.acf.description,
                    }}
                />
            </div>
        ),
    }))

    return (
        <div className="relative w-full overflow-clip bg-campana-bg">
            <TimelineComponent
                highlight={highlight}
                heading={title}
                description={description}
                subtitle={subtitle}
                data={data}
            />
        </div>
    )
}