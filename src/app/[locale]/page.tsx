import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <DashboardContent dict={dict} />;
}
