import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { storage, DiaryEntry, generateId } from '@/lib/storage';
import { useUser } from '@/lib/user-context';

const MOODS = [
  { id: 'feliz', emoji: '😊', label: 'Feliz' },
  { id: 'ansiosa', emoji: '😰', label: 'Ansiosa' },
  { id: 'tranquila', emoji: '😌', label: 'Tranquila' },
  { id: 'cansada', emoji: '😴', label: 'Cansada' },
  { id: 'esperancosa', emoji: '🌟', label: 'Esperançosa' },
  { id: 'preocupada', emoji: '😟', label: 'Preocupada' },
  { id: 'grata', emoji: '🙏', label: 'Grata' },
  { id: 'emotiva', emoji: '😢', label: 'Emotiva' },
];

export default function DiaryScreen() {
  const router = useRouter();
  const { gestationalWeek } = useUser();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', mood: 'feliz' });

  const loadEntries = useCallback(async () => {
    const data = await storage.getDiary();
    setEntries((data || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const handleSave = async () => {
    if (!form.content.trim()) {
      Alert.alert('Atenção', 'Escreva algo no seu diário.');
      return;
    }
    const entry: DiaryEntry = {
      id: generateId(),
      date: new Date().toISOString(),
      title: form.title.trim() || undefined,
      content: form.content.trim(),
      mood: form.mood,
      gestationalWeek: gestationalWeek || undefined,
    };
    await storage.addDiaryEntry(entry);
    setShowModal(false);
    setForm({ title: '', content: '', mood: 'feliz' });
    loadEntries();
  };

  const handleDelete = (entry: DiaryEntry) => {
    Alert.alert('Excluir Registro', 'Deseja excluir este registro do diário?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await storage.deleteDiaryEntry(entry.id); loadEntries(); } },
    ]);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getMoodEmoji = (moodId: string) => MOODS.find(m => m.id === moodId)?.emoji || '😊';

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#E8A598', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Diário da Gestante</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{entries.length} registro(s)</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {entries.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>📖</Text>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Seu diário está vazio</Text>
              <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22, marginBottom: 20 }}>
                Registre seus sentimentos, conquistas e momentos especiais desta jornada única.
              </Text>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{ backgroundColor: '#E8A598', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 28 }}
              >
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Escrever Primeiro Registro</Text>
              </TouchableOpacity>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: '#E8A598' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 28, marginRight: 10 }}>{getMoodEmoji(entry.mood)}</Text>
                  <View style={{ flex: 1 }}>
                    {entry.title && <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>{entry.title}</Text>}
                    <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{formatDate(entry.date)}</Text>
                    {entry.gestationalWeek && (
                      <Text style={{ fontSize: 11, color: '#C9748F', fontWeight: '600' }}>Semana {entry.gestationalWeek}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(entry)} style={{ padding: 6 }}>
                    <MaterialIcons name="delete-outline" size={20} color="#D4697A" />
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{entry.content}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '90%' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>
                Novo Registro 📖
              </Text>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>Como você está se sentindo?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {MOODS.map((mood) => (
                    <TouchableOpacity
                      key={mood.id}
                      onPress={() => setForm(f => ({ ...f, mood: mood.id }))}
                      style={{
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 14,
                        backgroundColor: form.mood === mood.id ? '#FFF0F3' : '#F8F8F8',
                        borderWidth: 1.5,
                        borderColor: form.mood === mood.id ? '#C9748F' : '#E5E5E5',
                        minWidth: 64,
                      }}
                    >
                      <Text style={{ fontSize: 26 }}>{mood.emoji}</Text>
                      <Text style={{ fontSize: 11, color: form.mood === mood.id ? '#C9748F' : '#8B7B8B', marginTop: 4, fontWeight: '600' }}>{mood.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>Título (opcional)</Text>
              <TextInput
                value={form.title}
                onChangeText={(v) => setForm(f => ({ ...f, title: v }))}
                placeholder="Ex: Primeiro chute, Consulta especial..."
                placeholderTextColor="#8B7B8B"
                style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', marginBottom: 14 }}
              />

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>Seu registro *</Text>
              <TextInput
                value={form.content}
                onChangeText={(v) => setForm(f => ({ ...f, content: v }))}
                placeholder="Escreva sobre seu dia, sentimentos, conquistas..."
                placeholderTextColor="#8B7B8B"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', minHeight: 120, marginBottom: 20 }}
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#E8A598', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Salvar Registro</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
