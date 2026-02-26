import { getDictionary, type Locale } from "@/lib/dictionaries";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
  const dict = await getDictionary(locale as Locale);

  return <LoginForm dict={dict} locale={locale} next={next} />;
}
