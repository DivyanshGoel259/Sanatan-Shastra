-- ============================================
-- SANATAN SHASTRA - COMMON SQL QUERIES
-- Useful queries for the application
-- ============================================

-- ============================================
-- 1. GET ALL ARTICLES WITH FULL DETAILS
-- ============================================
SELECT 
    a.id,
    a.title,
    a.description,
    a.slug,
    a.views,
    a.likes,
    a.published_at,
    c.name as category_name,
    json_agg(
        json_build_object(
            'id', s.id,
            'text', s.text,
            'reference', s.reference,
            'translation', s.translation
        ) ORDER BY s.display_order
    ) FILTER (WHERE s.id IS NOT NULL) as shlokas,
    array_agg(DISTINCT t.name) FILTER (WHERE t.id IS NOT NULL) as tags
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN shlokas s ON a.id = s.article_id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.status = 'published'
GROUP BY a.id, c.name
ORDER BY a.published_at DESC;

-- ============================================
-- 2. GET SINGLE ARTICLE BY ID OR SLUG
-- ============================================
SELECT 
    a.*,
    c.name as category_name,
    json_agg(
        json_build_object(
            'text', s.text,
            'reference', s.reference,
            'translation', s.translation,
            'transliteration', s.transliteration
        ) ORDER BY s.display_order
    ) FILTER (WHERE s.id IS NOT NULL) as shlokas,
    array_agg(DISTINCT t.name) FILTER (WHERE t.id IS NOT NULL) as tags
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN shlokas s ON a.id = s.article_id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.slug = 'kurukshetra-dharma' -- or use a.id = 'article-id'
GROUP BY a.id, c.name;

-- ============================================
-- 3. GET ARTICLES BY CATEGORY
-- ============================================
SELECT 
    a.id,
    a.title,
    a.description,
    a.slug,
    a.views,
    a.published_at,
    array_agg(DISTINCT t.name) as tags
FROM articles a
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.category_id = 'Ramayana'
AND a.status = 'published'
GROUP BY a.id
ORDER BY a.published_at DESC;

-- ============================================
-- 4. SEARCH ARTICLES (Full-Text Search)
-- ============================================
SELECT 
    a.id,
    a.title,
    a.description,
    a.slug,
    c.name as category,
    ts_rank(
        to_tsvector('english', a.title || ' ' || a.description || ' ' || a.content),
        plainto_tsquery('english', 'Krishna dharma')
    ) as relevance
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
AND to_tsvector('english', a.title || ' ' || a.description || ' ' || a.content) 
    @@ plainto_tsquery('english', 'Krishna dharma')
ORDER BY relevance DESC
LIMIT 20;

-- ============================================
-- 5. GET POPULAR ARTICLES (Most Viewed)
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.views,
    a.likes,
    c.name as category
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
ORDER BY a.views DESC
LIMIT 10;

-- ============================================
-- 6. GET RECENT ARTICLES
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    a.published_at,
    c.name as category
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
ORDER BY a.published_at DESC
LIMIT 10;

-- ============================================
-- 7. GET FEATURED ARTICLES
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    a.views,
    c.name as category
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
AND a.featured = TRUE
ORDER BY a.views DESC;

-- ============================================
-- 8. GET ARTICLES BY TAG
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    c.name as category
FROM articles a
JOIN article_tags at ON a.id = at.article_id
JOIN tags t ON at.tag_id = t.id
LEFT JOIN categories c ON a.category_id = c.id
WHERE t.slug = 'bhagavad-gita'
AND a.status = 'published'
ORDER BY a.published_at DESC;

-- ============================================
-- 9. GET RELATED ARTICLES (Same Category)
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    a.views
FROM articles a
WHERE a.category_id = (
    SELECT category_id FROM articles WHERE id = 'kurukshetra-dharma'
)
AND a.id != 'kurukshetra-dharma'
AND a.status = 'published'
ORDER BY a.views DESC
LIMIT 5;

-- ============================================
-- 10. GET RELATED ARTICLES (By Tags)
-- ============================================
SELECT DISTINCT
    a.id,
    a.title,
    a.slug,
    a.description,
    COUNT(at2.tag_id) as common_tags
FROM articles a
JOIN article_tags at2 ON a.id = at2.article_id
WHERE at2.tag_id IN (
    SELECT tag_id 
    FROM article_tags 
    WHERE article_id = 'kurukshetra-dharma'
)
AND a.id != 'kurukshetra-dharma'
AND a.status = 'published'
GROUP BY a.id
ORDER BY common_tags DESC, a.views DESC
LIMIT 5;

-- ============================================
-- 11. INCREMENT ARTICLE VIEWS
-- ============================================
-- Method 1: Simple increment
UPDATE articles 
SET views = views + 1 
WHERE id = 'kurukshetra-dharma';

-- Method 2: Track individual views
INSERT INTO article_views (article_id, user_id, ip_address, user_agent)
VALUES ('kurukshetra-dharma', NULL, '192.168.1.1', 'Mozilla/5.0...');
-- (This will auto-increment views via trigger)

