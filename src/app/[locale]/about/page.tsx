import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

// The about narrative is absorbed by the home "why" band in the bubble-light redesign.
export default function AboutPage({ params: { locale } }: Props) {
  redirect(locale === 'en' ? '/' : `/${locale}`);
}
