
export enum LeatherTexture {
  SMOOTH = 'Smooth Grain',
  PEBBLED = 'Pebbled',
  VINTAGE = 'Vintage Distressed',
  SUEDE = 'Soft Suede'
}

export enum FoilColor {
  GOLD = 'Gold',
  SILVER = 'Silver',
  ROSE_GOLD = 'Rose Gold',
  EMBOSSED = 'Embossed (No Color)'
}

export interface CardDetails {
  brandName: string;
  slogan: string;
  ownerName: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  footerSlogan: string;
  categories: string;
}

export interface AppState {
  details: CardDetails;
  isFlipped: boolean;
  texture: LeatherTexture;
  foil: FoilColor;
  isGenerating: boolean;
}
