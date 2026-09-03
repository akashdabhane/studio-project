import filmsJson from './films.json';
import castJson from './cast.json';
import filmsJson2 from './films2.json';
import filmImageMap2 from '../../film_image_map2.json';

// Import exact CDN mapped images for every film
import filmImageMap from '../../film_image_map.json';

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
  category: string | null;
  flags: FilmFlags;
  spotlight_image?: string | null;
  spotlight_order?: number | null;
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

const mappedInfo = filmImageMap2 as Record<string, { spotlight: string | null; media: string[] }>;

export const allFilms: Film[] = (filmsJson2 as Film[]).map((film) => {
  const cast_members = (film.cast_ids || [])
    .map(id => castMap.get(id))
    .filter((c): c is CastMember => c !== undefined);

  const mapped = mappedInfo[film.id];
  const spotlight_image = mapped?.spotlight || film.spotlight_image || 'daf93eb13a04.CU1O9lDy.jpeg';
  const media = (mapped?.media && mapped.media.length > 0) ? mapped.media : [spotlight_image];

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
