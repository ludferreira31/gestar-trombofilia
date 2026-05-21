import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';

const PREMIUM_FEATURES = [
  { icon: '📚', title: 'Todos os Guias Especializados', desc: '15+ guias exclusivos sobre trombofilia e gestação' },
  { icon: '📝', title: 'Plano de Parto Digital', desc: 'Crie e compartilhe seu plano de parto personalizado' },
  { icon: '🔬', title: 'Linha do Tempo FIV Completa', desc: 'Acompanhamento detalhado de todas as fases do tratamento' },
  { icon: '💊', title: 'Controle de Medicações Avançado', desc: 'Alertas inteligentes e histórico completo' },
  { icon: '📊', title: 'Relatórios e Evolução', desc: 'Gráficos e relatórios do seu acompanhamento' },
  { icon: '👩‍⚕️', title: 'Acesso à Consultoria', desc: 'Canal direto com a equipe especializada' },
  { icon: '📁', title: 'Armazenamento de Documentos', desc: 'Guarde laudos, receitas e exames com segurança' },
  { icon: '🌟', title: 'Conteúdo Exclusivo', desc: 'Atualizações, webinars e materiais educativos' },
];

const PLANS = [
  {
    id: 'monthly',
    label: 'Mensal',
    price: 'R$ 29,90',
    period: '/mês',
    badge: null,
    color: '#8B6F9E',
  },
  {
    id: 'quarterly',
    label: 'Trimestral',
    price: 'R$ 69,90',
    period: '/3 meses',
    badge: '🔥 Mais Popular',
    color: '#C9748F',
  },
  {
    id: 'annual',
    label: 'Anual',
    price: 'R$ 199,90',
    period: '/ano',
    badge: '💜 Melhor Valor',
    color: '#7BB8D4',
  },
];

export default function PremiumScreen() {
  const router = useRouter();
  const { isPremium, activatePremium } = useUser();

  const handleSubscribe = async (planId: string) => {
    Alert.alert(
      'Ativar Premium',
      'Em breve você será redirecionada para o pagamento seguro. Por enquanto, ative o modo demo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ativar Demo',
          onPress: async () => {
            await activatePremium();
            Alert.alert('Premium Ativado! 💜', 'Bem-vinda à área premium do Gestar com Trombofilia!', [
              { text: 'Explorar', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  if (isPremium) {
    return (
      <ScreenContainer>
        <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <MaterialIcons name="arrow-back-ios" size={22} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Área Premium</Text>
        </View>
        <ScrollView>
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: 60, marginBottom: 16 }}>💜</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 8 }}>Você é Premium!</Text>
            <Text style={{ fontSize: 16, color: '#8B7B8B', textAlign: 'center', lineHeight: 24 }}>
              Você tem acesso a todos os recursos exclusivos do Gestar com Trombofilia.
            </Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Área Premium</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Acesso completo ao Gestar</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Hero */}
          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1.5, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>💜</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 }}>
              Sua jornada merece suporte completo
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22 }}>
              Acesse todos os guias especializados, recursos avançados e suporte da consultoria de trombofilia.
            </Text>
          </View>

          {/* Features */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>O que você terá acesso</Text>
          {PREMIUM_FEATURES.map((feature, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center', marginRight: 14, flexShrink: 0 }}>
                <Text style={{ fontSize: 22 }}>{feature.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E' }}>{feature.title}</Text>
                <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>{feature.desc}</Text>
              </View>
              <MaterialIcons name="check-circle" size={20} color="#6BAF8A" />
            </View>
          ))}

          {/* Plans */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginTop: 8, marginBottom: 14 }}>Escolha seu plano</Text>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => handleSubscribe(plan.id)}
              activeOpacity={0.85}
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                padding: 18,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: plan.badge ? plan.color : '#EDD9E0',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E' }}>{plan.label}</Text>
                  {plan.badge && (
                    <View style={{ backgroundColor: plan.color, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>{plan.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: plan.color }}>
                  {plan.price}<Text style={{ fontSize: 14, fontWeight: '400', color: '#8B7B8B' }}>{plan.period}</Text>
                </Text>
              </View>
              <View style={{ backgroundColor: plan.color, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Assinar</Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8B7B8B', marginTop: 8, lineHeight: 18 }}>
            Cancele a qualquer momento. Pagamento seguro.{'\n'}
            Ao assinar, você concorda com os Termos de Uso.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
