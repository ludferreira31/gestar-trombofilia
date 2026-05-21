import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const FAQ_ITEMS = [
  {
    category: '🩸 Trombofilia',
    questions: [
      {
        q: 'O que é trombofilia?',
        a: 'Trombofilia é uma condição em que o sangue tem maior tendência a coagular (formar coágulos). Pode ser hereditária (genética) ou adquirida. Na gestação, pode aumentar o risco de trombose, perda gestacional, pré-eclâmpsia e outras complicações.',
      },
      {
        q: 'Quais são os tipos mais comuns de trombofilia?',
        a: 'As mais comuns incluem: Síndrome do Anticorpo Antifosfolípide (SAF), Fator V de Leiden, Mutação da Protrombina G20210A, Deficiência de Proteína C, Proteína S ou Antitrombina III, e mutações no gene MTHFR.',
      },
      {
        q: 'Trombofilia impede de engravidar?',
        a: 'Não necessariamente. Com acompanhamento médico especializado e tratamento adequado, muitas mulheres com trombofilia têm gestações bem-sucedidas. O diagnóstico e tratamento precoces são fundamentais.',
      },
    ],
  },
  {
    category: '💊 Tratamento',
    questions: [
      {
        q: 'Por que preciso de enoxaparina na gestação?',
        a: 'A enoxaparina é uma heparina de baixo peso molecular que previne a formação de coágulos. Na gestação com trombofilia, ela ajuda a manter o fluxo sanguíneo adequado para a placenta e reduz o risco de complicações.',
      },
      {
        q: 'Posso amamentar usando enoxaparina?',
        a: 'Sim! A enoxaparina não passa para o leite materno em quantidades significativas e é considerada segura durante a amamentação. Sempre confirme com seu médico.',
      },
      {
        q: 'Quando devo suspender a enoxaparina antes do parto?',
        a: 'Geralmente, a enoxaparina profilática é suspensa 12-24 horas antes do parto programado. Para doses terapêuticas, pode ser necessário suspender 24-48 horas antes. Seu médico definirá o protocolo específico para o seu caso.',
      },
    ],
  },
  {
    category: '🤰 Gestação',
    questions: [
      {
        q: 'Com que frequência devo fazer ultrassom?',
        a: 'Gestantes com trombofilia geralmente têm monitoramento mais frequente. Além dos ultrassons de rotina (morfológico, crescimento), podem ser necessários dopplers mensais ou quinzenais a partir do 2º trimestre, dependendo do caso.',
      },
      {
        q: 'O que é o doppler obstétrico?',
        a: 'O doppler avalia o fluxo sanguíneo nos vasos do útero, placenta e feto. Permite detectar precocemente sinais de insuficiência placentária, que pode ser mais comum em mulheres com trombofilia.',
      },
      {
        q: 'Posso ter parto normal com trombofilia?',
        a: 'Sim, em muitos casos. A decisão depende de vários fatores: tipo de trombofilia, medicações em uso, histórico obstétrico e condições do momento do parto. Discuta com seu obstetra e hematologista.',
      },
    ],
  },
  {
    category: '🔬 FIV',
    questions: [
      {
        q: 'Trombofilia afeta o tratamento de FIV?',
        a: 'Sim. A trombofilia pode estar associada a falhas de implantação e perdas precoces em FIV. O uso de anticoagulantes durante o protocolo pode ser indicado em alguns casos. Discuta com seu especialista em reprodução assistida.',
      },
      {
        q: 'Preciso de anticoagulante durante a estimulação ovariana?',
        a: 'Depende do tipo de trombofilia e do protocolo da clínica. A síndrome de hiperestimulação ovariana (SHO) aumenta o risco de trombose, e nesse contexto a anticoagulação pode ser indicada.',
      },
    ],
  },
];

export default function FAQScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#E8B86D', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Dúvidas Frequentes</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Respostas para suas perguntas</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {FAQ_ITEMS.map((category) => (
            <View key={category.category} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>{category.category}</Text>
              {category.questions.map((item, i) => {
                const key = `${category.category}-${i}`;
                const isExpanded = expanded === key;
                return (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <TouchableOpacity
                      onPress={() => setExpanded(isExpanded ? null : key)}
                      activeOpacity={0.8}
                      style={{
                        backgroundColor: isExpanded ? '#FFF8F0' : 'white',
                        borderRadius: 14,
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: isExpanded ? '#E8B86D' : '#EDD9E0',
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#2D1B2E', lineHeight: 22 }}>{item.q}</Text>
                      <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={22} color="#E8B86D" />
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={{ backgroundColor: '#FFF8F0', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E8B86D', borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -4 }}>
                        <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 24 }}>{item.a}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}

          {/* Consultoria CTA */}
          <TouchableOpacity
            onPress={() => router.push('/(screens)/services')}
            style={{ backgroundColor: '#C9748F', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>💬</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Ainda tem dúvidas?</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 3 }}>
                Conheça nossa consultoria especializada em trombofilia
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
