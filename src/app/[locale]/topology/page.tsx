import { getDictionary, type Locale } from "@/lib/dictionaries";
import { TopologyContent } from "./topology-content";

export default async function TopologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <TopologyContent dict={dict} />;
}
