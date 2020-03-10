import FrontendLayout from "../components/layouts/FrontendLayout";
import { withTranslation } from "../i18n";

class IndexPage extends React.Component{
    static async getInitialProps() {
        return { namespacesRequired: ["common","messages"] };
    }
    render(){ return (<div>{this.props.t("common:menu.about_us")}</div>)}
};

IndexPage.Layout = FrontendLayout;

export default withTranslation("common")(IndexPage);
