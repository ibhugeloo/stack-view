import { getDictionary, type Locale } from "@/lib/dictionaries";
import { InventoryContent } from "./inventory-content";

export default async function InventoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <InventoryContent dict={dict} />;
}
