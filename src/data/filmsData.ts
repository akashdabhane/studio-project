import filmsJson from './films.json';
import castJson from './cast.json';

export interface CastMember {
  id: string;
  name: string;
  headshot: string | null;
}

export interface FilmFlags {
  spotlight?: boolean;
  upcoming?: boolean;
  mhcu?: boolean;
}

export interface Film {
  id: string;
  title: string;
  release_date: string | null;
  director: string;
  writer: string;
  description: string;
  trailer_url: string | null;
  brand_color: string | null;
  category: string;
  flags: FilmFlags;
  spotlight_image?: string;
  spotlight_order?: number;
  media: string[];
  cast_ids: string[];
  cast_members?: CastMember[];
}

export interface MHCUItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  images: string[];
  trailer_url?: string;
}

const castMap = new Map<string, CastMember>(
  (castJson as CastMember[]).map(c => [c.id, c])
);

// Map film IDs to downloaded real poster image filenames if needed
const imageOverrides: Record<string, { spotlight?: string; media?: string[] }> = {
  'eetha': {
    spotlight: 'daf93eb13a04.CU1O9lDy.jpeg',
    media: ['ccdb67c1de18.eafRkhPC.jpeg', 'daf93eb13a04.CU1O9lDy.jpeg']
  },
  'prahaar-the-ujjwal-nikam-story': {
    spotlight: '19b61dd2b244.C41wA0eS.jpeg',
    media: ['b3d99d6d8017.BpaUke21.jpeg', '19b61dd2b244.C41wA0eS.jpeg']
  },
  'cocktail-2': {
    spotlight: '26e7714088b4.ovn2qWA-.jpeg',
    media: ['7c8d43ea53fc.DbrCnIEd.jpeg', '26e7714088b4.ovn2qWA-.jpeg']
  },
  'thamma': {
    media: ['2CPtFVZWzThp9cjxUcpf2i2J6Qi.BrIzcl7C.jpeg', '6N9sUbnu1FwwY8qT1mtHVSSBsdh.CEi_1YtL.jpeg']
  },
  'stree-2': {
    media: ['2NC7sj8rheKxWqLYAbHnCa4mYBH.6MsJ7t0E.jpeg', 'yudyxWcSts44556WWpJkoBZvylO.B2EHXfcW.jpeg']
  },
  'munjya': {
    media: ['pgAlKZVLX0eKu7By7LeRArqW7Jh.D4m4JIMG.jpeg', 'ylYdXu0SM79Qs7vOz6q7mBxanVD.BLTv2MgE.jpeg']
  },
  'bhediya': {
    media: ['A2qPWAJmnq3wVk3zBIupTdyJfxR.BFxDqjPS.jpeg', 'MOFfgbFGYsMOPghNJHKANn4WWQ.o6IoOWJE.jpeg']
  },
  'roohi': {
    media: ['10kCy34fbgU9nI5ScfMcCGebNgo.D1WTDxyb.jpeg', 'dseX3duyu7mHwzZqymdiDdXUaMR.jExhC15a.jpeg']
  },
  'stree': {
    media: ['6EXmk9vRC1Nyo18yElHe98RvGHg.DYvtoTAO.jpeg', '8857yhGrS85did6DfUAc1cF4ato.d7BcZafc.jpeg']
  }
};

const fallbackImages = [
  'ccdb67c1de18.eafRkhPC.jpeg',
  'b3d99d6d8017.BpaUke21.jpeg',
  '7c8d43ea53fc.DbrCnIEd.jpeg',
  '2NC7sj8rheKxWqLYAbHnCa4mYBH.6MsJ7t0E.jpeg',
  'pgAlKZVLX0eKu7By7LeRArqW7Jh.D4m4JIMG.jpeg',
  'A2qPWAJmnq3wVk3zBIupTdyJfxR.BFxDqjPS.jpeg',
  '10kCy34fbgU9nI5ScfMcCGebNgo.D1WTDxyb.jpeg',
  '6EXmk9vRC1Nyo18yElHe98RvGHg.DYvtoTAO.jpeg'
];

export const allFilms: Film[] = (filmsJson as Film[]).map((film, index) => {
  const cast_members = (film.cast_ids || [])
    .map(id => castMap.get(id))
    .filter((c): c is CastMember => c !== undefined);

  const override = imageOverrides[film.id];
  const spotlight_image = override?.spotlight || film.spotlight_image || fallbackImages[index % fallbackImages.length];
  const media = override?.media || (film.media && film.media.length > 0 ? film.media : [fallbackImages[index % fallbackImages.length]]);

  return {
    ...film,
    spotlight_image,
    media,
    cast_members
  };
});

