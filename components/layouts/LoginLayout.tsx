import {withTranslation} from 'next-i18next';
import React, {Component, ReactNode, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoginHeader from "../LoginHeader";

interface Props {
  t:any
  children?:ReactNode,
}

class FrontendLayout extends Component<Props> {
  constructor(props) {
    super(props);
  }

   static propTypes = {
    t: PropTypes.func.isRequired,
  }

  static getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })

  render() {
    return (
      <React.Fragment>

        <div>
          {/* Header Area Start Here */}
          <div className="header-area header-fixed header-style-four">
            <LoginHeader />
          </div>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default withTranslation('common')(FrontendLayout);
