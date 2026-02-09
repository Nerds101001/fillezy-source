import { allProducts } from "@/data/allProducts";
import { notFound } from "next/navigation";
import CategoryContent from "@/components/CategoryContent";

export function generateStaticParams() {
    const categories = Array.from(new Set(allProducts.map(p => p.category)));
    return categories.map(category => ({
        category: category
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    // Check if category exists
    const hasProducts = allProducts.some(
        p => p.category.toLowerCase() === decodedCategory.toLowerCase()
    );

    if (!hasProducts) {
        notFound();
    }

    return <CategoryContent category={decodedCategory} />;
}
