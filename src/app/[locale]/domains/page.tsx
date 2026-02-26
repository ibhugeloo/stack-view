import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DomainsContent } from "./domains-content";

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <DomainsContent dict={dict} />;
}
