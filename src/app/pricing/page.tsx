'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Check, Info, Lock, ChevronRight } from 'lucide-react';
import { FAQ } from '@/components/landing/FAQ';

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

    return (
        <main className="min-h-screen bg-[#F0EEEB] pt-24 sm:pt-32 pb-20">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto px-4 mb-12 sm:mb-16">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 block">
                    Simple Transparency
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1A1A1A] mb-4 sm:mb-6 tracking-tighter">
                    Plans & Pricing
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    Our free plan includes all templates and unlimited PDF downloads.
                    Upgrade anytime to unlock multi-resume management and pro features.
                </p>
            </div>

            {/* Toggle - The "Pill" design */}
            <div className="flex justify-center mb-12 sm:mb-20">
                <div className="bg-white/50 backdrop-blur-sm p-1 sm:p-1.5 rounded-full flex items-center gap-1 border border-black/[0.03] shadow-sm">
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 sm:px-10 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 ${billingCycle === 'yearly'
                            ? 'bg-[#1A1A1A] text-[#F3F1EC] shadow-xl'
                            : 'text-slate-400 hover:text-[#1A1A1A]'
                            }`}
                    >
                        Yearly <span className="ml-1 opacity-60 text-[8px] sm:text-[9px]">-50%</span>
                    </button>
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 sm:px-10 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 ${billingCycle === 'monthly'
                            ? 'bg-[#1A1A1A] text-[#F3F1EC] shadow-xl'
                            : 'text-slate-400 hover:text-[#1A1A1A]'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* Pricing Card Wrapper */}
            <div className="max-w-[1100px] mx-auto px-4 mb-20">
                <div
                    className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-black/[0.03]"
                    style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
                >
                    {/* Header Row (Plans) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                        {/* Label Space */}
                        <div className="hidden md:flex flex-col justify-end p-10 border-r border-[#F3F1EC]">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select your path</span>
                        </div>

                        {/* Free Plan */}
                        <PlanHeader
                            name="Free"
                            price="0"
                            subtitle="100% free forever"
                            buttonText="Get started"
                            variant="outline"
                        />

                        {/* Basic Plan */}
                        <PlanHeader
                            name="Basic"
                            price={billingCycle === 'yearly' ? '3' : '6'}
                            subtitle={`Billed ${billingCycle}`}
                            buttonText="Upgrade"
                            variant="solid"
                            isPopular={billingCycle === 'yearly'}
                        />

                        {/* Pro+ Plan */}
                        <PlanHeader
                            name="Pro +"
                            price={billingCycle === 'yearly' ? '5' : '10'}
                            subtitle={`Billed ${billingCycle}`}
                            buttonText="Go Unlimited"
                            variant="solid"
                        />
                    </div>

                    {/* Features Table Body */}
                    <div className="px-6 md:px-10 pb-10">
                        <div className="space-y-0">
                            <FeatureRow label="PDF Downloads" free="Unlimited" basic="Unlimited" pro="Unlimited" />
                            <FeatureRow label="Saved Resumes" free="1" basic="3" pro="Unlimited" />
                            <FeatureRow label="Cover Letters" free="1" basic="20" pro="Unlimited" />
                            {/* <FeatureRow label="ATS Optimization" free={false} basic={true} pro={true} /> */}
                            {/* <FeatureRow label="Custom Subdomain" free={false} basic={false} pro={true} /> */}
                        </div>
                    </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Check className="w-3 h-3" /> No Watermarks</span>
                    <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Secure Checkout</span>
                    <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Cancel Anytime</span>
                </div>
            </div>

            <FAQ />
        </main>
    );
}

const PlanHeader = ({ name, price, subtitle, buttonText, variant, isPopular }: any) => (
    <div className={`p-8 sm:p-10 flex flex-col items-center md:items-start border-b md:border-b-0 border-[#F3F1EC] ${name !== 'Pro +' ? 'md:border-r' : ''} relative`}>
        {isPopular && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 bg-[#F3F1EC] text-[#1A1A1A] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Best Value
            </span>
        )}
        <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A] mb-3 sm:mb-4">{name}</h3>
        <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">${price}</span>
            <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase">/mo</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-6 sm:mb-8">{subtitle}</p>

        <button className={`w-full h-11 sm:h-12 rounded-full font-black uppercase text-[9px] sm:text-[10px] tracking-widest transition-all duration-300 ${variant === 'solid'
            ? 'bg-[#1A1A1A] text-[#F3F1EC] hover:bg-black shadow-lg hover:-translate-y-1'
            : 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F3F1EC]'
            }`}>
            {buttonText}
        </button>
    </div>
);

