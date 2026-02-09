export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Fillezy",
        "url": "https://www.fillezy.com",
        "logo": "https://www.fillezy.com/logo.png",
        "sameAs": [
            "https://www.facebook.com/fillezy",
            "https://www.twitter.com/fillezy",
            "https://www.instagram.com/fillezy",
            "https://www.linkedin.com/company/fillezy"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-1234567890",
            "contactType": "customer service",
            "areaServed": "Global"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
