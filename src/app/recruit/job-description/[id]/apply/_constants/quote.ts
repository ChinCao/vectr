export interface QuoteResponse {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export interface AuthorResponse {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number | null;
  results: Array<{
    _id: string;
    bio: string;
    description: string;
    link: string;
    name: string;
    slug: string;
    quoteCount: string;
  }>;
}

export interface AuthorInfo {
  name: string;
  link: string;
  bio: string;
}

export const QUOTE_FALLBACK = [
  {
    content:
      "The moment one gives close attention to anything, even a blade of grass, it becomes a mysterious, awesome, indescribably magnificent world in itself.",
    name: "Ralph Abernathy",
    bio: "Ralph David Abernathy Sr. (March 11, 1926 – April 17, 1990) was an American civil rights activist and Baptist minister.",
    link: "https://en.wikipedia.org/wiki/Ralph_Abernathy",
  },
  {
    content: "You may say I'm a dreamer, but I'm not the only one, I hope someday you will join us, and the world will live as one.",
    name: "John Lennon",
    bio: "John Winston Ono Lennon (born John Winston Lennon, 9 October 1940 – 8 December 1980) was an English singer, songwriter and peace activist who gained worldwide fame as the founder, co-lead vocalist, and rhythm guitarist of the Beatles. His songwriting partnership with Paul McCartney remains the most successful in history.",
    link: "https://en.wikipedia.org/wiki/John_Lennon",
  },
  {
    content: "People are so constituted that everybody would rather undertake what they see others do, whether they have an aptitude for it or not.",
    name: "Johann Wolfgang von Goethe",
    bio: "Johann Wolfgang von Goethe (28 August 1749 – 22 March 1832) was a German writer and statesman. His works include: four novels; epic and lyric poetry; prose and verse dramas; memoirs; an autobiography; literary and aesthetic criticism; and treatises on botany, anatomy, and colour.",
    link: "https://en.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
  },
  {
    content: "The smallest flower is a thought, a life answering to some feature of the Great Whole, of whom they have a persistent intuition.",
    name: "Honoré de Balzac",
    bio: "Honoré de Balzac ( BAL-zak, more commonly US: BAWL-, French: [ɔnɔʁe d(ə) balzak]; born Honoré Balzac; 20 May 1799 – 18 August 1850) was a French novelist and playwright. The novel sequence La Comédie humaine, which presents a panorama of post-Napoleonic French life, is generally viewed as his magnum opus.",
    link: "https://en.wikipedia.org/wiki/Honor%C3%A9_de_Balzac",
  },
  {
    content: "The most precious gift we can offer anyone is our attention. When mindfulness embraces those we love, they will bloom like flowers.",
    name: "Thích Nhất Hạnh",
    bio: "Thích Nhất Hạnh is a Vietnamese Thiền Buddhist monk and peace activist, founder of the Plum Village Tradition. Thích Nhất Hạnh spent most of his later life residing in the Plum Village Monastery in southwest France, travelling internationally to give retreats and talks.",
    link: "https://en.wikipedia.org/wiki/Th%C3%ADch_Nh%E1%BA%A5t_H%E1%BA%A1nh",
  },
];
