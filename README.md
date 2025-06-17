# 📊 I2A2 - Agentes Autônomos para Análise de Notas Fiscais (CSV)

Projeto desenvolvido no âmbito do **Grupo de Estudos do I2A2 - Institut d'Intelligence Artificielle Appliquée**, com o objetivo de aplicar agentes autônomos e IA generativa para a análise de dados estruturados em arquivos CSV (Notas Fiscais - Cabeçalho e Itens).

## 👥 Integrantes do Grupo

* Kleber da Silva Santos
* Rafael Ataide
* Jose Tadeu Daher
* Henry Trindade

## 🧰 Tecnologias e Ferramentas

* **[n8n](https://n8n.io/)** — Plataforma low-code para automação de fluxos
* **PostgreSQL** — Armazenamento dos dados estruturados
* **OpenAI (GPT-4)** — Geração de queries SQL e respostas humanizadas
* **Node.js (Express)** — Servidor intermediário de API
* **React + Vite** — Interface de chatbot para o usuário

## 🧠 Arquitetura da Solução

### 🧩 Agente 1 - Ingestão e Armazenamento

1. **Upload de Arquivos CSV** (Compactados)
2. **Descompactação e Classificação** dos arquivos em "Cabeçalho" e "Itens"
3. **Parse e Inserção** dos dados em duas tabelas do PostgreSQL:

   * `nfs_cabecalho`
   * `nfs_itens`

### 🧩 Agente 2 - Atendimento via IA

1. Criação de **Webhook HTTP** para receber perguntas do usuário:

   ```json
   {
     "sessionId": "usuario123",
     "content": "Qual o total de notas emitidas?"
   }
   ```

2. Pipeline de dois agentes IA:

   * **Agente SQL**: Traduz a pergunta em uma query SQL (usando metadados das tabelas)
   * **Agente Executor**: Executa a query, retorna dados brutos, e os apresenta de forma amigável ao usuário

## 🗃️ Estrutura do Banco de Dados

### Tabela: `nfs_cabecalho`

| Coluna                            | Tipo          | Descrição                          |
| --------------------------------- | ------------- | ---------------------------------- |
| chave\_acesso                     | VARCHAR(44)   | Chave primária da nota fiscal      |
| modelo                            | TEXT          | Modelo da nota fiscal              |
| serie                             | TEXT          | Série da nota fiscal               |
| numero                            | TEXT          | Número da nota fiscal              |
| natureza\_operacao                | TEXT          | Natureza da operação               |
| data\_emissao                     | TIMESTAMP     | Data de emissão da nota            |
| evento\_mais\_recente             | TEXT          | Último evento da nota              |
| data\_hora\_evento\_mais\_recente | TIMESTAMP     | Data/hora do último evento         |
| cpf\_cnpj\_emitente               | VARCHAR(14)   | CPF ou CNPJ do emitente            |
| razao\_social\_emitente           | TEXT          | Razão social do emitente           |
| inscricao\_estadual\_emitente     | TEXT          | Inscrição estadual do emitente     |
| uf\_emitente                      | CHAR(2)       | Unidade federativa do emitente     |
| municipio\_emitente               | TEXT          | Município do emitente              |
| cnpj\_destinatario                | VARCHAR(14)   | CNPJ do destinatário               |
| nome\_destinatario                | TEXT          | Nome do destinatário               |
| uf\_destinatario                  | CHAR(2)       | Unidade federativa do destinatário |
| indicador\_ie\_destinatario       | TEXT          | Indicador IE do destinatário       |
| destino\_operacao                 | TEXT          | Destino da operação                |
| consumidor\_final                 | TEXT          | Indicador de consumidor final      |
| presenca\_comprador               | TEXT          | Tipo de presença do comprador      |
| valor\_nota\_fiscal               | NUMERIC(15,2) | Valor total da nota fiscal         |

### Tabela: `nfs_itens`

| Coluna                        | Tipo          | Descrição                              |
| ----------------------------- | ------------- | -------------------------------------- |
| chave\_acesso                 | VARCHAR(44)   | Chave estrangeira para `nfs_cabecalho` |
| modelo                        | TEXT          | Modelo da nota fiscal                  |
| serie                         | TEXT          | Série da nota fiscal                   |
| numero                        | TEXT          | Número da nota fiscal                  |
| natureza\_operacao            | TEXT          | Natureza da operação                   |
| data\_emissao                 | TIMESTAMP     | Data de emissão                        |
| cpf\_cnpj\_emitente           | VARCHAR(14)   | CPF/CNPJ do emitente                   |
| razao\_social\_emitente       | TEXT          | Razão social do emitente               |
| inscricao\_estadual\_emitente | TEXT          | Inscrição estadual do emitente         |
| uf\_emitente                  | CHAR(2)       | UF do emitente                         |
| municipio\_emitente           | TEXT          | Município do emitente                  |
| cnpj\_destinatario            | VARCHAR(14)   | CNPJ do destinatário                   |
| nome\_destinatario            | TEXT          | Nome do destinatário                   |
| uf\_destinatario              | CHAR(2)       | UF do destinatário                     |
| indicador\_ie\_destinatario   | TEXT          | Indicador IE do destinatário           |
| destino\_operacao             | TEXT          | Destino da operação                    |
| consumidor\_final             | TEXT          | Indicador de consumidor final          |
| presenca\_comprador           | TEXT          | Tipo de presença do comprador          |
| numero\_produto               | TEXT          | Número do produto                      |
| descricao\_produto\_servico   | TEXT          | Descrição do produto ou serviço        |
| codigo\_ncm\_sh               | TEXT          | Código NCM do produto                  |
| tipo\_ncm\_sh                 | TEXT          | Tipo de NCM                            |
| cfop                          | TEXT          | Código CFOP                            |
| quantidade                    | NUMERIC(10,2) | Quantidade comprada                    |
| unidade                       | TEXT          | Unidade de medida                      |
| valor\_unitario               | NUMERIC(15,4) | Valor unitário                         |
| valor\_total                  | NUMERIC(15,2) | Valor total do item                    |

## 💬 Exemplos de Perguntas

* Quantas notas estão cadastradas no sistema?
* Temos diferenças entre valores declarados e somados?
* Qual nota possui o maior valor?
* Qual fornecedor possui mais notas emitidas?

## 🔁 Fluxo Resumido

```text
Usuário → Chatbot (React) → API (Express) → Webhook (n8n)
           ↓                                ↓
         Pergunta                      Geração de Query SQL
           ↓                                ↓
       Exibição                          Execução SQL
           ↑                                ↓
        Resposta Humanizada ← Resposta da Query
```

## 🚀 Como Executar Localmente

1. Suba uma instância do PostgreSQL com as tabelas `nfs_cabecalho` e `nfs_itens`
2. Configure e instale o [n8n](https://docs.n8n.io/)
3. Importe os fluxos de ingestão e atendimento IA
4. Suba o backend Express (`server.js`) com roteamento para o webhook
5. Inicie a aplicação React com Vite (`npm run dev`)
6. Realize chamadas ao Chatbot ou à API via Postman
