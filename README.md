# TaskFlow — Organizador de Tarefas 📋

> Aplicação web kanban para estudantes gerenciarem tarefas com alertas automáticos de feriados nacionais.

🔗 **[Acesse o deploy aqui → SUA_URL_AQUI](https://luizsoares-pixel.github.io/taskflow)**

---

## Sobre o Projeto

O TaskFlow resolve um problema real: estudantes que perdem prazos por falta de organização. Com uma interface kanban visual e simples, o usuário cadastra tarefas com título, descrição, prioridade e prazo — e é alertado automaticamente quando o prazo cai em um **feriado nacional**.

## Funcionalidades

- ✅ Cadastro de tarefas com título, descrição, prioridade e prazo
- ✅ Board kanban: Pendente → Em andamento → Concluída
- ✅ Filtros por status e prioridade
- ✅ Edição e exclusão de tarefas
- ✅ **Alerta automático de feriados nacionais** via BrasilAPI
- ✅ Persistência de dados via localStorage
- ✅ Notificações toast de feedback

## Integração com API Pública

A aplicação consome a **[BrasilAPI](https://brasilapi.com.br/api/feriados/v1)** — uma API pública e gratuita mantida pela comunidade brasileira.

```
GET https://brasilapi.com.br/api/feriados/v1/{ano}
```

Ao adicionar ou editar uma tarefa com prazo, a aplicação consulta a API e exibe um banner de aviso no cartão caso a data seja um feriado nacional.

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Interface | HTML5, CSS3, JavaScript (Vanilla) |
| API | BrasilAPI — Feriados Nacionais |
| Testes | Jest + node-fetch |
| Linting | ESLint |
| CI/CD | GitHub Actions |
| Deploy | GitHub Pages |

## Como Rodar Localmente

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone https://github.com/luizsoares-pixel/taskflow.git
cd taskflow

# Instale as dependências
npm install

# Abra a aplicação (basta abrir o arquivo no navegador)
open index.html
# ou no Windows:
start index.html
```

## Como Rodar os Testes

```bash
# Todos os testes
npm test

# Apenas o teste de integração
npx jest api.integration.test.js --verbose
```

## Estrutura do Projeto

```
taskflow/
├── index.html                  # Aplicação completa (HTML + CSS + JS)
├── api.integration.test.js     # Teste de integração — BrasilAPI
├── package.json
├── .eslintrc.json
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline de CI
└── README.md
```

## Pipeline de CI

O GitHub Actions executa automaticamente a cada push:
1. Lint com ESLint
2. Testes unitários e de integração com Jest

## Autor

**Luiz Eduardo Dos Santos Soares** — Bootcamp 2
