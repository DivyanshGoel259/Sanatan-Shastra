# Sanatan Shastra - Database Design Documentation

## Overview

This database is designed for the **Sanatan Shastra** application - a platform for sharing authentic articles about sacred Hindu texts with direct shloka references. The database uses **PostgreSQL** and follows best practices for normalization, indexing, and performance.

---

## 📊 Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Categories │◄────────│   Articles   │────────►│    Tags     │
└─────────────┘         └──────────────┘         └─────────────┘
                               │  │                      ▲
                               │  │                      │
                               │  └──────────────────────┘
                               │         (article_tags)
                               │
                               ▼
                        ┌──────────────┐
                        │   Shlokas    │
                        └──────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │ Sacred Texts │
                        └──────────────┘

        ┌─────────────┐
        │    Users    │
        └─────────────┘
          │    │    │
          │    │    └──────────► ┌──────────────┐
          │    │                 │  Bookmarks   │
          │    │                 └──────────────┘
          │    │                        │
          │    │                        ▼
          │    │                 ┌──────────────┐
          │    │                 │   Articles   │
          │    │                 └──────────────┘
          │    │
          │    └────────────────► ┌──────────────┐
          │                       │   Comments   │
          │                       └──────────────┘
          │
          └────────────────────► ┌───────────────────┐
                                 │  Article Views    │
                                 └───────────────────┘
