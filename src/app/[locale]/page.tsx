import { redirect } from 'next/navigation';

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // 重定向到质押页面
  redirect(`/${locale}/staking`);
}
