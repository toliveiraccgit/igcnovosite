import React from 'react';
import Banner from '../../assets/network.png'
import './network.scss'
import HowWorks from '../../components/HowWorks/HowWorks';
import Reviews from '../../components/Reviews/Review';

// import { Container } from './styles';

function Network() {
  return (
    <div className="networkContainer">
            <div className="bannerContainer">
                <img src={Banner} alt="" />
                <div className="bannerText">
                    <div className="theContainer">
                        <p className='partner'>parceiro igc</p>
                        <h2 className='bannerTitle'>o que é a igc network</h2>
                        <p className='description'>Nossa rede de parceiros que através de suas conexões e iniciativas indicam e acessam empresários para a igc partners.</p>
                    </div>
                </div>
            </div>

            {/* <div className="howWorks">
                <div className="theContainer">
                    <h3 className='howworks'>Como funciona nossa parceria?</h3>
                    <div className="how">
                        <HowWorks number={1} title={"Indicação"}/>
                        <HowWorks number={2} title={"Reunião"}/>
                        <HowWorks number={3} title={"Proposta comercial e discussão de contratos"}/>
                        <HowWorks number={4} title={"Contrato parceiro + IGC"}/>
                    </div>
                </div>
            </div> */}

            <div className="reviewsContainer">
                <div className="theContainer">
                    <p className='ourClients'>nossos clientes</p>
                    <div className="rev">
                        <Reviews />
                        <Reviews />
                        <Reviews />
                    </div>
                </div>
            </div>

            <div className="containerForm">
                <div className="theContainer">
                    <div className="leftContainer">
                        <h3>Faça parte da rede. Seja um parceiro igc</h3>
                        <p>Preencha o formulário ao lado ou envie um email para <span>felipe.petersen@igcp.com.br</span> e fale com nosso sócio</p>
                    </div>
                    <div className="form">
                            <form action="">
                                <div className="form1">
                                    <div className="form11">
                                        <label htmlFor="">Nome*</label>
                                        <input placeholder='Digite aqui' type="text" />
                                    </div>
                                    <div className="form11">
                                        <label htmlFor="">E-mail*</label>
                                        <input placeholder='Digite aqui' type="text" />
                                    </div>
                                </div>
                                <div className="form1">
                                    <div className="form11">
                                        <label htmlFor="">Telefone</label>
                                        <input placeholder='Digite aqui' type="text" />
                                    </div>
                                    <div className="form11">
                                        <label htmlFor="">CPF / CNPJ</label>
                                        <input placeholder='Digite aqui' type="text" />
                                    </div>
                                </div>
                                <div className="messageForm">
                                    <label className='messageLabel' htmlFor="">Mensagem*</label>    
                                    <input className='messageInput' type="text" />
                                </div>
                                <div className="buttonForm">
                                    <button>
                                        Enviar
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>


            </div>


            
    </div>
  );
}

export default Network;