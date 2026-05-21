import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const STEPS = [
  { step: 1, title: 'Prepare o material', description: 'Separe a seringa de enoxaparina, algodão e álcool 70%. Lave as mãos com água e sabão.', icon: '🧴' },
  { step: 2, title: 'Escolha o local', description: 'Prefira o abdômen (região lateral, afastada do umbigo), coxas ou braços. Alterne os locais a cada aplicação.', icon: '📍' },
  { step: 3, title: 'Limpe a área', description: 'Limpe o local com algodão embebido em álcool 70% e aguarde secar.', icon: '🧹' },
  { step: 4, title: 'Faça a prega', description: 'Com o polegar e o indicador, faça uma prega na pele (levante suavemente a pele).', icon: '🤏' },
  { step: 5, title: 'Aplique', description: 'Insira a agulha em ângulo de 90°. Injete o medicamento lentamente. Mantenha a prega durante toda a aplicação.', icon: '💉' },
  { step: 6, title: 'Retire a agulha', description: 'Retire a agulha no mesmo ângulo que inseriu. Solte a prega. Não massageie o local.', icon: '✅' },
  { step: 7, title: 'Descarte correto', description: 'Descarte a seringa usada em recipiente rígido (coletor de perfurocortantes). Nunca reutilize.', icon: '♻️' },
];

const TIPS = [
  'Aplique sempre no mesmo horário para manter níveis estáveis do medicamento.',
  'Se esquecer uma dose, aplique assim que lembrar (se não estiver próximo da próxima dose).',
  'Nunca duplique a dose sem orientação médica.',
  'Pequenos hematomas no local são normais. Se houver sangramento excessivo, consulte seu médico.',
  'Mantenha a enoxaparina em temperatura ambiente (15-30°C), protegida da luz.',
  'Informe sempre sobre o uso de enoxaparina antes de qualquer procedimento cirúrgico ou parto.',
];

export default function EnoxaparinaScreen() {
  const router = useRouter();
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const toggleStep = (step: number) => {
    setCheckedSteps(prev => prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]);
  };

  const resetSteps = () => setCheckedSteps([]);

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#D4697A', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Enoxaparina</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Guia de aplicação e lembretes</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Progress */}
          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>Checklist de Aplicação</Text>
              <TouchableOpacity onPress={resetSteps}>
                <Text style={{ fontSize: 13, color: '#D4697A', fontWeight: '600' }}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#F0F0F0', borderRadius: 8, height: 8, marginBottom: 8 }}>
              <View style={{ backgroundColor: '#D4697A', borderRadius: 8, height: 8, width: `${(checkedSteps.length / STEPS.length) * 100}%` }} />
            </View>
            <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{checkedSteps.length} de {STEPS.length} passos concluídos</Text>
          </View>

          {/* Steps */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Passo a Passo</Text>
          {STEPS.map((step) => {
            const isChecked = checkedSteps.includes(step.step);
            return (
              <TouchableOpacity
                key={step.step}
                onPress={() => toggleStep(step.step)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: isChecked ? '#FFF0F0' : 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  borderWidth: 1.5,
                  borderColor: isChecked ? '#D4697A' : '#EDD9E0',
                }}
              >
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: isChecked ? '#D4697A' : '#F0F0F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                  flexShrink: 0,
                }}>
                  {isChecked ? (
                    <MaterialIcons name="check" size={20} color="white" />
                  ) : (
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#8B7B8B' }}>{step.step}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>{step.icon}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: isChecked ? '#D4697A' : '#2D1B2E' }}>{step.title}</Text>
                  </View>
                  <Text style={{ fontSize: 13, color: '#8B7B8B', lineHeight: 20 }}>{step.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Tips */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginTop: 8, marginBottom: 12 }}>Dicas Importantes</Text>
          {TIPS.map((tip, i) => (
            <View key={i} style={{ backgroundColor: '#FFF0F0', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, marginRight: 10, marginTop: 1 }}>💡</Text>
              <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20, flex: 1 }}>{tip}</Text>
            </View>
          ))}

          {/* Warning */}
          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1.5, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#E8B86D', marginBottom: 6 }}>⚠️ Atenção</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Nunca interrompa a enoxaparina sem orientação médica. Em caso de cirurgia, parto ou procedimento invasivo, informe sempre sobre o uso do anticoagulante.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
