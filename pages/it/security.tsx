import React from "react";
import {Link, Trans, withTranslation} from "../../i18n";
import PropTypes from "prop-types";

const SecurityPage = ({t}) => {
    return (
        <React.Fragment>
            <section className="inner-page-banner-area service-banner-background">
                <div className="container">
                    <div className="breadcrumbs-area">
                        <h1>Security</h1>
                        <ul>
                            <li><Link href="/index">Home</Link>
                                -
                            </li>
                            <li>Sicurezza</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="bg-accent s-space-layout7">
                <div className="container">
                    <div className="box-simple-text">
                        <p>Perché scegliere un servizio fiduciario online?</p>
                        <p>E' possibile trovare nella rete ottime offerte. Attraverso Internet siamo in grado di trovare e acquistare, con pochi clic, merci altrimenti introvabili o provenienti da ogni angolo del mondo. Grazie ad internet si abbattono i limiti geografici.</p><p>D'altra parte bisogna prestare molta attenzione quando si acquista online, soprattutto se si acquista su siti stranieri. I rischi di truffe sono infatti molto alti: dal phishing e furto di dati personali (come quelli della carta di credito) a invio di merci contraffatte o, semplicemente, al mancato invio della merce acquistata.</p><p>Grazie al servizio fiduciario fornito da sicuro.com in collaborazione con lo Studio Legale di Bernhard H. Jansen, l'acquisto via internet diventa sicuro e il rischio di truffe si riduce al minimo. Con pochi clic puoi avviare una transazione di acquisto che si fonda su facili step: sicuro.com fornisce un contratto di vendita, il tuo pagamento viene inviato sul conto fiduciario gestito dallo studio legale di Bernhard H. Jansen, che ti offre tutte le garanzie di tutela prescritte dalla legge tedesca, e solo dopo la ricezione del pagamento sicuro.com informerà il venditore di inviarti la merce. Quando avrai ricevuto la merce, avrai inoltre un tempo di ispezione che può essere concordato con il venditore e solo dopo che avrai verificato che la merce corrisponde alla descrizione che ti è stata fatta prima dell'acquisto sicuro.com invierà il tuo pagamento al venditore.</p><p>Per garantire la sicurezza e la massima riservatezza dei dati, il nostro sito utilizza software di crittografia SSL (a 256 bit). I dati bancari e qualsiasi altra informazione inserita dall'utente durante la compilazione dei moduli presenti sul sito vengono automaticamente crittografati e protetti in fase di trasmissione.</p>
                        <p>Per maggiori informazioni sulla sicurezza del nostro sito, contattaci all’indirizzo contact@sicuro.com.</p>
                    </div>
                </div>
            </section>
            <section className="s-space-default overlay-default banner-backgroung" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="text-center">
                                <h2 className="section-lg-title-light">
                                    <Trans>
                                        {t('banner-title')}
                                    </Trans>
                                </h2>
                                <p className="lead banner-para-light">{t('banner-description')}</p>
                                <a href="#" className="btn-ftf-rd-sm-p-dp">{t('contact-us')}</a></div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

SecurityPage.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SecurityPage)