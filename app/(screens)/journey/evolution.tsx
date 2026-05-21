import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { generateId } from '@/lib/storage';

const EVOLUTION_KEY = '@gestar:weekly_evolution';

interface WeeklyEvolution {
  id: string;
  week: number;
  date: string;
  weight?: string;
  bp?: string;
  fetalMovements?: string;
  uterusMeasure?: string;
  notes: string;
}

export default function EvolutionScreen() {
  const router = useRouter();
  const { gestationalWeek } = useUser();
  const [records, setRecords] = useState<WeeklyEvolution[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ week: String(gestationalWeek || ''), weight: '', bp: '', fetalMovements: '', uterusMeasure: '', notes: '' });

  const load = useCallback(async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const val = await AsyncStorage.getItem(EVOLUTION_KEY);
    if (val) setRecords(JSON.parse(val).sort((a: WeeklyEvolution, b: WeeklyEvolution) => b.week - a.week));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    const record: WeeklyEvolution = {
      id: generateId(),
      week: parseInt(form.week) || gestationalWeek || 0,
      date: new Date().toISOString(),
      weight: form.weight || undefined,
      bp: form.bp || undefined,
      fetalMovements: form.fetalMovements || undefined,
      uterusMeasure: form.uterusMeasure || undefined,
      notes: form.notes,
    };
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const updated = [...records, record].sort((a, b) => b.week - a.week);
    await AsyncStorage.setItem(EVOLUTION_KEY, JSON.stringify(updated));
    setRecords(updated);
    setShowModal(false);
    setForm({ week: String(gestationalWeek || ''), weight: '', bp: '', fetalMovements: '', uterusMeasure: '', notes: '' });
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#6BAF8A', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Evolução Semanal</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Registro semana a semana</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {records.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>📈</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Nenhuma evolução registrada</Text>
              <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: '#6BAF8A', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 8 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Registrar Evolução</Text>
              </TouchableOpacity>
            </View>
          ) : (
            records.map((record) => (
              <View key={record.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: '#6BAF8A' }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#6BAF8A', marginBottom: 10 }}>Semana {record.week}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  {record.weight && <View style={{ backgroundColor: '#F0FFF4', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}><Text style={{ fontSize: 13, color: '#6BAF8A', fontWeight: '600' }}>⚖️ {record.weight} kg</Text></View>}
                  {record.bp && <View style={{ backgroundColor: '#FFF0F3', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}><Text style={{ fontSize: 13, color: '#C9748F', fontWeight: '600' }}>🩺 {record.bp} mmHg</Text></View>}
                  {record.uterusMeasure && <View style={{ backgroundColor: '#F5F0FF', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}><Text style={{ fontSize: 13, color: '#8B6F9E', fontWeight: '600' }}>📏 {record.uterusMeasure} cm</Text></View>}
                  {record.fetalMovements && <View style={{ backgroundColor: '#FFF8F0', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}><Text style={{ fontSize: 13, color: '#E8B86D', fontWeight: '600' }}>👶 {record.fetalMovements}</Text></View>}
                </View>
                {record.notes && <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 10, lineHeight: 20 }}>{record.notes}</Text>}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>Registrar Evolução Semanal</Text>
            {[
              { key: 'week', label: 'Semana Gestacional', placeholder: 'Ex: 24', keyboard: 'numeric' },
              { key: 'weight', label: 'Peso (kg)', placeholder: 'Ex: 68.5', keyboard: 'decimal-pad' },
              { key: 'bp', label: 'Pressão Arterial', placeholder: 'Ex: 120/80', keyboard: 'default' },
              { key: 'uterusMeasure', label: 'Medida Uterina (cm)', placeholder: 'Ex: 24', keyboard: 'decimal-pad' },
              { key: 'fetalMovements', label: 'Movimentos Fetais', placeholder: 'Ex: Ativos, Diminuídos', keyboard: 'default' },
              { key: 'notes', label: 'Observações', placeholder: 'Como foi a semana...', keyboard: 'default' },
            ].map((field) => (
              <View key={field.key} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>{field.label}</Text>
                <TextInput
                  value={(form as any)[field.key]}
                  onChangeText={(v) => setForm(f => ({ ...f, [field.key]: v }))}
                  placeholder={field.placeholder}
                  placeholderTextColor="#8B7B8B"
                  keyboardType={field.keyboard as any}
                  style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 12, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
                />
              </View>
            ))}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#6BAF8A', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
