import { redirect } from "next/navigation";
import ShopPage from "../page";

const slugToCategory: Record<string, string> = {
  "beauty-services": "Beauty Services",
  "beautician-work": "Beautician Work",
  "garments": "Garments",
  "rental-ornaments": "Rental Ornaments",
  "antique-ornaments": "Antique Ornaments",
  "all": "All",
};

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  // If the category is a number (e.g. from an old /shop/[id] link), redirect to the product page
  if (!isNaN(Number(category))) {
    redirect(`/product/${category}`);
  }

  const rawSlug = (category || "").toLowerCase().trim();
  const normalizedCategory =
    slugToCategory[rawSlug] ||
    rawSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return <ShopPage initialCategory={normalizedCategory} />;
}
