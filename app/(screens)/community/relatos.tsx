import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const RELATOS = [
  {
    id: '1',
    author: 'Ana Paula M.',
    avatar: '👩',
    time: '2h atrás',
    title: 'Chegamos na 28ª semana! 💜',
    content: 'Hoje completei 28 semanas! Quem diria que chegaria até aqui depois de 3 perdas. A enoxaparina foi minha companheira fiel todos os dias. Gratidão a todas que me apoiaram nessa jornada! Cada picada valeu a pena.',
    likes: 47,
    comments: 12,
    tag: 'Vitória',
    tagColor: '#6BAF8A',
  },
  {
    id: '2',
    author: 'Mariana Costa',
    avatar: '👩‍🦱',
    time: '5h atrás',
    title: 'Dúvida sobre ajuste de dose',
    content: 'Alguém já teve que ajustar a dose de enoxaparina no 3º trimestre? Minha médica está considerando aumentar e fiquei um pouco apreensiva. Qualquer experiência ajuda!',
    likes: 23,
    comments: 18,
    tag: 'Dúvida',
    tagColor: '#E8B86D',
  },
  {
    id: '3',
    author: 'Camila Rodrigues',
    avatar: '👩‍🦳',
    time: '1d atrás',
    title: 'Minha jornada com SAF',
    content: 'Fui diagnosticada com Síndrome Antifosfolípide após minha segunda perda. Hoje, com tratamento adequado, estou na 32ª semana com minha filha. Para quem está no início: não desistam! O diagnóstico correto muda tudo.',
    likes: 89,
    comments: 34,
    tag: 'Relato',
    tagColor: '#C9748F',
  },
  {
    id: '4',
    author: 'Juliana Ferreira',
    avatar: '👩‍🦰',
    time: '2d atrás',
    title: 'Dicas para aplicação de enoxaparina',
    content: 'Depois de 6 meses aplicando, aprendi algumas dicas que ajudaram muito: gelo antes para reduzir a dor, alternar sempre o local, e respirar fundo na hora da aplicação. Compartilhem suas dicas também!',
    likes: 156,
    comments: 67,
    tag: 'Dica',
    tagColor: '#8B6F9E',
  },
];

export default function RelatosScreen() {
  const router = useRouter();
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Relatos da Comunidade</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Histórias reais de guerreiras</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(screens)/community/new-post')}
          style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: 8 }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          {RELATOS.map((post) => (
            <View key={post.id} style={{ backgroundColor: 'white', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#EDD9E0', shadowColor: '#C9748F', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Text style={{ fontSize: 22 }}>{post.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E' }}>{post.author}</Text>
                  <Text style={{ fontSize: 12, color: '#8B7B8B' }}>{post.time}</Text>
                </View>
                <View style={{ backgroundColor: post.tagColor + '20', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 11, color: post.tagColor, fontWeight: '700' }}>{post.tag}</Text>
                </View>
              </View>

              <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginBottom: 8 }}>{post.title}</Text>
              <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 22 }}>{post.content}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EDD9E0', gap: 16 }}>
                <TouchableOpacity onPress={() => toggleLike(post.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MaterialIcons name={liked.has(post.id) ? 'favorite' : 'favorite-border'} size={20} color={liked.has(post.id) ? '#C9748F' : '#8B7B8B'} />
                  <Text style={{ fontSize: 13, color: liked.has(post.id) ? '#C9748F' : '#8B7B8B', fontWeight: '600' }}>
                    {post.likes + (liked.has(post.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MaterialIcons name="chat-bubble-outline" size={20} color="#8B7B8B" />
                  <Text style={{ fontSize: 13, color: '#8B7B8B', fontWeight: '600' }}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MaterialIcons name="share" size={20} color="#8B7B8B" />
                  <Text style={{ fontSize: 13, color: '#8B7B8B', fontWeight: '600' }}>Compartilhar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
