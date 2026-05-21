import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const ADMIN_STATS = [
  { label: 'Usuárias Ativas', value: '247', icon: '👥', color: '#C9748F', bg: '#FFF0F3' },
  { label: 'Premium', value: '89', icon: '💜', color: '#8B6F9E', bg: '#F5F0FF' },
  { label: 'Gestantes', value: '134', icon: '🤰', color: '#7BB8D4', bg: '#F0F8FF' },
  { label: 'FIV Ativas', value: '23', icon: '🔬', color: '#6BAF8A', bg: '#F0FFF4' },
];

const ADMIN_SECTIONS = [
  {
    title: 'Gestão de Pacientes',
    items: [
      { icon: '👥', label: 'Lista de Pacientes', color: '#C9748F' },
      { icon: '💜', label: 'Pacientes Premium', color: '#8B6F9E' },
      { icon: '🤰', label: 'Gestantes Ativas', color: '#7BB8D4' },
      { icon: '🔬', label: 'Pacientes FIV', color: '#6BAF8A' },
    ],
  },
  {
    title: 'Conteúdo',
    items: [
      { icon: '📚', label: 'Gerenciar Guias', color: '#C9748F' },
      { icon: '📣', label: 'Notificações Push', color: '#E8B86D' },
      { icon: '📰', label: 'Publicações', color: '#8B6F9E' },
      { icon: '🎯', label: 'Campanhas', color: '#6BAF8A' },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      { icon: '💳', label: 'Assinaturas', color: '#C9748F' },
      { icon: '📊', label: 'Relatórios', color: '#7BB8D4' },
      { icon: '🤝', label: 'Parceiros', color: '#6BAF8A' },
    ],
  },
];

export default function AdminScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#E8B86D', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Painel Administrativo</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Gestar com Trombofilia</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Stats */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            {ADMIN_STATS.map((stat) => (
              <View key={stat.label} style={{ flex: 1, minWidth: '44%', backgroundColor: stat.bg, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: stat.color + '40' }}>
                <Text style={{ fontSize: 28 }}>{stat.icon}</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: stat.color, marginTop: 4 }}>{stat.value}</Text>
                <Text style={{ fontSize: 11, color: '#8B7B8B', marginTop: 2, textAlign: 'center' }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Sections */}
          {ADMIN_SECTIONS.map((section) => (
            <View key={section.title} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>{section.title}</Text>
              <View style={{ backgroundColor: 'white', borderRadius: 18, borderWidth: 1, borderColor: '#EDD9E0', overflow: 'hidden' }}>
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      borderBottomWidth: index < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: '#EDD9E0',
                    }}
                  >
                    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: item.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                      <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: '#2D1B2E', flex: 1, fontWeight: '500' }}>{item.label}</Text>
                    <MaterialIcons name="chevron-right" size={20} color="#8B7B8B" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Quick Actions */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Ações Rápidas</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#C9748F', borderRadius: 16, padding: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, marginBottom: 6 }}>📣</Text>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>Enviar Notificação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#8B6F9E', borderRadius: 16, padding: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, marginBottom: 6 }}>💜</Text>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>Liberar Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#6BAF8A', borderRadius: 16, padding: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, marginBottom: 6 }}>📊</Text>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: '700', textAlign: 'center' }}>Ver Relatório</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
