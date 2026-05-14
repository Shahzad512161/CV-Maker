import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Flag, CreditCard, User, Shield, Car, Accessibility, Globe, Link as LinkIcon, Mail, Phone } from 'lucide-react';
import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SocialSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (label: string) => void;
}

// Icon Mapping
// We use a mix of Lucide (Generic) and React Icons (Brands)
const PERSONAL_DETAILS = [
    { label: 'Date of Birth', icon: Calendar },
    { label: 'Nationality', icon: Flag },
    { label: 'Passport or Id', icon: CreditCard }, // Generic ID
    { label: 'Marital status', icon: User },
    { label: 'Military Service', icon: Shield },
    { label: 'Driving License', icon: Car },
    { label: 'Gender/Pronoun', icon: User },
    { label: 'Disability', icon: Accessibility },
    { label: 'Visa', icon: Globe },
];

// Map brand names to Si/Fa icons
// We use dynamic lookup or explicit map. Explicit is safer for tree shaking but huge.
// Given the requirements, we'll map explicitly to ensure accuracy.
const SOCIAL_LINKS: { label: string; icon: any }[] = [
    { label: 'Website', icon: LinkIcon }, // Generic
    { label: 'LinkedIn', icon: Si.SiLinkedin },
    { label: 'GitHub', icon: Si.SiGithub },
    { label: 'GitBook', icon: Si.SiGitbook },
    { label: 'Medium', icon: Si.SiMedium },
    { label: 'ORCID', icon: Si.SiOrcid },
    { label: 'Skype', icon: Fa.FaSkype },
    { label: 'Bluesky', icon: Si.SiBluesky },
    { label: 'Threads', icon: Si.SiThreads },
    { label: 'X', icon: Si.SiX },
    { label: 'Discord', icon: Si.SiDiscord },
    { label: 'Dribbble', icon: Si.SiDribbble },
    { label: 'Behance', icon: Si.SiBehance },
    { label: 'Stack Overflow', icon: Si.SiStackoverflow },
    { label: 'GitLab', icon: Si.SiGitlab },
    { label: 'Quora', icon: Si.SiQuora },
    { label: 'Facebook', icon: Si.SiFacebook },
    { label: 'Instagram', icon: Si.SiInstagram },
    { label: 'WeChat', icon: Si.SiWechat },
    { label: 'Hugging Face', icon: Si.SiHuggingface },
    { label: 'Kaggle', icon: Si.SiKaggle },
    { label: 'YouTube', icon: Si.SiYoutube },
    { label: 'TikTok', icon: Si.SiTiktok },
    { label: 'Signal', icon: Si.SiSignal },
    { label: 'Telegram', icon: Si.SiTelegram },
    { label: 'WhatsApp', icon: Si.SiWhatsapp },
    { label: 'PayPal', icon: Si.SiPaypal },
    { label: 'Product Hunt', icon: Si.SiProducthunt },
    { label: 'ArtStation', icon: Si.SiArtstation },
    { label: 'CodePen', icon: Si.SiCodepen },
    { label: 'Fiverr', icon: Si.SiFiverr },
    { label: 'Hashnode', icon: Si.SiHashnode },
    { label: 'Pluralsight', icon: Si.SiPluralsight },
    { label: 'ResearchGate', icon: Si.SiResearchgate },
    { label: 'IMDb', icon: Si.SiImdb },
    { label: 'Qwiklabs', icon: Si.SiGooglecloud }, // Approx
    { label: 'Google Play', icon: Si.SiGoogleplay },
    { label: 'Tumblr', icon: Si.SiTumblr },
    { label: 'Tripadvisor', icon: Si.SiTripadvisor },
    { label: 'Yelp', icon: Si.SiYelp },
    { label: 'Slack', icon: Si.SiSlack },
    { label: 'Flickr', icon: Si.SiFlickr },
    { label: 'ReverbNation', icon: Si.SiReverbnation },
    { label: 'DeviantArt', icon: Si.SiDeviantart },
    { label: 'Vimeo', icon: Si.SiVimeo },
    { label: 'Reddit', icon: Si.SiReddit },
    { label: 'Pinterest', icon: Si.SiPinterest },
    { label: 'Blogger', icon: Si.SiBlogger },
    { label: 'Spotify', icon: Si.SiSpotify },
    { label: 'Bitcoin', icon: Si.SiBitcoin },
    { label: 'App Store', icon: Si.SiAppstore },
    { label: 'WordPress', icon: Si.SiWordpress },
    { label: 'LeetCode', icon: Si.SiLeetcode },
    { label: 'CodeChef', icon: Si.SiCodechef },
    { label: 'Codecademy', icon: Si.SiCodecademy },
    { label: 'Codeforces', icon: Si.SiCodeforces },
    { label: 'VSCO', icon: Si.SiVsco },
    { label: 'Snapchat', icon: Si.SiSnapchat },
    { label: 'Upwork', icon: Si.SiUpwork },
    { label: 'GeeksforGeeks', icon: Si.SiGeeksforgeeks },
    { label: 'Google Scholar', icon: Si.SiGooglescholar },
    { label: 'LINE', icon: Si.SiLine },
    { label: 'TryHackMe', icon: Si.SiTryhackme },
    { label: 'Coursera', icon: Si.SiCoursera },
    { label: 'Proton Mail', icon: Si.SiProtonmail },
    { label: 'HackerEarth', icon: Si.SiHackerearth },
    { label: 'Codewars', icon: Si.SiCodewars },
    { label: 'Hack The Box', icon: Si.SiHackthebox },
    { label: 'Bitbucket', icon: Si.SiBitbucket },
    { label: 'Gitea', icon: Si.SiGitea },
    { label: 'Xing', icon: Si.SiXing },
    { label: '500px', icon: Si.Si500Px },
    { label: 'dev.to', icon: Si.SiDevdotto },
    { label: 'HackerRank', icon: Si.SiHackerrank },
    { label: 'Tencent QQ', icon: Si.SiTencentqq },
    { label: 'Ethereum', icon: Si.SiEthereum },
    { label: 'StopStalk', icon: LinkIcon }, // Missing in Si v8? Fallback
    { label: 'Substack', icon: Si.SiSubstack },
    { label: 'Toptal', icon: Si.SiToptal },
    { label: 'Polywork', icon: Si.SiPolywork },
    { label: 'Replit', icon: Si.SiReplit },
    { label: 'Credly', icon: Si.SiCredly },
    { label: 'Figma', icon: Si.SiFigma },
    { label: 'Gmail', icon: Si.SiGmail },
    { label: 'Tableau', icon: Si.SiTableau },
    { label: 'npm', icon: Si.SiNpm },
    { label: 'HackerOne', icon: Si.SiHackerone },
    { label: 'Freelancer', icon: Si.SiFreelancer },
    { label: 'DataCamp', icon: Si.SiDatacamp },
    { label: 'Mastodon', icon: Si.SiMastodon },
    { label: 'Letterboxd', icon: Si.SiLetterboxd },
    { label: 'Zoom', icon: Si.SiZoom },
    { label: 'Audioboom', icon: Fa.FaPodcast }, // Fallback
    { label: 'SoundCloud', icon: Si.SiSoundcloud },
    { label: 'Soundcharts', icon: Fa.FaMusic }, // Fallback
    { label: 'KakaoTalk', icon: Si.SiKakaotalk },
    { label: 'Salesforce', icon: Si.SiSalesforce },
    { label: 'Itch.io', icon: Si.SiItchdotio },
    { label: 'Sololearn', icon: Si.SiSololearn },
    { label: 'OpenSea', icon: Si.SiOpensea },
    { label: 'Devpost', icon: LinkIcon }, // Check
    { label: 'Linktree', icon: Si.SiLinktree },
    { label: 'CodinGame', icon: Si.SiCodingame },
    { label: 'Coding Ninjas', icon: LinkIcon }, // Fallback
    { label: 'Unsplash', icon: Si.SiUnsplash },
    { label: 'Indeed', icon: Si.SiIndeed },
    { label: 'Handshake', icon: Si.SiHandshake },
    { label: 'Steam', icon: Si.SiSteam },
    { label: 'Google', icon: Si.SiGoogle },
    { label: 'Calendly', icon: Si.SiCalendly },
    { label: 'AngelList', icon: LinkIcon }, // SiAngellist missing
    { label: 'Deezer', icon: LinkIcon }, // SiDeezer missing
    { label: 'ATS CV', icon: LinkIcon }, // Meta?
    { label: 'Khan Academy', icon: Si.SiKhanacademy },
    { label: 'Udemy', icon: Si.SiUdemy },
    { label: 'Udacity', icon: Si.SiUdacity },
    { label: 'Twitch', icon: Si.SiTwitch },
    { label: 'Trello', icon: Si.SiTrello },
    { label: 'Evernote', icon: Si.SiEvernote },
    { label: 'Canva', icon: Si.SiCanva },
    { label: 'Etsy', icon: Si.SiEtsy },
    { label: 'Google Maps', icon: Si.SiGooglemaps },
    { label: 'Google Podcasts', icon: LinkIcon }, // SiGooglepodcasts missing
    { label: 'Apple Podcasts', icon: Si.SiApplepodcasts },
    { label: 'Stitcher', icon: Si.SiStitcher },
    { label: 'Amazon Music', icon: Si.SiAmazon },
    { label: 'iHeartRadio', icon: Si.SiIheartradio },
    { label: 'TuneIn', icon: LinkIcon },
    { label: 'Pocket Casts', icon: Si.SiPocketcasts },
    { label: 'Pandora', icon: Si.SiPandora },
    { label: 'YouTube Music', icon: Si.SiYoutubemusic },
    { label: 'Tidal', icon: Si.SiTidal },
    { label: 'Bandcamp', icon: Si.SiBandcamp },
    { label: 'Scopus', icon: LinkIcon },
];

export const SocialSelectionModal = ({ isOpen, onClose, onSelect }: SocialSelectionModalProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPersonal = useMemo(() =>
        PERSONAL_DETAILS.filter(item =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm]);

    const filteredSocials = useMemo(() =>
        SOCIAL_LINKS.filter(item =>
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Select details to add..."
                        className="flex-1 text-base outline-none placeholder:text-gray-400"
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 custom-scrollbar">
                    {/* Personal Details Section */}
                    {filteredPersonal.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {filteredPersonal.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => { onSelect(item.label); onClose(); }}
                                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                                    >
                                        <item.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                        <span className="text-xs font-medium text-gray-700 text-center group-hover:text-gray-900">
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Socials Section */}
                    {filteredSocials.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">
                                Links & Socials
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {filteredSocials.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => { onSelect(item.label); onClose(); }}
                                        className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                                    >
                                        <item.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                        <span className="text-xs font-medium text-gray-700 text-center group-hover:text-gray-900">
                                            {item.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredPersonal.length === 0 && filteredSocials.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                            No options found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
