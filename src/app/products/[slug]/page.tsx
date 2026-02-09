import { allProducts } from "@/data/allProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/ProductDetailContent";

// Generate static params for all products to enable static export if needed, 
// and generally good practice for finite content.
export function generateStaticParams() {
    return allProducts.map((product) => ({
        slug: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = allProducts.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-background">
            <Header />
            <ProductDetailContent product={product} />
            <Footer />
        </div>
    );
}
