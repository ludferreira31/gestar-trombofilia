import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { useColors } from '@/hooks/use-colors';
import { storage, Medication } from '@/lib/storage';
import { QUICK_ACTIONS, WEEK_MILESTONES } from '@/constants/content';

const PROFILE_LABELS: Record<string, string> = {
  tentante: 'Tentante',
  gestante: 'Gestante',
  fiv: 'FIV',
  investigacao: 'Em Investigação',
  pos_perda: 'Pós-perda',
  acompanhamento: 'Paciente da Consultoria',
};

export default function HomeScreen() {
  const { profile, gestationalWeek, gestationalDay, isPremium } = useUser();
  const colors = useColors();
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  useEffect(() => {
    storage.getMedications().then(meds => setMedications(meds || []));
  }, []);

  const activeMeds = medications.filter(m => m.active);
  const milestone = WEEK_MILESTONES[gestationalWeek];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ backgroundColor: colors.primary, paddingTop: 16, paddingBottom: 32, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{greeting} 💜</Text>
              <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 2 }}>
                {profile?.name || 'Bem-vinda'}
              </Text>
              {profile?.profileType && (
                <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 6 }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
                    {PROFILE_LABELS[profile.profileType] || profile.profileType}
                  </Text>
                </View>
              )}
            </View>
            <Image
              source={require('@/assets/images/icon.png')}
              style={{ width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' }}
              resizeMode="cover"
            />
          </View>

          {/* Gestational Week Card */}
          {(profile?.profileType === 'gestante' || profile?.profileType === 'acompanhamento') && gestationalWeek > 0 && (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Semana Gestacional</Text>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
                  {gestationalWeek}ª semana
                  <Text style={{ fontSize: 16, fontWeight: '400' }}> e {gestationalDay}d</Text>
                </Text>
                {milestone && (
                  <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 4 }}>
                    🌟 {milestone}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => router.push('/(screens)/journey/timeline')}
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 10 }}
              >
                <MaterialIcons name="timeline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}

          {profile?.profileType === 'fiv' && (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16 }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Sua Jornada FIV</Text>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 4 }}>
                Acompanhe cada fase do seu tratamento 🔬
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(screens)/fiv')}
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, alignSelf: 'flex-start', marginTop: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>Ver Linha do Tempo FIV →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ marginTop: -16, paddingHorizontal: 16, paddingBottom: 32 }}>

          {/* Today Summary Card */}
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#C9748F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>
              Resumo de Hoje
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => router.push('/(screens)/journey/medications')}
                style={{ flex: 1, backgroundColor: '#FFF0F3', borderRadius: 14, padding: 14, alignItems: 'center' }}
              >
                <Text style={{ fontSize: 24 }}>💊</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginTop: 6 }}>Medicações</Text>
                <Text style={{ fontSize: 12, color: '#C9748F', marginTop: 2 }}>{activeMeds.length} ativas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(screens)/journey/exams')}
                style={{ flex: 1, backgroundColor: '#F5F0FF', borderRadius: 14, padding: 14, alignItems: 'center' }}
              >
                <Text style={{ fontSize: 24 }}>🧪</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginTop: 6 }}>Exames</Text>
                <Text style={{ fontSize: 12, color: '#8B6F9E', marginTop: 2 }}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(screens)/journey/diary')}
                style={{ flex: 1, backgroundColor: '#FFF8F0', borderRadius: 14, padding: 14, alignItems: 'center' }}
              >
                <Text style={{ fontSize: 24 }}>📖</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginTop: 6 }}>Diário</Text>
                <Text style={{ fontSize: 12, color: '#E8B86D', marginTop: 2 }}>Escrever</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>
            Acesso Rápido
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 14,
                  padding: 14,
                  alignItems: 'center',
                  width: '30%',
                  borderWidth: 1,
                  borderColor: '#EDD9E0',
                  shadowColor: '#C9748F',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 26 }}>{action.icon}</Text>
                <Text style={{ fontSize: 11, color: '#2D1B2E', marginTop: 6, textAlign: 'center', fontWeight: '500' }}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Premium Banner */}
          {!isPremium && (
            <TouchableOpacity
              onPress={() => router.push('/(screens)/premium')}
              activeOpacity={0.9}
              style={{
                borderRadius: 20,
                padding: 20,
                marginBottom: 20,
                backgroundColor: '#9B7EC8',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                  Área Premium 💜
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 18 }}>
                  Acesse recursos exclusivos para pacientes da consultoria: cartão pré-natal, histórico completo e muito mais.
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={28} color="white" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          )}

          {/* Modules */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>
            Nossos Módulos
          </Text>
          {[
            { icon: '🌸', title: 'Bem-vindo ao Gestar', subtitle: 'Nossa história e missão', route: '/(screens)/about', color: '#FFF0F3' },
            { icon: '💼', title: 'Conheça nossos Serviços', subtitle: 'Consultoria e acompanhamento', route: '/(screens)/services', color: '#F5F0FF' },
            { icon: '🤝', title: 'Parceiros e Benefícios', subtitle: 'Descontos e vantagens exclusivas', route: '/(screens)/partners', color: '#F0FFF4' },
            { icon: '❓', title: 'Dúvidas Frequentes', subtitle: 'Respostas às perguntas mais comuns', route: '/(screens)/faq', color: '#FFF8F0' },
            { icon: '🕊️', title: 'Espaço de Acolhimento', subtitle: 'Suporte em perdas e prematuridade', route: '/(screens)/support', color: '#FDF0F5' },
          ].map((item) => (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.8}
              style={{
                backgroundColor: item.color,
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EDD9E0',
              }}
            >
              <Text style={{ fontSize: 28, marginRight: 14 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#2D1B2E' }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 2 }}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#C9748F" />
            </TouchableOpacity>
          ))}

          {/* GESTAR Updates */}
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginTop: 8, marginBottom: 12 }}>
            Projeto GESTAR
          </Text>
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6BAF8A', marginRight: 8 }} />
              <Text style={{ fontSize: 12, color: '#6BAF8A', fontWeight: '600' }}>ATUALIZAÇÃO RECENTE</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>
              Nova vitória legislativa: PL 2.630/2023
            </Text>
            <Text style={{ fontSize: 13, color: '#8B7B8B', lineHeight: 20 }}>
              O projeto de lei que garante cobertura obrigatória de anticoagulantes para gestantes com trombofilia avança no Congresso Nacional.
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/community')} style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 13, color: '#C9748F', fontWeight: '600' }}>Ver mais na Comunidade →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
