import { getDictionary, type Locale } from "@/lib/dictionaries";
import { ServicesContent } from "./services-content";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <ServicesContent dict={dict} />;
}
