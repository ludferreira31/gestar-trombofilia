import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { storage } from '@/lib/storage';
import { useUser } from '@/lib/user-context';
import { ONBOARDING_SLIDES, PROFILE_TYPES } from '@/constants/content';
const { width: _width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [step, setStep] = useState(0); // 0-2: slides, 3: profile select, 4: name input
  const [selectedProfile, setSelectedProfile] = useState('');
  const [name, setName] = useState('');
  const [dum, setDum] = useState('');
  const router = useRouter();
  const { setProfile } = useUser();

  const handleNext = () => {
    if (step < ONBOARDING_SLIDES.length - 1) {
      setStep(step + 1);
    } else {
      setStep(ONBOARDING_SLIDES.length); // profile selection
    }
  };

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    setStep(ONBOARDING_SLIDES.length + 1); // name input
  };

  const handleFinish = async () => {
    if (!name.trim()) return;
    const profile = {
      name: name.trim(),
      profileType: selectedProfile,
      dum: dum || undefined,
      isPremium: false,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };
    await setProfile(profile);
    await storage.setOnboardingDone();
    router.replace('/(tabs)');
  };

  // Slides
  if (step < ONBOARDING_SLIDES.length) {
    const slide = ONBOARDING_SLIDES[step];
    return (
      <View style={{ flex: 1, backgroundColor: slide.bg }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Image
            source={slide.image}
            style={{ width: 180, height: 180, marginBottom: 40, borderRadius: 90 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 16, lineHeight: 36 }}>
            {slide.title}
          </Text>
          <Text style={{ fontSize: 16, color: '#8B7B8B', textAlign: 'center', lineHeight: 24 }}>
            {slide.subtitle}
          </Text>
        </View>

        {/* Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === step ? '#C9748F' : '#EDD9E0',
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Button */}
        <View style={{ paddingHorizontal: 32, paddingBottom: 48 }}>
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#C9748F',
              borderRadius: 24,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>
              {step < ONBOARDING_SLIDES.length - 1 ? 'Continuar' : 'Começar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Profile Selection
  if (step === ONBOARDING_SLIDES.length) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FDF8F5' }}>
        <View style={{ paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 8 }}>
            Qual é a sua jornada?
          </Text>
          <Text style={{ fontSize: 15, color: '#8B7B8B', lineHeight: 22 }}>
            Selecione o perfil que melhor descreve o seu momento atual.
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8 }}>
          {PROFILE_TYPES.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              onPress={() => handleProfileSelect(profile.id)}
              activeOpacity={0.8}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 18,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1.5,
                borderColor: '#EDD9E0',
                shadowColor: '#C9748F',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 32, marginRight: 16 }}>{profile.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#2D1B2E', marginBottom: 2 }}>
                  {profile.label}
                </Text>
                <Text style={{ fontSize: 13, color: '#8B7B8B' }}>{profile.description}</Text>
              </View>
              <Text style={{ fontSize: 20, color: '#C9748F' }}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Name + DUM Input
  return (
    <View style={{ flex: 1, backgroundColor: '#FDF8F5' }}>
      <ScrollView contentContainerStyle={{ padding: 32, paddingTop: 60 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 8 }}>
          Vamos nos conhecer 💜
        </Text>
        <Text style={{ fontSize: 15, color: '#8B7B8B', marginBottom: 32, lineHeight: 22 }}>
          Essas informações nos ajudam a personalizar sua experiência.
        </Text>

        <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>
          Seu nome
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Como você gostaria de ser chamada?"
          placeholderTextColor="#8B7B8B"
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            color: '#2D1B2E',
            borderWidth: 1.5,
            borderColor: '#EDD9E0',
            marginBottom: 24,
          }}
        />

        {(selectedProfile === 'gestante' || selectedProfile === 'acompanhamento') && (
          <>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E', marginBottom: 8 }}>
              Data da Última Menstruação (DUM)
            </Text>
            <TextInput
              value={dum}
              onChangeText={setDum}
              placeholder="AAAA-MM-DD (ex: 2025-01-15)"
              placeholderTextColor="#8B7B8B"
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                color: '#2D1B2E',
                borderWidth: 1.5,
                borderColor: '#EDD9E0',
                marginBottom: 8,
              }}
            />
            <Text style={{ fontSize: 12, color: '#8B7B8B', marginBottom: 24 }}>
              Usaremos para calcular sua semana gestacional automaticamente.
            </Text>
          </>
        )}

        <TouchableOpacity
          onPress={handleFinish}
          disabled={!name.trim()}
          activeOpacity={0.85}
          style={{
            backgroundColor: name.trim() ? '#C9748F' : '#EDD9E0',
            borderRadius: 24,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>
            Entrar no Gestar 💜
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
