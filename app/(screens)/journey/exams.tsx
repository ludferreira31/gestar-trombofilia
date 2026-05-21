import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { storage, Exam, generateId } from '@/lib/storage';

const EXAM_TYPES = [
  'Anticoagulante Lúpico (LA)',
  'Anticardiolipina IgG',
  'Anticardiolipina IgM',
  'Anti-beta2-glicoproteína I IgG',
  'Anti-beta2-glicoproteína I IgM',
  'Fator V de Leiden',
  'Mutação Protrombina G20210A',
  'Proteína C',
  'Proteína S',
  'Antitrombina III',
  'MTHFR C677T',
  'MTHFR A1298C',
  'Homocisteína',
  'Beta-HCG',
  'Progesterona',
  'Hemograma Completo',
  'Coagulograma',
  'D-Dímero',
  'Vitamina D',
  'Ferritina',
  'Glicemia em Jejum',
  'Outro',
];

export default function ExamsScreen() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: '', date: '', result: '', notes: '' });
  const [showTypeList, setShowTypeList] = useState(false);

  const loadExams = useCallback(async () => {
    const data = await storage.getExams();
    setExams((data || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  useEffect(() => { loadExams(); }, [loadExams]);

  const handleSave = async () => {
    if (!form.type.trim() || !form.date.trim()) {
      Alert.alert('Atenção', 'Selecione o tipo de exame e a data.');
      return;
    }
    const exam: Exam = {
      id: generateId(),
      type: form.type.trim(),
      date: form.date.trim(),
      result: form.result.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };
    await storage.addExam(exam);
    setShowModal(false);
    setForm({ type: '', date: '', result: '', notes: '' });
    loadExams();
  };

  const handleDelete = (exam: Exam) => {
    Alert.alert('Excluir Exame', `Deseja excluir o registro de "${exam.type}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await storage.deleteExam(exam.id); loadExams(); } },
    ]);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-BR');
    } catch { return dateStr; }
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Exames Laboratoriais</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{exams.length} registro(s)</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {exams.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🧪</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Nenhum exame registrado</Text>
              <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22, marginBottom: 20 }}>
                Registre seus exames laboratoriais para acompanhar sua evolução ao longo da gestação.
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{ backgroundColor: '#8B6F9E', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 28 }}
              >
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Registrar Exame</Text>
              </TouchableOpacity>
            </View>
          ) : (
            exams.map((exam) => (
              <View key={exam.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: '#8B6F9E' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>{exam.type}</Text>
                    <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>📅 {formatDate(exam.date)}</Text>
                    {exam.result && (
                      <View style={{ backgroundColor: '#F5F0FF', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, marginTop: 8, alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize: 13, color: '#8B6F9E', fontWeight: '600' }}>Resultado: {exam.result}</Text>
                      </View>
                    )}
                    {exam.notes && <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 6, fontStyle: 'italic' }}>{exam.notes}</Text>}
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(exam)} style={{ padding: 6 }}>
                    <MaterialIcons name="delete-outline" size={20} color="#D4697A" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>Registrar Exame</Text>

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>Tipo de Exame *</Text>
            <TouchableOpacity
              onPress={() => setShowTypeList(!showTypeList)}
              style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: '#EDD9E0', marginBottom: 4, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ flex: 1, fontSize: 15, color: form.type ? '#2D1B2E' : '#8B7B8B' }}>
                {form.type || 'Selecione o tipo de exame'}
              </Text>
              <MaterialIcons name={showTypeList ? 'expand-less' : 'expand-more'} size={22} color="#8B7B8B" />
            </TouchableOpacity>
            {showTypeList && (
              <ScrollView style={{ maxHeight: 160, backgroundColor: '#FDF8F5', borderRadius: 12, borderWidth: 1, borderColor: '#EDD9E0', marginBottom: 14 }}>
                {EXAM_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => { setForm(f => ({ ...f, type })); setShowTypeList(false); }}
                    style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#EDD9E0' }}
                  >
                    <Text style={{ fontSize: 14, color: '#2D1B2E' }}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {[
              { key: 'date', label: 'Data do Exame *', placeholder: 'AAAA-MM-DD' },
              { key: 'result', label: 'Resultado', placeholder: 'Ex: Positivo, Negativo, 12.5 UI/mL' },
              { key: 'notes', label: 'Observações', placeholder: 'Notas adicionais' },
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
              <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#8B6F9E', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Salvar Exame</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