const FeatureRow = ({ label, free, basic, pro }: any) => (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 py-4 sm:py-5 border-t border-[#F3F1EC] items-center">
        <div className="col-span-3 md:col-span-1 text-[10px] sm:text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest mb-1 md:mb-0">
            {label}
        </div>
        <div className="text-center md:text-left text-xs sm:text-sm font-bold text-slate-600">{renderValue(free)}</div>
        <div className="text-center md:text-left text-xs sm:text-sm font-bold text-slate-600">{renderValue(basic)}</div>
        <div className="text-center md:text-left text-xs sm:text-sm font-bold text-slate-600">{renderValue(pro)}</div>
    </div>
);

const renderValue = (val: any) => {
    if (val === true) return <div className="w-5 h-5 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto md:mx-0"><Check className="w-3 h-3 text-white" /></div>;
    if (val === false) return <Lock className="w-3.5 h-3.5 text-slate-200 mx-auto md:mx-0" />;
    return val;
};


// 'use client';

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/Button';
// import { Check, Info, Lock } from 'lucide-react';
// import { FAQ } from '@/components/landing/FAQ';

// export default function PricingPage() {
//     const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

//     return (
//         <main className="min-h-screen bg-[#f0eeeb] pt-32 pb-20">
//             {/* Header */}
//             <div className="text-center max-w-3xl mx-auto px-4 mb-16">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#200e32] mb-6 tracking-tight">
//                     Plans & Pricing
//                 </h1>
//                 <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
//                     Our free plan includes all templates, full customization control and unlimited PDF downloads without watermarks. Upgrade anytime for saving multiple resumes.
//                 </p>
//             </div>

//             {/* Toggle */}
//             <div className="flex justify-center mb-16">
//                 <div className="bg-white p-1.5 rounded-full shadow-sm flex items-center gap-1 border border-gray-100">
//                     <button
//                         onClick={() => setBillingCycle('yearly')}
//                         className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${billingCycle === 'yearly'
//                             ? 'bg-[#200e32] text-white shadow-md'
//                             : 'text-gray-500 hover:text-[#200e32]'
//                             }`}
//                     >
//                         Yearly
//                     </button>
//                     <button
//                         onClick={() => setBillingCycle('monthly')}
//                         className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${billingCycle === 'monthly'
//                             ? 'bg-[#200e32] text-white shadow-md'
//                             : 'text-gray-500 hover:text-[#200e32]'
//                             }`}
//                     >
//                         Monthly
//                     </button>
//                 </div>
//             </div>

//             {/* Pricing Card */}
//             <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
//                 <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 overflow-hidden border border-gray-100">

//                     {/* Header Row (Plans) */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-gray-100 pb-12">
//                         <div className="hidden md:block"></div> {/* Spacer for labels */}

//                         {/* Free */}
//                         <div className="text-center md:text-left">
//                             <h3 className="text-2xl font-bold text-[#200e32] mb-4">Free</h3>
//                             <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
//                                 <span className="text-4xl font-extrabold text-[#200e32]">$0</span>
//                                 <span className="text-gray-500 font-medium">/month</span>
//                             </div>
//                             <p className="text-sm text-gray-400 font-medium mb-8">100% free forever</p>
//                             <Button variant="outline" className="w-full border-2 border-[#200e32] text-[#200e32] font-bold  hover:bg-[#200e32] hover:text-white transition-all h-12 rounded-xl">
//                                 Get started
//                             </Button>
//                         </div>

//                         {/* Basic */}
//                         <div className="text-center md:text-left">
//                             <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
//                                 <h3 className="text-2xl font-bold text-[#200e32]">Basic</h3>
//                                 {billingCycle === 'yearly' && (
//                                     <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Best Yearly Value</span>
//                                 )}
//                             </div>
//                             <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
//                                 <span className="text-4xl font-extrabold text-[#200e32]">
//                                     ${billingCycle === 'yearly' ? '3' : '6'}
//                                 </span>
//                                 <span className="text-gray-500 font-medium">/month</span>
//                             </div>
//                             <p className="text-sm text-gray-400 font-medium mb-8">
//                                 ${billingCycle === 'yearly' ? '36.00' : '72.00'} billed {billingCycle === 'yearly' ? 'annually' : 'monthly'}
//                             </p>
//                             <Button className="w-full bg-[#200e32] text-white font-bold hover:bg-[#2d1445] transition-all h-12 rounded-xl shadow-lg">
//                                 Upgrade
//                             </Button>
//                         </div>

//                         {/* Pro+ */}
//                         <div className="text-center md:text-left">
//                             <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
//                                 <h3 className="text-2xl font-bold text-[#200e32]">Pro +</h3>
//                                 {billingCycle === 'yearly' && (
//                                     <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Best Yearly Value</span>
//                                 )}
//                             </div>
//                             <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
//                                 <span className="text-4xl font-extrabold text-[#200e32]">
//                                     ${billingCycle === 'yearly' ? '5' : '10'}
//                                 </span>
//                                 <span className="text-gray-500 font-medium">/month</span>
//                             </div>
//                             <p className="text-sm text-gray-400 font-medium mb-8">
//                                 ${billingCycle === 'yearly' ? '60.00' : '120.00'} billed {billingCycle === 'yearly' ? 'annually' : 'monthly'}
//                             </p>
//                             <Button className="w-full bg-[#200e32] text-white font-bold hover:bg-[#2d1445] transition-all h-12 rounded-xl shadow-lg">
//                                 Upgrade
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Features Table */}
//                     <div className="space-y-8">
//                         {/* Row: PDF Downloads */}
//                         <FeatureRow
//                             label="PDF Downloads"
//                             free="Unlimited"
//                             basic="Unlimited"
//                             pro="Unlimited"
//                         />
//                         <div className="h-px bg-gray-100 w-full" />

