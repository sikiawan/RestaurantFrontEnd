export async function getStaticProps({ locale }: { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'dashboard',
        ])),
        // Will be passed to the page component as props
      },
    };
  }

  import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
