import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { storage } from '@/lib/storage';

const PROFILE_LABELS: Record<string, string> = {
  tentante: '🌸 Tentante',
  gestante: '🤰 Gestante',
  fiv: '🔬 FIV / Reprodução Assistida',
  investigacao: '🔍 Em Investigação',
  pos_perda: '🕊️ Pós-perda Gestacional',
  acompanhamento: '💜 Paciente da Consultoria',
};

export default function ProfileScreen() {
  const { profile, isPremium, isAdmin, gestationalWeek, refreshProfile } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Redefinir Perfil',
      'Deseja redefinir seu perfil? Seus dados locais serão mantidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Redefinir',
          style: 'destructive',
          onPress: async () => {
            await storage.setOnboardingDone();
            // Reset onboarding flag to false
            await AsyncStorage.removeItem('@gestar:onboarding_done');
            await AsyncStorage.removeItem('@gestar:user_profile');
            await refreshProfile();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const MENU_ITEMS = [
    { icon: '✏️', label: 'Editar Perfil', route: '/(screens)/edit-profile', color: '#C9748F' },
    { icon: '🔔', label: 'Notificações', route: '/(screens)/notifications-settings', color: '#8B6F9E' },
    { icon: '📁', label: 'Meus Documentos', route: '/(screens)/journey/documents', color: '#7BB8D4' },
    { icon: '🤝', label: 'Parceiros e Benefícios', route: '/(screens)/partners', color: '#6BAF8A' },
    { icon: '❓', label: 'Dúvidas Frequentes', route: '/(screens)/faq', color: '#E8B86D' },
    { icon: '💼', label: 'Consultoria', route: '/(screens)/services', color: '#C9748F' },
    { icon: 'ℹ️', label: 'Sobre o Gestar', route: '/(screens)/about', color: '#8B6F9E' },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 40, paddingHorizontal: 20, alignItems: 'center' }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 40 }}>
              {PROFILE_LABELS[profile?.profileType || '']?.split(' ')[0] || '👤'}
            </Text>
          </View>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            {profile?.name || 'Usuária'}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4 }}>
            {PROFILE_LABELS[profile?.profileType || ''] || 'Perfil não definido'}
          </Text>
          {gestationalWeek > 0 && (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 6, marginTop: 10 }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                {gestationalWeek}ª semana gestacional
              </Text>
            </View>
          )}
        </View>

        <View style={{ marginTop: -20, paddingHorizontal: 16, paddingBottom: 32 }}>

          {/* Status Cards */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
            <View style={{
              flex: 1,
              backgroundColor: isPremium ? '#F5F0FF' : 'white',
              borderRadius: 16,
              padding: 14,
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: isPremium ? '#9B7EC8' : '#EDD9E0',
            }}>
              <Text style={{ fontSize: 24 }}>{isPremium ? '💜' : '🔓'}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: isPremium ? '#9B7EC8' : '#8B7B8B', marginTop: 6 }}>
                {isPremium ? 'Premium Ativo' : 'Plano Gratuito'}
              </Text>
              {!isPremium && (
                <TouchableOpacity onPress={() => router.push('/(screens)/premium')} style={{ marginTop: 6 }}>
                  <Text style={{ fontSize: 11, color: '#C9748F', fontWeight: '600' }}>Fazer Upgrade →</Text>
                </TouchableOpacity>
              )}
            </View>
            {isAdmin && (
              <TouchableOpacity
                onPress={() => router.push('/(screens)/admin')}
                style={{
                  flex: 1,
                  backgroundColor: '#FFF8F0',
                  borderRadius: 16,
                  padding: 14,
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: '#E8B86D',
                }}
              >
                <Text style={{ fontSize: 24 }}>⚙️</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#E8B86D', marginTop: 6 }}>Painel Admin</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Menu Items */}
          <View style={{ backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#EDD9E0', overflow: 'hidden', marginBottom: 16 }}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: index < MENU_ITEMS.length - 1 ? 1 : 0,
                  borderBottomColor: '#EDD9E0',
                }}
              >
                <Text style={{ fontSize: 22, marginRight: 14 }}>{item.icon}</Text>
                <Text style={{ fontSize: 15, color: '#2D1B2E', flex: 1, fontWeight: '500' }}>{item.label}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#8B7B8B" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#EDD9E0',
            }}
          >
            <Text style={{ fontSize: 22, marginRight: 14 }}>🔄</Text>
            <Text style={{ fontSize: 15, color: '#D4697A', flex: 1, fontWeight: '500' }}>Redefinir Perfil</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', color: '#8B7B8B', fontSize: 12, marginTop: 24 }}>
            GESTAR v1.0{'\n'}
            Feito com 💜 para todas as guerreiras
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
