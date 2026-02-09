import { Metadata } from 'next';
import CareersPageClient from '../../components/CareersClient';

export const metadata: Metadata = {
    title: 'Careers | Fillezy - Architects of Automation',
    description: 'Join the core of industrial innovation. Explore career opportunities in automation, engineering, and global logistics at Fillezy.',
};

export default function CareersPage() {
    return <CareersPageClient />;
}