//                         {/* Row: Resumes */}
//                         <FeatureRow
//                             label="Resumes"
//                             free="1"
//                             basic="3"
//                             pro="Unlimited"
//                         />
//                         <div className="h-px bg-gray-100 w-full" />

//                         {/* Row: Cover Letters */}
//                         <FeatureRow
//                             label="Cover Letters"
//                             free="1"
//                             basic="20"
//                             pro="Unlimited"
//                         />
//                     </div>

//                     {/* Bottom Guarantee */}
//                     {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 pt-8">
//                         <div className="hidden md:block"></div>
//                         <div className="text-center">
//                             <p className="text-sm text-gray-500">build your free resume</p>
//                         </div>
//                         <div className="text-center">
//                             <p className="text-sm text-gray-500">14-day money-back guarantee</p>
//                         </div>
//                         <div className="text-center">
//                             <p className="text-sm text-gray-500">14-day money-back guarantee</p>
//                         </div>
//                     </div> */}

//                 </div>
//             </div>

//             {/* FAQ Section */}
//             <FAQ />
//         </main>
//     );
// }

// const FeatureRow = ({ label, free, basic, pro }: { label: string, free: React.ReactNode, basic: React.ReactNode, pro: React.ReactNode }) => (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-sm md:text-base">
//         <div className="col-span-2 md:col-span-1 font-bold text-[#200e32]">
//             {label}
//         </div>
//         <div className="text-center md:text-left font-bold text-[#200e32]">
//             {renderValue(free)}
//         </div>
//         <div className="text-center md:text-left font-bold text-[#200e32]">
//             {renderValue(basic)}
//         </div>
//         <div className="text-center md:text-left font-bold text-[#200e32]">
//             {renderValue(pro)}
//         </div>
//     </div>
// );

// const renderValue = (val: React.ReactNode) => {
//     if (val === true) return <Check className="w-5 h-5 text-[#200e32] mx-auto md:mx-0" />;
//     if (val === false) return <Lock className="w-4 h-4 text-gray-300 mx-auto md:mx-0" />;
//     return val;
// };
