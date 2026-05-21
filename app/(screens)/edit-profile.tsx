import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';

const PROFILE_TYPES = [
  { id: 'tentante', label: '🌸 Tentante', desc: 'Tentando engravidar' },
  { id: 'gestante', label: '🤰 Gestante', desc: 'Atualmente grávida' },
  { id: 'fiv', label: '🔬 FIV', desc: 'Em tratamento de reprodução assistida' },
  { id: 'investigacao', label: '🔍 Em Investigação', desc: 'Investigando causas de perdas' },
  { id: 'pos_perda', label: '🕊️ Pós-perda', desc: 'Após perda gestacional' },
  { id: 'acompanhamento', label: '💜 Consultoria', desc: 'Paciente da consultoria' },
];

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [form, setForm] = useState({
    name: profile?.name || '',
    profileType: profile?.profileType || 'gestante',
    dum: profile?.dum || '',
    dpp: profile?.dpp || '',
  });

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Atenção', 'Informe seu nome.');
      return;
    }
    await updateProfile({ ...profile, ...form });
    Alert.alert('Salvo!', 'Perfil atualizado com sucesso.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Editar Perfil</Text>
        </View>
        <TouchableOpacity onPress={handleSave} style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}>
          <MaterialIcons name="check" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>Informações Pessoais</Text>

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>Como posso te chamar?</Text>
            <TextInput
              value={form.name}
              onChangeText={(v) => setForm(f => ({ ...f, name: v }))}
              placeholder="Seu nome"
              placeholderTextColor="#8B7B8B"
              style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', marginBottom: 16 }}
            />

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>DUM (Data da Última Menstruação)</Text>
            <TextInput
              value={form.dum}
              onChangeText={(v) => setForm(f => ({ ...f, dum: v }))}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#8B7B8B"
              style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', marginBottom: 16 }}
            />

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#2D1B2E', marginBottom: 6 }}>DPP (Data Provável do Parto)</Text>
            <TextInput
              value={form.dpp}
              onChangeText={(v) => setForm(f => ({ ...f, dpp: v }))}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#8B7B8B"
              style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
            />
          </View>

          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 14 }}>Meu Perfil</Text>
            {PROFILE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setForm(f => ({ ...f, profileType: type.id }))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                  borderRadius: 14,
                  marginBottom: 8,
                  backgroundColor: form.profileType === type.id ? '#FFF0F3' : '#F8F8F8',
                  borderWidth: 1.5,
                  borderColor: form.profileType === type.id ? '#C9748F' : '#E5E5E5',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: form.profileType === type.id ? '#C9748F' : '#2D1B2E' }}>{type.label}</Text>
                  <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 2 }}>{type.desc}</Text>
                </View>
                {form.profileType === type.id && <MaterialIcons name="check-circle" size={22} color="#C9748F" />}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#C9748F', borderRadius: 16, padding: 16, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
