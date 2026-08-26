# Barber Shop API

API REST para gerenciamento de agendamentos de barbearia, com autenticação de barbeiros e modelagem relacional entre clientes, barbeiros, serviços e agendamentos.

## Tecnologias

Node.js · Express · Sequelize · MySQL · bcrypt · JWT

## Modelagem

```
Cliente  (1) → hasMany → Agendamento (N)
Barbeiro (1) → hasMany → Agendamento (N)
Serviço  (1) → hasMany → Agendamento (N)
```

Cada agendamento está vinculado a um cliente, um barbeiro e um serviço específicos, através das chaves estrangeiras `clienteId`, `barbeiroId` e `servicoId`.

## Funcionalidades

- Cadastro de barbeiros, clientes e serviços
- Autenticação de barbeiros via JWT
- Criação de agendamentos, com validação de conflito de horário por barbeiro
- Área do barbeiro: acesso restrito aos próprios agendamentos, via token
- Cancelamento de agendamento (soft delete via campo `status`)

## Rotas da API

| Método | Rota | Descrição | Protegida |
|--------|------|-----------|-----------|
| POST | `/barbeiro` | Cadastra um novo barbeiro | Não |
| POST | `/login` | Autentica um barbeiro e retorna um token JWT | Não |
| GET | `/barbeiro` | Lista todos os barbeiros | Não |
| POST | `/cliente` | Cadastra um novo cliente | Não |
| GET | `/cliente` | Lista todos os clientes | Não |
| POST | `/servico` | Cadastra um novo serviço | Não |
| GET | `/servico` | Lista todos os serviços | Não |
| POST | `/agendamento` | Cria um novo agendamento | Não |
| GET | `/agendamento` | Lista todos os agendamentos | Não |
| GET | `/agendamento/barbeiro` | Lista os agendamentos do barbeiro autenticado | Sim |
| PATCH | `/agendamento/status/:id` | Atualiza o status de um agendamento (ex.: cancelamento) | Não |

## Exemplo de requisição — Login do barbeiro

```
POST /login
{
  "email": "barbeiro@teste.com",
  "senha": "123456"
}
```

Resposta:
```json
{
  "message": "Você está conectado",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "barbeiroId": 1
}
```

## Exemplo de requisição — Criar agendamento

```
POST /agendamento
{
  "hora": "14:00",
  "data": "15/09/2026",
  "clienteId": 1,
  "barbeiroId": 1,
  "servicoId": 1
}
```

## Exemplo de requisição — Meus agendamentos (rota protegida)

```
GET /agendamento/barbeiro
Authorization: Bearer <token>
```

## Validações

- Campos obrigatórios em todos os cadastros
- Formato de horário (`HH:MM`) e data (`DD/MM/AAAA`) via regex
- Validação de número de WhatsApp do cliente
- Verificação de existência de cliente, barbeiro e serviço antes de criar um agendamento
- Bloqueio de conflito de agendamento (mesmo barbeiro, mesma data e hora)
- Verificação de e-mail duplicado no cadastro de barbeiro

## Segurança

- Senhas de barbeiros armazenadas com hash via bcrypt
- Autenticação via JWT
- Middleware de verificação de token protege a rota de agendamentos do barbeiro autenticado, garantindo que cada barbeiro veja apenas os próprios dados

## Autor

Marcelo Ursulino
