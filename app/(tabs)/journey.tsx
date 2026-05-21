import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { useColors } from '@/hooks/use-colors';

const JOURNEY_SECTIONS = [
  {
    title: 'Acompanhamento Gestacional',
    items: [
      { id: 'timeline', icon: '📅', label: 'Linha do Tempo', subtitle: 'Semana a semana da gestação', color: '#C9748F', bg: '#FFF0F3', route: '/(screens)/journey/timeline' },
      { id: 'prenatal', icon: '🤰', label: 'Cartão Pré-Natal', subtitle: 'Dados completos da gestação', color: '#8B6F9E', bg: '#F5F0FF', route: '/(screens)/journey/prenatal' },
      { id: 'calendar', icon: '🗓️', label: 'Calendário de Exames', subtitle: 'Ultrassons e consultas', color: '#7BB8D4', bg: '#F0F8FF', route: '/(screens)/journey/calendar' },
    ],
  },
  {
    title: 'Medicações e Saúde',
    items: [
      { id: 'medications', icon: '💊', label: 'Medicações', subtitle: 'Controle e alertas de medicação', color: '#C9748F', bg: '#FFF0F3', route: '/(screens)/journey/medications' },
      { id: 'enoxaparina', icon: '💉', label: 'Enoxaparina', subtitle: 'Lembrete de aplicação', color: '#D4697A', bg: '#FFF0F0', route: '/(screens)/journey/enoxaparina' },
      { id: 'supplements', icon: '🌿', label: 'Suplementação', subtitle: 'Alertas de suplementos', color: '#6BAF8A', bg: '#F0FFF4', route: '/(screens)/journey/supplements' },
    ],
  },
  {
    title: 'Registros e Histórico',
    items: [
      { id: 'exams', icon: '🧪', label: 'Exames Laboratoriais', subtitle: 'Registre seus resultados', color: '#8B6F9E', bg: '#F5F0FF', route: '/(screens)/journey/exams' },
      { id: 'dopplers', icon: '📡', label: 'Dopplers', subtitle: 'Histórico de dopplers', color: '#7BB8D4', bg: '#F0F8FF', route: '/(screens)/journey/dopplers' },
      { id: 'symptoms', icon: '🌡️', label: 'Sintomas', subtitle: 'Registre como você está', color: '#E8B86D', bg: '#FFF8F0', route: '/(screens)/journey/symptoms' },
      { id: 'history', icon: '📋', label: 'Histórico Clínico', subtitle: 'Seu histórico completo', color: '#C9748F', bg: '#FFF0F3', route: '/(screens)/journey/history' },
    ],
  },
  {
    title: 'Diário e Documentos',
    items: [
      { id: 'diary', icon: '📖', label: 'Diário da Gestante', subtitle: 'Registre sua jornada', color: '#E8A598', bg: '#FFF5F3', route: '/(screens)/journey/diary' },
      { id: 'evolution', icon: '📈', label: 'Evolução Semanal', subtitle: 'Registro semana a semana', color: '#6BAF8A', bg: '#F0FFF4', route: '/(screens)/journey/evolution' },
      { id: 'documents', icon: '📁', label: 'Documentos e PDFs', subtitle: 'Seus arquivos médicos', color: '#8B6F9E', bg: '#F5F0FF', route: '/(screens)/journey/documents' },
    ],
  },
];

export default function JourneyScreen() {
  const { profile, gestationalWeek, gestationalDay } = useUser();
  const colors = useColors();
  const router = useRouter();
  const isFIV = profile?.profileType === 'fiv';

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ backgroundColor: colors.primary, paddingTop: 16, paddingBottom: 28, paddingHorizontal: 20 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Minha Jornada</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>
            Todos os seus recursos de acompanhamento
          </Text>
          {gestationalWeek > 0 && (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, alignSelf: 'flex-start', marginTop: 12 }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                {gestationalWeek}ª semana e {gestationalDay} dias
              </Text>
            </View>
          )}
        </View>

        <View style={{ marginTop: -12, paddingHorizontal: 16, paddingBottom: 32 }}>

          {/* FIV Section */}
          {isFIV && (
            <TouchableOpacity
              onPress={() => router.push('/(screens)/fiv')}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#7BB8D4',
                borderRadius: 20,
                padding: 18,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 36, marginRight: 14 }}>🔬</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Linha do Tempo FIV</Text>
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 3 }}>
                  Acompanhe cada fase do seu tratamento de reprodução assistida
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={26} color="white" />
            </TouchableOpacity>
          )}

          {JOURNEY_SECTIONS.map((section) => (
            <View key={section.title} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>
                {section.title}
              </Text>
              <View style={{ gap: 10 }}>
                {section.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => router.push(item.route as any)}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: item.bg,
                      borderRadius: 16,
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#EDD9E0',
                    }}
                  >
                    <Text style={{ fontSize: 28, marginRight: 14 }}>{item.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#2D1B2E' }}>{item.label}</Text>
                      <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 2 }}>{item.subtitle}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={22} color={item.color} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
