import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authSuccess } from '../app/auth/authSlice';
import { useLoginMutation } from '../app/auth/authApi';

import '../css/App.css';
import '../css/Login.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';
import facebook from '../img/facebook-logo.svg';
import google from '../img/google-logo.png';
import microsoft from '../img/microsoft-logo.svg';

function Login() {

    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
    const userRef = useRef();
    const errorRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await loginMutation({ email, password }).unwrap();
            dispatch(authSuccess({ ...data }));
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err.response) { setErrorMessage('Erro de conexão!'); }

            switch (err.response?.status) {
                case 401:
                    setErrorMessage('Usuário ou senha inválidos!');
                    break;
                case 403:
                    setErrorMessage('Usuário não autorizado!');
                    break;
                case 404:
                    setErrorMessage('Usuário não encontrado!');
                    break;
                case 500:
                    setErrorMessage('Erro interno!');
                    break;
                default:
                    setErrorMessage('Falha ao realizar login!');
                    break;
            }
            if (errorRef.current) { errorRef.current.focus(); }
        }
    };

    return (
        <div className="container">
            <div className="container-login" style={{ backgroundImage: 'url(/img/background.jpg)' }}>
                <div className="wrap-login">
                    <form className="login-form validate-form" onSubmit={handleSubmit}>
                        <span className="login-form-logo">
                            <i className="zmdi zmdi-landscape"></i>
                        </span>

                        <span className="login-form-title">
                            Login
                        </span>

                        <div className="social-button">
                            <a href="#" className="google-btn">
                                <img src={google} alt="Google" />
                            </a>
                            <a href="#" className="facebook-btn">
                                <img src={facebook} alt="Facebook" />
                            </a>
                            <a href="#" className="microsoft-btn">
                                <img src={microsoft} alt="Microsoft" />
                            </a>
                        </div>
                        <div className="divider">
                            <span className="divider-text">OU</span>
                        </div>

                        <div className="wrap-input validate-input">
                            <input className="input" type="text" name="email" placeholder="Usuário" ref={userRef} value={email} onChange={(event) => setEmail(event.target.value)} />
                            <span className="focus-input" data-placeholder="&#xf207;"></span>
                        </div>

                        <div className="wrap-input validate-input">
                            <input className="input" type="password" name="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <span className="focus-input" data-placeholder="&#xf191;"></span>
                        </div>

                        <div className="contact-form-checkbox">
                            <input className="input-checkbox" id="ckb1" type="checkbox" />
                            <label className="label-checkbox" htmlFor="ckb1">
                                Lembrar
                            </label>
                        </div>

                        {/* Error Message */}
                        {errorMessage && <div className="error-message" ref={errorRef}>{errorMessage}</div>}

                        {/* Loading */}
                        {isLoading && <div className="loading">Carregando...</div>}

                        <div className="container-login-form-btn">
                            <button type="submit" className="login-form-btn">
                                Login
                            </button>
                        </div>

                        <div className="text-center">
                            <a className="txt1" href="#">
                                Esqueci minha senha
                            </a>
                            <br />
                            <a className="txt1" href="/cadastro">
                                Ainda não tem uma conta? Cadastre-se
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
