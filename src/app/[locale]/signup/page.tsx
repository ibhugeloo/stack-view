import { getDictionary, type Locale } from "@/lib/dictionaries";
import { SignupForm } from "./signup-form";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <SignupForm dict={dict} locale={locale} />;
}
