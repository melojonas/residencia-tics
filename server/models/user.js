/* Modelo de usuário */

const users = [
    { id: 1, username: 'user', password: 'password' } // TODO: Atualizar quando tiver a tabela de usuários
];
  
module.exports = {
    findByUsername: function(username) {
      return users.find(user => user.username === username);
    },
    findById: function(id) {
      return users.find(user => user.id === id);
    }
};