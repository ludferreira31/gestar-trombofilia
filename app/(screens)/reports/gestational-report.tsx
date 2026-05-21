import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';

export default function GestationalReportScreen() {
  const router = useRouter();
  const { profile, gestationalWeek } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      // Estrutura para futuro: exportar relatório em PDF
      // Dados que serão inclusos:
      // - Perfil da paciente (nome, tipo, data de início)
      // - Idade gestacional (semanas e dias)
      // - Exames laboratoriais (histórico)
      // - Medicações em uso (lista atual)
      // - Acompanhamento gestacional (timeline)
      // - Evolução clínica (notas)
      // - Observações importantes
      
      Alert.alert(
        'Relatório em Desenvolvimento',
        'Esta funcionalidade será disponibilizada em breve. Você poderá exportar um relatório completo da sua gestação em PDF para levar às consultas médicas.',
        [{ text: 'OK', onPress: () => setIsGenerating(false) }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o relatório.');
      setIsGenerating(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Relatório Gestacional</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Exportar para PDF</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: '#F5F0FF', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1.5, borderColor: '#8B6F9E', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>📋</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 }}>
              Seu Relatório Gestacional
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22 }}>
              Gere um resumo organizado com todos os dados da sua gestação para levar às consultas médicas.
            </Text>
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>O que será incluído</Text>
            
            {[
              { icon: '👤', title: 'Perfil da Paciente', desc: 'Nome, tipo de acompanhamento, data de início' },
              { icon: '📅', title: 'Idade Gestacional', desc: `${gestationalWeek} semanas e dias` },
              { icon: '🧪', title: 'Exames Laboratoriais', desc: 'Histórico completo de exames realizados' },
              { icon: '💊', title: 'Medicações em Uso', desc: 'Lista atual de medicações e dosagens' },
              { icon: '📊', title: 'Acompanhamento', desc: 'Timeline completa da gestação' },
              { icon: '📝', title: 'Evolução Clínica', desc: 'Notas e observações importantes' },
            ].map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#F5F0FF', alignItems: 'center', justifyContent: 'center', marginRight: 14, flexShrink: 0 }}>
                  <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E' }}>{item.title}</Text>
                  <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            onPress={handleGenerateReport}
            disabled={isGenerating}
            style={{ backgroundColor: '#8B6F9E', borderRadius: 16, padding: 16, alignItems: 'center', opacity: isGenerating ? 0.6 : 1 }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
              {isGenerating ? 'Gerando...' : 'Gerar Relatório em PDF'}
            </Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8B7B8B', marginTop: 16, lineHeight: 18 }}>
            Esta funcionalidade será disponibilizada em breve.{'\n'}
            Você poderá exportar um PDF completo para suas consultas.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