-- ============================================
-- 12. GET ARTICLE STATISTICS
-- ============================================
SELECT 
    COUNT(*) as total_articles,
    SUM(views) as total_views,
    AVG(views) as average_views,
    MAX(views) as max_views,
    COUNT(CASE WHEN featured = TRUE THEN 1 END) as featured_count
FROM articles
WHERE status = 'published';

-- ============================================
-- 13. GET CATEGORY STATISTICS
-- ============================================
SELECT 
    c.name,
    COUNT(a.id) as article_count,
    SUM(a.views) as total_views,
    AVG(a.views) as avg_views
FROM categories c
LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
WHERE c.id != 'all'
GROUP BY c.id, c.name
ORDER BY article_count DESC;

-- ============================================
-- 14. GET POPULAR TAGS
-- ============================================
SELECT 
    t.name,
    t.slug,
    COUNT(at.article_id) as usage_count
FROM tags t
LEFT JOIN article_tags at ON t.id = at.tag_id
GROUP BY t.id
ORDER BY usage_count DESC
LIMIT 20;

-- ============================================
-- 15. CREATE NEW ARTICLE WITH TAGS AND SHLOKAS
-- ============================================

-- Step 1: Insert article
INSERT INTO articles (id, title, description, content, category_id, slug, published_at, status)
VALUES (
    'new-article-id',
    'New Article Title',
    'Article description...',
    'Full article content...',
    'Vedic',
    'new-article-slug',
    CURRENT_TIMESTAMP,
    'published'
)
RETURNING id;

-- Step 2: Insert shlokas
INSERT INTO shlokas (article_id, text, reference, translation, display_order)
VALUES 
    ('new-article-id', 'Sanskrit text...', 'Reference...', 'Translation...', 1),
    ('new-article-id', 'Sanskrit text 2...', 'Reference 2...', 'Translation 2...', 2);

-- Step 3: Add tags (create if not exists)
WITH tag_ids AS (
    INSERT INTO tags (name, slug)
    VALUES ('New Tag', 'new-tag')
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
)
INSERT INTO article_tags (article_id, tag_id)
SELECT 'new-article-id', id FROM tag_ids;

-- ============================================
-- 16. UPDATE ARTICLE
-- ============================================
UPDATE articles
SET 
    title = 'Updated Title',
    description = 'Updated description',
    content = 'Updated content',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 'article-id';

-- ============================================
-- 17. DELETE ARTICLE (Cascades to shlokas and tags)
-- ============================================
DELETE FROM articles WHERE id = 'article-id';

-- ============================================
-- 18. GET USER BOOKMARKS
-- ============================================
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    c.name as category,
    b.created_at as bookmarked_at
FROM bookmarks b
JOIN articles a ON b.article_id = a.id
LEFT JOIN categories c ON a.category_id = c.id
WHERE b.user_id = 'user-uuid'
ORDER BY b.created_at DESC;

-- ============================================
-- 19. ADD/REMOVE BOOKMARK
-- ============================================

-- Add bookmark
INSERT INTO bookmarks (user_id, article_id)
VALUES ('user-uuid', 'article-id')
ON CONFLICT (user_id, article_id) DO NOTHING;

-- Remove bookmark
DELETE FROM bookmarks 
WHERE user_id = 'user-uuid' AND article_id = 'article-id';

-- ============================================
-- 20. GET ARTICLE COMMENTS (with nested replies)
-- ============================================
WITH RECURSIVE comment_tree AS (
    -- Base case: top-level comments
    SELECT 
        c.*,
        u.username,
        u.avatar_url,
        1 as depth,
        ARRAY[c.id] as path
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.article_id = 'article-id'
    AND c.parent_id IS NULL
    AND c.is_approved = TRUE
    AND c.is_deleted = FALSE
    
    UNION ALL
    
    -- Recursive case: replies
    SELECT 
        c.*,
        u.username,
        u.avatar_url,
        ct.depth + 1,
        ct.path || c.id
    FROM comments c
    JOIN users u ON c.user_id = u.id
    JOIN comment_tree ct ON c.parent_id = ct.id
    WHERE c.is_approved = TRUE
    AND c.is_deleted = FALSE
)
SELECT * FROM comment_tree
ORDER BY path;

-- ============================================
-- 21. GET ARTICLE VIEW ANALYTICS (Last 30 days)
-- ============================================
SELECT 
    DATE(viewed_at) as date,
    COUNT(*) as views,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT ip_address) as unique_ips
FROM article_views
WHERE article_id = 'article-id'
AND viewed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(viewed_at)
ORDER BY date DESC;

-- ============================================
-- 22. SITEMAP QUERY (For SEO)
-- ============================================
SELECT 
    concat('https://sanatanshastra.com/articles/', slug) as url,
    published_at as lastmod,
    CASE 
        WHEN featured THEN '1.0'
        WHEN views > 5000 THEN '0.9'
        WHEN views > 1000 THEN '0.8'
        ELSE '0.7'
    END as priority,
    'weekly' as changefreq
FROM articles
WHERE status = 'published'
ORDER BY published_at DESC;

-- ============================================
-- END OF QUERIES
-- ============================================

