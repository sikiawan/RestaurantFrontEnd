import type { NextPage } from "next";
import { useTranslation } from "next-i18next";

interface HomeProps {
  locale: string;
}

const Home: NextPage<HomeProps> = () => {
  const {t} = useTranslation('dashboard');

  return (
    <div className="px-10">
      <main className="flex items-center justify-center">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </main>
    </div>
  );
};

export default Home;