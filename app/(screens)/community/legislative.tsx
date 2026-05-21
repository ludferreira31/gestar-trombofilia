import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const VICTORIES = [
  {
    id: '1',
    title: 'Cobertura de Enoxaparina pelo SUS',
    date: '2024',
    description: 'Ampliação da cobertura de heparinas de baixo peso molecular para gestantes com trombofilia pelo Sistema Único de Saúde.',
    status: 'Conquistada',
    icon: '🏆',
  },
  {
    id: '2',
    title: 'Protocolo de Investigação de Perdas Gestacionais',
    date: '2023',
    description: 'Publicação de protocolo nacional para investigação de perdas gestacionais recorrentes, incluindo pesquisa de trombofilias.',
    status: 'Conquistada',
    icon: '📋',
  },
  {
    id: '3',
    title: 'Inclusão da SAF nos Protocolos de Alto Risco',
    date: '2023',
    description: 'Reconhecimento formal da Síndrome Antifosfolípide como condição de alto risco gestacional nos protocolos do Ministério da Saúde.',
    status: 'Conquistada',
    icon: '✅',
  },
  {
    id: '4',
    title: 'Acesso a Exames de Trombofilia pelo SUS',
    date: 'Em andamento',
    description: 'Campanha para ampliação do acesso a exames diagnósticos de trombofilia hereditária e adquirida pela rede pública.',
    status: 'Em andamento',
    icon: '⚖️',
  },
];

export default function LegislativeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Vitórias Legislativas</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Conquistas da comunidade</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F5F0FF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#8B6F9E' }}>
            <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>
              A luta por direitos das mulheres com trombofilia é contínua. Cada vitória é resultado do esforço coletivo da nossa comunidade.
            </Text>
          </View>

          {VICTORIES.map((victory) => (
            <View key={victory.id} style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: victory.status === 'Conquistada' ? '#6BAF8A' : '#E8B86D' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 28, marginRight: 12 }}>{victory.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>{victory.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{victory.date}</Text>
                    <View style={{ backgroundColor: victory.status === 'Conquistada' ? '#F0FFF4' : '#FFF8F0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 11, color: victory.status === 'Conquistada' ? '#6BAF8A' : '#E8B86D', fontWeight: '700' }}>
                        {victory.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{victory.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