```

---

## 📋 Table Descriptions

### 1. **categories**
Stores article categories (Mahabharata, Ramayana, Vedic, Bhagavad Gita)

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id          | VARCHAR(50)  | Primary key                    |
| name        | VARCHAR(100) | Category display name          |
| description | TEXT         | Category description           |
| icon        | VARCHAR(50)  | Icon/emoji for category        |
| created_at  | TIMESTAMP    | Creation timestamp             |
| updated_at  | TIMESTAMP    | Last update timestamp          |

### 2. **articles**
Main content table storing article information

| Column           | Type         | Description                          |
|------------------|--------------|--------------------------------------|
| id               | VARCHAR(100) | Primary key (slug-friendly)          |
| title            | VARCHAR(255) | Article title                        |
| description      | TEXT         | Short description                    |
| content          | TEXT         | Full article content                 |
| category_id      | VARCHAR(50)  | Foreign key to categories            |
| slug             | VARCHAR(255) | URL-friendly slug                    |
| published_at     | TIMESTAMP    | Publication date                     |
| views            | INTEGER      | View count                           |
| likes            | INTEGER      | Like count                           |
| status           | VARCHAR(20)  | draft/published/archived             |
| featured         | BOOLEAN      | Featured article flag                |
| author_id        | UUID         | Foreign key to users                 |
| meta_title       | VARCHAR(255) | SEO title                            |
| meta_description | TEXT         | SEO description                      |
| created_at       | TIMESTAMP    | Creation timestamp                   |
| updated_at       | TIMESTAMP    | Last update timestamp                |

### 3. **shlokas**
Stores sacred text references for articles

| Column          | Type         | Description                         |
|-----------------|--------------|-------------------------------------|
| id              | SERIAL       | Primary key                         |
| article_id      | VARCHAR(100) | Foreign key to articles             |
| text            | TEXT         | Original Sanskrit/text              |
| reference       | VARCHAR(255) | Source reference (e.g., "BG 4.7")  |
| translation     | TEXT         | English translation                 |
| transliteration | TEXT         | Roman transliteration               |
| verse_number    | VARCHAR(50)  | Verse number                        |
| source_book     | VARCHAR(100) | Source book name                    |
| chapter_number  | VARCHAR(50)  | Chapter number                      |
| display_order   | INTEGER      | Display order                       |
| created_at      | TIMESTAMP    | Creation timestamp                  |

### 4. **tags**
Keyword tags for articles

| Column       | Type         | Description             |
|--------------|--------------|-------------------------|
| id           | SERIAL       | Primary key             |
| name         | VARCHAR(100) | Tag display name        |
| slug         | VARCHAR(100) | URL-friendly slug       |
| description  | TEXT         | Tag description         |
| usage_count  | INTEGER      | Number of articles      |
| created_at   | TIMESTAMP    | Creation timestamp      |

### 5. **article_tags**
Junction table for many-to-many relationship between articles and tags

| Column     | Type         | Description             |
|------------|--------------|-------------------------|
| article_id | VARCHAR(100) | Foreign key to articles |
| tag_id     | INTEGER      | Foreign key to tags     |
| created_at | TIMESTAMP    | Creation timestamp      |

### 6. **users**
User accounts (for future authentication)

| Column        | Type         | Description                          |
|---------------|--------------|--------------------------------------|
| id            | UUID         | Primary key                          |
| email         | VARCHAR(255) | User email (unique)                  |
| username      | VARCHAR(100) | Username (unique)                    |
| full_name     | VARCHAR(255) | Full name                            |
| password_hash | VARCHAR(255) | Hashed password                      |
| role          | VARCHAR(20)  | reader/contributor/editor/admin      |
| avatar_url    | TEXT         | Profile picture URL                  |
| bio           | TEXT         | User bio                             |
| is_verified   | BOOLEAN      | Email verification status            |
| is_active     | BOOLEAN      | Account active status                |
| last_login    | TIMESTAMP    | Last login timestamp                 |
| created_at    | TIMESTAMP    | Creation timestamp                   |
| updated_at    | TIMESTAMP    | Last update timestamp                |

### 7. **comments**
User comments on articles (with nested replies support)

| Column      | Type       | Description                      |
|-------------|------------|----------------------------------|
| id          | SERIAL     | Primary key                      |
| article_id  | VARCHAR    | Foreign key to articles          |
| user_id     | UUID       | Foreign key to users             |
| parent_id   | INTEGER    | Parent comment (for replies)     |
| content     | TEXT       | Comment content                  |
| is_approved | BOOLEAN    | Moderation status                |
| is_deleted  | BOOLEAN    | Soft delete flag                 |
| likes       | INTEGER    | Like count                       |
| created_at  | TIMESTAMP  | Creation timestamp               |
| updated_at  | TIMESTAMP  | Last update timestamp            |

### 8. **bookmarks**
User bookmarks for articles

| Column     | Type         | Description             |
|------------|--------------|-------------------------|
| id         | SERIAL       | Primary key             |
| user_id    | UUID         | Foreign key to users    |
| article_id | VARCHAR(100) | Foreign key to articles |
| created_at | TIMESTAMP    | Creation timestamp      |

### 9. **article_views**
Tracks article views for analytics

| Column     | Type         | Description             |
|------------|--------------|-------------------------|
| id         | SERIAL       | Primary key             |
| article_id | VARCHAR(100) | Foreign key to articles |
| user_id    | UUID         | Foreign key to users    |
| ip_address | INET         | Viewer IP address       |
| user_agent | TEXT         | Browser user agent      |
| viewed_at  | TIMESTAMP    | View timestamp          |

### 10. **sacred_texts**
Reference library of sacred texts

| Column          | Type         | Description                    |
|-----------------|--------------|--------------------------------|
| id              | SERIAL       | Primary key                    |
| name            | VARCHAR(255) | Text name                      |
| category        | VARCHAR(100) | Category                       |
| author          | VARCHAR(255) | Author/compiler                |
| language        | VARCHAR(50)  | Original language              |
| translation_by  | VARCHAR(255) | Translator                     |
| description     | TEXT         | Description                    |
| total_chapters  | INTEGER      | Number of chapters             |
| total_verses    | INTEGER      | Number of verses               |
| created_at      | TIMESTAMP    | Creation timestamp             |

---

## 🚀 Setup Instructions

### 1. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE sanatan_shastra;

# Connect to the database
\c sanatan_shastra
```

