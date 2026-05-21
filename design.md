# Design System — Gestar com Trombofilia

## Identidade Visual

### Paleta de Cores
- **Primary**: `#C9748F` — Rosa pêssego profundo (acolhimento, feminino, emocional)
- **Primary Light**: `#F2C4CE` — Rosa claro suave
- **Secondary**: `#8B6F9E` — Lavanda (espiritualidade, cuidado, premium)
- **Accent**: `#E8A598` — Salmão suave (calor, humanização)
- **Background**: `#FDF8F5` — Off-white rosado (leveza, limpeza)
- **Surface**: `#FFFFFF` — Branco puro (cards, modais)
- **Surface Alt**: `#FFF0F3` — Rosa muito claro (seções especiais)
- **Foreground**: `#2D1B2E` — Roxo escuro (texto principal)
- **Muted**: `#8B7B8B` — Cinza rosado (texto secundário)
- **Border**: `#EDD9E0` — Rosa acinzentado (divisores)
- **Success**: `#6BAF8A` — Verde sálvia (confirmações)
- **Warning**: `#E8B86D` — Âmbar suave (alertas)
- **Error**: `#D4697A` — Vermelho rosado (erros)
- **Premium**: `#9B7EC8` — Violeta (área premium)
- **FIV**: `#7BB8D4` — Azul bebê (área FIV)

### Tipografia
- **Fonte Principal**: System font (SF Pro no iOS, Roboto no Android)
- **Títulos**: Bold, 24-32px
- **Subtítulos**: SemiBold, 18-20px
- **Corpo**: Regular, 15-16px
- **Caption**: Regular, 12-13px
- **Linha de altura**: 1.5x tamanho da fonte

### Espaçamento
- **xs**: 4px | **sm**: 8px | **md**: 16px | **lg**: 24px | **xl**: 32px | **2xl**: 48px

### Border Radius
- **sm**: 8px | **md**: 12px | **lg**: 16px | **xl**: 24px | **full**: 9999px

---

## Mapa de Telas

### Fluxo de Onboarding
1. **Splash Screen** — Logo + animação suave
2. **Onboarding 1** — Boas-vindas ao Gestar com Trombofilia
3. **Onboarding 2** — Quem somos e nossa missão
4. **Onboarding 3** — O que você encontrará aqui
5. **Perfil Inicial** — Seleção do perfil (Tentante / Gestante / FIV / Investigação / Pós-perda)

### Navegação Principal (Tab Bar)
- **Início** (Home) — Dashboard personalizado
- **Minha Jornada** — Linha do tempo + recursos inteligentes
- **Guias** — Manual do Gestar (conteúdo educativo)
- **Comunidade** — Relatos, mural, campanhas
- **Perfil** — Configurações, histórico, documentos

### Módulos Principais

#### Home (Início)
- Saudação personalizada com nome e semana gestacional
- Card de resumo do dia (medicações, exames, lembretes)
- Acesso rápido aos recursos mais usados
- Notícias e atualizações do projeto GSTAR
- Banner de área premium (se não assinante)

#### Minha Jornada
- **Linha do Tempo Gestacional** — Semana a semana interativa
- **Cartão Pré-Natal Digital** — Dados completos da gestação
- **Calendário de Exames** — Ultrassons, laboratoriais, dopplers
- **Agenda Semanal** — Consultas e compromissos
- **Alertas de Medicação** — Enoxaparina e outros
- **Alertas de Suplementação**
- **Registro de Sintomas**
- **Diário da Gestante**
- **Histórico Clínico**

#### Linha do Tempo FIV (Área Específica)
- Fases do tratamento FIV
- Datas de punção e transferência
- Registro de Beta-HCG
- Medicações por fase
- Acompanhamento por etapas

#### Guias (Manual do Gestar)
- Guia para Entender seus Exames
- Guia de Rotina de Medicação
- Guia de Suplementação Essencial
- Guia de Alimentação e Estilo de Vida
- Guia de Parto com Trombofilia
- Guia de Rotina de Acompanhamento por Semana
- Guia de Avaliação Geral Complementar
- Guia para Entender Dopplers
- Guia sobre Trombofilias Adquiridas e Anticorpos Antifosfolípides
- Guia de Vencimento e Controle de Medicações
- Plano de Parto Digital

#### Área Premium (Pacientes da Consultoria)
- Cartão pré-natal interativo completo
- Registro detalhado de exames laboratoriais
- Registro de dopplers com histórico
- Área para PDFs e documentos
- Registro de evolução semanal
- Histórico completo da paciente
- Guias exclusivos premium
- Chat com consultora (futuro)

