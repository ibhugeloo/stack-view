import { getDictionary, type Locale } from "@/lib/dictionaries";
import { ProjectsContent } from "./projects-content";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <ProjectsContent dict={dict} />;
}
