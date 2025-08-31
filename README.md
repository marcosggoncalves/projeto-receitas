## Iniciando a Aplicação

Para iniciar a aplicação, siga estes passos:

1. Abra um terminal.
2. Navegue até o diretório raiz do projeto.
3. Execute o seguinte comando para iniciar os contêineres Docker em segundo plano:

```
   docker-compose up -d
```

Isso iniciará todos os serviços necessários para a aplicação **Projeto Receitas**.

## Parando a Aplicação

Para parar a aplicação e desligar os contêineres Docker, siga estes passos:

1. Abra um terminal.
2. Navegue até o diretório raiz do projeto.
3. Execute o seguinte comando:

```
   docker-compose down
```

Isso desligará todos os contêineres Docker relacionados à aplicação **Projeto Receitas**.

## Executando Comandos Específicos

Para executar comandos específicos dentro do contêiner `backend-api-1`, siga estes passos:

1. Abra um terminal.
2. Execute o seguinte comando para acessar o terminal do contêiner `backend-api-1`:

```
   docker exec -it receitas-backend-1 /bin/bash
```

Isso abrirá um terminal dentro do contêiner.

3. Dentro do terminal do contêiner, execute os comandos desejados, como por exemplo:

```
  - node ace migration:run
  - node ace db:seed
```

## Iniciando o Frontend

1. Abra um terminal.
2. Navegue até a pasta do frontend (`frontend`).
3. Instale as dependências com o comando:

   ```bash
   npm install
   ```

4. Em seguida, inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

 ## Tela 1 - Login
![Painel da Aplicação - TELA 1](https://github.com/marcosggoncalves/projeto-receitas/blob/master/Prints/Login.png)

 ## Tela 2 - Cadastro 
![Painel da Aplicação - TELA 1](https://github.com/marcosggoncalves/projeto-receitas/blob/master/Prints/Cadastro.png)

 ## Tela 3 - Minhas Receitas 
![Painel da Aplicação - TELA 1](https://github.com/marcosggoncalves/projeto-receitas/blob/master/Prints/Painel.png)

 ## Tela 4 - Cadastrar Nova Receita
![Painel da Aplicação - TELA 1](https://github.com/marcosggoncalves/projeto-receitas/blob/master/Prints/Nova%20Receita.png)

 ## Tela 5 - Edita Cadastro
![Painel da Aplicação - TELA 1](https://github.com/marcosggoncalves/projeto-receitas/blob/master/Prints/Meu%20Cadastro.png)
