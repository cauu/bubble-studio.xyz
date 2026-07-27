import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

// Superseded by /projects in the bubble-light redesign; keep the route for inbound links.
export default function ProductsPage({ params: { locale } }: Props) {
  redirect(locale === 'en' ? '/projects' : `/${locale}/projects`);
}
