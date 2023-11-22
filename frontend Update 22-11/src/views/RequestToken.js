import '../css/App.css';
import '../css/RequestToken.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';

function RequestToken() {

    return (
        <div className="container">
            <div className="container-request-token" style={{ backgroundImage: 'url(/img/background.jpg)' }}>
                <div className="wrap-request-token">
                    <form className="request-token-form validate-form" id="request-token-form">
                        <span className="request-token-form-logo">
                            <i className="zmdi zmdi-landscape"></i>
                        </span>

                        <span className="request-token-form-title">
                            Solicitar Token de Verificação
                        </span>
                        <p>Por motivos de segurança, para realizar a troca da senha é necessário a validação de um token de segurança. Insira abaixo seu email ou número de celular para receber seu token.</p>
                        <div className="wrap-input validate-input">
                            <input className="input" type="text" id="emailOrPhone" name="emailOrPhone" placeholder="Insira seu email ou celular" required />
                            <span className="focus-input" data-placeholder="&#xf207;"></span>
                        </div>
                        <div className="container-request-token-form-btn">
                            <button className="request-token-form-btn">
                                Solicitar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RequestToken;
