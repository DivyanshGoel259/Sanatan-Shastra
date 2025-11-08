-- ============================================
-- SANATAN SHASTRA - SEED DATA
-- Sample data for initial setup
-- ============================================

-- ============================================
-- 1. INSERT CATEGORIES
-- ============================================
INSERT INTO categories (id, name, description, icon) VALUES
('all', 'All Topics', 'All articles across categories', '📚'),
('Mahabharata', 'Mahabharata', 'Articles about the great epic Mahabharata', '📖'),
('Ramayana', 'Ramayana', 'Articles about the divine epic Ramayana', '✨'),
('Vedic', 'Vedic Wisdom', 'Articles about Vedic knowledge and sciences', 'ॐ'),
('Bhagavad Gita', 'Bhagavad Gita', 'Articles about the sacred Bhagavad Gita', '🙏');

-- ============================================
-- 2. INSERT TAGS
-- ============================================
INSERT INTO tags (name, slug) VALUES
('Bhagavad Gita', 'bhagavad-gita'),
('Dharma', 'dharma'),
('Kurukshetra', 'kurukshetra'),
('Arjuna', 'arjuna'),
('Ramayana', 'ramayana'),
('Sita', 'sita'),
('Swayamvara', 'swayamvara'),
('Divine Will', 'divine-will'),
('Krishna', 'krishna'),
('Divine Play', 'divine-play'),
('Makhan Chor', 'makhan-chor'),
('Mahabharata', 'mahabharata'),
('Vedas', 'vedas'),
('Mathematics', 'mathematics'),
('Astronomy', 'astronomy'),
('Ancient Science', 'ancient-science'),
('Hanuman', 'hanuman'),
('Bhakti', 'bhakti'),
('Devotion', 'devotion'),
('Pandavas', 'pandavas'),
('Exile', 'exile'),
('Karma Yoga', 'karma-yoga'),
('Action', 'action'),
('Detachment', 'detachment'),
('Lakshman', 'lakshman'),
('Loyalty', 'loyalty'),
('Duty', 'duty');

-- ============================================
-- 3. INSERT ARTICLES
-- ============================================

-- Article 1: Kurukshetra Dharma
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, views, status, featured) VALUES
('kurukshetra-dharma', 
 'The Dharma of Kurukshetra: Arjuna''s Divine Dilemma',
 'Understanding the spiritual significance of the Kurukshetra war and how the Bhagavad Gita addresses Arjuna''s moral conflict.',
 'The Kurukshetra war stands as one of the most profound events in human history, not merely as a battle between armies, but as a cosmic clash between dharma and adharma. When Arjuna stood on the battlefield, his bow Gandiva in hand, he was overcome with doubt and despair. This was not cowardice, but a genuine moral crisis that every seeker faces - the conflict between duty and compassion, between action and consequence.

The Bhagavad Gita, spoken by Lord Krishna at this pivotal moment, addresses not just Arjuna''s dilemma but the universal questions that plague humanity. Krishna''s teachings transcend time and space, offering guidance on duty (dharma), devotion (bhakti), knowledge (jnana), and action (karma yoga).

The war at Kurukshetra was inevitable - it was the culmination of years of injustice, deceit, and the violation of dharma by the Kauravas. The Pandavas had exhausted all peaceful means, including sending Krishna himself as an emissary. Yet Duryodhana, blinded by greed and ego, refused even five villages for the five brothers.

Arjuna''s crisis was valid - how could one kill one''s own teachers, uncles, and cousins, even if they stood on the side of adharma? Krishna''s response forms the essence of the Gita: the immortal soul never dies, and a warrior must fulfill his dharma. More importantly, Krishna reveals that attachment to results, not the action itself, is the cause of suffering.

The Kurukshetra war teaches us that sometimes, standing up against injustice requires us to make difficult choices. But when performed with equanimity, detachment from results, and dedication to dharma, even such actions become a form of yoga - a path to the divine.',
 'Bhagavad Gita',
 'kurukshetra-dharma',
 '2025-01-15 10:00:00',
 2450,
 'published',
 TRUE);

-- Article 2: Sita Swayamvara
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, views, status) VALUES
('sita-swayamvar',
 'Sita''s Swayamvara: Divine Choice and Destiny',
 'Exploring the significance of Sita''s choice in the Ramayana and how it reflects divine will and human agency.',
 'The swayamvara of Sita is not merely a tale of a princess choosing her husband, but a profound narrative about destiny, divine will, and the meeting of two supreme souls. When Maharaja Janaka discovered baby Sita while plowing the earth for a yajna, he knew this was no ordinary child - she had emerged from the sacred earth itself, a divine gift to the world.

Years later, when it was time for Sita''s marriage, Janaka organized a swayamvara with a unique condition: the suitor must string and break the divine bow of Lord Shiva, known as the Pinaka. This was no ordinary bow - it was so heavy and powerful that no mortal could even lift it. Kings and princes from across Aryavarta came, drawn by Sita''s reputation for beauty, wisdom, and virtue.

One by one, they failed. Some could not lift the bow, others could not string it. The gathering watched in amazement and disappointment as even the mightiest warriors proved unable to accomplish the task. Then arrived Ram, the prince of Ayodhya, along with his brother Lakshman and their guru Vishwamitra.

When Ram approached the bow, a divine energy filled the hall. He lifted it with ease, strung it, and as he drew the string, the bow broke with a thunderous sound that echoed across the three worlds. In that moment, destiny fulfilled itself - Sita had found her eternal companion, and the divine plan moved forward.

The swayamvara teaches us several profound truths: that true strength is not merely physical but spiritual; that divine destinies cannot be thwarted by earthly obstacles; and that when two pure souls are meant to unite, the universe itself conspires to bring them together. Sita''s choice, though seemingly made in a moment, was eternal - a recognition of her eternal companion Lord Vishnu, now incarnated as Ram.',
 'Ramayana',
 'sita-swayamvar',
 '2025-01-10 14:30:00',
 1890,
 'published');

