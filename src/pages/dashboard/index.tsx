import { FC } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface Props {}
const index: FC<Props> = (): JSX.Element => {
const {locale } = useRouter();
const {t} = useTranslation('dashboard');
  return (
    <div className='px-10'>
      <main className='flex items-center justify-center'>
        <div>{locale}</div>
        <h1 className='text-3xl font-bold'>{t('title')}</h1>
      </main>
    </div>
  )
}

export default index
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'dashboard',
      ])),
      // Will be passed to the page component as props
    },
  };
}


