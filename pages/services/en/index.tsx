import React from 'react'
import { Link } from "../../../i18n";

const IndexPage = () => (
    <React.Fragment>
        <div id="wrapper">
            <div className="box">
                <h3>sicuro.com ist eine Plattform, über die Sie in aller Sicherheit Online kaufen und verkaufen
                    können.</h3>
                <p>Durch die Vermittlungsrolle von sicuro.com können Sie Ihre Online-Geschäfte vor Betrugsgefahr
                    schützen.
                    Die Plattform von sicuro.com ist einfach und intuitiv, schon mit ein paar Klicks können Sie eine
                    Transaktion starten! </p>
                <div className="accordion" id="accordion2">
                    <div className="accordion-group">
                        <div className="accordion-heading">
                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapseOne">
                                <h3>Wie funktioniert das?</h3>
                            </a>
                        </div>
                        <div id="collapseOne" className="accordion-body collapse in">
                            <div className="accordion-inner">

                                <ol>
                                    <li>
                                        <section className="target">
                                            <h4>Käufer und Verkäufer unterzeichnen einen Vertrag</h4>
                                            <p>Mit ein paar Klicks und in 5 einfachen Schritten können unsere Benutzer
                                                einen
                                                Verkaufsvertrag abschliessen und eine neue Transaktion starten, indem
                                                sie
                                                den
                                                vereinbarten Preis und die zu versendende Ware angeben. Das
                                                Transaktionsverfahren ist für drei mögliche Transaktionsarten optimiert:
                                                Ware,
                                                Service oder Domain-Namen. </p>
                                        </section>
                                    </li>
                                    <li>
                                        <section  className="target">
                                            <h4>Der Käufer deponiert das Geld</h4>
                                            <p>Der Käufer deponiert das Geld Wenn beide Parteien den Verkaufsvertrag
                                                bestätigen,
                                                kann der Käufer den vereinbarten Betrag auf das Treuhandkonto
                                                (anwaltliches Anderkonto) des Partners von sicuro.com,
                                                Rechtsanwaltskanzlei
                                                Bernhard H. Jansen, überweisen. Die möglichen Zahlungsmethoden sind:
                                                Banküberweisung und PayPal (für mehr Informationen
                                                <Link  href="pricesAndFees"><a>hier</a></Link> klicken).
                                            </p>
                                        </section>
                                    </li>
                                    <li>
                                        <section className="target">
                                            <h4>Der Verkäufer sendet die Ware oder den Service.</h4>
                                            <p>
                                                Wenn sicuro.com den Erhalt des vereinbarten Betrags bestätigt, wird der
                                                Verkäufer aufgefordert, die Ware oder den Service zu liefern. Bei einer
                                                Warensendung ist es möglich (und ratsam), einen Tracking-Link für die
                                                Lieferung
                                                einzubeziehen, so dass beiden Partnern der Lieferungsstatus stets klar
                                                ist.
                                                Während für die Domain-Namen kann der Autorisierungscode direkt in die
                                                Systemsteuerung gespeichert werden.
                                            </p>
                                        </section>
                                    </li>
                                    <li>
                                        <section className="target">
                                            <h4>Der Käufer prüft und akzeptiert die Ware oder den Service. </h4>
                                            <p>
                                                Der Käufer kann jetzt die Ware erhalten und prüfen, ob sie einwandfrei
                                                ist
                                                oder
                                                ob der Service vereinbarungsgemäß geliefert worden ist. Erst dann kann
                                                der
                                                Käufer
                                                sicuro.com das Ok geben, die Zahlung zu Gunsten des Verkäufers
                                                vorzunehmen.
                                            </p>
                                        </section>
                                    </li>
                                    <li>
                                        <section className="target">
                                            <h4>sicuro.com bezahlt den Verkäufer </h4>
                                            <p>
                                                Erst nach dem Ok des Käufers, oder nachdem die zwischen den Parteien
                                                vereinbarte
                                                Prüfzeit abgelaufen ist, wird die Anwaltskanzlei Bernard H. Jansen dem
                                                Verkäufer
                                                den vereinbarten Betrag senden und die Transaktion positiv abschließen
                                                (für
                                                mehr
                                                Informationen über die Zahlungsbedingungen
                                                <Link  href="pricesAndFees"><a>hier</a></Link> klicken).
                                            </p>
                                        </section>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-group">
                        <div className="accordion-heading">
                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapseTwo">
                                <h3>Wieviel kostet sicuro.com?</h3>
                            </a>
                        </div>
                        <div id="collapseTwo" className="accordion-body collapse">
                            <div className="accordion-inner">
                                <p>
                                    sicuro.com erhält eine Gebühr gemäß des Transaktionsbetrags! Die Mindestgebühr
                                    beträgt
                                    20
                                    Euro! Die Gebühren schwanken zwischen 3% und 1,2% des Transaktionsbetrags.
                                    Auf der sicuro.com Website unten dem Link:
                                    <Link  href="pricesAndFees"><a>Preise und Gebühren</a></Link> klickenfinden Sie weitere
                                    Informationen und Details über die sicuro.com Gebühren, Zahlungsmodalitäten und
                                    Zusatzkosten
                                    für PayPal oder Auslandsüberweisungen.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-group">
                        <div className="accordion-heading">
                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapseThree">
                                <h3>Sicherer Domain-Transfer</h3>
                            </a>
                        </div>
                        <div id="collapseThree" className="accordion-body collapse">
                            <div className="accordion-inner">
                                <p>
                                    Eine besondere Transaktionsart, die Sie mit sicuro.com vornehmen können, ist
                                    die der Domain-Namen. Für die Übertragung von Domain-Namen sind einige technische
                                    Extra-Kompetenzen erforderlich und insbesondere wenn Domain-Namen mit ausländischer
                                    Erweiterung gekauft werden (zum Beispiel .es, .fr, .de ...). Aus diesem Grunde
                                    arbeitet
                                    sicuro.com zusammen mit <a href="http://www.namecase.com">Namecase GmbH</a>, um
                                    ihren
                                    Benutzern eine einfachere Transaktionsabwicklung zu garantieren.
                                </p>

                                <h4>Wie funktioniert die Zusammenarbeit?</h4>
                                <p>
                                    Wenn Sie bei der Transaktion einer Domain Hilfe brauchen, schreiben Sie eine E-mail
                                    an
                                    sicuro@namecase.com und geben Sie die Transaktionsnummer durch und die Namen der zu
                                    übertragenden Domains an. Innerhalb von 48 Stunden werden Sie von einem
                                    Transfer-Agent
                                    der <a href="http://www.namecase.com">Namecase GmbH</a> kontaktiert, der Ihnen bei
                                    der
                                    Transfer-Abwicklung behilflich sein wird. Zum Beispiel: die Transfer-Formulare
                                    ausfüllen
                                    oder die Registrar- und Trustee-Dienstleistungen empfehlen, die die
                                    Domain-Übertragung
                                    ermöglichen.
                                </p>

                                <h4>Wieviel kostet der Service von Namecase GmbH?</h4>
                                <p>
                                    Die Dienstleistung eines Transfer Agent von Namecase GmBH kostet 50 Euro je
                                    Transaktion.
                                    Wenn der Transaktionspreis über 3.000 Euro liegt, ist der Namecase-Service
                                    kostenlos!
                                </p>
                                <h4>sicuro.com und Namecase sind Partner im Brokerage- und Consulting-Geschäft.</h4>
                                <p>
                                    <a href="http://www.namecase.com">Namecase GmbH</a> bietet ihre Dienste bei dem Kauf
                                    der
                                    Domain-Namen an, empfehlt Ihnen für Ihr Geschäft geeignete Domain-Namen, hilft Ihnen
                                    bei
                                    der Aufstellung eines Budgets und leitet für Sie die Verhandlungen mit dem
                                    Verkäufer.
                                    Namecase und sicuro.com freuen sich Ihnen mitteilen zu können, dass die Übertragung
                                    der
                                    Domain-Namen und des Transaktionsbetrags von beiden Gesellschaften in Zusammenarbeit
                                    abgewickelt wird. Dadurch grantieren wir Ihnen eine ausgezeichnete Erfahrung sowie
                                    in
                                    der
                                    technischen Abwicklung des Domain-Transfers als auch in der treuhanderischen
                                    Übertragung
                                    des Transaktionsbetrags.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-group">
                        <div className="accordion-heading">
                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapseFour">
                                <h3>Verkaufen Sie Online?</h3>
                            </a>
                        </div>
                        <div id="collapseFour" className="accordion-body collapse">
                            <div className="accordion-inner">
                                <p>bietet ihre Dienste bei dem Kauf der Domain-Namen an, empfehlt Ihnen für Ihr Geschäft
                                    geeignete Domain-Namen, hilft Ihnen bei der Aufstellung eines Budgets und leitet für
                                    Sie die Verhandlungen mit dem Verkäufer. Namecase und sicuro.com freuen sich Ihnen
                                    mitteilen zu können, dass die Übertragung der Domain-Namen und des
                                    Transaktionsbetrags
                                    von beiden Gesellschaften in Zusammenarbeit abgewickelt wird. Dadurch grantieren wir
                                    Ihnen eine ausgezeichnete Erfahrung sowie in der technischen Abwicklung des
                                    Domain-Transfers als auch in der treuhanderischen Übertragung des
                                    Transaktionsbetrags.
                                </p>

                                <h4>Was passiert, wenn der Käufer etwas an Ihrer Ware oder Ihrem Service auszusetzen
                                    hat?</h4>
                                <p>
                                    Keine Sorge! Wir werden den Kunden bitten, uns sein Anliegen zu erklären.
                                    Wir werden Ihnen dann eine der folgenden Lösungen vorschlagen:
                                    <ul>
                                        <li>Rückgabe der Ware und Rückerstattung der Zahlung an den Käufer.</li>
                                        <li>Möglicher Rabatt auf den vereinbarten Preis.</li>
                                    </ul>
                                </p>

                                <h4>Kein Geschäft wird ohne Ihre ausdrückliche Einwilligung durchgeführt!</h4>
                                <p>
                                    Nur dann, wenn Sie anerkennen, dass die von Ihnen verkaufte Ware nicht der
                                    Vereinbarung
                                    mit
                                    dem Käfer übereinstimmt und nur dann, wenn Sie die Ware zurückerhalten haben,
                                    bekommt
                                    der
                                    Käufer das Geld zurückerstattet. Sollte der Käufer mit einem Vorwand versuchen, Sie
                                    zu
                                    betrügen, so wird ihm das nicht gelingen. Wie Sie sehen, schützt sicuro.com beide
                                    Parteien,
                                    Käufer und Verkäufer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-group">
                        <div className="accordion-heading">
                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2"
                               href="#collapseFive">
                                <h3>Kaufen Sie Online?</h3>
                            </a>
                        </div>
                        <div id="collapseFive" className="accordion-body collapse">
                            <div className="accordion-inner">
                                <p>
                                    Wollen Sie von einer Privatperson oder einer Firma einen Artikel kaufen, fühlen sich
                                    aber
                                    aus irgendeinem Grund nicht ausreichend garantiert? Versuchen Sie es mit sicuro.com!
                                    Nachdem Sie eine Transaktion einfach und mit ein paar Klicks gestartet haben, werden
                                    wir
                                    Sie bitten, die Zahlung auf unser Treuhandkonto zu überweisen. Wenn wir die Zahlung
                                    erhalten, werden wir den Verkäufer benachrichtigen und auffordern, um die Ware oder
                                    den
                                    Service zu liefern. Sie können die Ware oder den Service innerhalb der Prüfzeit, die
                                    Sie
                                    mit dem Verkäufer vorab vereinbart haben, überprüfen. Erst wenn Sie uns bestätigen,
                                    das
                                    alles in Ordnung ist oder, wenn wir innerhalb der Prüfzeit kein Feedback von Ihnen
                                    erhalten,
                                    erst dann werden wir dem Verkäufer die Zahlung senden. Sollte dann etwas nicht
                                    stimmen,
                                    können Sie sich mit ihm über eine der folgenden Lösungen einigen:
                                    <ul>
                                        <li>Rückgabe der Ware und Rückerstattung der Zahlung zu Ihren Gunsten.</li>
                                        <li>Möglicher Rabatt auf den vereinbarten Preis.</li>
                                    </ul>
                                </p>
                                <h4>Kein Geschäft wird stattfinden ohne Ihre ausdrückliche Einwilligung!</h4>
                                <p>
                                    Beachten Sie bitte, dass wir es als stillschweigende Zustimmung ansehen, wenn wir
                                    von
                                    Ihnen
                                    innerhalb der Prüfzeit, die Sie mit dem Verkäufer vorab vereinbart haben, keine
                                    Antwort
                                    erhalten. Beachten Sie bitte: wird die Transaktion abgebrochen oder Sie die
                                    Ware zurückversenden, bezahlen Sie unsere volle Transaktionsgebühr, auch wenn das
                                    zuvor
                                    anders vereinbart wurde. Trotz einer erfolglose Transaktion sind Sie durch unser
                                    Service
                                    geschützt und Sie erhalten Ihre Zahlung zurück.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default (IndexPage);