-- Article 3: Krishna's Childhood
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, views, status, featured) VALUES
('krishna-childhood',
 'Krishna''s Childhood: Divine Play and Protection',
 'Understanding the spiritual significance of Krishna''s divine play (leelas) and how they protected Bharat Varsh.',
 'The childhood leelas of Lord Krishna are not mere entertaining stories, but profound spiritual teachings disguised in the form of divine play. From the moment of his birth in a prison cell in Mathura to his upbringing in Gokul and Vrindavan, every act of Krishna carried deep significance.

Krishna''s very birth was miraculous - as soon as he appeared, the chains fell from his parents'' hands, the prison doors opened, and the guards fell asleep. Vasudeva carried the infant across the turbulent Yamuna river, which parted to let them pass. This was the first of many miracles that would mark Krishna''s life.

In Gokul, young Krishna performed leelas that were both playful and purposeful. His stealing of butter (makhan chor) taught about the sweetness of devotion - just as he stole butter, he steals the hearts of his devotees. His dance on the serpent Kaliya demonstrated his power over all forces of nature and evil. The lifting of Govardhan mountain showed his protection of those who surrender to him, choosing him over even the mighty Indra.

But these leelas served a greater purpose than entertainment. Each demon that Krishna defeated - Putana, Trinavarta, Bakasura, Aghasura - represented a specific evil threatening dharma. Kamsa, Krishna''s maternal uncle, represented tyranny and the abuse of power. By systematically removing these threats, Krishna was protecting not just Vrindavan or Mathura, but the very fabric of dharmic civilization in Bharat.

Krishna''s childhood also established the path of Bhakti (devotion) as a supreme means to reach the divine. The gopis'' pure love for Krishna, the unconditional devotion of his foster parents Yashoda and Nanda, and the friendship of Sudama all demonstrate that what matters to the divine is not ritual or knowledge alone, but pure, selfless love.

The leelas remind us that the divine is not distant or unapproachable, but can manifest in the most accessible, joyful forms. They teach that life itself can be a divine play when lived with awareness, devotion, and dharma.',
 'Mahabharata',
 'krishna-childhood',
 '2025-01-08 09:15:00',
 3120,
 'published',
 TRUE);

-- Article 4: Vedic Sciences
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, views, status) VALUES
('vedic-sciences',
 'Vedic Mathematics and Astronomy: Ancient Wisdom',
 'Examining how the Vedas contain precise mathematical and astronomical knowledge that predates modern discoveries.',
 'The Vedas, composed thousands of years ago, contain sophisticated mathematical and astronomical knowledge that continues to astound modern scientists. Far from being mere religious texts, they represent a complete knowledge system encompassing science, philosophy, ethics, and spirituality.

Vedic mathematics, as preserved in texts like the Sulba Sutras, demonstrates advanced understanding of geometry, algebra, and trigonometry. The Baudhayana Sulba Sutra, dating to around 800 BCE or earlier, contains a statement of the Pythagorean theorem, predating Pythagoras by centuries. The construction of elaborate fire altars (yajna-kundas) required precise geometric calculations that Vedic mathematicians had mastered.

The concept of zero (shunya), arguably India''s greatest gift to world mathematics, has its roots in Vedic philosophy. The understanding that "nothing" could be something - a number in itself - was revolutionary and made possible the decimal system we use today.

In astronomy, the Vedas reveal remarkably accurate knowledge of celestial movements, the solar system, and cosmic time cycles. The Rig Veda mentions the number of days in a year, the division of the year into twelve months and 360 days (with adjustments for accuracy), and sophisticated understanding of planetary movements.

The Surya Siddhanta, an ancient astronomical treatise rooted in Vedic knowledge, calculated the diameter of the Earth, the distance to the Moon and Sun, and the length of the solar year with remarkable precision. It described eclipses, planetary motions, and even the speed of light in terms that align surprisingly well with modern measurements when decoded properly.

Vedic cosmology spoke of multiple universes, infinite space, and time cycles spanning billions of years - concepts that modern physics has only recently begun to seriously consider. The kalpas and yugas of Vedic time calculation work with astronomical numbers that seem incomprehensible yet align with cosmic cycles.

What makes Vedic science unique is that it never separated the material from the spiritual, the objective from the subjective. The same sages who calculated planetary motions also explored the inner universe of consciousness. They understood that true knowledge (vidya) encompasses both the seen (pratyaksha) and the unseen (paroksha), the material and the spiritual.

These ancient achievements remind us that wisdom is not linear, and ancient does not mean primitive. The Vedas represent humanity''s sophisticated intellectual heritage, offering insights that remain relevant and valuable even in our modern scientific age.',
 'Vedic',
 'vedic-sciences',
 '2025-01-05 11:00:00',
 2670,
 'published');

