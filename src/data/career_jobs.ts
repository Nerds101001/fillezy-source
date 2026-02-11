export interface CareerJob {
    title: string;
    dept: string;
    description: string;
    location: string;
    type: string;
    link: string;
    datePosted: string;
    validThrough: string;
}

export const careerJobs: CareerJob[] = [
    {
        title: "Mechanical Design Engineer",
        dept: "Engineering",
        description: "Design and optimize next-generation void fill automation systems using CAD and rapid prototyping.",
        location: "Gurugram, HR",
        type: "Full-Time",
        link: "https://forms.gle/sample1",
        datePosted: "2024-02-10",
        validThrough: "2024-12-31"
    },
    {
        title: "Technical Sales Specialist",
        dept: "Sales",
        description: "Lead industrial sales protocols for high-velocity fulfillment centers across PAN India.",
        location: "Mumbai, MH",
        type: "Full-Time",
        link: "https://forms.gle/sample2",
        datePosted: "2024-02-10",
        validThrough: "2024-12-31"
    },
    {
        title: "Sustainability Consultant",
        dept: "Bio-Aer Division",
        description: "Develop corporate sustainability strategies for clients transitioning to plant-based void fill.",
        location: "Bangalore, KA",
        type: "Contract",
        link: "https://forms.gle/sample3",
        datePosted: "2024-02-10",
        validThrough: "2024-12-31"
    },
    {
        title: "Production Supervisor",
        dept: "Manufacturing",
        description: "Oversee industrial-scale production lines for Bio-Aer materials and air-cushion machines.",
        location: "Pune, MH",
        type: "Full-Time",
        link: "https://forms.gle/sample4",
        datePosted: "2024-02-10",
        validThrough: "2024-12-31"
    }
];
