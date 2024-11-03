# 🌱 API Natureza365 

A Natureza365 é uma API REST que permite aos usuários explorar e contribuir para a
preservação da natureza, fornecendo acesso a informações sobre áreas naturais, trilhas,
parques ecológicos, reservas ambientais e outros locais de interesse para os amantes da
natureza. 

A API está integrada com um projeto de Front-end, que pode ser visualizado na página
[🌐 https://naturefinder.vercel.app](https://naturefinder.vercel.app).

Os usuários podem cadastrar novos usuários, cadastrar (listar, editar e deletar) locais,
visualizar informações dos locais, entre outras funcionalidades.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Para acessar a API Natureza365 você precisará dos seguintes componentes:

1. Um terminal de acesso ou aplicativo de manipulação de códigos (sugestão: `Visual Studio Code`)
2. Um programa para gerenciamento de banco de dados (sugestão: `Postgres`)
3. Para consulta à documentação das requisições feitas pela API você pode utilizar:
   - Um navegador web, através da biblioteca `Swagger` (📖)
   - Uma aplicação específica para este tipo de consulta (sugestão: `Postman` (📬))
4. **Docker** (🐳) e **Docker Compose** (📦) para containerização da aplicação

### 🔧 Instalação e execução

Após a importação do repositório da API Natureza365 você deverá seguir estes passos para rodar a aplicação:

1. No `Terminal`: Digitar `npm install` (neste momento, você estará importando as bibliotecas utilizadas na aplicação)
2. No `Terminal`: Digitar `cp .env_example .env` (neste passo, você precisará criar um arquivo com informações de segurança, para acessos ao banco de dados)
3. No `Postgres`: Gerar o banco de dados `natureza365` em um gerenciador de SQL (utilizado Postgres)
   3.1: Se atente aos seus dados de login e senha no arquivo .env
4. No `Terminal`: Gerar as migrações das tabelas: `sequelize db:migrate`
5. No `Terminal`: Gerar as migrações das seeders: `sequelize db:seed:all`
6. No `Terminal`: Digite `npm run start:dev` para iniciar o servidor
7. Em um navegador web digite `http://localhost:3000/docs` para consulta à documentação da API via Swagger.

### 🌊 Executando com Docker

Para executar a aplicação utilizando Docker, você pode usar o `docker-compose`. Siga os passos abaixo:

1. Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.
2. No terminal, execute `docker-compose up` para iniciar os containers.

Isso criará e executará a aplicação, além de iniciar um banco de dados PostgreSQL em um container.

## O que foi realizado no projeto

- **Criação de Banco de Dados Relacional**: Implementação do banco de dados PostgreSQL para armazenar dados de usuários e locais.
- **Autenticação**: Implementação de autenticação de usuários utilizando `JsonWebToken` (🔑).
- **Documentação da API**: Documentação das rotas da API utilizando `Swagger` (📖).
- **Deploy na Cloud**: A aplicação foi implantada utilizando o **Render** (☁️), permitindo que usuários acessem a API remotamente, e está integrada com um Front-end, acessível em [🌐 https://naturefinder.vercel.app](https://naturefinder.vercel.app).

## 🛠️ Construído com

* [Node](https://nodejs.org/en) (🌐) - Plataforma para interpretação do Javascript
* [Express](https://expressjs.com/) (🕸️) - O framework web usado
* [Sequelize](https://sequelize.org/docs/v6/getting-started/) (📦) - ORM para SQL
* [PostgreSQL](https://www.postgresql.org/) (🗄️) - Gerenciador de banco de dados
* [Dotenv](https://www.npmjs.com/package/dotenv) (🔒) - Gerenciador de variáveis de ambiente
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) (🔑) - Gerador de token para dados pessoais
* [Bcrypt](https://www.npmjs.com/package/bcrypt) (🔒) - Gerador de criptografia
* [Swagger](https://www.npmjs.com/package/swagger-ui-express) (📖) - Biblioteca para modelagem da API
* [Docker](https://www.docker.com/) (🐳) - Containerização da aplicação
* [Docker Compose](https://docs.docker.com/compose/) (📦) - Gerenciamento de containers

## Melhorias para futuras versões

1. Criação de uma tabela para endereço do usuário, com dados precisos.
2. Restringir as consultas de CEP ou coordenadas à locais da natureza.
3. Gerar mais campos para exibição de fotos, vídeos e outros detalhes de cada local.
4. Mostrar Locais da Natureza próximo à sua localização.

## 📌 Versão

Para o versionamento da API Natureza365 foi utilizado um gitflow através do GITHUB (https://github.com/). Toda a estrutura do versionamento foi realizada através de:

1. Branch Master, criada inicialmente com a estrutura inicial do servidor;
2. Branch Develop, criada como cópia inicial da branch Master, que recebeu todas as features criadas durante o projeto;
3. Branches de features, geradas com raiz na branch develop.
4. O teste final da API Natureza365 foi realizado na branch develop antes de migrar para a Branch Master.

## Vídeo com a apresentação do projeto

O vídeo com apresentação do projeto pode ser visualizado em [🎥 Video de Apresentação](https://drive.google.com/file/d/1KSJEAI38H6RW2NEM8UkWCLlCSUrwlAwh/view?usp=drive_link)

Para gerenciamento do projeto foi utilizado o aplicativo Trello (🗓️) (https://trello.com/), onde foram criados stickers para cada ponto definido projeto, com algumas correções incluídas posteriormente.

## Notas sobre o Projeto Natureza365

O projeto foi criado a partir da avaliação final do Módulo 1 do curso FuturoDEV - Back-end, organizado pelo Senai/SC com apoio da prefeitura de Florianópolis, nomeado `Floripa Mais Tec` (🌆) (https://floripamaistec.pmf.sc.gov.br/).
Durante o decorrer do módulo, aprendemos os conceitos de Javascript e seguimos para a construção de um banco de dados, através do Node Express.

## ✒️ Autores

Este projeto foi realizado por [Diego Campos](https://github.com/diegocmps)

## 🎁 Agradecimentos

* Equipe do `LAB3365 - Floripa Mais Tec` (tanto à equipe do Senai quanto à Prefeitura de Florianópolis) pela oportunidade de realizar o módulo 1 do curso FuturoDEV.
* Equipe de professores que conduziram o módulo, tanto nos conceitos de javascript quanto nos conceitos de SQL.
* À minha esposa, Mariana, por me incentivar e também por estar presente no curso do Projeto `LAB365` em seu curso Fullstack.
* Aos alunos das turmas FuturoDEV TRIP e NATURE, pela parceria durante todo o tempo que passamos juntos durante o curso.