### 2. Run Schema

```bash
# Execute schema file
psql -U postgres -d sanatan_shastra -f schema.sql
```

### 3. Seed Data

```bash
# Load sample data
psql -U postgres -d sanatan_shastra -f seed.sql
```

---

## 📝 Common Queries

See `queries.sql` for comprehensive examples. Here are the most important ones:

### Get All Articles with Full Details

```sql
SELECT 
    a.*,
    c.name as category_name,
    json_agg(DISTINCT jsonb_build_object(
        'text', s.text,
        'reference', s.reference,
        'translation', s.translation
    )) as shlokas,
    array_agg(DISTINCT t.name) as tags
FROM articles a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN shlokas s ON a.id = s.article_id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.status = 'published'
GROUP BY a.id, c.name;
```

### Search Articles (Full-Text)

```sql
SELECT * FROM search_articles('Krishna dharma');
```

### Get Related Articles

```sql
SELECT a.* FROM articles a
WHERE a.category_id = (SELECT category_id FROM articles WHERE id = 'article-id')
AND a.id != 'article-id'
LIMIT 5;
```

---

## 🔒 Performance Optimizations

### Indexes Created:
- Primary keys on all tables
- Foreign key indexes
- Full-text search indexes (GIN)
- Composite indexes for common queries
- Timestamp indexes for sorting

### Triggers:
- Auto-update `updated_at` timestamps
- Auto-increment view counts
- Auto-update tag usage counts

### Views:
- `v_articles_full` - Pre-joined article data
- `v_popular_articles` - Top 10 by views
- `v_recent_articles` - Latest 10 articles

---

## 🔐 Security Considerations

1. **Password Hashing**: Use bcrypt or Argon2 for password_hash
2. **SQL Injection**: Use parameterized queries
3. **XSS Protection**: Sanitize user inputs (comments, etc.)
4. **Rate Limiting**: Implement on article_views
5. **RBAC**: Use user roles for access control

---

## 📊 Database Statistics Queries

### Get Total Articles by Category

```sql
SELECT c.name, COUNT(a.id) as total
FROM categories c
LEFT JOIN articles a ON c.id = a.category_id
GROUP BY c.name;
```

### Most Popular Tags

```sql
SELECT name, usage_count 
FROM tags 
ORDER BY usage_count DESC 
LIMIT 10;
```

### Articles Published Per Month

```sql
SELECT 
    DATE_TRUNC('month', published_at) as month,
    COUNT(*) as articles
FROM articles
WHERE status = 'published'
GROUP BY month
ORDER BY month DESC;
```

---

## 🔄 Backup and Restore

### Backup

```bash
pg_dump -U postgres sanatan_shastra > backup.sql
```

### Restore

```bash
psql -U postgres sanatan_shastra < backup.sql
```

---

## 🔗 API Integration

For Next.js integration with Neon PostgreSQL:

```typescript
// lib/db.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getArticles() {
  const articles = await sql`
    SELECT * FROM articles 
    WHERE status = 'published' 
    ORDER BY published_at DESC
  `;
  return articles;
}

export async function getArticleById(id: string) {
  const [article] = await sql`
    SELECT a.*, c.name as category_name
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.id = ${id}
  `;
  return article;
}
```

---

## 📈 Future Enhancements

1. **Full-Text Search**: Already implemented with GIN indexes
2. **Analytics Dashboard**: Use article_views data
3. **User Profiles**: Expand users table
4. **Social Sharing**: Add sharing_stats table
5. **Multi-language**: Add translations table
6. **Email Notifications**: Use newsletter_subscribers
7. **Article Revisions**: Add revisions table

---

## 📞 Support

For questions or issues with the database design, please refer to:
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Neon Documentation: https://neon.tech/docs

---

## 📄 License

This database schema is part of the Sanatan Shastra project.

---

**Created**: November 2025  
**Version**: 1.0  
**Database**: PostgreSQL 15+

