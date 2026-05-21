import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const HISTORY_KEY = '@gestar:clinical_history';

interface ClinicalHistory {
  previousPregnancies: string;
  pregnancyLosses: string;
  thrombosisHistory: string;
  familyHistory: string;
  previousSurgeries: string;
  chronicConditions: string;
  previousMedications: string;
  observations: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const [data, setData] = useState<ClinicalHistory>({
    previousPregnancies: '', pregnancyLosses: '', thrombosisHistory: '',
    familyHistory: '', previousSurgeries: '', chronicConditions: '',
    previousMedications: '', observations: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    AsyncStorage.getItem(HISTORY_KEY).then((val: string | null) => {
      if (val) setData(JSON.parse(val));
    });
  }, []);

  const handleSave = async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(data));
    setEditing(false);
    Alert.alert('Salvo!', 'Histórico clínico atualizado.');
  };

  const fields = [
    { key: 'previousPregnancies', label: 'Gestações Anteriores', placeholder: 'Ex: 2 gestações, 1 parto normal, 1 cesárea' },
    { key: 'pregnancyLosses', label: 'Perdas Gestacionais', placeholder: 'Ex: 2 abortos espontâneos, 1 óbito fetal' },
    { key: 'thrombosisHistory', label: 'Histórico de Trombose', placeholder: 'Ex: TVP em 2020, TEP em 2022' },
    { key: 'familyHistory', label: 'Histórico Familiar', placeholder: 'Ex: Mãe com SAF, irmã com Fator V de Leiden' },
    { key: 'previousSurgeries', label: 'Cirurgias Anteriores', placeholder: 'Ex: Apendicectomia 2018, Miomectomia 2021' },
    { key: 'chronicConditions', label: 'Condições Crônicas', placeholder: 'Ex: Lúpus, Hipotireoidismo, Hipertensão' },
    { key: 'previousMedications', label: 'Medicações Anteriores', placeholder: 'Ex: Warfarina por 6 meses em 2020' },
    { key: 'observations', label: 'Observações Gerais', placeholder: 'Outras informações relevantes...' },
  ];

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Histórico Clínico</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Seu histórico médico completo</Text>
        </View>
        <TouchableOpacity onPress={editing ? handleSave : () => setEditing(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name={editing ? 'check' : 'edit'} size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#FFF0F3', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Mantenha seu histórico clínico atualizado. Essas informações são importantes para sua equipe médica e para o acompanhamento da sua saúde.
            </Text>
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#EDD9E0' }}>
            {fields.map((field, index) => (
              <View key={field.key} style={{ marginBottom: index < fields.length - 1 ? 20 : 0 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#8B7B8B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</Text>
                {editing ? (
                  <TextInput
                    value={(data as any)[field.key]}
                    onChangeText={(v) => setData(d => ({ ...d, [field.key]: v }))}
                    placeholder={field.placeholder}
                    placeholderTextColor="#C0B0C0"
                    multiline
                    textAlignVertical="top"
                    style={{ backgroundColor: '#FDF8F5', borderRadius: 10, padding: 12, fontSize: 14, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', minHeight: 60 }}
                  />
                ) : (
                  <Text style={{ fontSize: 14, color: (data as any)[field.key] ? '#2D1B2E' : '#C0B0C0', lineHeight: 22 }}>
                    {(data as any)[field.key] || 'Não informado'}
                  </Text>
                )}
                {index < fields.length - 1 && <View style={{ height: 1, backgroundColor: '#F0F0F0', marginTop: 16 }} />}
              </View>
            ))}
          </View>

          {editing && (
            <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#C9748F', borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Salvar Histórico</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
