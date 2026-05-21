import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { generateId } from '@/lib/storage';

const FIV_KEY = '@gestar:fiv_data';

interface FIVData {
  clinic: string;
  doctor: string;
  protocol: string;
  stimulationStart: string;
  punctionDate: string;
  transferDate: string;
  embryosObtained: string;
  embryosTransferred: string;
  embryoQuality: string;
  betaHcgDate: string;
  betaHcgResult: string;
  betaHcg2Date: string;
  betaHcg2Result: string;
  notes: string;
}

interface FIVPhase {
  id: string;
  phase: string;
  date: string;
  notes?: string;
  done: boolean;
}

const FIV_PHASES = [
  { id: 'estimulacao', label: 'Estimulação Ovariana', icon: '💊', desc: 'Início das injeções de estimulação ovariana controlada', color: '#C9748F' },
  { id: 'monitoramento', label: 'Monitoramento', icon: '🔊', desc: 'Ultrassons e dosagens hormonais para acompanhar folículos', color: '#7BB8D4' },
  { id: 'gatilho', label: 'Gatilho (hCG)', icon: '💉', desc: 'Aplicação do gatilho para maturação final dos óvulos', color: '#8B6F9E' },
  { id: 'puncao', label: 'Punção Folicular', icon: '🔬', desc: 'Coleta dos óvulos para fertilização', color: '#D4697A' },
  { id: 'fertilizacao', label: 'Fertilização', icon: '🧬', desc: 'Fertilização dos óvulos com espermatozoides', color: '#6BAF8A' },
  { id: 'cultivo', label: 'Cultivo Embrionário', icon: '🌱', desc: 'Desenvolvimento dos embriões no laboratório (3-5 dias)', color: '#E8B86D' },
  { id: 'transferencia', label: 'Transferência Embrionária', icon: '🤰', desc: 'Transferência do(s) embrião(ões) para o útero', color: '#C9748F' },
  { id: 'espera', label: 'Janela de Implantação', icon: '🙏', desc: 'Período de espera (10-14 dias) para o beta-HCG', color: '#8B6F9E' },
  { id: 'beta', label: 'Beta-HCG', icon: '🩸', desc: 'Exame de sangue para confirmar gravidez', color: '#6BAF8A' },
];

