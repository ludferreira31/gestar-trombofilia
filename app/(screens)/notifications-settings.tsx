import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const NOTIFICATION_GROUPS = [
  {
    title: '💊 Medicações',
    items: [
      { id: 'enoxaparina', label: 'Lembrete de Enoxaparina', desc: 'Alertas diários para aplicação' },
      { id: 'medications', label: 'Medicações Gerais', desc: 'Lembretes de todas as medicações' },
      { id: 'supplements', label: 'Suplementação', desc: 'Lembretes de vitaminas e suplementos' },
    ],
  },
  {
    title: '🗓️ Consultas e Exames',
    items: [
      { id: 'appointments', label: 'Consultas Agendadas', desc: 'Lembrete 24h antes da consulta' },
      { id: 'exams', label: 'Exames Agendados', desc: 'Lembrete 24h antes do exame' },
      { id: 'weekly', label: 'Resumo Semanal', desc: 'Resumo da semana gestacional' },
    ],
  },
  {
    title: '👶 Gestação',
    items: [
      { id: 'movements', label: 'Movimentos Fetais', desc: 'Lembrete para registrar movimentos' },
      { id: 'evolution', label: 'Evolução Semanal', desc: 'Lembrete para registrar evolução' },
    ],
  },
  {
    title: '📱 Comunidade',
    items: [
      { id: 'community', label: 'Novidades da Comunidade', desc: 'Respostas e interações' },
      { id: 'updates', label: 'Atualizações do Gestar', desc: 'Novidades e conteúdos novos' },
    ],
  },
];

export default function NotificationsSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    enoxaparina: true,
    medications: true,
    supplements: true,
    appointments: true,
    exams: true,
    weekly: true,
    movements: false,
    evolution: true,
    community: false,
    updates: true,
  });

  const toggle = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Notificações</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Configure seus lembretes</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {NOTIFICATION_GROUPS.map((group) => (
            <View key={group.title} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>{group.title}</Text>
              <View style={{ backgroundColor: 'white', borderRadius: 18, borderWidth: 1, borderColor: '#EDD9E0', overflow: 'hidden' }}>
                {group.items.map((item, index) => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      borderBottomWidth: index < group.items.length - 1 ? 1 : 0,
                      borderBottomColor: '#EDD9E0',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E' }}>{item.label}</Text>
                      <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 2 }}>{item.desc}</Text>
                    </View>
                    <Switch
                      value={settings[item.id]}
                      onValueChange={() => toggle(item.id)}
                      trackColor={{ false: '#E5E5E5', true: '#C9748F' }}
                      thumbColor={settings[item.id] ? 'white' : '#F5F5F5'}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
