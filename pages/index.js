import FrontendLayout from "../components/layouts/FrontendLayout";
import { withTranslation } from "../i18n";

class IndexPage extends React.Component{
    static async getInitialProps() {
        return { namespacesRequired: ["common"] };
    }
    render(){ return (<><div>{this.props.t("common:cards.title")}</div></>)}
};

IndexPage.Layout = FrontendLayout;

export default withTranslation("common")(IndexPage);
