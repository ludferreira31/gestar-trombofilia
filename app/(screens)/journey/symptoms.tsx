import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { storage, SymptomRecord, generateId } from '@/lib/storage';
import { useUser } from '@/lib/user-context';

const COMMON_SYMPTOMS = [
  'Dor de cabeça', 'Náuseas', 'Vômitos', 'Cansaço', 'Inchaço nas pernas',
  'Dor abdominal', 'Sangramento', 'Spotting', 'Cólicas', 'Falta de ar',
  'Visão turva', 'Dor no peito', 'Palpitações', 'Tontura', 'Febre',
  'Dor nas costas', 'Contrações', 'Diminuição dos movimentos fetais',
  'Dor no local da injeção', 'Hematoma', 'Pressão alta',
];

export default function SymptomsScreen() {
  const router = useRouter();
  const { gestationalWeek } = useUser();
  const [records, setRecords] = useState<SymptomRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(3);

  const load = useCallback(async () => {
    const data = await storage.getSymptoms();
    setRecords((data || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleSymptom = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSave = async () => {
    if (selected.length === 0) { Alert.alert('Atenção', 'Selecione pelo menos um sintoma.'); return; }
    const record: SymptomRecord = {
      id: generateId(),
      date: new Date().toISOString(),
      symptoms: selected,
      intensity,
    };
    await storage.addSymptom(record);
    setShowModal(false);
    setSelected([]);
    setIntensity(3);
    load();
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const getIntensityColor = (i: number) => {
    if (i <= 2) return '#6BAF8A';
    if (i <= 4) return '#E8B86D';
    return '#D4697A';
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#E8B86D', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Registro de Sintomas</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{records.length} registro(s)</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#E8B86D', marginBottom: 4 }}>⚠️ Quando buscar atendimento imediato</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Sangramento intenso, dor abdominal forte, diminuição significativa dos movimentos fetais, visão turva, dor de cabeça intensa ou sinais de trombose (dor e inchaço em uma perna) requerem avaliação médica urgente.
            </Text>
          </View>

          {records.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>🌡️</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Nenhum sintoma registrado</Text>
              <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: '#E8B86D', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 8 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Registrar Sintoma</Text>
              </TouchableOpacity>
            </View>
          ) : (
            records.map((record) => (
              <View key={record.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: getIntensityColor(record.intensity) }}>
                <Text style={{ fontSize: 12, color: '#8B7B8B', marginBottom: 8 }}>{formatDate(record.date)}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {record.symptoms.map((s, i) => (
                    <View key={i} style={{ backgroundColor: '#FFF8F0', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                      <Text style={{ fontSize: 12, color: '#E8B86D', fontWeight: '600' }}>{s}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 12, color: '#8B7B8B' }}>Intensidade:</Text>
                  <View style={{ flexDirection: 'row', gap: 3 }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <View key={i} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: i <= record.intensity ? getIntensityColor(record.intensity) : '#E5E5E5' }} />
                    ))}
                  </View>
                  <Text style={{ fontSize: 12, color: getIntensityColor(record.intensity), fontWeight: '600' }}>{record.intensity}/5</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '85%' }}>
            <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 16 }}>Registrar Sintomas</Text>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 10 }}>Selecione os sintomas</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {COMMON_SYMPTOMS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => toggleSymptom(s)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 10,
                      backgroundColor: selected.includes(s) ? '#E8B86D' : '#F8F8F8',
                      borderWidth: 1,
                      borderColor: selected.includes(s) ? '#E8B86D' : '#E5E5E5',
                    }}
                  >
                    <Text style={{ fontSize: 13, color: selected.includes(s) ? 'white' : '#2D1B2E', fontWeight: selected.includes(s) ? '600' : '400' }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 10 }}>Intensidade: {intensity}/5</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setIntensity(i)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 12,
                      backgroundColor: intensity === i ? getIntensityColor(i) : '#F0F0F0',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '700', color: intensity === i ? 'white' : '#8B7B8B' }}>{i}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#E8B86D', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Registrar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
