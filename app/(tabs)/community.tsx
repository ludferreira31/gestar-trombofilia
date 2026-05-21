import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';
import { COMMUNITY_POSTS } from '@/constants/content';

const COMMUNITY_SECTIONS = [
  { id: 'relatos', icon: '💬', label: 'Relatos da Comunidade', color: '#C9748F', bg: '#FFF0F3', route: '/(screens)/community/relatos' },
  { id: 'nascimentos', icon: '🌈', label: 'Mural de Nascimentos', color: '#6BAF8A', bg: '#F0FFF4', route: '/(screens)/community/births' },
  { id: 'legislativo', icon: '⚖️', label: 'Vitórias Legislativas', color: '#8B6F9E', bg: '#F5F0FF', route: '/(screens)/community/legislative' },
  { id: 'campanhas', icon: '📣', label: 'Campanhas de Conscientização', color: '#E8B86D', bg: '#FFF8F0', route: '/(screens)/community/campaigns' },
  { id: 'gstar', icon: '🌟', label: 'Projeto GSTAR', color: '#7BB8D4', bg: '#F0F8FF', route: '/(screens)/community/gstar' },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'feed' | 'sections'>('feed');

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={{ backgroundColor: '#6BAF8A', paddingTop: 16, paddingBottom: 28, paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Comunidade</Text>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4 }}>
          Juntas somos mais fortes 💜
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: -12, paddingHorizontal: 16, paddingBottom: 32 }}>

          {/* Tab Toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 14, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#EDD9E0' }}>
            {[{ key: 'feed', label: '📰 Feed' }, { key: 'sections', label: '🗂️ Seções' }].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key as any)}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  backgroundColor: activeTab === tab.key ? '#6BAF8A' : 'transparent',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: activeTab === tab.key ? 'white' : '#8B7B8B' }}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'sections' ? (
            <>
              {COMMUNITY_SECTIONS.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  onPress={() => router.push(section.route as any)}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: section.bg,
                    borderRadius: 16,
                    padding: 18,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#EDD9E0',
                  }}
                >
                  <Text style={{ fontSize: 32, marginRight: 14 }}>{section.icon}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#2D1B2E', flex: 1 }}>{section.label}</Text>
                  <MaterialIcons name="chevron-right" size={22} color={section.color} />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {/* New Post Button */}
              <TouchableOpacity
                onPress={() => router.push('/(screens)/community/new-post')}
                style={{
                  backgroundColor: '#C9748F',
                  borderRadius: 16,
                  padding: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  gap: 8,
                }}
              >
                <MaterialIcons name="add" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Compartilhar na Comunidade</Text>
              </TouchableOpacity>

              {/* Posts Feed */}
              {COMMUNITY_POSTS.map((post) => (
                <View
                  key={post.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 14,
                    borderWidth: 1,
                    borderColor: '#EDD9E0',
                    shadowColor: '#C9748F',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Text style={{ fontSize: 22 }}>{post.avatar}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E' }}>{post.author}</Text>
                      <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{post.time}</Text>
                    </View>
                    {post.type === 'nascimento' && (
                      <View style={{ backgroundColor: '#F0FFF4', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 11, color: '#6BAF8A', fontWeight: '600' }}>🌈 Nascimento</Text>
                      </View>
                    )}
                    {post.type === 'duvida' && (
                      <View style={{ backgroundColor: '#FFF8F0', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 11, color: '#E8B86D', fontWeight: '600' }}>❓ Dúvida</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{post.content}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 12, gap: 20 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <MaterialIcons name="favorite-border" size={18} color="#C9748F" />
                      <Text style={{ fontSize: 13, color: '#8B7B8B' }}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <MaterialIcons name="chat-bubble-outline" size={18} color="#8B6F9E" />
                      <Text style={{ fontSize: 13, color: '#8B7B8B' }}>{post.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <MaterialIcons name="share" size={18} color="#8B7B8B" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Acolhimento Banner */}
              <TouchableOpacity
                onPress={() => router.push('/(screens)/support')}
                activeOpacity={0.9}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  backgroundColor: '#F5EDF8',
                  borderWidth: 1.5,
                  borderColor: '#C9748F',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 36, marginRight: 14 }}>🕊️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#2D1B2E', fontSize: 15, fontWeight: 'bold' }}>Espaço de Acolhimento</Text>
                  <Text style={{ color: '#8B7B8B', fontSize: 13, marginTop: 3, lineHeight: 18 }}>
                    Suporte sensível sobre perda gestacional, prematuridade e luto parental.
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#C9748F" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
