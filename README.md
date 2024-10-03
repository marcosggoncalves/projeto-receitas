Aqui está a versão ajustada para o "Projeto Receitas":

---

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

Para executar comandos específicos dentro do contêiner `receitas-backend-1`, siga estes passos:

1. Abra um terminal.
2. Execute o seguinte comando para acessar o terminal do contêiner `receitas-backend-1`:

```
   docker exec -it receitas-backend-1 /bin/bash
```

Isso abrirá um terminal dentro do contêiner.

3. Dentro do terminal do contêiner, execute os comandos desejados, como por exemplo:

```
  // node ace db:seed
  // node ace migration:run
```
Aqui está a seção apenas para iniciar o frontend:

---

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

Isso irá rodar o frontend em modo de desenvolvimento e permitir visualizar a aplicação no navegador.

## Observações

Certifique-se de ter as dependências necessárias instaladas, como Docker e Docker Compose, antes de tentar iniciar a aplicação.
