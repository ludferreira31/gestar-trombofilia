import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const CAMPAIGNS = [
  {
    id: '1',
    title: 'Outubro Rosa + Trombofilia',
    subtitle: 'Conscientização sobre saúde feminina e trombofilia',
    description: 'Campanha anual que une o Outubro Rosa com a conscientização sobre trombofilia e saúde gestacional feminina.',
    color: '#C9748F',
    icon: '🎀',
    active: true,
  },
  {
    id: '2',
    title: 'Dia da Trombofilia',
    subtitle: '13 de outubro — Dia Mundial da Trombose',
    description: 'Ações educativas, lives e materiais informativos sobre trombofilia e suas implicações na gestação.',
    color: '#8B6F9E',
    icon: '💜',
    active: false,
  },
  {
    id: '3',
    title: 'Bebês Arco-Íris',
    subtitle: 'Celebrando cada vida conquistada',
    description: 'Campanha de valorização e celebração dos bebês nascidos após perdas gestacionais e tratamento de trombofilia.',
    color: '#6BAF8A',
    icon: '🌈',
    active: true,
  },
  {
    id: '4',
    title: 'Enoxaparina para Todas',
    subtitle: 'Acesso universal ao tratamento',
    description: 'Campanha pela ampliação do acesso à enoxaparina e outros anticoagulantes para gestantes com trombofilia no SUS.',
    color: '#7BB8D4',
    icon: '💉',
    active: true,
  },
];

export default function CampaignsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#E8B86D', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Campanhas</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Conscientização e ação</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {CAMPAIGNS.map((campaign) => (
            <View key={campaign.id} style={{ backgroundColor: 'white', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
                <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: campaign.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 28 }}>{campaign.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', flex: 1 }}>{campaign.title}</Text>
                    {campaign.active && (
                      <View style={{ backgroundColor: '#F0FFF4', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 10, color: '#6BAF8A', fontWeight: '700' }}>ATIVA</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 12, color: campaign.color, fontWeight: '600' }}>{campaign.subtitle}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{campaign.description}</Text>
              <TouchableOpacity style={{ backgroundColor: campaign.color, borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 14 }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Participar da Campanha</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
