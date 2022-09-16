import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import {GameController} from 'phosphor-react-native';

import { styles } from './styles';

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
  onConnect: () => void;
}

export function DuoCard({
  hourEnd, 
  hourStart, 
  id, 
  name, 
  useVoiceChannel, 
  weekDays, 
  yearsPlaying,
  onConnect
}: DuoCardProps) {

  return (
    <View style={styles.container}>
      <DuoInfo 
        label='Nome'
        value={name}
      />

      <DuoInfo 
        label='Tempo de jogo'
        value={`${yearsPlaying} anos`}
      />

      <DuoInfo 
        label='Disponibilidade'
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />

      <DuoInfo 
        label='Chamada de áudio'
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController 
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>

      </TouchableOpacity>
    </View>
  );
}