export default function FIVScreen() {
  const router = useRouter();
  const [data, setData] = useState<FIVData>({
    clinic: '', doctor: '', protocol: '', stimulationStart: '',
    punctionDate: '', transferDate: '', embryosObtained: '', embryosTransferred: '',
    embryoQuality: '', betaHcgDate: '', betaHcgResult: '', betaHcg2Date: '',
    betaHcg2Result: '', notes: '',
  });
  const [phases, setPhases] = useState<FIVPhase[]>([]);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'data'>('timeline');

  useEffect(() => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    AsyncStorage.getItem(FIV_KEY).then((val: string | null) => {
      if (val) {
        const saved = JSON.parse(val);
        if (saved.data) setData(saved.data);
        if (saved.phases) setPhases(saved.phases);
      }
    });
  }, []);

  const save = async (newData: FIVData, newPhases: FIVPhase[]) => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(FIV_KEY, JSON.stringify({ data: newData, phases: newPhases }));
  };

  const handleSaveData = async () => {
    await save(data, phases);
    setEditing(false);
    Alert.alert('Salvo!', 'Dados do tratamento FIV atualizados.');
  };

  const togglePhase = async (phaseId: string) => {
    const existing = phases.find(p => p.phase === phaseId);
    let newPhases: FIVPhase[];
    if (existing) {
      newPhases = phases.map(p => p.phase === phaseId ? { ...p, done: !p.done } : p);
    } else {
      newPhases = [...phases, { id: generateId(), phase: phaseId, date: new Date().toISOString().split('T')[0], done: true }];
    }
    setPhases(newPhases);
    await save(data, newPhases);
  };

  const getPhaseStatus = (phaseId: string) => {
    const p = phases.find(ph => ph.phase === phaseId);
    return p?.done || false;
  };

  const completedCount = FIV_PHASES.filter(p => getPhaseStatus(p.id)).length;

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#7BB8D4', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Linha do Tempo FIV</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Reprodução Assistida</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ backgroundColor: '#7BB8D4', paddingHorizontal: 20, paddingBottom: 16 }}>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 8, height: 8 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 8, height: 8, width: `${(completedCount / FIV_PHASES.length) * 100}%` }} />
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 6 }}>
          {completedCount} de {FIV_PHASES.length} fases concluídas
        </Text>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#EDD9E0' }}>
        {[{ key: 'timeline', label: '📅 Linha do Tempo' }, { key: 'data', label: '📋 Dados do Ciclo' }].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key as any)}
            style={{
              flex: 1,
              paddingVertical: 14,
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: activeTab === tab.key ? '#7BB8D4' : 'transparent',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: activeTab === tab.key ? '#7BB8D4' : '#8B7B8B' }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {activeTab === 'timeline' ? (
            <>
              <Text style={{ fontSize: 14, color: '#8B7B8B', marginBottom: 16, lineHeight: 20 }}>
                Toque em cada fase para marcar como concluída. Acompanhe sua jornada de reprodução assistida.
              </Text>
              {FIV_PHASES.map((phase, index) => {
                const isDone = getPhaseStatus(phase.id);
                const phaseData = phases.find(p => p.phase === phase.id);
                return (
                  <View key={phase.id} style={{ flexDirection: 'row', marginBottom: 4 }}>
                    {/* Timeline line */}
                    <View style={{ alignItems: 'center', marginRight: 14, width: 40 }}>
                      <TouchableOpacity
                        onPress={() => togglePhase(phase.id)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: isDone ? phase.color : 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 2,
                          borderColor: isDone ? phase.color : '#EDD9E0',
                        }}
                      >
                        {isDone ? (
                          <MaterialIcons name="check" size={20} color="white" />
                        ) : (
                          <Text style={{ fontSize: 18 }}>{phase.icon}</Text>
                        )}
                      </TouchableOpacity>
                      {index < FIV_PHASES.length - 1 && (
                        <View style={{ width: 2, height: 32, backgroundColor: isDone ? phase.color : '#EDD9E0', marginTop: 4 }} />
                      )}
                    </View>

                    {/* Content */}
                    <View style={{
                      flex: 1,
                      backgroundColor: isDone ? phase.color + '15' : 'white',
                      borderRadius: 14,
                      padding: 14,
                      marginBottom: 8,
                      borderWidth: 1.5,
                      borderColor: isDone ? phase.color : '#EDD9E0',
                    }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: isDone ? phase.color : '#2D1B2E' }}>{phase.label}</Text>
                      <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 3, lineHeight: 18 }}>{phase.desc}</Text>
                      {phaseData?.date && isDone && (
                        <Text style={{ fontSize: 11, color: phase.color, marginTop: 6, fontWeight: '600' }}>
                          ✓ Concluída em {phaseData.date}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={editing ? handleSaveData : () => setEditing(true)}
                  style={{ backgroundColor: '#7BB8D4', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}
                >
                  <MaterialIcons name={editing ? 'check' : 'edit'} size={18} color="white" />
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>{editing ? 'Salvar' : 'Editar'}</Text>
                </TouchableOpacity>
              </View>

              {[
                { section: '🏥 Clínica e Médico', fields: [
                  { key: 'clinic', label: 'Clínica', placeholder: 'Nome da clínica' },
                  { key: 'doctor', label: 'Médico(a)', placeholder: 'Nome do médico' },
                  { key: 'protocol', label: 'Protocolo', placeholder: 'Ex: Antagonista, Longo...' },
                ]},
                { section: '📅 Datas Importantes', fields: [
                  { key: 'stimulationStart', label: 'Início Estimulação', placeholder: 'AAAA-MM-DD' },
                  { key: 'punctionDate', label: 'Data da Punção', placeholder: 'AAAA-MM-DD' },
                  { key: 'transferDate', label: 'Data da Transferência', placeholder: 'AAAA-MM-DD' },
                ]},
                { section: '🧬 Embriões', fields: [
                  { key: 'embryosObtained', label: 'Óvulos Obtidos', placeholder: 'Ex: 8' },
                  { key: 'embryosTransferred', label: 'Embriões Transferidos', placeholder: 'Ex: 1' },
                  { key: 'embryoQuality', label: 'Qualidade dos Embriões', placeholder: 'Ex: Blastocisto 4AA' },
                ]},
                { section: '🩸 Beta-HCG', fields: [
                  { key: 'betaHcgDate', label: 'Data Beta-HCG 1', placeholder: 'AAAA-MM-DD' },
                  { key: 'betaHcgResult', label: 'Resultado Beta-HCG 1', placeholder: 'Ex: 245 mUI/mL' },
                  { key: 'betaHcg2Date', label: 'Data Beta-HCG 2', placeholder: 'AAAA-MM-DD' },
                  { key: 'betaHcg2Result', label: 'Resultado Beta-HCG 2', placeholder: 'Ex: 890 mUI/mL' },
                ]},
              ].map((group) => (
                <View key={group.section} style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>{group.section}</Text>
                  {group.fields.map((field) => (
                    <View key={field.key} style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#8B7B8B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</Text>
                      {editing ? (
                        <TextInput
                          value={(data as any)[field.key]}
                          onChangeText={(v) => setData(d => ({ ...d, [field.key]: v }))}
                          placeholder={field.placeholder}
                          placeholderTextColor="#C0B0C0"
                          style={{ backgroundColor: '#FDF8F5', borderRadius: 10, padding: 12, fontSize: 14, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
                        />
                      ) : (
                        <Text style={{ fontSize: 14, color: (data as any)[field.key] ? '#2D1B2E' : '#C0B0C0' }}>
                          {(data as any)[field.key] || 'Não informado'}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
