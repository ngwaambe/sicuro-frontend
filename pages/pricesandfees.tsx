import {useTranslation} from "next-i18next";
import PageLayout from "../components/layouts/PageLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const PriceAndFeesPage = () => {
    const {t} = useTranslation (["buyonline", "common"])
    return (
        <></>
    )
}

PriceAndFeesPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => ({
      props: {...(await serverSideTranslations(locale, ["buyonline", "common"]))}
  }
)
export default  PriceAndFeesPage
