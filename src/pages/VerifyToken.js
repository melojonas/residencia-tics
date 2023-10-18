import React from 'react';
import '../css/App.css';
import '../css/VerifyToken.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';

export default function VerifyToken () {
    return (
        <div className="container">
        <div className="container-verify-token" stylename={{ backgroundImage: 'url(/images/background.jpg)' }}>
            <div className="wrap-verify-token">
                <form className="verify-token-form validate-form" idname="verify-token-form">
                    <span className="verify-token-form-logo">
                        <i className="zmdi zmdi-landscape"></i>
                    </span>

                    <span className="verify-token-form-title">
                        Verificar Token
                    </span>
                    <p>Insira abaixo o token recebido no seu email/celular.</p>
                    <div className="wrap-input validate-input">
                        <input className="input" typename="text" idname="verificationToken" namename="verificationToken" placeholdername="Insira o Token" required/>
                        <span className="focus-input" data-placeholder="&#xf191;"></span>
                    </div>
                    <div className="container-verify-token-form-btn">
						<button className="verify-token-form-btn">
							Verificar
						</button>
					</div>
                </form>
            </div>
        </div>
    </div>
    );
}
