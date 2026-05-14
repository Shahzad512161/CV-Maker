import React from 'react';
import { Mail, Phone, MapPin, Globe, Edit2, User, PenTool } from 'lucide-react';
import { PersonalDetails } from '@/types/resume';
import { SocialIcon } from './previews/SocialIcon';

interface Props {
    data: PersonalDetails;
    onEdit: () => void;
}

export const PersonalDetailsCard: React.FC<Props> = ({ data, onEdit }) => {
    return (
        <div
            onClick={onEdit}
            className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm relative group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 hover:border-blue-100 animate-in slide-in-from-left-5 duration-500"
        >
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-8">
                <div className="space-y-6 flex-1 min-w-0 w-full text-center sm:text-left">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#1a1b3a] tracking-tight uppercase italic [overflow-wrap:anywhere]">
                            {data.fullName || 'Your Name'}
                        </h2>
                        {data.jobTitle && (
                            <p className="text-[11px] sm:text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 [overflow-wrap:anywhere]">{data.jobTitle}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        {data.email && (
                            <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all shrink-0">
                                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span className="[overflow-wrap:anywhere] break-all">{data.email}</span>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all shrink-0">
                                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span className="[overflow-wrap:anywhere]">{data.phone}</span>
                            </div>
                        )}
                        {data.location && (
                            <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all shrink-0">
                                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span className="[overflow-wrap:anywhere]">{data.location}</span>
                            </div>
                        )}

                        {/* Social Links */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                            {data.socials?.map((social) => (
                                <div
                                    key={social.id}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 group-hover:border-blue-100 transition-colors"
                                >
                                    <SocialIcon label={social.label} className="text-gray-400 group-hover:text-blue-500" size={12} />
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 truncate max-w-[120px]">
                                        {social.value || social.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Photo Section */}
                <div className="relative flex-shrink-0 group/photo">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-50/50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative shadow-inner ring-4 sm:ring-8 ring-white">
                        {data.photo ? (
                            <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                            <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                    </div>
                    {/* Tiny Edit Badge for Photo */}
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-[#1a1b3a] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                </div>
            </div>

            {/* Main Edit Button (Hover State) */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 bg-[#1a1b3a] text-white rounded-lg sm:rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
        </div>
    );
};
