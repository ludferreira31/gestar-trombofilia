import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { storage, Medication, generateId } from '@/lib/storage';

export default function MedicationsScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [form, setForm] = useState({ name: '', dose: '', frequency: '', times: '', notes: '' });

  const loadMeds = useCallback(async () => {
    const meds = await storage.getMedications();
    setMedications(meds || []);
  }, []);

  useEffect(() => { loadMeds(); }, [loadMeds]);

  const openAdd = () => {
    setEditingMed(null);
    setForm({ name: '', dose: '', frequency: '', times: '', notes: '' });
    setShowModal(true);
  };

  const openEdit = (med: Medication) => {
    setEditingMed(med);
    setForm({ name: med.name, dose: med.dose, frequency: med.frequency, times: med.times.join(', '), notes: med.notes || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.dose.trim()) {
      Alert.alert('Atenção', 'Preencha o nome e a dose da medicação.');
      return;
    }
    const med: Medication = {
      id: editingMed?.id || generateId(),
      name: form.name.trim(),
      dose: form.dose.trim(),
      frequency: form.frequency.trim(),
      times: form.times.split(',').map(t => t.trim()).filter(Boolean),
      notes: form.notes.trim() || undefined,
      startDate: editingMed?.startDate || new Date().toISOString(),
      active: true,
    };
    if (editingMed) {
      await storage.updateMedication(editingMed.id, med);
    } else {
      await storage.addMedication(med);
    }
    setShowModal(false);
    loadMeds();
  };

  const handleToggle = async (med: Medication) => {
    await storage.updateMedication(med.id, { active: !med.active });
    loadMeds();
  };

  const handleDelete = (med: Medication) => {
    Alert.alert('Remover Medicação', `Deseja remover "${med.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => { await storage.deleteMedication(med.id); loadMeds(); } },
    ]);
  };

  const activeMeds = medications.filter(m => m.active);
  const inactiveMeds = medications.filter(m => !m.active);

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Medicações</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{activeMeds.length} medicação(ões) ativa(s)</Text>
        </View>
        <TouchableOpacity onPress={openAdd} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Enoxaparina Quick Card */}
          <TouchableOpacity
            onPress={() => router.push('/(screens)/journey/enoxaparina')}
            style={{ backgroundColor: '#D4697A', borderRadius: 18, padding: 16, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>💉</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Lembrete de Enoxaparina</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 }}>Configure alertas para aplicação diária</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          {/* Active Medications */}
          {activeMeds.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0', marginBottom: 16 }}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>💊</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>Nenhuma medicação cadastrada</Text>
              <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 20 }}>
                Adicione suas medicações para receber lembretes e manter o controle do seu tratamento.
              </Text>
              <TouchableOpacity
                onPress={openAdd}
                style={{ backgroundColor: '#C9748F', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 16 }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Adicionar Medicação</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Medicações Ativas</Text>
              {activeMeds.map((med) => (
                <View key={med.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: '#C9748F' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E' }}>{med.name}</Text>
                      <Text style={{ fontSize: 14, color: '#C9748F', marginTop: 2, fontWeight: '600' }}>{med.dose}</Text>
                      {med.frequency && <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>🔄 {med.frequency}</Text>}
                      {med.times.length > 0 && (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                          {med.times.map((time, i) => (
                            <View key={i} style={{ backgroundColor: '#FFF0F3', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                              <Text style={{ fontSize: 12, color: '#C9748F', fontWeight: '600' }}>⏰ {time}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {med.notes && <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 6, fontStyle: 'italic' }}>{med.notes}</Text>}
                    </View>
                    <View style={{ gap: 8 }}>
                      <TouchableOpacity onPress={() => openEdit(med)} style={{ backgroundColor: '#F5F0FF', borderRadius: 10, padding: 8 }}>
                        <MaterialIcons name="edit" size={18} color="#8B6F9E" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(med)} style={{ backgroundColor: '#FFF0F0', borderRadius: 10, padding: 8 }}>
                        <MaterialIcons name="delete" size={18} color="#D4697A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Inactive */}
          {inactiveMeds.length > 0 && (
            <>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#8B7B8B', marginBottom: 12, marginTop: 8 }}>Medicações Inativas</Text>
              {inactiveMeds.map((med) => (
                <View key={med.id} style={{ backgroundColor: '#F8F8F8', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E5E5E5', opacity: 0.7 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#8B7B8B' }}>{med.name} — {med.dose}</Text>
                  <TouchableOpacity onPress={() => handleToggle(med)} style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: '#C9748F', fontWeight: '600' }}>Reativar →</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>
              {editingMed ? 'Editar Medicação' : 'Nova Medicação'}
            </Text>
            {[
              { key: 'name', label: 'Nome da medicação *', placeholder: 'Ex: Enoxaparina, AAS, Progesterona' },
              { key: 'dose', label: 'Dose *', placeholder: 'Ex: 40mg, 100mg, 200mg' },
              { key: 'frequency', label: 'Frequência', placeholder: 'Ex: 1x ao dia, 2x ao dia' },
              { key: 'times', label: 'Horários (separados por vírgula)', placeholder: 'Ex: 08:00, 20:00' },
              { key: 'notes', label: 'Observações', placeholder: 'Ex: Tomar com alimento' },
            ].map((field) => (
              <View key={field.key} style={{ marginBottom: 14 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>{field.label}</Text>
                <TextInput
                  value={(form as any)[field.key]}
                  onChangeText={(v) => setForm(f => ({ ...f, [field.key]: v }))}
                  placeholder={field.placeholder}
                  placeholderTextColor="#8B7B8B"
                  style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
                />
              </View>
            ))}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#C9748F', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Salvar Medicação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
