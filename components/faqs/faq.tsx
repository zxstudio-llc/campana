import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { FaqsSection, Faq } from "@/lib/wordpress.d";
import Container from "../contact/components/container";

interface FAQSectionProps {
    id?: string;
    section: FaqsSection
    faqs: Faq[]
}

const FAQSection = ({ id, section, faqs }: FAQSectionProps) => {
    const orderedFaqs = section.faqs
        .map((id) => faqs.find((faq) => faq.id === id))
        .filter(Boolean) as Faq[];

    return (
        <section id={id} className="py-20 lg:py-20 overflow-hidden bg-campana-bg">
            <Container className="px-6 md:px-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* Title */}
                        <div className="lg:col-span-6 w-full">
                            {section.title && (
                                <h2 className="text-4xl md:text-7xl font-sans font-normal text-campana-primary tracking-tighter leading-none first-letter:capitalize lowercase">
                                    {(() => {
                                        const words = section.title.split(" ");
                                        const lastWord = words.pop();
                                        return (
                                            <>
                                                {words.join(" ")}{" "}
                                                <span className="font-ivy-presto italic">
                                                    {lastWord}
                                                </span>
                                            </>
                                        );
                                    })()}
                                </h2>
                            )}

                            {section.description && (
                                <p className="mt-6 text-gray-600 text-lg md:text-xl font-semibold hidden lg:block">
                                    {section.description}
                                </p>
                            )}
                        </div>

                        {/* Accordion */}
                        <div className="lg:col-span-6 w-full">
                            <Accordion type="single" collapsible className="w-full space-y-2">
                                {orderedFaqs.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={`item-${faq.id}`}
                                        className="border-b border-[#001D3D]/10 px-0 w-full"
                                    >
                                        <AccordionTrigger className="text-campana-primary hover:no-underline text-left py-6 group w-full">
                                            <div className="flex items-start gap-4 w-full">
                                                <Plus className="w-5 h-5 text-campana-secondary shrink-0 mt-1 transition-transform duration-200 group-data-[state=open]:rotate-45" />
                                                <span
                                                    className="text-lg font-sans font-normal leading-tight"
                                                    dangerouslySetInnerHTML={{
                                                        __html: faq.title.rendered,
                                                    }}
                                                />
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent className="text-gray-700 text-base md:text-md pl-9 pb-8 leading-4 font-sans font-normal">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: faq.acf.content,
                                                }}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQSection;