import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';

const BIRTH_PLAN_KEY = '@gestar:birth_plan';

interface BirthPlanData {
  name: string;
  hospital: string;
  obstetra: string;
  companion: string;
  birthType: string;
  painManagement: string;
  cordClamping: string;
  skinToSkin: string;
  breastfeeding: string;
  enoxaLastDose: string;
  anticoagulationPlan: string;
  anesthesia: string;
  episiotomy: string;
  babyPreferences: string;
  additionalNotes: string;
}

const SECTIONS = [
  {
    title: '👤 Identificação',
    fields: [
      { key: 'name', label: 'Nome da Paciente', placeholder: 'Seu nome completo' },
      { key: 'hospital', label: 'Hospital / Maternidade', placeholder: 'Local do parto' },
      { key: 'obstetra', label: 'Obstetra Responsável', placeholder: 'Nome do médico' },
      { key: 'companion', label: 'Acompanhante', placeholder: 'Nome do acompanhante' },
    ],
  },
  {
    title: '🩺 Trombofilia e Anticoagulação',
    fields: [
      { key: 'enoxaLastDose', label: 'Última Dose de Enoxaparina', placeholder: 'Data e hora da última aplicação' },
      { key: 'anticoagulationPlan', label: 'Plano de Anticoagulação no Parto', placeholder: 'Ex: Suspender 24h antes, reiniciar 6h após...' },
      { key: 'anesthesia', label: 'Preferência de Anestesia', placeholder: 'Ex: Peridural, Raqui, Geral...' },
    ],
  },
  {
    title: '🤰 Trabalho de Parto',
    fields: [
      { key: 'birthType', label: 'Tipo de Parto Desejado', placeholder: 'Ex: Normal, Cesárea programada...' },
      { key: 'painManagement', label: 'Manejo da Dor', placeholder: 'Ex: Peridural, métodos não farmacológicos...' },
      { key: 'episiotomy', label: 'Episiotomia', placeholder: 'Ex: Somente se necessário, evitar...' },
    ],
  },
  {
    title: '👶 Nascimento e Pós-Parto',
    fields: [
      { key: 'cordClamping', label: 'Clampeamento do Cordão', placeholder: 'Ex: Clampeamento tardio (2-3 min)' },
      { key: 'skinToSkin', label: 'Contato Pele a Pele', placeholder: 'Ex: Imediatamente após o nascimento' },
      { key: 'breastfeeding', label: 'Amamentação', placeholder: 'Ex: Na primeira hora de vida' },
      { key: 'babyPreferences', label: 'Preferências para o Bebê', placeholder: 'Ex: Vitamina K oral, sem fórmula...' },
    ],
  },
  {
    title: '📝 Observações Adicionais',
    fields: [
      { key: 'additionalNotes', label: 'Notas Importantes', placeholder: 'Outras preferências, alergias, medos...' },
    ],
  },
];

export default function BirthPlanScreen() {
  const router = useRouter();
  const { profile, isPremium } = useUser();
  const [data, setData] = useState<BirthPlanData>({
    name: profile?.name || '', hospital: '', obstetra: '', companion: '',
    birthType: '', painManagement: '', cordClamping: 'Clampeamento tardio (mínimo 2 minutos)',
    skinToSkin: 'Imediatamente após o nascimento, se possível',
    breastfeeding: 'Na primeira hora de vida', enoxaLastDose: '',
    anticoagulationPlan: '', anesthesia: '', episiotomy: 'Somente se estritamente necessário',
    babyPreferences: '', additionalNotes: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    AsyncStorage.getItem(BIRTH_PLAN_KEY).then((val: string | null) => {
      if (val) setData(JSON.parse(val));
    });
  }, []);

  const handleSave = async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(BIRTH_PLAN_KEY, JSON.stringify(data));
    setEditing(false);
    Alert.alert('Salvo! 💜', 'Seu plano de parto foi salvo com sucesso.');
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Plano de Parto Digital</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Personalizado para trombofilia</Text>
        </View>
        <TouchableOpacity
          onPress={editing ? handleSave : () => setEditing(true)}
          style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}
        >
          <MaterialIcons name={editing ? 'check' : 'edit'} size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {/* Intro */}
          <View style={{ backgroundColor: '#FFF0F3', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#C9748F', marginBottom: 6 }}>📝 Sobre o Plano de Parto</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Este plano foi desenvolvido especialmente para mulheres com trombofilia, incluindo seções específicas sobre anticoagulação e cuidados especiais durante o parto.
            </Text>
          </View>

          {/* Thrombophilia Warning */}
          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1.5, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#E8B86D', marginBottom: 6 }}>⚠️ Atenção Especial — Trombofilia</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Informe sempre sua equipe sobre o uso de anticoagulantes. A anestesia peridural pode ser contraindicada dependendo da última dose de heparina. Discuta o plano de anticoagulação com seu hematologista e obstetra com antecedência.
            </Text>
          </View>

          {SECTIONS.map((section) => (
            <View key={section.title} style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>{section.title}</Text>
              {section.fields.map((field) => (
                <View key={field.key} style={{ marginBottom: 14 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#8B7B8B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</Text>
                  {editing ? (
                    <TextInput
                      value={(data as any)[field.key]}
                      onChangeText={(v) => setData(d => ({ ...d, [field.key]: v }))}
                      placeholder={field.placeholder}
                      placeholderTextColor="#C0B0C0"
                      multiline
                      textAlignVertical="top"
                      style={{ backgroundColor: '#FDF8F5', borderRadius: 10, padding: 12, fontSize: 14, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', minHeight: 50 }}
                    />
                  ) : (
                    <Text style={{ fontSize: 14, color: (data as any)[field.key] ? '#2D1B2E' : '#C0B0C0', lineHeight: 22 }}>
                      {(data as any)[field.key] || 'Não definido'}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}

          {editing && (
            <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#C9748F', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Salvar Plano de Parto</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
