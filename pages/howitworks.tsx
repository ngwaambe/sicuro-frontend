import PageLayout from "../components/layouts/PageLayout";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const HowitworksPage = () => {
    const {t} = useTranslation(['buyonline', 'common'])
    return (
        <></>
    )
}
HowitworksPage.layout = PageLayout;

export const getStaticProps = async ({locale}) => ({
    props: {...(await serverSideTranslations(locale, ["buyonline", "common"]))}
})

export default HowitworksPage
