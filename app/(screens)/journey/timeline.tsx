import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { WEEK_MILESTONES } from '@/constants/content';

const TRIMESTER_INFO = [
  { trimester: 1, weeks: '1–13', label: '1º Trimestre', color: '#C9748F', bg: '#FFF0F3', description: 'Formação dos órgãos principais e desenvolvimento embrionário inicial.' },
  { trimester: 2, weeks: '14–27', label: '2º Trimestre', color: '#8B6F9E', bg: '#F5F0FF', description: 'Crescimento acelerado, movimentos fetais e maturação dos sistemas.' },
  { trimester: 3, weeks: '28–40', label: '3º Trimestre', color: '#7BB8D4', bg: '#F0F8FF', description: 'Preparação para o nascimento, maturação pulmonar e ganho de peso.' },
];

const WEEKLY_CONTENT: Record<number, { baby: string; mom: string; tip: string }> = {
  2: { baby: '📍 O embrião tem o tamanho de uma cabeça de alfinete (0,1-0,2mm). Implantação começando.', mom: 'Você pode não sentir nada ainda. O corpo começa a produzir hCG.', tip: 'Faça um teste de gravidez se suspeitar. Comece a tomar metilfolato se ainda não faz.' },
  3: { baby: '🟢 O embrião tem o tamanho de uma lentilha (0,5-1mm). Formação do saco gestacional.', mom: 'Possível leve desconforto abdominal. Mamas podem ficar sensíveis.', tip: 'Agende uma ultrassom transvaginal para confirmar a gestação.' },
  4: { baby: '🌼 O embrião tem o tamanho de um grão de papoula (1-2mm). A implantação está ocorrendo.', mom: 'Você pode sentir cólicas leves e spotting de implantação.', tip: 'Inicie a suplementação se ainda não começou. Confirme a gestação com beta-HCG.' },
  5: { baby: '❤️ O coração começa a bater! O embrião tem cerca de 2-3mm.', mom: 'Náuseas matinais podem começar. Seios sensíveis são comuns.', tip: 'Agende sua primeira consulta pré-natal e ultrassom transvaginal. Confirme a gestação com ultrassonografia.' },
  6: { baby: 'O coração começa a bater! O embrião tem cerca de 6mm.', mom: 'Náuseas matinais podem começar. Seios sensíveis são comuns.', tip: 'Agende sua primeira consulta pré-natal e ultrassom transvaginal.' },
  7: { baby: '🧬 Todos os órgãos principais estão em formação. Embrião com 7-8mm.', mom: 'Fadiga intensa é normal. Descanse sempre que possível.', tip: 'Agende sua primeira consulta pré-natal e ultrassom transvaginal.' },
  8: { baby: 'Todos os órgãos principais estão em formação. Braços e pernas visíveis.', mom: 'Fadiga intensa é normal. Descanse sempre que possível.', tip: 'Inicie atividade física leve. Mantenha hidratação adequada.' },
  9: { baby: '💓 Pico da atividade cardíaca fetal! Bebê com 2-3cm.', mom: 'Náuseas matinais podem começar. Seios sensíveis são comuns.', tip: 'Pico da atividade cardíaca fetal. Agende ultrassom para ouvir o coração.' },
  11: { baby: '👶 Bebê com 5-6cm. Movimentos fetais começam.', mom: 'Energia retorna. Barriga começa a aparecer.', tip: 'Ultrassom morfológica de primeiro trimestre com TN (translucência nucal) + rastreio de pré-eclâmpsia + bioquímico.' },
  12: { baby: 'Fim do período mais crítico! Bebê com 6-7cm, reflexos presentes.', mom: 'As náuseas tendem a diminuir. Barriga começa a aparecer.', tip: 'Ultrassom morfológica de primeiro trimestre com TN (translucência nucal) + rastreio de pré-eclâmpsia + bioquímico.' },
  13: { baby: '✨ Bebê com 7-8cm. Sexo pode começar a ser identificado.', mom: 'Energia aumenta. Movimentos mais perceptíveis.', tip: 'Ultrassom morfológica de primeiro trimestre com TN (translucência nucal) + rastreio de pré-eclâmpsia + bioquímico.' },
  14: { baby: 'Bebê com 8-9cm. Sexo pode começar a ser identificado.', mom: 'Energia aumenta. Movimentos mais perceptíveis.', tip: 'Ultrassom de anatomia pode ser agendado. Sem rastreio de translucência nucal.' },
  15: { baby: 'Bebê com 10cm. Desenvolvimento acelerado.', mom: 'Barriga mais evidente. Apetite aumenta.', tip: 'Acompanhe o desenvolvimento fetal. Ultrassom morfológico será realizado entre 20–24 semanas.' },
  16: { baby: 'Bebê com 12cm. Pode chupar o polegar e fazer caretas!', mom: 'Você pode começar a sentir os primeiros movimentos (flutulações).', tip: 'Prepare-se para o ultrassom morfológico. Será realizado entre 20–24 semanas.' },
  17: { baby: '👶 Bebê com 13cm. Desenvolvimento rápido dos órgãos.', mom: 'Movimentos fetais mais perceptíveis. Energia em alta.', tip: 'Ultrassom morfológico de segundo trimestre pode ser realizado entre 20–24 semanas.' },
  18: { baby: '👶 Bebê com 14cm. Todos os órgãos formados.', mom: 'Movimentos fetais mais frequentes. Barriga bem visível.', tip: 'Ultrassom morfológico de segundo trimestre pode ser realizado entre 20–24 semanas.' },
  19: { baby: '👶 Bebê com 15cm. Desenvolvimento acelerado.', mom: 'Movimentos fetais constantes. Barriga crescendo.', tip: 'Ultrassom morfológico de segundo trimestre deve ser realizado entre 20–24 semanas.' },
  20: { baby: 'Metade da gestação! Bebê com 25cm. Cabelo e sobrancelhas visíveis.', mom: 'Barriga bem visível. Movimentos fetais mais frequentes.', tip: 'Realize o ultrassom morfológico de 2º trimestre. Doppler de artérias uterinas.' },
  21: { baby: '👶 Bebê com 27cm. Desenvolvimento acelerado.', mom: 'Barriga bem visível. Movimentos fetais constantes.', tip: 'Acompanhe o desenvolvimento fetal. Ultrassom de crescimento pode ser realizado.' },
  22: { baby: '👶 Bebê com 28cm. Pele ainda enrugada.', mom: 'Barriga crescendo. Movimentos fetais mais intensos.', tip: 'Ultrassom de crescimento fetal pode ser agendado.' },
  24: { baby: '👶 Bebê com 30cm. Pulmões em desenvolvimento. Viabilidade fetal.', mom: 'Possível dor lombar. Barriga crescendo rapidamente.', tip: 'Realize o teste de tolerância à glicose (diabetes gestacional).' },
  25: { baby: '👶 Bebê com 32cm. Pele ainda enrugada, mas mais lisa.', mom: 'Barriga bem pronunciada. Movimentos fetais frequentes.', tip: 'Ultrassom de crescimento fetal e doppler umbilical.' },
  26: { baby: '👶 Bebê com 33cm. Pulmões em desenvolvimento.', mom: 'Inchaço nos pés e tornozelos. Dificuldade para dormir.', tip: 'Realize ecocardiografia fetal.' },
  27: { baby: '👶 Bebê com 34cm. Desenvolvimento rápido.', mom: 'Inchaço nos pés e tornozelos no final do dia. Dificuldade para dormir.', tip: 'Ultrassom de crescimento fetal e doppler umbilical.' },
  28: { baby: 'Início do 3º trimestre! Bebê com 35cm. Olhos abrem e fecham.', mom: 'Possível inchaço nos pés e tornozelos. Dificuldade para dormir.', tip: 'Ultrassom de crescimento fetal e doppler umbilical.' },
  29: { baby: '👶 Bebê com 37cm. Pulmões quase maduros.', mom: 'Contrações podem ser normais, desde que não estejam em excesso.', tip: 'Perfil biofísico fetal. Avalie posição do bebê.' },
  31: { baby: '👶 Bebê com 40cm. Pulmões quase maduros. Posição cefálica esperada.', mom: 'Contrações podem ser normais, desde que não estejam em excesso.', tip: 'Perfil biofísico fetal. Avalie posição do bebê.' },
  32: { baby: '👶 Bebê com 42cm. Pulmões quase maduros. Posição cefálica esperada.', mom: 'Contrações podem ser normais, desde que não estejam em excesso.', tip: 'Perfil biofísico fetal. Avalie posição do bebê.' },
  33: { baby: '👶 Bebê com 43cm. Praticamente pronto para o mundo!', mom: 'Descida do bebê na pelve. Aumento da pressão pélvica.', tip: 'Perfil biofísico fetal. Avalie posição do bebê.' },
  34: { baby: '👶 Bebê com 45cm. Praticamente pronto para o mundo!', mom: 'Descida do bebê na pelve. Aumento da pressão pélvica.', tip: 'Perfil biofísico fetal. Avalie posição do bebê.' },
  36: { baby: '👶 Bebê com 47cm. Praticamente pronto para o mundo!', mom: 'Descida do bebê na pelve. Aumento da pressão pélvica.', tip: 'Planejamento do plano de parto. Discuta suspensão da heparina e AAS (ácido acetilsalicílico).' },
  37: { baby: 'Gestação a termo! Bebê completamente desenvolvido.', mom: 'Qualquer sinal de trabalho de parto deve ser avaliado.', tip: 'Tenha o plano de parto pronto. Mala da maternidade preparada.' },
  40: { baby: 'Data provável do parto! Bebê com cerca de 3,5kg e 50cm.', mom: 'Aguardando o momento especial com ansiedade e amor.', tip: 'Mantenha contato próximo com sua equipe médica. Você chegou até aqui! 💜' },
};

