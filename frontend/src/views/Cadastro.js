import axios from 'axios';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/App.css';
import '../css/Cadastro.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../fonts/iconic/css/material-design-iconic-font.min.css';
import facebook from '../img/facebook-logo.svg';
import google from '../img/google-logo.png';
import microsoft from '../img/microsoft-logo.svg';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth'
});



function Cadastro() {

    const [email, SetNewEmail] = useState('');
    const [password, SetNewPw] = useState('');


async function CriarUsuario(){
       await api.post("http://localhost:8080/auth/cadastro", {
         email,
         password
}).then((response) => {console.log(response)}).catch((error) =>{console.log(error)})};


    return (
        <div className="container">
            <div className="container-cadastro" style={{ backgroundImage: 'url(/img/background.jpg)' }}>
                <div className="wrap-cadastro">
                    <form className="cadastro-form validate-form" method="POST" action="http://localhost:8080/auth/cadastro">
                        <span className="cadastro-form-logo">
                            <i className="zmdi zmdi-landscape"></i>
                        </span>

                        <span className="cadastro-form-title">
                            Cadastro
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
                            <input className="input" type="email" name="email" placeholder="Usuário" onChange= {event => SetNewEmail(event.target.value)}/>
                            <span className="focus-input" data-placeholder="&#xf207;"></span>
                        </div>

                        <div className="wrap-input validate-input">
                            <input className="input" type="password" name="password" placeholder="Senha" onChange= {event => SetNewPw(event.target.value)} />
                            <span className="focus-input" data-placeholder="&#xf191;"></span>
                        </div>

                        <div className="container-cadastro-form-btn">
                            <button onClick={CriarUsuario()} className="cadastro-form-btn">
                                Cadastrar
                            </button>
                        </div>

                        <div className="text-center">
                            <a className="txt1">
                                <Link to="/Login">Já tem uma conta? Faça o login.</Link>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Cadastro;
