import React, {ReactNode} from "react"
import Link from "next/link";
import {withTranslation} from "react-i18next";
import {Container, Grid} from "@material-ui/core";

interface Props {
    t:any
    children:ReactNode
}

const MainLayout = (props: Props) => {
    const {t} = props
    return (
      <div id="wrapper" className="content">
          <div className="body">
              {props.children}
          </div>

          <footer className="footer">
              {/*-- missing class for home --*/}
              <div className="footer-area-top">
                  <Container maxWidth="lg">

                      <Grid container justify="space-evenly" spacing={4}>
                          <Grid item xs={12} sm={6} md={3} className="footerMenu">
                              <div className="footer-box">
                                  <h3 className="title-bar-footer">{t('menu-about_us')}</h3>
                                  <ul className="recent-post-link">
                                      <li>
                                          <Link href="/contact"><a>{t('menu-contact')}</a></Link>
                                      </li>
                                      <li>
                                          <Link href="/security"><a>{t('menu-security')}</a></Link>
                                      </li>
                                  </ul>
                              </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} className="footerMenu">
                              <div className="footer-box">
                                  <h3 className="title-bar-footer">{t('menu-service')}</h3>
                                  <ul className="recent-post-link">
                                      <li>
                                          <Link
                                            href="/services"><a>{t('menu-service')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/pricesandfees"><a>{t('menu-prices_and_fees')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/services/transfer"><a>{t('menu-secureDomainTransfer')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/services/sellonline"><a>{t('menu-sellDomainOnline')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/services/buyonline"><a>{t('menu-buyDomainOnline')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/services/buynowlink"><a>{t('menu-buyNowLink')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/services/broker"><a>{t('menu-broker')}</a></Link>
                                      </li>
                                  </ul>
                              </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} className="footerMenu">
                              <div className="footer-box">
                                  <h3 className="title-bar-footer">{t('menu-support')}</h3>
                                  <ul className="recent-post-link">
                                      <li>
                                          <Link href="/faq"><a>{t('menu-faq')}</a></Link>
                                      </li>
                                      <li>
                                          <Link href="/terms"><a>{t('menu-ask_a_question')}</a></Link>
                                      </li>
                                  </ul>
                              </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3} className="footerMenu">
                              <div className="footer-box">
                                  <h3 className="title-bar-footer">{t('menu-legal')}</h3>
                                  <ul className="recent-post-link">
                                      <li>
                                          <Link
                                            href="/legal/terms"><a>{t('menu-terms_and_conditions')}</a></Link>
                                      </li>
                                      <li>
                                          <Link href="/legal/policy"><a>{t('menu-privacy_policy')}</a></Link>
                                      </li>
                                      <li>
                                          <Link
                                            href="/legal/rules"><a>{t('menu-transaction_rules')}</a></Link>
                                      </li>
                                  </ul>
                              </div>
                          </Grid>
                      </Grid>
                  </Container>
              </div>
              <div className="footer-area-bottom">
                  <Container maxWidth="lg">
                      <Grid container justify="space-between">
                          <Grid item xs={12} sm={6} md={10}>
                              <p>&copy; 2017 SICURO.COM - All rights reserved.</p>
                          </Grid>
                          <Grid item xs={12} sm={6} md={2}>
                              <p>Powered by <a target="_blank" href="https://www.exagonlab.com">Exagon</a></p>
                          </Grid>
                      </Grid>
                  </Container>
              </div>
          </footer>
      </div>
    )
}

export default  withTranslation('common')( MainLayout);
