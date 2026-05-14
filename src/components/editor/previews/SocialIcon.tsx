import React from 'react';
import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';
import { Mail, Phone, MapPin, Globe, Link as LinkIcon, Calendar, Flag, CreditCard, User, Shield, Car, Accessibility } from 'lucide-react';

interface SocialIconProps {
    label: string;
    className?: string;
    size?: number;
    style?: React.CSSProperties;
}

const ICON_MAP: Record<string, any> = {
    // Lucide Icons for Personal Details
    'Date of Birth': Calendar,
    'Nationality': Flag,
    'Passport or Id': CreditCard,
    'Marital status': User,
    'Military Service': Shield,
    'Driving License': Car,
    'Gender/Pronoun': User,
    'Disability': Accessibility,
    'Visa': Globe,
    'Website': LinkIcon,
    'Email': Mail,
    'Phone': Phone,
    'Location': MapPin,

    // React Icons for Social Brands
    'LinkedIn': Si.SiLinkedin,
    'GitHub': Si.SiGithub,
    'GitBook': Si.SiGitbook,
    'Medium': Si.SiMedium,
    'ORCID': Si.SiOrcid,
    'Skype': Fa.FaSkype,
    'Bluesky': Si.SiBluesky,
    'Threads': Si.SiThreads,
    'X': Si.SiX,
    'Discord': Si.SiDiscord,
    'Dribbble': Si.SiDribbble,
    'Behance': Si.SiBehance,
    'Stack Overflow': Si.SiStackoverflow,
    'GitLab': Si.SiGitlab,
    'Quora': Si.SiQuora,
    'Facebook': Si.SiFacebook,
    'Instagram': Si.SiInstagram,
    'WeChat': Si.SiWechat,
    'Hugging Face': Si.SiHuggingface,
    'Kaggle': Si.SiKaggle,
    'YouTube': Si.SiYoutube,
    'TikTok': Si.SiTiktok,
    'Signal': Si.SiSignal,
    'Telegram': Si.SiTelegram,
    'WhatsApp': Si.SiWhatsapp,
    'PayPal': Si.SiPaypal,
    'Product Hunt': Si.SiProducthunt,
    'ArtStation': Si.SiArtstation,
    'CodePen': Si.SiCodepen,
    'Fiverr': Si.SiFiverr,
    'Hashnode': Si.SiHashnode,
    'Pluralsight': Si.SiPluralsight,
    'ResearchGate': Si.SiResearchgate,
    'IMDb': Si.SiImdb,
    'Google Play': Si.SiGoogleplay,
    'Tumblr': Si.SiTumblr,
    'Tripadvisor': Si.SiTripadvisor,
    'Yelp': Si.SiYelp,
    'Slack': Si.SiSlack,
    'Flickr': Si.SiFlickr,
    'Reddit': Si.SiReddit,
    'Pinterest': Si.SiPinterest,
    'Spotify': Si.SiSpotify,
    'Bitcoin': Si.SiBitcoin,
    'WordPress': Si.SiWordpress,
    'LeetCode': Si.SiLeetcode,
    'Upwork': Si.SiUpwork,
    'Figma': Si.SiFigma,
    'Gmail': Si.SiGmail,
};

export const SocialIcon: React.FC<SocialIconProps> = ({ label, className, size = 16, style }) => {
    const Icon = ICON_MAP[label] || Globe;
    return <Icon className={className} size={size} style={style} />;
};
