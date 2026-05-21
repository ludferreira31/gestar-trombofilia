import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/screen-container';

const SUPPORT_SECTIONS = [
  {
    id: 'perda',
    icon: '🕊️',
    title: 'Espaço de Acolhimento para Perda Gestacional',
    color: '#C9748F',
    bg: '#FFF0F3',
    content: `A perda gestacional é uma das experiências mais dolorosas que uma mulher pode vivenciar. Aqui, você não está sozinha.

Cada perda é única. Cada dor é legítima. Não existe tempo certo para o luto, nem forma correta de sentir.

Você tem o direito de chorar, de sentir raiva, de questionar, de lembrar. Você tem o direito de honrar cada vida que passou por você, independentemente do tempo que ficou.

Se você está passando por uma perda, saiba que o GESTAR caminha ao seu lado. Nossa comunidade é formada por mulheres que entendem sua dor — porque muitas delas também passaram por ela.

Você é forte. Você é corajosa. E quando estiver pronta, estaremos aqui.`,
  },
  {
    id: 'prematuridade',
    icon: '🌱',
    title: 'Prematuridade — Cada Dia é uma Vitória',
    color: '#6BAF8A',
    bg: '#F0FFF4',
    content: `Ter um bebê prematuro é uma jornada que poucos conseguem compreender completamente. A UTI neonatal, os fios, os monitores, a incerteza — tudo isso é real e pesado.

Mas também é real a força que você descobre em si mesma. A forma como você aprende a ler cada sinal do seu bebê. A alegria de cada grama ganho, de cada dia fora do oxigênio, de cada sorriso conquistado.

Bebês prematuros são guerreiros. E suas mães, também.

O GESTAR reconhece que a prematuridade muitas vezes está ligada à trombofilia e às complicações vasculares placentárias. Você não fez nada de errado. Você fez tudo o que estava ao seu alcance.`,
  },
  {
    id: 'luto',
    icon: '💜',
    title: 'Luto Parental — Reconhecendo sua Dor',
    color: '#8B6F9E',
    bg: '#F5F0FF',
    content: `O luto parental é invisível para muitos, mas absolutamente real para quem o vive. A sociedade muitas vezes não sabe como lidar com a perda de um filho — especialmente quando essa perda acontece antes ou logo após o nascimento.

Mas seu filho existiu. Seu amor por ele é real. Sua dor é real.

Você pode e deve buscar apoio psicológico especializado. Grupos de apoio para perda gestacional podem ser transformadores — encontrar outras mães que entendem sua dor é um passo importante na jornada do luto.

Lembrar não é fraqueza. Honrar é amor.`,
  },
  {
    id: 'acolhimento',
    icon: '🤗',
    title: 'Acolhimento Materno',
    color: '#E8A598',
    bg: '#FFF5F3',
    content: `Ser mãe com trombofilia é uma jornada que exige coragem todos os dias. As injeções, os exames, as incertezas, o medo — tudo isso é parte de uma batalha silenciosa que você trava com amor.

Mas você não precisa carregar isso sozinha.

O GESTAR nasceu para ser seu espaço seguro. Um lugar onde você pode ser honesta sobre seus medos, celebrar suas conquistas e encontrar outras mulheres que entendem exatamente o que você está vivendo.

Você é mais do que sua trombofilia. Você é uma mulher extraordinária que escolhe lutar todos os dias pelo maior amor da sua vida.`,
  },
];

const RESOURCES = [
  { icon: '📞', title: 'CVV — Centro de Valorização da Vida', subtitle: 'Ligue 188 (24h)', color: '#D4697A' },
  { icon: '🧠', title: 'Psicólogo Online', subtitle: 'Busque apoio profissional especializado', color: '#8B6F9E' },
  { icon: '👥', title: 'Grupos de Apoio', subtitle: 'Comunidade GESTAR', color: '#6BAF8A' },
  { icon: '📚', title: 'Leitura Recomendada', subtitle: 'Livros sobre luto e maternidade', color: '#E8B86D' },
];

export default function SupportScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>('perda');

  return (
    <ScreenContainer>
      <View style={{ backgroundColor: '#C9748F', paddingTop: 16, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Espaço de Acolhimento</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Você não está sozinha 💜</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>

          {/* Intro */}
          <View style={{ backgroundColor: '#F5EDF8', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1.5, borderColor: '#C9748F', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>💜</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2D1B2E', textAlign: 'center', marginBottom: 8 }}>
              Um espaço criado com amor
            </Text>
            <Text style={{ fontSize: 14, color: '#8B7B8B', textAlign: 'center', lineHeight: 22 }}>
              Este espaço foi criado para acolher, validar e apoiar mulheres em momentos de dor, luto e incerteza. Aqui, sua experiência importa.
            </Text>
          </View>

          {/* Sections */}
          {SUPPORT_SECTIONS.map((section) => (
            <View key={section.id} style={{ marginBottom: 12 }}>
              <TouchableOpacity
                onPress={() => setExpanded(expanded === section.id ? null : section.id)}
                activeOpacity={0.8}
                style={{
                  backgroundColor: expanded === section.id ? section.bg : 'white',
                  borderRadius: expanded === section.id ? 20 : 16,
                  padding: 18,
                  borderWidth: 1.5,
                  borderColor: expanded === section.id ? section.color : '#EDD9E0',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 28, marginRight: 14 }}>{section.icon}</Text>
                <Text style={{ flex: 1, fontSize: 15, fontWeight: '700', color: expanded === section.id ? section.color : '#2D1B2E', lineHeight: 22 }}>
                  {section.title}
                </Text>
                <MaterialIcons
                  name={expanded === section.id ? 'expand-less' : 'expand-more'}
                  size={24}
                  color={section.color}
                />
              </TouchableOpacity>
              {expanded === section.id && (
                <View style={{ backgroundColor: section.bg, borderRadius: 16, padding: 18, marginTop: -8, borderWidth: 1, borderColor: section.color, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                  <Text style={{ fontSize: 14, color: '#2D1B2E', lineHeight: 26 }}>{section.content}</Text>
                </View>
              )}
            </View>
          ))}

          {/* Resources */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#2D1B2E', marginTop: 8, marginBottom: 14 }}>Recursos de Apoio</Text>
          {RESOURCES.map((resource, i) => (
            <View key={i} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EDD9E0' }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: resource.color + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                <Text style={{ fontSize: 22 }}>{resource.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#2D1B2E' }}>{resource.title}</Text>
                <Text style={{ fontSize: 13, color: '#8B7B8B', marginTop: 2 }}>{resource.subtitle}</Text>
              </View>
            </View>
          ))}

          {/* Community Link */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/community')}
            style={{ backgroundColor: '#C9748F', borderRadius: 18, padding: 18, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>👥</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Comunidade Gestar</Text>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 3 }}>
                Conecte-se com outras mulheres que entendem sua jornada
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
