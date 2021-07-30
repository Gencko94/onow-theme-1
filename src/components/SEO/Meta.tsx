import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ApplicationProvider } from "../../contexts/ApplicationContext";

interface MetaProps {
  title: { [key: string]: string };
  description: { [key: string]: string };

  canonical?: string;
}

const Meta = ({ description, title, canonical }: MetaProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { store_theme } = useContext(ApplicationProvider);
  return (
    <Helmet>
      <title>{title[language]}</title>
      <meta name="description" content={description[language]} />
      <meta name="theme-color" content={store_theme?.primary_color} />
    </Helmet>
  );
};

export default Meta;
