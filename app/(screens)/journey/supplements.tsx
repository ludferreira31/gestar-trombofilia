import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const SUPPLEMENTS = [
  { name: 'Ácido Fólico / Metilfolato', dose: '800mcg – 5mg/dia', icon: '🌿', color: '#6BAF8A', importance: 'Essencial', description: 'Prevenção de defeitos do tubo neural. Para MTHFR, prefira metilfolato.' },
  { name: 'Vitamina D', dose: '1.000 – 4.000 UI/dia', icon: '☀️', color: '#E8B86D', importance: 'Importante', description: 'Deficiência associada a complicações gestacionais. Dosar e suplementar conforme resultado.' },
  { name: 'Ômega-3', dose: '1g – 2g/dia', icon: '🐟', color: '#7BB8D4', importance: 'Recomendado', description: 'Propriedades anti-inflamatórias. Benefício para saúde cardiovascular e placentária.' },
  { name: 'Ferro', dose: 'Conforme exame', icon: '🔴', color: '#D4697A', importance: 'Monitorar', description: 'Previne anemia gestacional. Monitorar com hemograma periódico.' },
  { name: 'Vitamina B12', dose: 'Conforme orientação', icon: '💊', color: '#8B6F9E', importance: 'Importante', description: 'Especialmente para MTHFR, vegetarianas ou veganas.' },
  { name: 'Cálcio', dose: '1.000 – 1.200mg/dia', icon: '🦴', color: '#C9748F', importance: 'Recomendado', description: 'Saúde óssea e prevenção de pré-eclâmpsia.' },
  { name: 'Magnésio', dose: '200 – 400mg/dia', icon: '⚡', color: '#6BAF8A', importance: 'Recomendado', description: 'Reduz cãibras e apoia função muscular.' },
  { name: 'Zinco', dose: 'Conforme orientação', icon: '🔬', color: '#7BB8D4', importance: 'Monitorar', description: 'Importante para imunidade e desenvolvimento fetal.' },
];

const IMPORTANCE_COLORS: Record<string, string> = {
  'Essencial': '#D4697A',
  'Importante': '#C9748F',
  'Recomendado': '#6BAF8A',
  'Monitorar': '#E8B86D',
};

export default function SupplementsScreen() {
  const router = useRouter();
  const [checkedSupps, setCheckedSupps] = useState<string[]>([]);

  const toggleCheck = (name: string) => {
    setCheckedSupps(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#6BAF8A', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Suplementação</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Vitaminas e minerais essenciais</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F0FFF4', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#6BAF8A' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#6BAF8A', marginBottom: 4 }}>💡 Lembrete</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Sempre consulte seu médico antes de iniciar ou alterar qualquer suplementação. As doses indicadas são referências gerais.
            </Text>
          </View>

          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Checklist de Suplementação</Text>
          <Text style={{ fontSize: 13, color: '#8B7B8B', marginBottom: 16 }}>
            Marque os suplementos que você já toma regularmente.
          </Text>

          {SUPPLEMENTS.map((supp) => {
            const isChecked = checkedSupps.includes(supp.name);
            return (
              <TouchableOpacity
                key={supp.name}
                onPress={() => toggleCheck(supp.name)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: isChecked ? '#F0FFF4' : 'white',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  borderWidth: 1.5,
                  borderColor: isChecked ? '#6BAF8A' : '#EDD9E0',
                }}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isChecked ? '#6BAF8A' : '#F0F0F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                  flexShrink: 0,
                }}>
                  {isChecked ? (
                    <MaterialIcons name="check" size={20} color="white" />
                  ) : (
                    <Text style={{ fontSize: 20 }}>{supp.icon}</Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', flex: 1 }}>{supp.name}</Text>
                    <View style={{ backgroundColor: IMPORTANCE_COLORS[supp.importance] + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 10, color: IMPORTANCE_COLORS[supp.importance], fontWeight: '700' }}>{supp.importance}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, color: supp.color, fontWeight: '600', marginBottom: 3 }}>{supp.dose}</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B8B', lineHeight: 18 }}>{supp.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
