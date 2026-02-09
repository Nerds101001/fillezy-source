export interface Location {
    id: string;
    name: string;
    type: ('headquarters' | 'manufacturing' | 'partner')[];
    address: string;
    city: string;
    country: string;
    coordinates: [number, number]; // [latitude, longitude]
    phone?: string;
    email?: string;
}

export const locations: Location[] = [
    // Headquarters
    {
        id: 'hq-usa',
        name: 'Hi Tech Group Fillezy',
        type: ['headquarters'],
        address: '14310 Gannet Street, La Mirada, CA 90638',
        city: 'La Mirada',
        country: 'USA',
        coordinates: [33.9172, -118.0120],
        phone: '+1 657 3252 090',
        email: 'info@fillezy.com'
    },

    // Manufacturing Plants
    {
        id: 'mfg-turkey',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Tavsancil Mah.Guney Sokak NO:8, Dilovasi Kocaeli',
        city: 'Kocaeli',
        country: 'Turkey',
        coordinates: [40.7869, 29.5208],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-germany',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Schlosserstrasse 13, Lindlar 51789',
        city: 'Lindlar',
        country: 'Germany',
        coordinates: [51.0167, 7.3833],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-italy',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Via dell\'Artigianato, 15, Provincia di Modena',
        city: 'Modena',
        country: 'Italy',
        coordinates: [44.6471, 10.9252],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-mexico',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'G100 Plaza delaPaz 102,711 Puerto Silao, Guanajuato',
        city: 'Silao',
        country: 'Mexico',
        coordinates: [20.9333, -101.4167],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-canada',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit 1: 6725 Millcreek Dr, Mississauga ON L5N 5V3',
        city: 'Mississauga',
        country: 'Canada',
        coordinates: [43.5890, -79.6441],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-china',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'No. 17 Building, 6 Yard, Hengye North 7 Street, Tongzhou District, Beijing',
        city: 'Beijing',
        country: 'China',
        coordinates: [39.9042, 116.4074],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-taiwan',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'No.23, Wugong 6th Rd., Wugu Dist., New Taipei City 248021',
        city: 'New Taipei City',
        country: 'Taiwan',
        coordinates: [25.0830, 121.4417],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'hq-india-manesar',
        name: 'Hi Tech Group Fillezy',
        type: ['headquarters', 'manufacturing'],
        address: 'Unit V: Plot No.18 Sector-6, IIMT Manesar, Gurgaon',
        city: 'Gurugram',
        country: 'India',
        coordinates: [28.3639, 76.9357],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-1',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit I: B-31, Opp. Power House (Jamalpur) Chandigarh Road, Ludhiana, 141010',
        city: 'Ludhiana',
        country: 'India',
        coordinates: [30.9010, 75.8573],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-2',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit II: 7 Arkose Ind Estate, Khopoli, Mumbai',
        city: 'Mumbai',
        country: 'India',
        coordinates: [18.7860, 73.3458],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-3',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit III: Adj. Airport, Vill-Khagat, G.T. Road, Sahnewal, Ludhiana-141120',
        city: 'Ludhiana',
        country: 'India',
        coordinates: [30.8542, 75.9357],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-4',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit IV: Plot No.99, Sector-5, N.H.-8, IMT Manesar Gurgaon- 122050',
        city: 'Gurugram',
        country: 'India',
        coordinates: [28.3700, 76.9300],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-6',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit VI: Plot No.797, Thiruvallur High Road Andersenpet, Thiruvallur, Chennai- 600124',
        city: 'Chennai',
        country: 'India',
        coordinates: [13.1443, 79.9083],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-7',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit VII: Plot No.E-133 & E-134, Addl. Patalgana, Industrial Area Vill-Chavane',
        city: 'Raigad',
        country: 'India',
        coordinates: [18.9894, 73.2933],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-8',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit VIII: Sahnewal Airport Road, Ramgarh Road, Ramgarh, Sahnewal, Ludhiana, Punjab- 141123',
        city: 'Ludhiana',
        country: 'India',
        coordinates: [30.8600, 75.9400],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'mfg-india-unit-9',
        name: 'Hi Tech Group Fillezy',
        type: ['manufacturing'],
        address: 'Unit IX: Plot No. 146-147, Nandanvan Indsutrial Estate, Vill. Bakrol Bujrang, Daskroi, Ahmadabad 38243',
        city: 'Ahmedabad',
        country: 'India',
        coordinates: [22.9567, 72.7161],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },

    // Partner Offices
    {
        id: 'partner-saudi',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Al Khobar Business Gate, King Faisal Bin Abdulaziz Road, Tower A, 5th Floor, Al Khobar 34423',
        city: 'Al Khobar',
        country: 'Saudi Arabia',
        coordinates: [26.2172, 50.1971],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-egypt',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Moharam Bek, Alexandria Governorate',
        city: 'Alexandria',
        country: 'Egypt',
        coordinates: [31.2001, 29.9187],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-turkey',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'RUSTX PLASTİK: TAVŞANCIL MAH. GÜNEY SOK. NO:8 41455 DİLOVASI / KOCAELİ',
        city: 'Kocaeli',
        country: 'Turkey',
        coordinates: [40.7869, 29.5208],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-brazil',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Comércio de Manufaturados S.A.: Rua Wenceslau Marek, 63 Jardim Aeroporto, São José dos Pinhais',
        city: 'São José dos Pinhais',
        country: 'Brazil',
        coordinates: [-25.5304, -49.2064],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-argentina',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Soler 602 city MENDOZA (5500)',
        city: 'Mendoza',
        country: 'Argentina',
        coordinates: [-32.8895, -68.8458],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-australia',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: '6 Nicholas Drive, Dandenong South Vic 3175',
        city: 'Dandenong South',
        country: 'Australia',
        coordinates: [-38.0333, 145.2167],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-poland',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Elastiko: Majowa 6, 05-092 Łomianki',
        city: 'Łomianki',
        country: 'Poland',
        coordinates: [52.3333, 20.8833],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-finland',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Kissalinitie 3, Fi 01730, Vantaa',
        city: 'Vantaa',
        country: 'Finland',
        coordinates: [60.2934, 25.0378],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-south-africa',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'Proton crescent Stirland, Bellville, Cape Town Sanlamhof 7532',
        city: 'Cape Town',
        country: 'South Africa',
        coordinates: [-33.9249, 18.4241],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-uk',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: '2-5 George Street Great Northern Terrace Lincoln LN5 8LG',
        city: 'Lincoln',
        country: 'UK',
        coordinates: [53.2307, -0.5406],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    },
    {
        id: 'partner-china',
        name: 'Hi Tech Group Fillezy',
        type: ['partner'],
        address: 'ZHONGZHEN DEXING BEIJING: Room 101-2207, Floor 2, Building 17, Yard-6, HENGYEBEI SEVEN STREET, TONGZHOU, BEIJING',
        city: 'Beijing',
        country: 'China',
        coordinates: [39.9042, 116.4074],
        phone: '+91 98142 15000',
        email: 'info@fillezy.com'
    }
];
