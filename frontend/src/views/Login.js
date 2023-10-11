import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import '../css/Login.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';
import facebook from '../img/facebook-logo.svg';
import google from '../img/google-logo.png';
import microsoft from '../img/microsoft-logo.svg';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

function Login() {
    
    const navigate = useNavigate()

    const [email, SetNewEmail] = useState('');
    const [password, SetNewPw] = useState('');

    function LoginUsuario(){
        api.post("http://localhost:8080/auth/login", {
          email,
          password
    }).then((response) => { let dados = response.data; 
        console.log(response.data);
        localStorage.setItem('nome', `${dados.user.name}`);
        localStorage.setItem('email', `${dados.user.email}`);  
        navigate('/Home')})
        .catch((error) =>{console.log(error)})};

    return (
        <div className="container">
            <div className="container-login" style={{ backgroundImage: 'url(/img/background.jpg)' }}>
                <div className="wrap-login">
                    <form className="login-form validate-form" method="POST" action="http://localhost:3000/">
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
                            <input className="input" type="text" name="email" placeholder="Usuário" onChange={(event) => SetNewEmail(event.target.value)} />
                            <span className="focus-input" data-placeholder="&#xf207;"></span>
                        </div>

                        <div className="wrap-input validate-input">
                            <input className="input" type="password" name="password" placeholder="Senha" onChange={(event) => SetNewPw(event.target.value)} />
                            <span className="focus-input" data-placeholder="&#xf191;"></span>
                        </div>

                        <div className="contact-form-checkbox">
                            <input className="input-checkbox" id="ckb1" type="checkbox" />
                            <label className="label-checkbox" htmlFor="ckb1">
                                Lembrar
                            </label>
                        </div>

                        <div className="container-login-form-btn">
                            <button type="button" onClick={LoginUsuario} className="login-form-btn">
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
