# Sistema de Gerenciamento Escolar - README

Bem-vindo ao repositório do nosso sistema! Este documento irá guiá-lo nas políticas de contribuição. Sua contribuição é fundamental para o sucesso deste projeto, então vamos começar!

## Desenvolvimento Colaborativo no GitHub

Nós adotamos um fluxo de trabalho baseado no modelo de *branching* (ramificação) para facilitar o desenvolvimento colaborativo. O fluxo geral inclui os seguintes passos:

1. **Clone**: Clone este repositório para sua máquina local utilizando o comando:
```
git clone https://github.com/melojonas/residencia-tics.git
```

2. **Crie uma Branch**: Antes de começar a fazer alterações, crie uma nova branch a partir da branch `main` com um nome descritivo para a funcionalidade que você está trabalhando:
```
git checkout -b nome-da-minha-feature
```

3. **Desenvolva**: Faça as modificações necessárias no código, adicionando, modificando ou excluindo arquivos conforme necessário.

4. **Commits**: Após realizar suas alterações, faça commits de maneira atômica e descritiva. Isso ajuda a manter um histórico claro das mudanças. Utilize mensagens de commit significativas:
```
git commit -m "Adiciona recurso de login"
```
5. **Testes Locais**: Antes de enviar suas alterações, certifique-se de testar localmente para evitar que problemas sejam introduzidos no repositório.

6. **Push**: Envie suas alterações para o repositório remoto na sua branch:
```
git push origin nome-da-minha-feature
```

7. **Pull Request (PR)**: Abra um Pull Request detalhando as mudanças que você fez. Isso iniciará uma discussão sobre suas alterações, permitindo revisões por outros membros da equipe.

8. **Revisões e Discussões**: Outros membros da equipe irão revisar o seu código, fazer comentários e sugerir alterações. Este é um passo importante para garantir a qualidade do código.

9. **Testes e Integração**: O código no seu Pull Request será testado em um ambiente de integração para garantir que não afete negativamente o projeto como um todo.

10. **Implantação**: Uma vez que o Pull Request seja aprovado e todas as verificações estejam passando, suas alterações serão mescladas na branch `main` e o sistema será implantado em produção.

## Testes e Implantações

Priorizamos a qualidade do código e a estabilidade do sistema. Para garantir isso, seguimos estas práticas:

- **Testes Unitários**: Cada funcionalidade nova ou alterada deve ser acompanhada por testes unitários adequados para garantir seu funcionamento correto.

- **Testes de Integração**: Além dos testes unitários, também realizamos testes de integração para verificar a funcionalidade do sistema como um todo.

- **Ambiente de Testes**: Mantemos um ambiente de teste onde as alterações podem ser implantadas para testes mais amplos antes de serem implantadas em produção.

## Mantendo a Comunicação

Nós utilizamos as issues do GitHub para rastrear tarefas, bugs e melhorias. Sinta-se à vontade para abrir uma issue para qualquer questão que você encontrar no caminho.

Lembre-se, sua contribuição é valiosa para o sucesso deste projeto. Obrigado por ser parte da equipe!


**Grupo Manhattan**