export const getSpotlightFilms = (): Film[] => {
  return allFilms
    .filter(f => f.flags?.spotlight)
    .sort((a, b) => (a.spotlight_order || 99) - (b.spotlight_order || 99));
};

export const getUpcomingFilms = (): Film[] => {
  return allFilms.filter(f => f.flags?.upcoming);
};

export const getMHCUFilms = (): Film[] => {
  return allFilms.filter(f => f.flags?.mhcu || f.category?.includes('MHCU'));
};

export const mhcuAssets: MHCUItem[] = [
  {
    id: 'thamma',
    title: 'Thamma',
    excerpt: 'An upcoming major addition to the Maddock Supernatural Universe, dealing with a romantic horror-comedy storyline.',
    date: '10/21/2025',
    images: ['2CPtFVZWzThp9cjxUcpf2i2J6Qi.BrIzcl7C.jpeg', '6N9sUbnu1FwwY8qT1mtHVSSBsdh.CEi_1YtL.jpeg', '7aSh2ZAJQvZIzw6yikc7XJ1zJmz.8Z5bGF7B.jpeg', '8LJdtgDzNTVQxRMOd8nCXtJh8Wr.B-BB56iH.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=zfopTfY3lBU'
  },
  {
    id: 'stree-2',
    title: 'Stree 2',
    excerpt: 'The mega-blockbuster sequel where the town of Chanderi is haunted by a new entity, "Sarkata," forcing the town to rely on Stree for salvation.',
    date: '8/15/2024',
    images: ['2NC7sj8rheKxWqLYAbHnCa4mYBH.6MsJ7t0E.jpeg', 'yudyxWcSts44556WWpJkoBZvylO.B2EHXfcW.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=KVnheXwqF0g'
  },
  {
    id: 'munjya',
    title: 'Munjya',
    excerpt: "A breakout horror-comedy hit from the Supernatural Universe focusing on a folklore demon tied to a young boy's ancestral village.",
    date: '6/7/2024',
    images: ['pgAlKZVLX0eKu7By7LeRArqW7Jh.D4m4JIMG.jpeg', 'ylYdXu0SM79Qs7vOz6q7mBxanVD.BLTv2MgE.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=aG_jM_F_m4E'
  },
  {
    id: 'bhediya',
    title: 'Bhediya',
    excerpt: 'Set in Arunachal Pradesh, this creature-comedy (part of the Supernatural Universe) follows a man who begins transforming into a werewolf after a mystical bite.',
    date: '11/25/2022',
    images: ['A2qPWAJmnq3wVk3zBIupTdyJfxR.BFxDqjPS.jpeg', 'MOFfgbFGYsMOPghNJHKANn4WWQ.o6IoOWJE.jpeg', 'iZtq44ZmxBW0E3tAeLG6UdJe9aj.Dy3ecwp_.jpeg', 'o970SSCQFsdsTZTzMW76UXHoXJG.BhaGpD7H.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=d_k8_e6XU8Q'
  },
  {
    id: 'roohi',
    title: 'Roohi',
    excerpt: 'The second entry in the Supernatural Universe, following two bumbling friends who kidnap a bride, only to discover she is possessed by a demon.',
    date: '3/11/2021',
    images: ['10kCy34fbgU9nI5ScfMcCGebNgo.D1WTDxyb.jpeg', 'dseX3duyu7mHwzZqymdiDdXUaMR.jExhC15a.jpeg', 'qHpEGFx13ntiAVl94e08EJ5ss4U.C5DK8VOK.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=y_x8f3q0g3M'
  },
  {
    id: 'stree',
    title: 'Stree',
    excerpt: 'The foundational film of the Supernatural Universe. A horror-comedy about a small town terrorized by a female spirit who abducts men at night.',
    date: '8/31/2018',
    images: ['6EXmk9vRC1Nyo18yElHe98RvGHg.DYvtoTAO.jpeg', '8857yhGrS85did6DfUAc1cF4ato.d7BcZafc.jpeg'],
    trailer_url: 'https://www.youtube.com/watch?v=gzeaF0k_6GE'
  }
];
