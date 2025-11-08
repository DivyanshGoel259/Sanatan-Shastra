export interface Article {
  id: string
  title: string
  description: string
  category: "Mahabharata" | "Ramayana" | "Vedic" | "Bhagavad Gita"
  content: string
  tags: string[]
  publishedAt: string
  views: number
  shlokas: {
    text: string
    reference: string
    translation: string
  }[]
}

export const categories = [
  { id: "all", name: "All Topics" },
  { id: "Mahabharata", name: "Mahabharata" },
  { id: "Ramayana", name: "Ramayana" },
  { id: "Vedic", name: "Vedic Wisdom" },
  { id: "Bhagavad Gita", name: "Bhagavad Gita" },
]

export const articlesData: Article[] = [
  {
    id: "kurukshetra-dharma",
    title: "The Dharma of Kurukshetra: Arjuna's Divine Dilemma",
    description:
      "Understanding the spiritual significance of the Kurukshetra war and how the Bhagavad Gita addresses Arjuna's moral conflict.",
    category: "Bhagavad Gita",
    content: "Detailed content about the Kurukshetra dharma...",
    tags: ["Bhagavad Gita", "Dharma", "Kurukshetra", "Arjuna"],
    publishedAt: "2025-01-15",
    views: 2450,
    shlokas: [
      {
        text: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानं अधर्मस्य तदात्मानं सृजाम्यहम्॥",
        reference: "Bhagavad Gita 4.7",
        translation: "Whenever there is a decline in dharma and rise of adharma, I manifest Myself.",
      },
    ],
  },
  {
    id: "sita-swayamvar",
    title: "Sita's Swayamvara: Divine Choice and Destiny",
    description:
      "Exploring the significance of Sita's choice in the Ramayana and how it reflects divine will and human agency.",
    category: "Ramayana",
    content: "Detailed content about Sita's swayamvara...",
    tags: ["Ramayana", "Sita", "Swayamvara", "Divine Will"],
    publishedAt: "2025-01-10",
    views: 1890,
    shlokas: [
      {
        text: "मातुः शतं मातृगुणानां भूयांसि।",
        reference: "Ramayana",
        translation: "The qualities of the mother are hundred-fold.",
      },
    ],
  },
  {
    id: "krishna-childhood",
    title: "Krishna's Childhood: Divine Play and Protection",
    description:
      "Understanding the spiritual significance of Krishna's divine play (leelas) and how they protected Bharat Varsh.",
    category: "Mahabharata",
    content: "Detailed content about Krishna's childhood...",
    tags: ["Krishna", "Divine Play", "Makhan Chor", "Mahabharata"],
    publishedAt: "2025-01-08",
    views: 3120,
    shlokas: [
      {
        text: "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।",
        reference: "Bhagavad Gita 10.8",
        translation: "I am the source of all spiritual and material worlds.",
      },
    ],
  },
  {
    id: "vedic-sciences",
    title: "Vedic Mathematics and Astronomy: Ancient Wisdom",
    description:
      "Examining how the Vedas contain precise mathematical and astronomical knowledge that predates modern discoveries.",
    category: "Vedic",
    content: "Detailed content about Vedic sciences...",
    tags: ["Vedas", "Mathematics", "Astronomy", "Ancient Science"],
    publishedAt: "2025-01-05",
    views: 2670,
    shlokas: [
      {
        text: "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।",
        reference: "Upanishad",
        translation: "Lead me from untruth to truth; from darkness to light.",
      },
    ],
  },
  {
    id: "hanuman-devotion",
    title: "Hanuman: Symbol of Pure Devotion",
    description: "Analyzing Hanuman's character as the ultimate embodiment of bhakti and seva in the Ramayana.",
    category: "Ramayana",
    content: "Detailed content about Hanuman...",
    tags: ["Hanuman", "Bhakti", "Ramayana", "Devotion"],
    publishedAt: "2025-01-03",
    views: 4230,
    shlokas: [
      {
        text: "भगवान के भजन बिना।",
        reference: "Ramayana",
        translation: "Without devotion to God...",
      },
    ],
  },
  {
    id: "pandavas-suffering",
    title: "The Pandavas' Exile: Testing of Character",
    description:
      "Understanding how the thirteen years of exile tested the Pandavas' dharma and prepared them for dharmic victory.",
    category: "Mahabharata",
    content: "Detailed content about Pandavas...",
    tags: ["Mahabharata", "Pandavas", "Dharma", "Exile"],
    publishedAt: "2025-01-01",
    views: 1560,
    shlokas: [
      {
        text: "धर्मो रक्षति रक्षितः।",
        reference: "Mahabharata",
        translation: "Dharma protects those who protect it.",
      },
    ],
  },
  {
    id: "gita-karma-yoga",
    title: "Karma Yoga: The Path of Selfless Action",
    description:
      "Deep dive into the Bhagavad Gita's teachings on karma yoga and how to perform actions without attachment.",
    category: "Bhagavad Gita",
    content: "Detailed content about karma yoga...",
    tags: ["Karma Yoga", "Bhagavad Gita", "Action", "Detachment"],
    publishedAt: "2024-12-28",
    views: 3890,
    shlokas: [
      {
        text: "योगः कर्मसु कौशलम्।",
        reference: "Bhagavad Gita 2.50",
        translation: "Yoga is skill in action.",
      },
    ],
  },
  {
    id: "lakshman-loyalty",
    title: "Lakshman's Loyalty: Brother and Servant",
    description:
      "Exploring Lakshman's character as the ideal balance of familial loyalty, devotion, and dharmic duty in the Ramayana.",
    category: "Ramayana",
    content: "Detailed content about Lakshman...",
    tags: ["Lakshman", "Loyalty", "Ramayana", "Duty"],
    publishedAt: "2024-12-25",
    views: 2340,
    shlokas: [
      {
        text: "राम के नाम पर निछावर हूँ।",
        reference: "Ramayana",
        translation: "I am sacrificed at the name of Ram.",
      },
    ],
  },
]
