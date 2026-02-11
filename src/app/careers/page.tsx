import { Metadata } from 'next';
import CareersPageClient from '../../components/CareersClient';
import { careerJobs } from '@/data/career_jobs';

export const metadata: Metadata = {
    title: 'Careers at Fillezy | Industrial Automation Jobs',
    description: 'Join Fillezy, a global leader in protective packaging automation. View openings for Vice President, Sales Managers, and Engineers. Driving industrial innovation since 1985.',
    keywords: ['Fillezy Careers', 'Automation Jobs', 'Industrial Engineering Jobs', 'Sales Jobs Pan India', 'Packaging Industry Careers', 'Fillezy Recruitment'],
    openGraph: {
        title: 'Join the Architects of Automation | Fillezy Careers',
        description: 'We are looking for individuals with passion and persistence. Explore opportunities to define the future of global logistics and packaging.',
        url: 'https://fillezy.com/careers',
        siteName: 'Fillezy',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
                width: 1200,
                height: 630,
                alt: 'Fillezy Industrial Careers'
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fillezy Careers - Build the Future',
        description: 'Join our team of 1400+ specialists transforming the global supply chain.',
    },
    alternates: {
        canonical: 'https://fillezy.com/careers'
    }
};

export default function CareersPage() {
    // Generate JSON-LD for Google Jobs
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': careerJobs.map((job, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'JobPosting',
                'title': job.title,
                'description': `<p>${job.description}</p>`,
                'identifier': {
                    '@type': 'PropertyValue',
                    'name': 'Fillezy',
                    'value': `JOB-${index + 1}`
                },
                'datePosted': job.datePosted,
                'validThrough': job.validThrough,
                'employmentType': job.type.toUpperCase().replace('-', '_'),
                'hiringOrganization': {
                    '@type': 'Organization',
                    'name': 'Fillezy',
                    'sameAs': 'https://fillezy.com',
                    'logo': 'https://fillezy.com/logo.png'
                },
                'jobLocation': {
                    '@type': 'Place',
                    'address': {
                        '@type': 'PostalAddress',
                        'addressCountry': 'IN',
                        'addressRegion': 'Pan India'
                    }
                }
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CareersPageClient />
        </>
    );
}
