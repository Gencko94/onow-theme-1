import { useTranslation } from 'react-i18next';

const DesktopNavbar = () => {
  const { t, i18n, ready } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <div className="flex items-center p-2 bg-blue-400">
      <h1 className="font-semibold text-xl">{t('Welcome_to_React')}</h1>
      <div className="ml-auto">
        <button className="btn-sm border" onClick={() => changeLanguage('en')}>
          en
        </button>
        <button className="btn-sm border " onClick={() => changeLanguage('ar')}>
          ar
        </button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
