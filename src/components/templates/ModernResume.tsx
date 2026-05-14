import React from 'react';
import { Mail, Phone, Linkedin, MapPin, Link as LinkIcon } from 'lucide-react';

export const ModernResume = () => {
    return (
        <div className="w-[210mm] min-h-[297mm] bg-white text-sm shadow-2xl mx-auto overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <header className="bg-[#475569] text-white p-8">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-400 bg-gray-300 shrink-0">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                            alt="Michael Johnson"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-wide">Michael Johnson <span className="text-lg font-normal text-gray-300 ml-2">AEM Developer</span></h1>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-200">
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Mail size={14} />
                                <span>michaeljohnson@example.com</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Phone size={14} />
                                <span>(555) 321-9876</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Linkedin size={14} />
                                <span>LinkedIn</span>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors">
                            <MapPin size={14} />
                            <span>7890 Maple Street, Denver, CO 80202</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 p-8 gap-8">
                {/* Left Column */}
                <aside className="w-1/3 flex flex-col gap-8 border-r border-gray-100 pr-4">

                    <section>
                        <h2 className="bg-gray-100 py-1 px-3 text-center uppercase tracking-wider font-bold text-gray-700 text-xs rounded mb-4">Profile</h2>
                        <p className="text-gray-600 text-xs leading-relaxed text-justify">
                            A dedicated and results-driven AEM Developer with 5+ years of experience in implementing and customizing Adobe Experience Manager solutions. Proven expertise in building and maintaining scalable, dynamic websites and web applications using AEM, Sling, and JCR. Highly skilled in front-end development with a deep understanding of back-end AEM components.
                        </p>
                    </section>

                    <section>
                        <h2 className="bg-gray-100 py-1 px-3 text-center uppercase tracking-wider font-bold text-gray-700 text-xs rounded mb-4">Skills</h2>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                    <span>CMS:</span>
                                </div>
                                <div className="bg-gray-200 h-1.5 w-full rounded-full">
                                    <div className="bg-[#475569] h-1.5 rounded-full w-[90%]"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">Adobe Experience Manager (AEM), AEM Sites, AEM Assets</p>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                    <span>Languages & Frameworks:</span>
                                </div>
                                <div className="bg-gray-200 h-1.5 w-full rounded-full">
                                    <div className="bg-[#475569] h-1.5 rounded-full w-[85%]"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">Java, JavaScript, HTML, CSS, Sightly (HTL)</p>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                                    <span>Tools & Technologies:</span>
                                </div>
                                <div className="bg-gray-200 h-1.5 w-full rounded-full">
                                    <div className="bg-[#475569] h-1.5 rounded-full w-[95%]"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">Apache Sling, JCR, CRX, Maven, Git</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold text-gray-700">Languages</h2>
                        <ul className="mt-2 space-y-1 text-xs text-gray-600 list-disc list-inside">
                            <li>English</li>
                            <li>Vietnamese</li>
                        </ul>
                    </section>

                </aside>

                {/* Right Column */}
                <main className="flex-1 flex flex-col gap-6">
                    <section>
                        <h2 className="bg-gray-100 py-1 px-3 text-center uppercase tracking-wider font-bold text-gray-700 text-xs rounded mb-4">Professional Experience</h2>

                        <div className="mb-6">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-800 text-sm">AEM Developer</h3>
                                <span className="text-xs text-gray-500">06/2020 – Present</span>
                            </div>
                            <p className="text-xs text-gray-600 italic mb-2">Creative Web Solutions | Denver, CO</p>
                            <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-outside ml-4">
                                <li>Designed and launched a fintech dashboard, increasing user retention by 35%.</li>
                                <li>Conducted usability testing and heuristic evaluations to enhance product accessibility.</li>
                                <li>Led a team of 5 designers to develop design systems and maintain brand consistency.</li>
                                <li>Partnered with engineers to implement design handoff best practices, reducing development time by 20%.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-800 text-sm">Junior AEM Developer</h3>
                                <span className="text-xs text-gray-500">05/2017 – 05/2020</span>
                            </div>
                            <p className="text-xs text-gray-600 italic mb-2">Digital Innovations Ltd. | Denver, CO</p>
                            <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-outside ml-4">
                                <li>Designed a mobile-first e-commerce platform, increasing conversion rates by 28%.</li>
                                <li>Conducted user research, personas, and A/B testing to refine product features.</li>
                                <li>Created interactive prototypes to validate concepts and reduce design iteration time.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="bg-gray-100 py-1 px-3 text-center uppercase tracking-wider font-bold text-gray-700 text-xs rounded mb-4">Certificates</h2>
                        <ul className="text-xs text-gray-600 space-y-2">
                            <li className="flex items-center gap-1">
                                <span>Adobe Certified Expert - AEM Sites Developer</span>
                                <LinkIcon size={10} className="text-gray-400" />
                            </li>
                            <li className="flex items-center gap-1">
                                <span>Adobe Certified Expert - AEM Assets</span>
                                <LinkIcon size={10} className="text-gray-400" />
                            </li>
                            <li>Java SE 8 Programmer Certification</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="bg-gray-100 py-1 px-3 text-center uppercase tracking-wider font-bold text-gray-700 text-xs rounded mb-4">Education</h2>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Bachelor of Science in Computer Science</h3>
                            <p className="text-xs text-gray-600">University of Denver | Denver, CO</p>
                            <p className="text-xs text-gray-500 mt-1">05/2017</p>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};
