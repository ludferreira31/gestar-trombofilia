import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { storage, DopplerRecord, generateId } from '@/lib/storage';
import { useUser } from '@/lib/user-context';

export default function DopplersScreen() {
  const router = useRouter();
  const { gestationalWeek } = useUser();
  const [records, setRecords] = useState<DopplerRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', week: String(gestationalWeek || ''), arteriaUterinaDireita: '', arteriaUterinaEsquerda: '', arteriaUmbilical: '', arteriaCerebralMedia: '', ductoVenoso: '', notes: '' });

  const load = useCallback(async () => {
    const data = await storage.getDopplers();
    setRecords((data || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!form.date.trim()) { Alert.alert('Atenção', 'Informe a data do exame.'); return; }
    const record: DopplerRecord = {
      id: generateId(),
      date: form.date.trim(),
      gestationalWeek: parseInt(form.week) || 0,
      arteriaUterinaDireita: form.arteriaUterinaDireita.trim() || undefined,
      arteriaUterinaEsquerda: form.arteriaUterinaEsquerda.trim() || undefined,
      arteriaUmbilical: form.arteriaUmbilical.trim() || undefined,
      arteriaCerebralMedia: form.arteriaCerebralMedia.trim() || undefined,
      ductoVenoso: form.ductoVenoso.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };
    await storage.addDoppler(record);
    setShowModal(false);
    load();
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Registro', 'Deseja excluir este registro de doppler?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await storage.deleteDoppler(id); load(); } },
    ]);
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#7BB8D4', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Registro de Dopplers</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{records.length} registro(s)</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {/* Info Card */}
          <View style={{ backgroundColor: '#F0F8FF', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#7BB8D4' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#7BB8D4', marginBottom: 6 }}>📡 Sobre o Doppler</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              O doppler obstétrico avalia o fluxo sanguíneo nos vasos do útero, placenta e feto. Registre seus resultados para acompanhar a evolução.
            </Text>
          </View>

          {records.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>📡</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Nenhum doppler registrado</Text>
              <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: '#7BB8D4', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 8 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Registrar Doppler</Text>
              </TouchableOpacity>
            </View>
          ) : (
            records.map((record) => (
              <View key={record.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: '#7BB8D4' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>📅 {record.date}</Text>
                    {record.gestationalWeek > 0 && (
                      <Text style={{ fontSize: 13, color: '#7BB8D4', fontWeight: '600' }}>Semana {record.gestationalWeek}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(record.id)} style={{ padding: 6 }}>
                    <MaterialIcons name="delete-outline" size={20} color="#D4697A" />
                  </TouchableOpacity>
                </View>
                {[
                  { label: 'Art. Uterina Direita', value: record.arteriaUterinaDireita },
                  { label: 'Art. Uterina Esquerda', value: record.arteriaUterinaEsquerda },
                  { label: 'Art. Umbilical', value: record.arteriaUmbilical },
                  { label: 'Art. Cerebral Média', value: record.arteriaCerebralMedia },
                  { label: 'Ducto Venoso', value: record.ductoVenoso },
                ].filter(f => f.value).map((field) => (
                  <View key={field.label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                    <Text style={{ fontSize: 13, color: '#8B7B8B' }}>{field.label}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E' }}>{field.value}</Text>
                  </View>
                ))}
                {record.notes && <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 8, fontStyle: 'italic' }}>{record.notes}</Text>}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '90%' }}>
            <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>Registrar Doppler</Text>
              {[
                { key: 'date', label: 'Data *', placeholder: 'AAAA-MM-DD' },
                { key: 'week', label: 'Semana Gestacional', placeholder: 'Ex: 24' },
                { key: 'arteriaUterinaDireita', label: 'Art. Uterina Direita (IP)', placeholder: 'Ex: 0.85' },
                { key: 'arteriaUterinaEsquerda', label: 'Art. Uterina Esquerda (IP)', placeholder: 'Ex: 0.90' },
                { key: 'arteriaUmbilical', label: 'Art. Umbilical (IP)', placeholder: 'Ex: 0.95' },
                { key: 'arteriaCerebralMedia', label: 'Art. Cerebral Média (IP)', placeholder: 'Ex: 1.80' },
                { key: 'ductoVenoso', label: 'Ducto Venoso (IPV)', placeholder: 'Ex: 0.52' },
                { key: 'notes', label: 'Observações', placeholder: 'Notas do médico...' },
              ].map((field) => (
                <View key={field.key} style={{ marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>{field.label}</Text>
                  <TextInput
                    value={(form as any)[field.key]}
                    onChangeText={(v) => setForm(f => ({ ...f, [field.key]: v }))}
                    placeholder={field.placeholder}
                    placeholderTextColor="#8B7B8B"
                    keyboardType={['week', 'arteriaUterinaDireita', 'arteriaUterinaEsquerda', 'arteriaUmbilical', 'arteriaCerebralMedia', 'ductoVenoso'].includes(field.key) ? 'decimal-pad' : 'default'}
                    style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 12, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
                  />
                </View>
              ))}
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#7BB8D4', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