export default function TimelineScreen() {
  const { gestationalWeek, gestationalDay } = useUser();
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState(gestationalWeek || 1);

  const currentContent = WEEKLY_CONTENT[selectedWeek] || WEEKLY_CONTENT[
    Object.keys(WEEKLY_CONTENT).map(Number).reduce((prev, curr) =>
      Math.abs(curr - selectedWeek) < Math.abs(prev - selectedWeek) ? curr : prev
    )
  ];

  const getTrimester = (week: number) => {
    if (week <= 13) return 1;
    if (week <= 27) return 2;
    return 3;
  };

  const trimesterColors: Record<number, string> = { 1: '#C9748F', 2: '#8B6F9E', 3: '#7BB8D4' };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Linha do Tempo</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
            {gestationalWeek > 0 ? `Você está na ${gestationalWeek}ª semana` : 'Acompanhe sua gestação semana a semana'}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Trimester Cards */}
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {TRIMESTER_INFO.map((t) => (
              <TouchableOpacity
                key={t.trimester}
                onPress={() => setSelectedWeek(t.trimester === 1 ? 8 : t.trimester === 2 ? 20 : 32)}
                style={{
                  flex: 1,
                  backgroundColor: getTrimester(selectedWeek) === t.trimester ? t.color : t.bg,
                  borderRadius: 14,
                  padding: 12,
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: t.color,
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '700', color: getTrimester(selectedWeek) === t.trimester ? 'white' : t.color }}>
                  {t.label}
                </Text>
                <Text style={{ fontSize: 10, color: getTrimester(selectedWeek) === t.trimester ? 'rgba(255,255,255,0.8)' : '#8B7B8B', marginTop: 2 }}>
                  Sem. {t.weeks}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Week Selector */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>
            Selecione a Semana
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => {
                const isCurrentWeek = week === gestationalWeek;
                const isSelected = week === selectedWeek;
                const hasMilestone = !!WEEK_MILESTONES[week];
                const color = trimesterColors[getTrimester(week)];
                return (
                  <TouchableOpacity
                    key={week}
                    onPress={() => setSelectedWeek(week)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: isSelected ? color : isCurrentWeek ? color + '30' : 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: isCurrentWeek || isSelected ? 2 : 1,
                      borderColor: isSelected || isCurrentWeek ? color : '#EDD9E0',
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: isSelected ? '700' : '500', color: isSelected ? 'white' : isCurrentWeek ? color : '#2D1B2E' }}>
                      {week}
                    </Text>
                    {hasMilestone && (
                      <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: isSelected ? 'white' : color, position: 'absolute', bottom: 4 }} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Week Detail */}
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EDD9E0', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ backgroundColor: trimesterColors[getTrimester(selectedWeek)] + '20', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 6 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: trimesterColors[getTrimester(selectedWeek)] }}>
                  Semana {selectedWeek}
                </Text>
              </View>
              {WEEK_MILESTONES[selectedWeek] && (
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: '#C9748F', fontWeight: '600' }}>🌟 Marco importante</Text>
                  <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{WEEK_MILESTONES[selectedWeek]}</Text>
                </View>
              )}
            </View>

            {currentContent && (
              <>
                <View style={{ backgroundColor: '#FFF0F3', borderRadius: 14, padding: 14, marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#C9748F', marginBottom: 6 }}>👶 Seu bebê</Text>
                  <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{currentContent.baby}</Text>
                </View>
                <View style={{ backgroundColor: '#F5F0FF', borderRadius: 14, padding: 14, marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#8B6F9E', marginBottom: 6 }}>🤰 Você</Text>
                  <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{currentContent.mom}</Text>
                </View>
                <View style={{ backgroundColor: '#F0FFF4', borderRadius: 14, padding: 14 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#6BAF8A', marginBottom: 6 }}>💡 Dica da semana</Text>
                  <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{currentContent.tip}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
