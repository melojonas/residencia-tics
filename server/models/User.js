/* Modelo de usuário */

class Usuario {
  constructor(funcao, nome, email, senha) {
    this.funcao = funcao;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = new Date();
    this.ativo = true;
  }

  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
  }
}

module.exports = User;