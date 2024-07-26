# Boas vindas ao repositório do Trybe Futebol Clube!

<details>
<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No desenvolvimento do `TFC`, desenvolvi uma API (utilizando o método `TDD`) e também integrei *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Meu desenvolvimento **respeitou regras de negócio** providas e **minha API é capaz de ser consumida por um front-end**.

  O meu back-end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

</details>

<details>
<summary><strong>🏟️ Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3306` do `localhost`;

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
 - O `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;


3️⃣ **Front-end:**
  - O front se comunica com serviço de back-end pela url `http://localhost:3001`.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;

</details>

# Orientações

<details>
<summary><strong> ⚠️ Inicialização do compose </strong></summary><br />

 #### ⚠️ **Inicie seu `docker-compose` antes de testar localmente!** ⚠️

  Os testes vão utilizar a sua aplicação do compose para fazer as validações, portanto **é essencial que ela esteja funcionando corretamente** para que os testes passem!

  - Para isso, garanta que as aplicações, tanto do back, quanto do front-end, possuem arquivos `Dockerfile` válidos;
  - Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, para facilitar a execução do seu *compose*.

</details>

<details id='criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar as senhas no banco de dados é a [bcryptjs npm](https://github.com/dcodeIO/bcrypt.js) ⚠️

</details>


<details id="informacoes-uteis">
  <summary><strong> 👀 Informações úteis </strong></summary><br />

  - Ao inicializar um Workspace na raiz do projeto, podem surgir alguns erros no TypeScript. Para garantir que o editor sincronize corretamente as configurações do `tsconfig.json`, é necessário iniciar um novo Workspace dentro do diretório `backend`. Sempre verifique se está utilizando o Workspace correto no VSCode quando algum erro de configuração do TypeScript for apresentado.

  - Ao rodar o comando `npm install` na pasta raiz do projeto você estará **instalando somente as dependências para rodar os requisitos do projeto**;
  - Cada diretório (frontend e backend) possui suas próprias dependências - você pode instalá-las de forma rápida rodando o comando `npm run install:apps` na pasta raiz do projeto, ou rodando `npm install` dentro de cada diretório;

</details>
