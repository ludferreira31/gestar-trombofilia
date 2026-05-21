import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const UPDATES = [
  {
    id: '1',
    version: 'v1.0',
    date: 'Maio 2026',
    title: 'Lançamento do Gestar com Trombofilia',
    content: 'Lançamento oficial do aplicativo com todos os módulos principais: Jornada Gestacional, Manual do Gestar, Comunidade e Recursos Inteligentes.',
    highlights: ['Linha do Tempo Gestacional', 'Controle de Medicações', '15 Guias Especializados', 'Comunidade Gestar', 'Área FIV'],
    type: 'launch',
  },
  {
    id: '2',
    version: 'Em breve',
    date: 'Próximas versões',
    title: 'O que vem por aí',
    content: 'Estamos trabalhando em novas funcionalidades para tornar o Gestar ainda mais completo e útil para sua jornada.',
    highlights: ['Sincronização na nuvem', 'Relatórios em PDF', 'Integração com wearables', 'Telemedicina integrada', 'Grupos de apoio ao vivo'],
    type: 'upcoming',
  },
];

export default function GSTARScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Projeto GSTAR</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Atualizações e novidades</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 20, padding: 20, marginBottom: 20, alignItems: 'center', borderWidth: 1.5, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>🌟</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 }}>
              Projeto GSTAR
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22 }}>
              O Gestar com Trombofilia é um projeto vivo, que cresce com a comunidade. Acompanhe as novidades e faça parte dessa história.
            </Text>
          </View>

          {UPDATES.map((update) => (
            <View key={update.id} style={{ backgroundColor: 'white', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ backgroundColor: update.type === 'launch' ? '#F0FFF4' : '#FFF8F0', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, marginRight: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: update.type === 'launch' ? '#6BAF8A' : '#E8B86D' }}>{update.version}</Text>
                </View>
                <Text style={{ fontSize: 13, color: '#8B7B8B' }}>{update.date}</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>{update.title}</Text>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22, marginBottom: 14 }}>{update.content}</Text>
              <View style={{ backgroundColor: update.type === 'launch' ? '#F0FFF4' : '#FFF8F0', borderRadius: 14, padding: 14 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: update.type === 'launch' ? '#6BAF8A' : '#E8B86D', marginBottom: 8 }}>
                  {update.type === 'launch' ? '✅ Incluído nesta versão' : '🔜 Em desenvolvimento'}
                </Text>
                {update.highlights.map((h, i) => (
                  <Text key={i} style={{ fontSize: 13, color: '#2D1B2E', marginBottom: 4 }}>• {h}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
