import { useTranslation } from 'react-i18next';

const MobileNavbar = () => {
  const { i18n, ready } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  return (
    <div className="flex items-center justify-end">
      <button
        className="py-1 px-2 rounded"
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
      <button
        className="py-1 px-2 rounded"
        onClick={() => changeLanguage('ar')}
      >
        ar
      </button>
    </div>
  );
};

export default MobileNavbar;
