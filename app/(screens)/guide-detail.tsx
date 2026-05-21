import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { GUIDES } from '@/constants/content';

function renderContent(content: string, color: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <View key={`list-${listKey++}`} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EDD9E0' }}>
          {listItems.map((item, j) => (
            <View key={j} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: j < listItems.length - 1 ? 10 : 0 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color, marginTop: 8, marginRight: 12, flexShrink: 0 }} />
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22, flex: 1 }}>{item}</Text>
            </View>
          ))}
        </View>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushList();
      // H2 — skip, shown in header
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <Text key={i} style={{ fontSize: 16, fontWeight: '700', color: '#2D1B2E', marginTop: 16, marginBottom: 8 }}>
          {line.replace('### ', '')}
        </Text>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      flushList();
      elements.push(
        <Text key={i} style={{ fontSize: 14, fontWeight: '700', color: color, marginBottom: 4 }}>
          {line.replace(/\*\*/g, '')}
        </Text>
      );
    } else if (line.startsWith('- ')) {
      listItems.push(line.replace('- ', ''));
    } else if (line.trim() !== '') {
      flushList();
      // Parse inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <Text key={i} style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 24, marginBottom: 8 }}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <Text key={j} style={{ fontWeight: '700', color: '#2D1B2E' }}>{part.replace(/\*\*/g, '')}</Text>;
            }
            return part;
          })}
        </Text>
      );
    } else {
      flushList();
    }
  });
  flushList();
  return elements;
}

export default function GuideDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const guide = GUIDES.find(g => g.id === id);

  if (!guide) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>😕</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Guia não encontrado</Text>
          <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#C9748F', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 24, marginTop: 16 }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: guide.color, paddingTop: 16, paddingBottom: 24, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', lineHeight: 24 }}>{guide.title}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 }}>{guide.subtitle}</Text>
        </View>
        <Text style={{ fontSize: 36 }}>{guide.icon}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {/* Intro card */}
          <View style={{ backgroundColor: guide.color + '15', borderRadius: 16, padding: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: guide.color }}>
            <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 24, fontStyle: 'italic' }}>{guide.subtitle}</Text>
          </View>

          {renderContent(guide.content, guide.color)}

          {/* Footer */}
          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 16, padding: 16, marginTop: 8, borderWidth: 1, borderColor: '#C9748F' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#C9748F', marginBottom: 6 }}>💜 Lembrete Importante</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Este guia é educativo e não substitui a orientação médica individualizada. Sempre consulte sua equipe de saúde antes de tomar decisões sobre seu tratamento.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
