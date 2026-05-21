import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

export default function CommunityPostScreen() {
  const router = useRouter();
  const { title, content, author, category, date } = useLocalSearchParams<{
    title: string; content: string; author: string; category: string; date: string;
  }>();
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Comunidade</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {/* Post */}
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EDD9E0', marginBottom: 16 }}>
            {category && (
              <View style={{ backgroundColor: '#FFF0F3', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: '#C9748F', fontWeight: '700' }}>{category}</Text>
              </View>
            )}
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', marginBottom: 12, lineHeight: 26 }}>{title}</Text>
            <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 26 }}>{content}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#EDD9E0' }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 18 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#2D1B2E' }}>{author || 'Anônima'}</Text>
                <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{date || ''}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setLiked(!liked)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: liked ? '#FFF0F3' : '#F8F8F8', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 }}
              >
                <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={18} color={liked ? '#C9748F' : '#8B7B8B'} />
                <Text style={{ fontSize: 13, color: liked ? '#C9748F' : '#8B7B8B', fontWeight: '600' }}>Curtir</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comment Box */}
          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#EDD9E0' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E', marginBottom: 12 }}>Deixe seu comentário</Text>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Compartilhe sua experiência ou apoio..."
              placeholderTextColor="#8B7B8B"
              multiline
              textAlignVertical="top"
              style={{ backgroundColor: '#FDF8F5', borderRadius: 12, padding: 14, fontSize: 14, color: '#2D1B2E', borderWidth: 1.5, borderColor: '#EDD9E0', minHeight: 80, marginBottom: 12 }}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#C9748F', borderRadius: 14, padding: 14, alignItems: 'center', opacity: comment.trim() ? 1 : 0.5 }}
              disabled={!comment.trim()}
            >
              <Text style={{ color: 'white', fontWeight: '700' }}>Enviar Comentário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
