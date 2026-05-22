# Guia de Migração para Render

Este documento descreve como migrar a aplicação "Gestar com Trombofilia" de Vercel para Render.

## 📋 Pré-requisitos

- Conta no Render (https://render.com)
- Repositório GitHub com as alterações commitadas
- Acesso ao repositório no GitHub

## 🚀 Passo 1: Preparar o Repositório

### 1.1 Commit das Alterações

Todas as alterações para PostgreSQL já foram realizadas:

```bash
git add .
git commit -m "chore: migrate from MySQL to PostgreSQL for Render deployment"
git push origin main
```

### 1.2 Verificar Arquivos Criados

Confirme que os seguintes arquivos foram criados:

- ✅ `render.yaml` — Configuração do Render
- ✅ `.renderignore` — Arquivos a excluir
- ✅ Conversão MySQL → PostgreSQL concluída

## 🔧 Passo 2: Conectar GitHub ao Render

### 2.1 Acessar Render Dashboard

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** (canto superior direito)
3. Selecione **"Blueprint"**

### 2.2 Conectar Repositório GitHub

1. Clique em **"Connect a repository"**
2. Selecione sua conta GitHub
3. Autorize o Render a acessar seus repositórios
4. Selecione o repositório `gestar-trombofilia`
5. Clique em **"Connect"**

### 2.3 Selecionar Branch

1. Em **"Branch"**, selecione `main` (ou a branch com as alterações)
2. Clique em **"Deploy"**

## 📊 Passo 3: Configurar Variáveis de Ambiente

O Render lerá as variáveis do arquivo `render.yaml`, mas você pode precisar adicionar manualmente:

### 3.1 Variáveis Obrigatórias

No dashboard do Render, após o deploy inicial, acesse **Settings** → **Environment**:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Ambiente de produção |
| `PORT` | `3000` | Porta do servidor |
| `DATABASE_URL` | *(automático)* | Conexão PostgreSQL (Render fornece) |
| `VITE_APP_ID` | *(seu valor)* | ID da aplicação Manus |
| `VITE_OAUTH_PORTAL_URL` | *(seu valor)* | URL do portal OAuth |
| `OAUTH_SERVER_URL` | *(seu valor)* | URL do servidor OAuth |
| `OWNER_OPEN_ID` | *(seu valor)* | ID do proprietário |
| `OWNER_NAME` | *(seu valor)* | Nome do proprietário |
| `EXPO_PUBLIC_API_BASE_URL` | `https://gestar-trombofilia-app.onrender.com` | URL da API em produção |

### 3.2 Obter Valores das Variáveis

As variáveis OAuth estão no seu arquivo `.env` local. Você pode encontrá-las em:

```bash
# No seu repositório local
cat .env | grep VITE_
cat .env | grep OAUTH_
cat .env | grep OWNER_
```

## 🗄️ Passo 4: Banco de Dados PostgreSQL

O Render criará automaticamente um banco PostgreSQL se você usar `render.yaml`.

### 4.1 Verificar Banco de Dados

1. No dashboard, procure por **"Services"**
2. Você verá dois serviços:
   - `gestar-trombofilia-db` (PostgreSQL)
   - `gestar-trombofilia-app` (Web Service)

### 4.2 Migrações Automáticas

O arquivo `render.yaml` configura `preDeployCommand: pnpm db:push`, que:

1. Executa `drizzle-kit generate` (cria migrações)
2. Executa `drizzle-kit migrate` (aplica migrações ao banco)

**Isso acontece automaticamente antes do deploy.**

## ✅ Passo 5: Verificar o Deploy

### 5.1 Acompanhar o Build

1. No dashboard, clique no serviço `gestar-trombofilia-app`
2. Vá para **"Logs"**
3. Aguarde até ver: `[api] server listening on port 3000`

### 5.2 Testar a Aplicação

1. Acesse a URL fornecida pelo Render (ex: `https://gestar-trombofilia-app.onrender.com`)
2. Verifique se:
   - ✅ A página inicial carrega
   - ✅ As abas de navegação aparecem (Início, Jornada, Guias, Comunidade, Perfil)
   - ✅ Os conteúdos (Timeline, Suplementos) são exibidos corretamente
   - ✅ Não há erros no console

### 5.3 Testar Funcionalidades Críticas

- ✅ Timeline (Semana a Semana) com 36 semanas
- ✅ Suplementos com dosagens corretas (metilfolato 800mcg)
- ✅ Links da comunidade (Instagram)
- ✅ Perfil do usuário

## 🔄 Passo 6: Configurar Deploy Automático

O Render já está configurado para deploy automático:

- **Trigger:** Cada push para `main`
- **Build:** Automático
- **Deploy:** Automático

Para desativar, acesse **Settings** → **Auto-Deploy** e desmarque.

## 📝 Passo 7: Remover Vercel (Opcional)

Se quiser remover completamente de Vercel:

1. Acesse https://vercel.com/dashboard
2. Selecione o projeto `gestar-trombofilia`
3. Vá para **Settings** → **General**
4. Role até **"Delete Project"**
5. Clique em **"Delete"**

## 🆘 Troubleshooting

### Erro: "DATABASE_URL not found"

**Solução:** Verifique se o banco PostgreSQL foi criado:
1. No dashboard Render, procure por `gestar-trombofilia-db`
2. Se não existir, recrie o serviço manualmente

### Erro: "Port already in use"

**Solução:** O servidor tenta portas 3000-3019. Render escolhe automaticamente.

### Erro: "Build failed"

**Solução:** Verifique os logs:
1. Clique no serviço no dashboard
2. Vá para **"Logs"**
3. Procure por mensagens de erro

### Aplicação carrega mas conteúdo não aparece

**Solução:** Verifique se as migrações foram executadas:
1. Acesse o banco PostgreSQL
2. Verifique se a tabela `users` existe
3. Se não, execute manualmente: `pnpm db:push`

## 📞 Suporte

Para problemas com Render, consulte:
- Documentação Render: https://render.com/docs
- Status do Render: https://status.render.com

## ✨ Próximos Passos

Após confirmar que o deploy está funcionando:

1. ✅ Implementar Área Premium com Stripe
2. ✅ Adicionar tabelas de assinatura ao banco de dados
3. ✅ Integrar checkout do Stripe
4. ✅ Adicionar validação de assinatura no frontend

---

**Data de Migração:** 22 de maio de 2026
**Versão:** 1.0.1
**Status:** Pronto para deploy
