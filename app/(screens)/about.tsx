import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sobre o Gestar</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 60, marginBottom: 12 }}>💜</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center' }}>
              GESTAR
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', marginTop: 8, lineHeight: 22 }}>
              Plataforma de suporte, educação e acompanhamento para mulheres com trombofilia
            </Text>
          </View>

          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#C9748F', marginBottom: 10 }}>Nossa Missão</Text>
            <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 24 }}>
              Oferecer suporte especializado, educação de qualidade e acompanhamento humanizado para mulheres com trombofilia em todas as fases de sua jornada gestacional — desde a fase pré-concepcional até o pós-parto.
            </Text>
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>🌟 O Projeto GESTAR</Text>
            <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 24 }}>
              O GESTAR nasceu da necessidade real de mulheres que enfrentam os desafios da trombofilia na gestação. Nosso projeto une ciência, humanização e tecnologia para criar uma plataforma que realmente faz diferença na vida das pacientes.
            </Text>
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>💜 Nossos Valores</Text>
            {[
              { icon: '🤝', title: 'Humanização', desc: 'Cada paciente é única. Tratamos cada história com respeito e empatia.' },
              { icon: '🔬', title: 'Ciência', desc: 'Baseados em evidências científicas atualizadas.' },
              { icon: '🌐', title: 'Acessibilidade', desc: 'Informação de qualidade para todas as mulheres.' },
              { icon: '👥', title: 'Comunidade', desc: 'Juntas somos mais fortes. A comunidade é o coração do projeto.' },
            ].map((value, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: i < 3 ? 14 : 0 }}>
                <Text style={{ fontSize: 22, marginRight: 12 }}>{value.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E' }}>{value.title}</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>{value.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ backgroundColor: '#FFF0F3', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#C9748F', marginBottom: 6 }}>⚠️ Aviso Legal</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              O GESTAR é uma plataforma educativa e de suporte. As informações fornecidas não substituem a consulta médica individualizada. Sempre consulte sua equipe de saúde para decisões sobre seu tratamento.
            </Text>
          </View>

          <Text style={{ textAlign: 'center', color: '#8B7B8B', fontSize: 12, marginTop: 24, lineHeight: 18 }}>
            GESTAR v1.0{'\n'}
            Feito com 💜 para todas as guerreiras
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
