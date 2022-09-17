import {View, TouchableOpacity, Image, FlatList, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {Entypo} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import {DuoCardProps} from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

interface GameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const handleGoBack = () => {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.2:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.15.2:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>


        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (        
            <DuoCard 
              hourEnd={item.hourEnd}
              hourStart={item.hourStart}
              id={item.id}
              name={item.name}
              useVoiceChannel={item.useVoiceChannel}
              weekDays={item.weekDays}
              yearsPlaying={item.yearsPlaying}
              key={item.id}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.cotainerList}
          contentContainerStyle={[
            duos.length > 0 
              ? styles.contentList 
              : styles.emptyListContent
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />

      </SafeAreaView>
    </Background>
  );
}