-- Add more articles... (continuing with the remaining articles)

-- Article 5: Hanuman Devotion
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, views, status, featured) VALUES
('hanuman-devotion',
 'Hanuman: Symbol of Pure Devotion',
 'Analyzing Hanuman''s character as the ultimate embodiment of bhakti and seva in the Ramayana.',
 'Hanuman stands as the ultimate symbol of devotion, strength, and selfless service in Hindu tradition. His character in the Ramayana represents the perfect devotee - one who has surrendered completely to the divine and finds joy only in serving the Lord...',
 'Ramayana',
 'hanuman-devotion',
 '2025-01-03 16:45:00',
 4230,
 'published',
 TRUE);

-- ============================================
-- 4. INSERT SHLOKAS
-- ============================================

-- Shlokas for Article 1 (Kurukshetra Dharma)
INSERT INTO shlokas (article_id, text, reference, translation, transliteration, verse_number, source_book, chapter_number, display_order) VALUES
('kurukshetra-dharma',
 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानं अधर्मस्य तदात्मानं सृजाम्यहम्॥',
 'Bhagavad Gita 4.7',
 'Whenever there is a decline in dharma and rise of adharma, I manifest Myself.',
 'yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmyaham',
 '7',
 'Bhagavad Gita',
 '4',
 1);

-- Shlokas for Article 2 (Sita Swayamvara)
INSERT INTO shlokas (article_id, text, reference, translation, display_order) VALUES
('sita-swayamvar',
 'मातुः शतं मातृगुणानां भूयांसि।',
 'Ramayana',
 'The qualities of the mother are hundred-fold.',
 1);

-- Shlokas for Article 3 (Krishna Childhood)
INSERT INTO shlokas (article_id, text, reference, translation, transliteration, verse_number, source_book, chapter_number, display_order) VALUES
('krishna-childhood',
 'अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।',
 'Bhagavad Gita 10.8',
 'I am the source of all spiritual and material worlds. Everything emanates from Me.',
 'ahaṃ sarvasya prabhavo mattaḥ sarvaṃ pravartate',
 '8',
 'Bhagavad Gita',
 '10',
 1);

-- Shlokas for Article 4 (Vedic Sciences)
INSERT INTO shlokas (article_id, text, reference, translation, display_order) VALUES
('vedic-sciences',
 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।',
 'Upanishad',
 'Lead me from untruth to truth; from darkness to light.',
 1);

-- ============================================
-- 5. LINK ARTICLES WITH TAGS
-- ============================================

-- Article 1 tags
INSERT INTO article_tags (article_id, tag_id)
SELECT 'kurukshetra-dharma', id FROM tags WHERE slug IN ('bhagavad-gita', 'dharma', 'kurukshetra', 'arjuna');

-- Article 2 tags
INSERT INTO article_tags (article_id, tag_id)
SELECT 'sita-swayamvar', id FROM tags WHERE slug IN ('ramayana', 'sita', 'swayamvara', 'divine-will');

-- Article 3 tags
INSERT INTO article_tags (article_id, tag_id)
SELECT 'krishna-childhood', id FROM tags WHERE slug IN ('krishna', 'divine-play', 'makhan-chor', 'mahabharata');

-- Article 4 tags
INSERT INTO article_tags (article_id, tag_id)
SELECT 'vedic-sciences', id FROM tags WHERE slug IN ('vedas', 'mathematics', 'astronomy', 'ancient-science');

-- Article 5 tags
INSERT INTO article_tags (article_id, tag_id)
SELECT 'hanuman-devotion', id FROM tags WHERE slug IN ('hanuman', 'bhakti', 'ramayana', 'devotion');

-- ============================================
-- 6. INSERT SACRED TEXTS
-- ============================================
INSERT INTO sacred_texts (name, category, language, description, total_chapters, total_verses) VALUES
('Bhagavad Gita', 'Itihasa', 'Sanskrit', 'The sacred dialogue between Lord Krishna and Arjuna', 18, 700),
('Ramayana', 'Itihasa', 'Sanskrit', 'The epic story of Lord Rama by Sage Valmiki', 7, 24000),
('Mahabharata', 'Itihasa', 'Sanskrit', 'The greatest epic by Sage Vyasa', 18, 100000),
('Rig Veda', 'Veda', 'Sanskrit', 'The oldest of the four Vedas', 10, 1028),
('Upanishads', 'Vedanta', 'Sanskrit', 'Philosophical texts of Vedic wisdom', NULL, NULL);

-- ============================================
-- END OF SEED DATA
-- ============================================

