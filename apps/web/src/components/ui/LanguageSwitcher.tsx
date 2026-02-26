import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors"
      title={i18n.language === 'en' ? 'Türkçe\'ye geç' : 'Switch to English'}
    >
      {i18n.language === 'en' ? 'TR' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
