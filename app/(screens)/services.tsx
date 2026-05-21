import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const SERVICES = [
  {
    icon: '💜',
    title: 'Consultoria Gestacional',
    subtitle: 'Acompanhamento personalizado para gestantes com trombofilia',
    description: 'Suporte especializado durante toda a gestação, com orientação sobre medicações, exames, dopplers e cuidados específicos para trombofilia.',
    color: '#C9748F',
    bg: '#FFF0F3',
  },
  {
    icon: '🔬',
    title: 'Consultoria FIV',
    subtitle: 'Apoio especializado durante o tratamento de reprodução assistida',
    description: 'Acompanhamento durante todas as fases do tratamento FIV, com orientação sobre anticoagulação, medicações e cuidados específicos.',
    color: '#7BB8D4',
    bg: '#F0F8FF',
  },
  {
    icon: '🌱',
    title: 'Consultoria Pré-Concepcional',
    subtitle: 'Preparação para a gestação com trombofilia',
    description: 'Orientação para tentantes com trombofilia: exames necessários, suplementação, medicações e preparação do organismo para a gestação.',
    color: '#6BAF8A',
    bg: '#F0FFF4',
  },
  {
    icon: '🔍',
    title: 'Investigação de Perdas',
    subtitle: 'Apoio para mulheres com histórico de perdas gestacionais',
    description: 'Orientação sobre investigação de causas de perdas gestacionais recorrentes, incluindo trombofilias e outras condições.',
    color: '#8B6F9E',
    bg: '#F5F0FF',
  },
];

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nossos Serviços</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Consultoria especializada em trombofilia</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {/* Hero */}
          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 20, padding: 20, marginBottom: 20, alignItems: 'center', borderWidth: 1.5, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>💜</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 }}>
              Gestar com Trombofilia
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22 }}>
              Consultoria especializada para mulheres com trombofilia em todas as fases da jornada gestacional.
            </Text>
          </View>

          {SERVICES.map((service, i) => (
            <View key={i} style={{ backgroundColor: service.bg, borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: service.color + '40' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: service.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 26 }}>{service.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E' }}>{service.title}</Text>
                  <Text style={{ fontSize: 12, color: service.color, fontWeight: '600', marginTop: 2 }}>{service.subtitle}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{service.description}</Text>
            </View>
          ))}

          {/* CTA */}
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/5500000000000')}
            style={{ backgroundColor: '#25D366', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>💬</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Falar com a Consultoria</Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 3 }}>
                Entre em contato via WhatsApp
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(screens)/premium')}
            style={{ backgroundColor: '#C9748F', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>💜</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Área Premium</Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 3 }}>
                Acesse todos os recursos exclusivos
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