#### Comunidade
- Relatos da comunidade
- Mural de nascimentos (bebês arco-íris)
- Vitórias legislativas
- Campanhas de conscientização
- Espaço comunidade (fórum)
- Atualizações do projeto GSTAR

#### Espaço de Acolhimento (Humanização)
- Suporte sobre perda gestacional
- Acolhimento em prematuridade
- Luto parental
- Recursos de apoio emocional
- Histórias de superação

#### Perfil
- Dados pessoais e gestacionais
- Tipo de perfil (tentante/gestante/FIV/etc.)
- Documentos e PDFs
- Configurações de notificações
- Parceiros e benefícios
- Dúvidas frequentes
- Sobre o app

### Painel Administrativo (Admin)
- Controle de pacientes premium
- Liberação de conteúdos
- Gerenciamento de parceiros
- Painel de notificações push
- Métricas e relatórios

---

## Fluxos de Navegação

### Fluxo Principal (Usuário Comum)
```
Splash → Onboarding → Seleção de Perfil → Home
Home → Minha Jornada → [Linha do Tempo / Calendário / Alertas / Diário]
Home → Guias → [Lista de Guias] → [Guia Específico]
Home → Comunidade → [Relatos / Mural / Campanhas]
Home → Perfil → [Dados / Documentos / Configurações]
```

### Fluxo Premium
```
Home → Banner Premium → Tela de Upgrade → Área Premium Desbloqueada
Área Premium → [Cartão Pré-Natal / Exames / Dopplers / Histórico]
```

### Fluxo FIV
```
Perfil FIV → Linha do Tempo FIV → [Punção / Transferência / Beta-HCG / Medicações]
```

---

## Componentes do Design System

### Cards
- **CardBase** — Card padrão com sombra suave
- **CardPremium** — Card com gradiente violeta
- **CardAlert** — Card de alerta com ícone
- **CardGuide** — Card de guia com imagem de capa
- **CardCommunity** — Card de post da comunidade
- **CardMedication** — Card de medicação com status

### Botões
- **ButtonPrimary** — Rosa principal, texto branco
- **ButtonSecondary** — Borda rosa, texto rosa
- **ButtonPremium** — Gradiente violeta
- **ButtonGhost** — Transparente, texto colorido

### Inputs
- **InputField** — Campo de texto padrão
- **InputDate** — Seletor de data
- **InputSelect** — Dropdown de seleção
- **InputTextArea** — Área de texto longa

### Navegação
- **TabBar** — 5 abas principais
- **Header** — Título + ações
- **BackButton** — Voltar com haptic
- **BottomSheet** — Modal deslizante

---

## Arquitetura Técnica

### Stack
- **Framework**: React Native + Expo SDK 54
- **Roteamento**: Expo Router 6 (file-based)
- **Estilização**: NativeWind 4 (Tailwind CSS)
- **Estado**: React Context + AsyncStorage
- **Banco de Dados Local**: AsyncStorage (dados do usuário)
- **Banco de Dados Servidor**: PostgreSQL + Drizzle ORM
- **API**: tRPC + Express
- **Autenticação**: OAuth (servidor built-in)
- **Notificações**: Expo Notifications
- **Animações**: React Native Reanimated 4

### Estrutura de Pastas
```
app/
  (tabs)/          ← Navegação principal
    index.tsx      ← Home
    journey.tsx    ← Minha Jornada
    guides.tsx     ← Guias
    community.tsx  ← Comunidade
    profile.tsx    ← Perfil
  (screens)/       ← Telas secundárias
    onboarding/
    premium/
    fiv/
    admin/
    guides/
    community/
    journey/
    acolhimento/
components/
  ui/              ← Design system components
  cards/           ← Card components
  forms/           ← Form components
  modals/          ← Modal components
lib/
  storage.ts       ← AsyncStorage helpers
  notifications.ts ← Push notifications
  theme.ts         ← Theme utilities
constants/
  guides.ts        ← Conteúdo dos guias
  onboarding.ts    ← Conteúdo do onboarding
```

### Banco de Dados (Schema)
- **users** — Perfil do usuário
- **pregnancies** — Dados da gestação
- **medications** — Medicações e alertas
- **exams** — Exames laboratoriais
- **dopplers** — Registro de dopplers
- **symptoms** — Registro de sintomas
- **diary_entries** — Diário da gestante
- **fiv_timeline** — Linha do tempo FIV
- **documents** — PDFs e documentos
- **premium_access** — Controle de acesso premium
- **community_posts** — Posts da comunidade
- **births** — Mural de nascimentos
