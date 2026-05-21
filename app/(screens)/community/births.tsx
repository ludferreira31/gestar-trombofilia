import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const BIRTHS = [
  { id: '1', babyName: 'Sofia', mom: 'Fernanda Lima', date: '15/05/2026', week: 38, weight: '3.200g', message: 'Após SAF diagnosticada e 2 perdas, nossa arco-íris chegou! 38 semanas, saudável e linda. Obrigada a todas!', emoji: '🌈' },
  { id: '2', babyName: 'Miguel', mom: 'Carla Santos', date: '02/05/2026', week: 37, weight: '3.050g', message: 'Miguel chegou forte e saudável! Fator V de Leiden não impediu nossa história de amor.', emoji: '💙' },
  { id: '3', babyName: 'Isabella', mom: 'Patrícia Oliveira', date: '20/04/2026', week: 36, weight: '2.850g', message: 'Nossa guerreirinha nasceu prematura mas forte! UTI neonatal por 10 dias e hoje está em casa.', emoji: '💜' },
  { id: '4', babyName: 'Valentina', mom: 'Roberta Alves', date: '10/04/2026', week: 39, weight: '3.400g', message: 'Valentina chegou no dia do meu aniversário! 5 anos de tentativas, 3 FIVs, e hoje somos 3.', emoji: '🌸' },
];

export default function BirthsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#6BAF8A', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Mural de Nascimentos</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Bebês arco-íris da comunidade 🌈</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F0FFF4', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#6BAF8A', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>🌈</Text>
            <Text style={{ fontSize: 14, color: '#2D1B2E', textAlign: 'center', lineHeight: 22 }}>
              Cada nascimento aqui é uma vitória conquistada com muita luta, amor e perseverança.
            </Text>
          </View>

          {BIRTHS.map((birth) => (
            <View key={birth.id} style={{ backgroundColor: 'white', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1.5, borderColor: '#6BAF8A' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0FFF4', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                  <Text style={{ fontSize: 32 }}>{birth.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E' }}>{birth.babyName}</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B8B' }}>Mamãe: {birth.mom}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <View style={{ backgroundColor: '#F0FFF4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6BAF8A', fontWeight: '600' }}>📅 {birth.date}</Text>
                </View>
                <View style={{ backgroundColor: '#F0FFF4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6BAF8A', fontWeight: '600' }}>🤰 {birth.week} semanas</Text>
                </View>
                <View style={{ backgroundColor: '#F0FFF4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6BAF8A', fontWeight: '600' }}>⚖️ {birth.weight}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22, fontStyle: 'italic' }}>{`"${birth.message}"`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
