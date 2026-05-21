import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { storage } from '@/lib/storage';

interface PrenatalData {
  bloodType: string;
  rhFactor: string;
  obstetra: string;
  hematologista: string;
  hospital: string;
  thrombophiliaType: string;
  medications: string;
  allergies: string;
  lastEnoxaDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
}

const PRENATAL_KEY = '@gestar:prenatal_data';

export default function PrenatalScreen() {
  const router = useRouter();
  const { profile, gestationalWeek, gestationalDay } = useUser();
  const [data, setData] = useState<PrenatalData>({
    bloodType: '', rhFactor: '', obstetra: '', hematologista: '', hospital: '',
    thrombophiliaType: '', medications: '', allergies: '', lastEnoxaDate: '',
    emergencyContact: '', emergencyPhone: '', notes: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    AsyncStorage.getItem(PRENATAL_KEY).then((val: string | null) => {
      if (val) setData(JSON.parse(val));
    });
  }, []);

  const handleSave = async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(PRENATAL_KEY, JSON.stringify(data));
    setEditing(false);
    Alert.alert('Salvo!', 'Cartão pré-natal atualizado com sucesso.');
  };

  const Field = ({ label, value, field, placeholder }: { label: string; value: string; field: keyof PrenatalData; placeholder?: string }) => (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color: '#8B7B8B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
      {editing ? (
        <TextInput
          value={value}
          onChangeText={(v) => setData(d => ({ ...d, [field]: v }))}
          placeholder={placeholder || label}
          placeholderTextColor="#C0B0C0"
          style={{ backgroundColor: '#FDF8F5', borderRadius: 10, padding: 12, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
        />
      ) : (
        <Text style={{ fontSize: 15, color: value ? '#2D1B2E' : '#C0B0C0', fontWeight: value ? '500' : '400' }}>
          {value || 'Não informado'}
        </Text>
      )}
    </View>
  );

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cartão Pré-Natal</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Dados completos da gestação</Text>
        </View>
        <TouchableOpacity
          onPress={editing ? handleSave : () => setEditing(true)}
          style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}
        >
          <MaterialIcons name={editing ? 'check' : 'edit'} size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Identity Card */}
          <View style={{ backgroundColor: '#8B6F9E', borderRadius: 20, padding: 20, marginBottom: 16 }}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 4 }}>Paciente</Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>{profile?.name || 'Nome não informado'}</Text>
            {gestationalWeek > 0 && (
              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                  {gestationalWeek}ª semana e {gestationalDay} dias
                </Text>
              </View>
            )}
            {profile?.dum && (
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8 }}>DUM: {profile.dum}</Text>
            )}
          </View>

          {/* Medical Info */}
          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 16 }}>🩸 Dados Hematológicos</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Field label="Tipo Sanguíneo" value={data.bloodType} field="bloodType" placeholder="Ex: A, B, AB, O" />
              </View>
              <View style={{ flex: 1 }}>
                <Field label="Fator Rh" value={data.rhFactor} field="rhFactor" placeholder="Ex: Positivo, Negativo" />
              </View>
            </View>
            <Field label="Tipo de Trombofilia" value={data.thrombophiliaType} field="thrombophiliaType" placeholder="Ex: SAF, Fator V de Leiden..." />
            <Field label="Medicações em Uso" value={data.medications} field="medications" placeholder="Ex: Enoxaparina 40mg, AAS 100mg..." />
            <Field label="Alergias" value={data.allergies} field="allergies" placeholder="Ex: Penicilina, Dipirona..." />
            <Field label="Última Dose de Enoxaparina" value={data.lastEnoxaDate} field="lastEnoxaDate" placeholder="AAAA-MM-DD HH:MM" />
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 16 }}>👩‍⚕️ Equipe Médica</Text>
            <Field label="Obstetra" value={data.obstetra} field="obstetra" placeholder="Nome do obstetra" />
            <Field label="Hematologista" value={data.hematologista} field="hematologista" placeholder="Nome do hematologista" />
            <Field label="Hospital / Maternidade" value={data.hospital} field="hospital" placeholder="Local do parto" />
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 16 }}>🆘 Contato de Emergência</Text>
            <Field label="Nome" value={data.emergencyContact} field="emergencyContact" placeholder="Nome do contato" />
            <Field label="Telefone" value={data.emergencyPhone} field="emergencyPhone" placeholder="(00) 00000-0000" />
          </View>

          {editing && (
            <TouchableOpacity
              onPress={handleSave}
              style={{ backgroundColor: '#8B6F9E', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 16 }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Salvar Cartão Pré-Natal</Text>
            </TouchableOpacity>
          )}

          {/* Important Notice */}
          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#E8B86D', marginBottom: 6 }}>⚠️ Importante</Text>
            <Text style={{ fontSize: 13, color: '#2D1B2E', lineHeight: 20 }}>
              Sempre informe sua equipe médica sobre o uso de anticoagulantes antes de qualquer procedimento. Mantenha este cartão atualizado e leve-o às consultas.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
