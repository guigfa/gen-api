# Visão Geral
## Aplicação NestJS para a API de busca e cadastro de cursos e aulas para o Teste Técnico da GEN.

## Requisitos
- Docker
- DBeaver (ou outra ferramenta de administração de banco de dados SQL Server)
- IDE de sua preferência

## Configuração

### 1. Clone o projeto
- Execute os seguites comandos no seu terminal:
```
    git clone https://github.com/guigfa/gen-api.git
    cd gen-api
```

### 2. Subir o Banco de Dados
- Inicie os serviços do Docker executando o comando:

```
docker-compose up -d
```
- Isso iniciará o contêiner SQL Server em segundo plano.

### 3. Conectar ao Banco de Dados com o DBeaver

- Abra o DBeaver e clique em Nova Conexão (ou New Connection).
- Selecione SQL Server como o tipo de banco de dados e clique em Avançar (ou Next).
- Preencha os seguintes campos:
```
Host: localhost
Porta: 1543
Usuário: sa
Senha: StrongPass!
```

- Clique em Testar Conexão para garantir que a conexão está funcionando.
- Clique em Concluir (ou Finish) para salvar a conexão.

### 5. Subir a Aplicação NestJS

- Instale as dependências do projeto:

```
npm install
```

Para iniciar a aplicação, execute o comando:
```
npm run start
```

### A aplicação estará disponível em http://localhost:3000.