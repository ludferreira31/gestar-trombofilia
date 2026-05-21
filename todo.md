# Gestar com Trombofilia — TODO

## Identidade Visual e Design System
- [x] Gerar logo do aplicativo (ícone feminino/gestacional)
- [x] Configurar paleta de cores (rosa pêssego, lavanda, salmão)
- [x] Atualizar theme.config.js com cores do projeto
- [x] Atualizar app.config.ts com nome e branding

## Onboarding e Perfil Inicial
- [x] Tela de splash com logo animado
- [x] Fluxo de onboarding (3 telas de boas-vindas)
- [x] Tela de seleção de perfil (Tentante/Gestante/FIV/Investigação/Pós-perda)
- [x] Formulário de dados iniciais (DUM, semana gestacional, nome)

## Navegação Principal (Tab Bar)
- [x] Tab: Início (Home)
- [x] Tab: Minha Jornada
- [x] Tab: Guias
- [x] Tab: Comunidade
- [x] Tab: Perfil

## Home (Início)
- [x] Saudação personalizada com semana gestacional
- [x] Card resumo do dia (medicações, exames, lembretes)
- [x] Acesso rápido aos recursos mais usados
- [x] Seção de atualizações/notícias do GSTAR
- [x] Banner área premium

## Minha Jornada — Recursos Inteligentes
- [x] Linha do tempo gestacional interativa (semana a semana)
- [x] Cartão pré-natal digital interativo
- [x] Calendário de ultrassons e exames
- [x] Agenda semanal da gestação
- [x] Alertas de medicações (com notificações)
- [x] Alertas de suplementação
- [x] Lembrete de aplicação de enoxaparina
- [x] Registro de exames laboratoriais
- [x] Registro de dopplers
- [x] Histórico clínico
- [x] Registro de sintomas
- [x] Diário da gestante
- [x] Área para PDFs e documentos
- [x] Registro de evolução semanal
- [x] Histórico da paciente

## Linha do Tempo FIV
- [x] Tela de linha do tempo FIV
- [x] Datas de punção
- [x] Transferência embrionária
- [x] Registro de Beta-HCG
- [x] Medicações por fase FIV
- [x] Acompanhamento por fases

## Guias (Manual do Gestar)
- [x] Tela de lista de guias
- [x] Guia: Entender seus Exames
- [x] Guia: Rotina de Medicação
- [x] Guia: Suplementação Essencial
- [x] Guia: Alimentação e Estilo de Vida
- [x] Guia: Parto com Trombofilia
- [x] Guia: Rotina de Acompanhamento por Semana
- [x] Guia: Avaliação Geral Complementar
- [x] Guia: Entender Dopplers
- [x] Guia: Trombofilias Adquiridas e Anticorpos Antifosfolípides
- [x] Guia: Vencimento e Controle de Medicações
- [x] Plano de Parto Digital

## Área Premium
- [x] Tela de upgrade premium
- [x] Controle de acesso premium (AsyncStorage)
- [x] Cartão pré-natal interativo completo (premium)
- [x] Registro detalhado de exames (premium)
- [x] Registro de dopplers com histórico (premium)
- [x] Área de PDFs e documentos (premium)
- [x] Histórico completo da paciente (premium)

## Comunidade
- [x] Tela principal da comunidade
- [x] Relatos da comunidade
- [x] Mural de nascimentos (bebês arco-íris)
- [x] Vitórias legislativas
- [x] Campanhas de conscientização
- [x] Espaço comunidade (posts)
- [x] Atualizações do projeto GSTAR
- [x] Novo post na comunidade

## Espaço de Acolhimento (Humanização)
- [x] Tela de acolhimento sobre perda gestacional
- [x] Recursos sobre prematuridade
- [x] Luto parental
- [x] Recursos de apoio emocional

## Módulos Informativos
- [x] Bem-vindo ao Gestar com Trombofilia
- [x] Conheça nossos serviços
- [x] Compromisso com a saúde
- [x] Parceiros e benefícios
- [x] Dúvidas frequentes e consultoria

## Perfil e Configurações
- [x] Tela de perfil do usuário
- [x] Edição de dados pessoais e gestacionais
- [x] Configurações de notificações
- [x] Sobre o aplicativo

## Painel Administrativo
- [x] Tela de painel admin
- [x] Controle de pacientes premium
- [x] Liberação de conteúdos
- [x] Área de parceiros
- [x] Painel de notificações push

## Banco de Dados e Backend
- [x] Storage local com AsyncStorage (medications, exams, dopplers, diary, symptoms, fiv, documents)
- [x] Contexto global de usuário (UserProvider)
- [x] Cálculo automático de semana gestacional
- [ ] Sincronização na nuvem (versão futura)
- [ ] Push notifications server-side (versão futura)

## Polimento e Entrega
- [x] Zero erros TypeScript
- [x] Zero erros de lint (apenas warnings)
- [x] Testes unitários (12 testes passando)
- [x] Checkpoint final


## PWA e Distribuição Web
- [x] Criar manifest.json com configurações PWA
- [x] Criar Service Worker com offline support
- [x] Criar hook usePWA para gerenciar estado PWA
- [x] Adicionar OfflineBanner ao layout
- [x] Criar arquivo index.html otimizado
- [x] Criar web.config.js com otimizações
- [x] Criar DEPLOYMENT.md com guias de distribuição
- [x] Animação discreta de entrada da logo no onboarding
- [ ] Deploy em Vercel/Netlify (próxima etapa)
- [ ] Configurar domínio customizado (próxima etapa)
- [ ] Configurar notificações push (versão futura)
- [ ] Implementar sincronização na nuvem (versão futura)
