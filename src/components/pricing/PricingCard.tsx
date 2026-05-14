import React, { useState } from 'react';
import { PricingPlan, createCheckoutSession } from '../../services/stripe';
import { PricingFeature } from './PricingFeature';
import { Button } from '../ui/Button';
import { Loader2 } from 'lucide-react';

export const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    const isRecommended = plan.recommended;
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (plan.price === '0') return; // Free plan action

        setLoading(true);
        try {
            await createCheckoutSession(plan.priceId);
        } catch (error) {
            console.error("Subscription error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2
        ${isRecommended
                    ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-blue-500 shadow-blue-900/20 shadow-2xl scale-105 z-10'
                    : 'bg-gray-900 border border-gray-800 hover:border-gray-700 shadow-xl'
                }`}
        >
            {isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">{plan.currency}{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.interval}</span>
                </div>
            </div>

            <div className="flex-1 mb-8">
                <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                        <PricingFeature key={idx} text={feature} />
                    ))}
                </ul>
            </div>

            <Button
                onClick={handleSubscribe}
                disabled={loading}
                className={`w-full flex items-center justify-center ${isRecommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                variant={isRecommended ? 'primary' : 'secondary'}
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    plan.price === '0' ? 'Get Started' : 'Subscribe Now'
                )}
            </Button>
        </div>
    );
};
