import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const PARTNERS = [
  { icon: '🏥', name: 'Clínicas Parceiras', desc: 'Rede de clínicas especializadas em trombofilia e gestação de alto risco', benefit: 'Desconto em consultas', color: '#C9748F' },
  { icon: '🧪', name: 'Laboratórios', desc: 'Laboratórios com expertise em exames de trombofilia', benefit: 'Preços especiais em exames', color: '#8B6F9E' },
  { icon: '💊', name: 'Farmácias Parceiras', desc: 'Farmácias com desconto em medicamentos para trombofilia', benefit: 'Até 20% de desconto', color: '#6BAF8A' },
  { icon: '📚', name: 'Educação e Cursos', desc: 'Plataformas educacionais sobre saúde materna', benefit: 'Acesso gratuito a cursos', color: '#7BB8D4' },
  { icon: '🧘', name: 'Bem-Estar', desc: 'Profissionais de saúde integrativa para gestantes', benefit: 'Primeira consulta gratuita', color: '#E8A598' },
];

export default function PartnersScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#6BAF8A', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Parceiros e Benefícios</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Vantagens exclusivas para você</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F0FFF4', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#6BAF8A' }}>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Como paciente do GESTAR, você tem acesso a benefícios exclusivos junto aos nossos parceiros.
            </Text>
          </View>

          {PARTNERS.map((partner, i) => (
            <View key={i} style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: partner.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 26 }}>{partner.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E' }}>{partner.name}</Text>
                  <View style={{ backgroundColor: partner.color + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 4 }}>
                    <Text style={{ fontSize: 11, color: partner.color, fontWeight: '700' }}>🎁 {partner.benefit}</Text>
                  </View>
                </View>
              </View>
              <Text style={{ fontSize: 13, color: '#8B7B8B', lineHeight: 20 }}>{partner.desc}</Text>
            </View>
          ))}

          <View style={{ backgroundColor: '#FFF0F3', borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#C9748F', marginBottom: 6 }}>💜 Seja um Parceiro</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Sua empresa ou clínica quer fazer parte da rede Gestar? Entre em contato conosco para conhecer as oportunidades de parceria.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
