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
  {
    content: "Life is a gift, and it offers us the privilege, opportunity, and responsibility to give something back by becoming more.",
    name: "Tony Robbins",
    bio: "Anthony Jay Robbins February 29, 1960) is an American author, life coach, and philanthropist. Robbins is known for his infomercials, seminars, and self-help books including the books Unlimited Power (published in 1987) and Awaken the Giant Within (published in 1993).",
    link: "https://en.wikipedia.org/wiki/Tony_Robbins",
  },
  {
    content: "For every failure, there's an alternative course of action. You just have to find it. When you come to a roadblock, take a detour.",
    name: "Mary Kay Ash",
    bio: "Mary Kay Ash (May 12, 1918 – November 22, 2001) was an American businesswoman and founder of Mary Kay Cosmetics, Inc.",
    link: "https://en.wikipedia.org/wiki/Mary_Kay_Ash",
  },
  {
    content: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    name: "Albert Schweitzer",
    bio: "Albert Schweitzer (14 January 1875 – 4 September 1965) was an Alsatian polymath. He was a theologian, organist, writer, humanitarian, philosopher, and physician.",
    link: "https://en.wikipedia.org/wiki/Albert_Schweitzer",
  },
  {
    content:
      "Meditation is the dissolution of thoughts in eternal awareness or Pure consciousness without objectification, knowing without thinking, merging finitude in infinity.",
    name: "Voltaire",
    bio: "François-Marie Arouet (21 November 1694 – 30 May 1778), known by his nom de plume Voltaire, was a French Enlightenment writer, historian, and philosopher famous for his wit, his criticism of Christianity, especially the Roman Catholic Church, as well as his advocacy of freedom of speech, freedom of religion, and separation of church and state.",
    link: "https://en.wikipedia.org/wiki/Voltaire",
  },
  {
    content: "All our talents increase in the using, and every faculty, both good and bad, strengthen by exercise.",
    name: "Anne Brontë",
    bio: "Anne Brontë (17 January 1820 – 28 May 1849) was an English novelist and poet, the youngest member of the Brontë literary family.",
    link: "https://en.wikipedia.org/wiki/Anne_Bront%C3%AB",
  },
];
