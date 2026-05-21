import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { generateId } from '@/lib/storage';

const CALENDAR_KEY = '@gestar:calendar_events';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'consulta' | 'ultrassom' | 'exame' | 'doppler' | 'outro';
  notes?: string;
  done: boolean;
}

const EVENT_TYPES = [
  { key: 'consulta', label: 'Consulta', icon: '👩‍⚕️', color: '#C9748F' },
  { key: 'ultrassom', label: 'Ultrassom', icon: '🔊', color: '#7BB8D4' },
  { key: 'exame', label: 'Exame', icon: '🧪', color: '#8B6F9E' },
  { key: 'doppler', label: 'Doppler', icon: '📡', color: '#6BAF8A' },
  { key: 'outro', label: 'Outro', icon: '📅', color: '#E8B86D' },
];

export default function CalendarScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '', type: 'consulta', notes: '' });

  const load = useCallback(async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const val = await AsyncStorage.getItem(CALENDAR_KEY);
    if (val) {
      const sorted = JSON.parse(val).sort((a: CalendarEvent, b: CalendarEvent) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(sorted);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!form.title.trim() || !form.date.trim()) {
      Alert.alert('Atenção', 'Preencha o título e a data do evento.');
      return;
    }
    const event: CalendarEvent = {
      id: generateId(),
      title: form.title.trim(),
      date: form.date.trim(),
      time: form.time.trim() || undefined,
      type: form.type as CalendarEvent['type'],
      notes: form.notes.trim() || undefined,
      done: false,
    };
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const updated = [...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
    setEvents(updated);
    setShowModal(false);
    setForm({ title: '', date: '', time: '', type: 'consulta', notes: '' });
  };

  const toggleDone = async (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, done: !e.done } : e);
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
    setEvents(updated);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Remover Evento', 'Deseja remover este evento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover', style: 'destructive', onPress: async () => {
          const updated = events.filter(e => e.id !== id);
          const AsyncStorage = require('@react-native-async-storage/async-storage').default;
          await AsyncStorage.setItem(CALENDAR_KEY, JSON.stringify(updated));
          setEvents(updated);
        }
      },
    ]);
  };

  const getTypeInfo = (type: string) => EVENT_TYPES.find(t => t.key === type) || EVENT_TYPES[4];

  const upcoming = events.filter(e => !e.done);
  const done = events.filter(e => e.done);

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#7BB8D4', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Calendário de Exames</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{upcoming.length} evento(s) pendente(s)</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {events.length === 0 ? (
            <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>🗓️</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Nenhum evento agendado</Text>
              <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22, marginBottom: 20 }}>
                Adicione suas consultas, ultrassons, exames e dopplers para não perder nenhum compromisso.
              </Text>
              <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: '#7BB8D4', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Adicionar Evento</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {upcoming.length > 0 && (
                <>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Próximos Eventos</Text>
                  {upcoming.map((event) => {
                    const typeInfo = getTypeInfo(event.type);
                    return (
                      <View key={event.id} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0', borderLeftWidth: 4, borderLeftColor: typeInfo.color }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 28, marginRight: 12 }}>{typeInfo.icon}</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E' }}>{event.title}</Text>
                            <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>
                              📅 {event.date}{event.time ? ` às ${event.time}` : ''}
                            </Text>
                            <View style={{ backgroundColor: typeInfo.color + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginTop: 6 }}>
                              <Text style={{ fontSize: 11, color: typeInfo.color, fontWeight: '600' }}>{typeInfo.label}</Text>
                            </View>
                            {event.notes && <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 6, fontStyle: 'italic' }}>{event.notes}</Text>}
                          </View>
                          <View style={{ gap: 8 }}>
                            <TouchableOpacity onPress={() => toggleDone(event.id)} style={{ backgroundColor: '#F0FFF4', borderRadius: 10, padding: 8 }}>
                              <MaterialIcons name="check" size={18} color="#6BAF8A" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(event.id)} style={{ backgroundColor: '#FFF0F0', borderRadius: 10, padding: 8 }}>
                              <MaterialIcons name="delete" size={18} color="#D4697A" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </>
              )}

              {done.length > 0 && (
                <>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#8B7B8B', marginBottom: 12, marginTop: 8 }}>Concluídos</Text>
                  {done.map((event) => {
                    const typeInfo = getTypeInfo(event.type);
                    return (
                      <View key={event.id} style={{ backgroundColor: '#F8F8F8', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E5E5E5', opacity: 0.7, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, marginRight: 10 }}>{typeInfo.icon}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#8B7B8B', textDecorationLine: 'line-through' }}>{event.title}</Text>
                          <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{event.date}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleDone(event.id)}>
                          <MaterialIcons name="replay" size={20} color="#8B7B8B" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 20 }}>Novo Evento</Text>

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 10 }}>Tipo de Evento</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {EVENT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    onPress={() => setForm(f => ({ ...f, type: type.key }))}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      borderRadius: 12,
                      backgroundColor: form.type === type.key ? type.color : '#F8F8F8',
                      borderWidth: 1.5,
                      borderColor: form.type === type.key ? type.color : '#E5E5E5',
                      alignItems: 'center',
                      minWidth: 72,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{type.icon}</Text>
                    <Text style={{ fontSize: 11, color: form.type === type.key ? 'white' : '#8B7B8B', marginTop: 4, fontWeight: '600' }}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {[
              { key: 'title', label: 'Título *', placeholder: 'Ex: Ultrassom morfológico' },
              { key: 'date', label: 'Data *', placeholder: 'AAAA-MM-DD' },
              { key: 'time', label: 'Horário', placeholder: 'HH:MM' },
              { key: 'notes', label: 'Observações', placeholder: 'Local, médico, etc.' },
            ].map((field) => (
              <View key={field.key} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>{field.label}</Text>
                <TextInput
                  value={(form as any)[field.key]}
                  onChangeText={(v) => setForm(f => ({ ...f, [field.key]: v }))}
                  placeholder={field.placeholder}
                  placeholderTextColor="#8B7B8B"
                  style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 12, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
                />
              </View>
            ))}

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: '#8B7B8B', fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={{ flex: 2, backgroundColor: '#7BB8D4', borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Salvar Evento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
