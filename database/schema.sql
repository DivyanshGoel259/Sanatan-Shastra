-- ============================================
-- SANATAN SHASTRA - DATABASE SCHEMA
-- PostgreSQL Database Design
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. ARTICLES TABLE
-- ============================================
CREATE TABLE articles (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT FALSE,
    author_id UUID,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- ============================================
-- 3. SHLOKAS TABLE
-- ============================================
CREATE TABLE shlokas (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    reference VARCHAR(255) NOT NULL,
    translation TEXT NOT NULL,
    transliteration TEXT,
    verse_number VARCHAR(50),
    source_book VARCHAR(100),
    chapter_number VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- ============================================
-- 4. TAGS TABLE
-- ============================================
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. ARTICLE_TAGS (Many-to-Many Relationship)
-- ============================================
CREATE TABLE article_tags (
    article_id VARCHAR(100) NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ============================================
-- 6. USERS TABLE (for future authentication)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'reader' CHECK (role IN ('reader', 'contributor', 'editor', 'admin')),
    avatar_url TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key for article author
ALTER TABLE articles ADD CONSTRAINT fk_author
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;

-- ============================================
-- 7. COMMENTS TABLE
-- ============================================
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL,
    parent_id INTEGER, -- for nested comments
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- ============================================
-- 8. BOOKMARKS TABLE
-- ============================================
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    article_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- ============================================
-- 9. ARTICLE VIEWS TRACKING
-- ============================================
CREATE TABLE article_views (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(100) NOT NULL,
    user_id UUID,
    ip_address INET,
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- 10. SACRED TEXTS (Reference Library)
-- ============================================
CREATE TABLE sacred_texts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    author VARCHAR(255),
    language VARCHAR(50),
    translation_by VARCHAR(255),
    description TEXT,
    total_chapters INTEGER,
    total_verses INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 11. NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- ============================================
-- 12. CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'spam')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Articles indexes
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_views ON articles(views DESC);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_slug ON articles(slug);

-- Shlokas indexes
CREATE INDEX idx_shlokas_article ON shlokas(article_id);
CREATE INDEX idx_shlokas_reference ON shlokas(reference);
CREATE INDEX idx_shlokas_order ON shlokas(article_id, display_order);

-- Tags indexes
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_article_tags_article ON article_tags(article_id);
CREATE INDEX idx_article_tags_tag ON article_tags(tag_id);

-- Comments indexes
CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);

-- Bookmarks indexes
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_article ON bookmarks(article_id);

-- Article views indexes
CREATE INDEX idx_article_views_article ON article_views(article_id);
CREATE INDEX idx_article_views_viewed_at ON article_views(viewed_at DESC);

-- Full-text search index for articles
CREATE INDEX idx_articles_title_search ON articles USING GIN (to_tsvector('english', title));
CREATE INDEX idx_articles_content_search ON articles USING GIN (to_tsvector('english', content));
CREATE INDEX idx_articles_description_search ON articles USING GIN (to_tsvector('english', description));

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE timestamps
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGER TO UPDATE VIEW COUNT
-- ============================================

CREATE OR REPLACE FUNCTION update_article_views_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE articles 
    SET views = (SELECT COUNT(*) FROM article_views WHERE article_id = NEW.article_id)
    WHERE id = NEW.article_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_views 
    AFTER INSERT ON article_views
    FOR EACH ROW EXECUTE FUNCTION update_article_views_count();

-- ============================================
-- TRIGGER TO UPDATE TAG USAGE COUNT
-- ============================================

CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE tags 
        SET usage_count = usage_count + 1
        WHERE id = NEW.tag_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE tags 
        SET usage_count = usage_count - 1
        WHERE id = OLD.tag_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tag_usage_insert
    AFTER INSERT ON article_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

CREATE TRIGGER trigger_update_tag_usage_delete
    AFTER DELETE ON article_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- View for articles with category and tag information
CREATE OR REPLACE VIEW v_articles_full AS
SELECT 
    a.id,
    a.title,
    a.description,
    a.content,
    a.slug,
    a.published_at,
    a.views,
    a.likes,
    a.status,
    a.featured,
    c.id as category_id,
    c.name as category_name,
    u.username as author_username,
    u.full_name as author_name,
    array_agg(DISTINCT t.name) as tags,
    COUNT(DISTINCT cm.id) as comment_count,
    COUNT(DISTINCT s.id) as shloka_count
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
LEFT JOIN comments cm ON a.id = cm.article_id AND cm.is_approved = TRUE
LEFT JOIN shlokas s ON a.id = s.article_id
GROUP BY a.id, c.id, c.name, u.username, u.full_name;

-- View for popular articles
CREATE OR REPLACE VIEW v_popular_articles AS
SELECT 
    id,
    title,
    slug,
    category_id,
    views,
    published_at
FROM articles
WHERE status = 'published'
ORDER BY views DESC
LIMIT 10;

-- View for recent articles
CREATE OR REPLACE VIEW v_recent_articles AS
SELECT 
    id,
    title,
    slug,
    category_id,
    views,
    published_at
FROM articles
WHERE status = 'published'
ORDER BY published_at DESC
LIMIT 10;

-- ============================================
-- FUNCTIONS FOR SEARCH
-- ============================================

-- Full-text search function
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS TABLE (
    id VARCHAR(100),
    title VARCHAR(255),
    description TEXT,
    slug VARCHAR(255),
    category_id VARCHAR(50),
    relevance REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.title,
        a.description,
        a.slug,
        a.category_id,
        ts_rank(
            to_tsvector('english', a.title || ' ' || a.description || ' ' || a.content),
            plainto_tsquery('english', search_query)
        ) as relevance
    FROM articles a
    WHERE status = 'published'
    AND to_tsvector('english', a.title || ' ' || a.description || ' ' || a.content) @@ plainto_tsquery('english', search_query)
    ORDER BY relevance DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- END OF SCHEMA
-- ============================================

