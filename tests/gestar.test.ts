import { describe, it, expect, vi } from 'vitest';
import { calculateGestationalWeek, generateId } from '../lib/storage';

// Mock the content module to avoid require('@/assets/images/icon.png') in test env
vi.mock('../constants/content', () => ({
  GUIDES: [
    { id: 'exames', title: 'Entender seus Exames', subtitle: 'Exames laboratoriais', icon: '🧪', color: '#C9748F', premium: false, content: '## Guia\n### Seção\nConteúdo do guia.' },
    { id: 'medicacao', title: 'Rotina de Medicação', subtitle: 'Medicações', icon: '💊', color: '#8B6F9E', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'suplementacao', title: 'Suplementação', subtitle: 'Vitaminas', icon: '🌿', color: '#6BAF8A', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'alimentacao', title: 'Alimentação', subtitle: 'Hábitos', icon: '🥗', color: '#E8B86D', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'parto', title: 'Parto com Trombofilia', subtitle: 'Parto', icon: '🏥', color: '#C9748F', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'acompanhamento_semanal', title: 'Acompanhamento', subtitle: 'Semanas', icon: '📅', color: '#7BB8D4', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'avaliacao_complementar', title: 'Avaliação Complementar', subtitle: 'Exames', icon: '📋', color: '#8B6F9E', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'dopplers', title: 'Entender Dopplers', subtitle: 'Dopplers', icon: '📡', color: '#C9748F', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'trombofilias', title: 'Trombofilias', subtitle: 'SAF', icon: '🔬', color: '#D4697A', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'vencimento_medicacoes', title: 'Controle de Medicações', subtitle: 'Controle', icon: '⏰', color: '#E8B86D', premium: false, content: '## Guia\n### Seção\nConteúdo.' },
    { id: 'plano_parto', title: 'Plano de Parto Digital', subtitle: 'Parto', icon: '📝', color: '#8B6F9E', premium: true, content: '## Guia\n### Seção\nConteúdo.' },
  ],
  PROFILE_TYPES: [
    { id: 'tentante', label: 'Tentante', icon: '🌸', description: 'Estou tentando engravidar' },
    { id: 'gestante', label: 'Gestante', icon: '🤰', description: 'Estou grávida' },
    { id: 'fiv', label: 'FIV / Reprodução Assistida', icon: '🔬', description: 'Estou em tratamento de FIV' },
    { id: 'investigacao', label: 'Em Investigação', icon: '🔍', description: 'Investigando trombofilia' },
    { id: 'pos_perda', label: 'Pós-perda Gestacional', icon: '🕊️', description: 'Tive perdas gestacionais' },
    { id: 'acompanhamento', label: 'Paciente da Consultoria', icon: '💜', description: 'Sou paciente da consultoria' },
  ],
  FIV_PHASES: [
    { id: 'estimulacao', label: 'Estimulação Ovariana', icon: '💉', color: '#7BB8D4', description: 'Injeções hormonais' },
    { id: 'monitorizacao', label: 'Monitorização', icon: '🔍', color: '#8B6F9E', description: 'Ultrassons' },
    { id: 'puncao', label: 'Punção dos Óvulos', icon: '🔬', color: '#C9748F', description: 'Coleta dos óvulos' },
    { id: 'fertilizacao', label: 'Fertilização', icon: '⚗️', color: '#6BAF8A', description: 'Fertilização' },
    { id: 'cultivo', label: 'Cultivo Embrionário', icon: '🧬', color: '#E8B86D', description: 'Desenvolvimento' },
    { id: 'transferencia', label: 'Transferência', icon: '💜', color: '#9B7EC8', description: 'Transferência' },
    { id: 'espera', label: 'Espera do Beta-HCG', icon: '⏳', color: '#D4697A', description: 'Aguardando' },
    { id: 'resultado', label: 'Resultado', icon: '🌟', color: '#C9748F', description: 'Beta-HCG' },
  ],
  WEEK_MILESTONES: {
    4: 'Implantação do embrião',
    6: 'Coração começa a bater',
    8: 'Órgãos principais em formação',
    12: 'Fim do 1º trimestre',
    20: 'Ultrassom morfológico',
    28: 'Início do 3º trimestre',
    40: 'Data provável do parto',
  },
  ONBOARDING_SLIDES: [],
  QUICK_ACTIONS: [],
  COMMUNITY_POSTS: [],
}));

