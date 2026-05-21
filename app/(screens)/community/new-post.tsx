import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const POST_TYPES = [
  { id: 'relato', label: 'Relato', icon: '💜', color: '#C9748F' },
  { id: 'duvida', label: 'Dúvida', icon: '❓', color: '#E8B86D' },
  { id: 'dica', label: 'Dica', icon: '💡', color: '#8B6F9E' },
  { id: 'nascimento', label: 'Nascimento', icon: '🌈', color: '#6BAF8A' },
];

export default function NewPostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('relato');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Atenção', 'Preencha o título e o conteúdo da publicação.');
      return;
    }
    Alert.alert(
      'Publicação enviada! 💜',
      'Sua mensagem foi enviada para moderação e em breve estará visível na comunidade.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Nova Publicação</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Compartilhe com a comunidade</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Tipo de publicação</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {POST_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setPostType(type.id)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: postType === type.id ? type.color : 'white',
                  borderWidth: 1.5,
                  borderColor: postType === type.id ? type.color : '#EDD9E0',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Text style={{ fontSize: 16 }}>{type.icon}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: postType === type.id ? 'white' : '#8B7B8B' }}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Título</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Um título para sua publicação..."
              placeholderTextColor="#8B7B8B"
              style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0' }}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>Conteúdo</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Compartilhe sua experiência, dúvida ou mensagem..."
              placeholderTextColor="#8B7B8B"
              multiline
              textAlignVertical="top"
              style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, fontSize: 15, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', minHeight: 140 }}
            />
          </View>

          <TouchableOpacity
            onPress={() => setAnonymous(!anonymous)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: '#EDD9E0' }}
          >
            <View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: anonymous ? '#C9748F' : '#EDD9E0', backgroundColor: anonymous ? '#C9748F' : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              {anonymous && <MaterialIcons name="check" size={16} color="white" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E' }}>Publicar anonimamente</Text>
              <Text style={{ fontSize: 12, color: '#8B7B8B', marginTop: 2 }}>Seu nome não será exibido</Text>
            </View>
          </TouchableOpacity>

          <View style={{ backgroundColor: '#FFF8F0', borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: '#E8B86D' }}>
            <Text style={{ fontSize: 12, color: '#E8B86D', fontWeight: '700', marginBottom: 4 }}>⚠️ Diretrizes da Comunidade</Text>
            <Text style={{ fontSize: 12, color: '#2D1B2E', lineHeight: 18 }}>
              Mantenha um ambiente respeitoso e acolhedor. Não compartilhe informações médicas como prescrições. Publicações passam por moderação.
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{ backgroundColor: '#C9748F', borderRadius: 16, padding: 16, alignItems: 'center' }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Publicar na Comunidade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
