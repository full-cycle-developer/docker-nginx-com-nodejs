# Módulo: Docker
## Atividade: Nginx com Node.js

O presente exercício é relacionado ao desenvolvimento de um proxy reverso, usando Docker, a linguagem de programação Node.js e Nginx. Segue as instruções para a realização do exercício:

1. Utilizar o nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em uma aplicação Node.js. Essa aplicação por sua vez adicionará um registro em um banco de dados Mysql, cadastrando um nome na tabela "people".

2. O retorno da aplicação Node.js para o nginx deverá ser:

```html
<h1>Full Cycle Rocks!</h1>
```

3. Gere o docker-compose de uma forma que basta apenas rodar que tudo deverá estar funcionando e disponível na porta: 8080.

## Solução

O presente projeto foi contruído para atender o requisito do desafio proposto. A seguir é explicada cada parte do repositório e é discutido brevemente como elas se integram para cumprir o objetivo.

*app/Dockerfile*
- Baseia-se na imagem node:latest;
- Configura o diretório de trabalho;
- Copia package*.json e instala as dependências;
- Expõe a porta 3000;
- O comando CMD inicia o servidor Node.js;

*app/package.json*
- Define `express` e `mysql` como dependências, necessárias para a aplicação web e a conexão com o MySQL;
- A chave `start` inicia o servidor Node.js;

*app/server.js*
- Cria uma aplicação Express;
- Estabelece conexão com o MySQL;
- No endpoint '/', insere um nome na tabela people e retorna a mensagem ```<h1>Full Cycle Rocks!</h1>```;
- Está ouvindo na porta 3000;

*mysql/initdb.sql*
- Cria o banco de dados e a tabela people;

*nginx/Dockerfile*
- Baseia-se na imagem `nginx:latest`;
- Remove a configuração padrão e copia a nova configuração do Nginx;

*nginx/nginx.conf*
- Configura o Nginx para ouvir na porta 80 e faz o proxy para app:3000;

*docker-compose.yml*
- Define três serviços: `db` (MySQL), `app` (Node.js), e `nginx`;
- Configura volumes, variáveis de ambiente, dependências, e reinício automático;
- O serviço `nginx` mapeia a porta 8080 do host para a porta 80 do contêiner, tornando a aplicação acessível externamente na porta 8080;

Em resumo:
- O Nginx atua como proxy reverso, redirecionando as solicitações para a aplicação Node.js;
- A aplicação Node.js insere um registro no MySQL e retorna a mensagem especificada;
- O Docker Compose orquestra os contêineres para que tudo funcione de forma integrada;

Para instalação, executar no terminal:

```shell
$ docker-compose up -d
```

Na sequência executar no terminal:

```shell
$ curl http://localhost:8080
```

É esperado o seguinte retorno:

```
<h1>Full Cycle Rocks!</h1>
```



