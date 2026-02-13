
import React from 'react';

export const INITIAL_DETAILS = {
  brandName: "MOZHDEH LEATHER",
  slogan: "Premium Handcrafted Leather Goods",
  ownerName: "Mozhdeh Latifkar",
  title: "Founder & Creative Director",
  phone: "+91 XXXXX XXXXX",
  email: "info@mozhdehleather.com",
  website: "www.mozhdehleather.com",
  location: "City, Country",
  footerSlogan: "Handcrafted • Durable • Timeless",
  categories: "Wallets | Bags | Belts | Accessories"
};

export const THEME = {
  background: {
    matteBlack: 'bg-[#0a0a0a]', // Deep, high-end matte black
    darkBrown: 'bg-[#150d0a]', 
  },
  text: {
    gold: 'text-[#d4af37]',
    goldGradient: 'bg-gradient-to-br from-[#c5a059] via-[#fcf6ba] to-[#926b2d] bg-clip-text text-transparent',
    cream: 'text-[#fdfcf0]', // Brighter cream for better contrast on black
    creamMuted: 'text-[#fdfcf0]/50',
  }
};

export const TEXTURE_COLORS = {
  'Smooth Grain': 'bg-[#0a0a0a]',
  'Pebbled': 'bg-[#0c0c0c]',
  'Vintage Distressed': 'bg-[#0f0f0f]',
  'Soft Suede': 'bg-[#141414]'
};

export const FOIL_STYLES = {
  'Gold': 'bg-gradient-to-br from-[#c5a059] via-[#fcf6ba] to-[#926b2d] bg-clip-text text-transparent',
  'Silver': 'bg-gradient-to-br from-gray-300 via-gray-100 to-gray-500 bg-clip-text text-transparent',
  'Rose Gold': 'bg-gradient-to-br from-[#b76e79] via-[#e5aa70] to-[#b76e79] bg-clip-text text-transparent',
  'Embossed (No Color)': 'text-white/20 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),_inset_-1px_-1px_2px_rgba(0,0,0,0.8)]'
};
