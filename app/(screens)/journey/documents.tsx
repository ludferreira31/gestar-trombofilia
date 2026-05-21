import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

export default function DocumentsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Documentos e PDFs</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Seus arquivos médicos</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0', marginBottom: 16 }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📁</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#2D1B2E', marginBottom: 8, textAlign: 'center' }}>Área de Documentos</Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22, marginBottom: 20 }}>
              Armazene seus laudos, receitas, resultados de exames e outros documentos médicos importantes.
            </Text>
            <View style={{ backgroundColor: '#F5F0FF', borderRadius: 16, padding: 16, width: '100%' }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#8B6F9E', marginBottom: 8 }}>📋 Documentos Sugeridos</Text>
              {[
                'Laudos de exames de trombofilia',
                'Receitas médicas atuais',
                'Resultados de ultrassons',
                'Relatórios de dopplers',
                'Plano de parto',
                'Cartão de vacinação',
                'Resultados de beta-HCG seriados',
              ].map((item, i) => (
                <Text key={i} style={{ fontSize: 13, color: '#2D1B2E', marginBottom: 4 }}>• {item}</Text>
              ))}
            </View>
          </View>

          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#E8B86D', marginBottom: 6 }}>🔒 Privacidade</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Seus documentos são armazenados localmente no seu dispositivo com segurança. Em versões futuras, será possível fazer backup na nuvem com criptografia.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
