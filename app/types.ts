import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}
export type Position = {
  dt: Date;
  alt: number;
  hdg: number;
  lat: number;
  lng: number;
  spd: number;
};

export type VatsimOnlineFlightsApiResponse = {
  callsign: string;
  name: string;
  origin: string;
  destination: string;
  aircraft: string;
  firs: string[];
  position: Position;
};

export type VatsimOnlineAtcApiResponse = {
  name: string;
  frequency: number;
  fir: string;
  callsign: string;
};

export interface FutureBookingApiResponse {
  callsign: string;
  name: string;
  fir: string;
  date: string;
  timeStart: string;
  timeStop: string;
}