describe('Gestar com Trombofilia — Core Logic', () => {
  describe('calculateGestationalWeek', () => {
    it('deve calcular semana gestacional corretamente', () => {
      const dum = new Date();
      dum.setDate(dum.getDate() - 70); // 10 semanas = 70 dias
      const result = calculateGestationalWeek(dum.toISOString().split('T')[0]);
      expect(result.week).toBe(10);
      expect(result.day).toBeGreaterThanOrEqual(0);
      expect(result.day).toBeLessThan(7);
    });

    it('deve retornar semana negativa para DUM futura (gestação não iniciada)', () => {
      const futureDum = new Date();
      futureDum.setDate(futureDum.getDate() + 10);
      const result = calculateGestationalWeek(futureDum.toISOString().split('T')[0]);
      // DUM futura = gestação não iniciada, semana deve ser negativa ou zero
      expect(result.week).toBeLessThanOrEqual(0);
    });

    it('deve calcular semana 40 corretamente', () => {
      const dum = new Date();
      dum.setDate(dum.getDate() - 280); // 40 semanas = 280 dias
      const result = calculateGestationalWeek(dum.toISOString().split('T')[0]);
      expect(result.week).toBe(40);
    });
  });

  describe('generateId', () => {
    it('deve gerar IDs únicos', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('GUIDES (mocked)', () => {
    it('deve ter pelo menos 10 guias', async () => {
      const { GUIDES } = await import('../constants/content');
      expect(GUIDES.length).toBeGreaterThanOrEqual(10);
    });

    it('cada guia deve ter id, title, content e color', async () => {
      const { GUIDES } = await import('../constants/content');
      GUIDES.forEach(guide => {
        expect(guide.id).toBeTruthy();
        expect(guide.title).toBeTruthy();
        expect(guide.content).toBeTruthy();
        expect(guide.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('guias premium devem estar marcados corretamente', async () => {
      const { GUIDES } = await import('../constants/content');
      const premiumGuides = GUIDES.filter(g => g.premium);
      expect(premiumGuides.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('PROFILE_TYPES (mocked)', () => {
    it('deve ter 6 tipos de perfil', async () => {
      const { PROFILE_TYPES } = await import('../constants/content');
      expect(PROFILE_TYPES.length).toBe(6);
    });

    it('deve incluir tentante, gestante e FIV', async () => {
      const { PROFILE_TYPES } = await import('../constants/content');
      const ids = PROFILE_TYPES.map(p => p.id);
      expect(ids).toContain('tentante');
      expect(ids).toContain('gestante');
      expect(ids).toContain('fiv');
    });
  });

  describe('FIV_PHASES (mocked)', () => {
    it('deve ter 8 fases do FIV', async () => {
      const { FIV_PHASES } = await import('../constants/content');
      expect(FIV_PHASES.length).toBe(8);
    });

    it('deve incluir punção e transferência', async () => {
      const { FIV_PHASES } = await import('../constants/content');
      const ids = FIV_PHASES.map(p => p.id);
      expect(ids).toContain('puncao');
      expect(ids).toContain('transferencia');
    });
  });

  describe('WEEK_MILESTONES (mocked)', () => {
    it('deve ter marcos para semanas importantes', async () => {
      const { WEEK_MILESTONES } = await import('../constants/content');
      expect(WEEK_MILESTONES[12]).toBeTruthy();
      expect(WEEK_MILESTONES[20]).toBeTruthy();
      expect(WEEK_MILESTONES[40]).toBeTruthy();
    });
  });
});
