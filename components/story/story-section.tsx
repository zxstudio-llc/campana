import React from "react"
import { Timeline as TimelineComponent } from "@/components/story/components/timeline"
import { getTimelineByIds } from "@/lib/wordpress"
import { getPageById } from "@/lib/wordpress"
import { Timeline } from "@/lib/wordpress.d";

interface Props {
    highlight: string
    description: string
    subtitle: string
    timelines: Timeline[]
}

export function StoryTimelineSection({
    highlight,
    description,
    subtitle,
    timelines,
}: Props) {

    if (!timelines?.length) return null

    const data = timelines.map((item) => ({
        title: item.acf.year,
        content: (
            <div>
                <h3 className="text-lg font-bold text-[#b8912e] mb-2">
                    {item.acf.title}
                </h3>

                <div
                    className="text-sm leading-relaxed min-w-[20rem]"
                    dangerouslySetInnerHTML={{
                        __html: item.acf.description,
                    }}
                />
            </div>
        ),
    }))

    return (
        <div className="relative w-full overflow-clip">
            <TimelineComponent
                heading={highlight}
                description={description}
                subtitle={subtitle}
                animateYear={{ from: 1995, to: 2012, duration: 2000 }}
                data={data}
            />
        </div>
    )
}