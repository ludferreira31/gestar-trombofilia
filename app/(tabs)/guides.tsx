import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { useUser } from '@/lib/user-context';
import { GUIDES } from '@/constants/content';

export default function GuidesScreen() {
  const { isPremium } = useUser();
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  const filtered = GUIDES.filter(g => {
    if (filter === 'free') return !g.premium;
    if (filter === 'premium') return g.premium;
    return true;
  });

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={{ backgroundColor: '#8B6F9E', paddingTop: 16, paddingBottom: 28, paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Manual do Gestar</Text>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4 }}>
          Guias especializados sobre trombofilia e gestação
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: -12, paddingHorizontal: 16, paddingBottom: 32 }}>

          {/* Filter Tabs */}
          <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 14, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#EDD9E0' }}>
            {[
              { key: 'all', label: 'Todos' },
              { key: 'free', label: 'Gratuitos' },
              { key: 'premium', label: 'Premium 💜' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setFilter(tab.key as any)}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  backgroundColor: filter === tab.key ? '#8B6F9E' : 'transparent',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: filter === tab.key ? 'white' : '#8B7B8B' }}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Guides List */}
          {filtered.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              onPress={() => {
                if (guide.premium && !isPremium) {
                  router.push('/(screens)/premium');
                } else {
                  router.push({ pathname: '/(screens)/guide-detail', params: { id: guide.id } });
                }
              }}
              activeOpacity={0.85}
              style={{
                backgroundColor: 'white',
                borderRadius: 18,
                padding: 18,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: guide.premium ? '#9B7EC8' : '#EDD9E0',
                shadowColor: guide.color,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: guide.color + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}>
                <Text style={{ fontSize: 28 }}>{guide.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', flex: 1 }}>
                    {guide.title}
                  </Text>
                  {guide.premium && (
                    <View style={{ backgroundColor: '#9B7EC8', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 }}>
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>Premium</Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 12, color: '#8B7B8B', lineHeight: 18 }}>{guide.subtitle}</Text>
              </View>
              {guide.premium && !isPremium ? (
                <MaterialIcons name="lock" size={20} color="#9B7EC8" style={{ marginLeft: 8 }} />
              ) : (
                <MaterialIcons name="chevron-right" size={22} color={guide.color} style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          ))}

          {/* Plano de Parto CTA */}
          <TouchableOpacity
            onPress={() => isPremium ? router.push('/(screens)/birth-plan') : router.push('/(screens)/premium')}
            activeOpacity={0.9}
            style={{
              borderRadius: 20,
              padding: 20,
              marginTop: 8,
              backgroundColor: '#C9748F',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 36, marginRight: 14 }}>📝</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Plano de Parto Digital</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 3 }}>
                Crie e compartilhe seu plano de parto personalizado para trombofilia
              </Text>
            </View>
            <MaterialIcons name={isPremium ? 'chevron-right' : 'lock'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
