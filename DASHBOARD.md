# Sanatan Shastra - Dashboard Documentation

## 🎯 Overview

A fully functional article management dashboard with the same purple/cyan gradient theme as the main application. Create, edit, and manage sacred articles with an intuitive interface.

---

## 📁 Dashboard Structure

```
app/dashboard/
├── page.tsx                    # Main dashboard (article list, stats)
├── create/
│   └── page.tsx               # Create new article
└── edit/
    └── [id]/
        └── page.tsx           # Edit existing article
```

---

## ✨ Features

### 1. **Dashboard Home** (`/dashboard`)
- **Statistics Cards**:
  - Total Articles
  - Published Articles
  - Draft Articles
  - Total Views

- **Article Management**:
  - Search articles
  - Filter by status (All, Published, Draft)
  - View article details
  - Edit articles
  - Delete articles
  - Quick stats for each article

- **Actions**:
  - Create new article button
  - Edit/Delete buttons for each article

### 2. **Create Article** (`/dashboard/create`)
- **Basic Information**:
  - Title (required)
  - Category dropdown (required)
  - Short description (required)
  - Tags (add/remove)

- **Content Editor**:
  - Main content textarea (required)
  - Character count
  - Monospace font for better editing

- **Sacred References (Shlokas)**:
  - Add multiple shlokas
  - Sanskrit text field
  - Reference field (e.g., "Bhagavad Gita 4.7")
  - Translation field
  - Remove shloka option

- **Preview**:
  - Toggle preview mode
  - See formatted output before publishing

- **Actions**:
  - Save as Draft
  - Publish Article
  - Return to Dashboard

### 3. **Edit Article** (`/dashboard/edit/[id]`)
- Pre-filled form with existing article data
- Same features as Create page
- Update & Publish button
- Loading state while fetching data

---

## 🎨 Design Features

### Theme Consistency
- Purple/Cyan gradient theme matching main app
- Glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design (mobile-first)

### UI Components
- **Cards**: Gradient borders, hover effects
- **Buttons**: 
  - Primary: Purple gradient with shadow
  - Secondary: Cyan accent
  - Danger: Red for delete
- **Forms**: 
  - Dark background inputs
  - Purple border focus states
  - Smooth transitions
- **Tables**: Responsive with hover states

---

## 💾 Mock Data Structure

```typescript
interface Article {
  id: string
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  shlokas: Shloka[]
  status: "draft" | "published"
  views: number
  publishedAt: string | null
}

interface Shloka {
  text: string         // Sanskrit text
  reference: string    // Source reference
  translation: string  // English translation
}
```

---

## 🚀 Usage

### Creating an Article

1. Navigate to `/dashboard`
2. Click "Create Article" button
3. Fill in the required fields:
   - Title
   - Category
   - Description
   - Content
4. Add tags (optional)
5. Add shlokas (optional but recommended)
6. Preview the article
7. Choose to save as draft or publish

### Editing an Article

1. Go to `/dashboard`
2. Find the article in the list
3. Click the edit icon
4. Make your changes
5. Update & Publish or Save as Draft

### Deleting an Article

1. Go to `/dashboard`
2. Find the article
3. Click the delete icon (trash)
4. Confirm deletion

---

## 🔧 Future Integration

### Database Integration
When ready to connect to a real database:

1. **Replace mock data** in:
   - `app/dashboard/page.tsx` - Article list
   - `app/dashboard/edit/[id]/page.tsx` - Article loading

2. **Add API routes**:
   ```typescript
   // app/api/articles/route.ts
   GET    /api/articles         // List articles
   POST   /api/articles         // Create article
   
   // app/api/articles/[id]/route.ts
   GET    /api/articles/[id]    // Get single article
   PUT    /api/articles/[id]    // Update article
   DELETE /api/articles/[id]    // Delete article
   ```

3. **Use the database schema** from `database/schema.sql`

### Example API Integration

```typescript
// app/dashboard/page.tsx
async function getArticles() {
  const response = await fetch('/api/articles')
  return response.json()
}

// app/dashboard/create/page.tsx
async function createArticle(data) {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}
```

---

## 📊 Dashboard Statistics

Current stats are calculated from mock data:
- **Total**: Count of all articles
- **Published**: Articles with `status === "published"`
- **Drafts**: Articles with `status === "draft"`
- **Total Views**: Sum of all article views

---

## 🎯 Navigation

Added "Dashboard" link to main navigation:
- Visible in header navigation bar
- Available in mobile menu
- Direct access from any page

---

## 🔐 Authentication (Future)

For production, add authentication:

1. **Login/Register pages**
2. **Protected routes** (middleware)
3. **User roles**:
   - Reader
   - Contributor (can create drafts)
   - Editor (can publish)
   - Admin (full access)

```typescript
// middleware.ts (example)
export function middleware(request: NextRequest) {
  const user = await getUser(request)
  
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

---

## 📝 Current Mock Data

The dashboard includes 3 sample articles:
1. **The Dharma of Kurukshetra** (Published, 2450 views)
2. **Sita's Swayamvara** (Published, 1890 views)
3. **Krishna's Divine Play** (Draft, 0 views)

---

## 🎨 Color Scheme

- **Primary Purple**: `#7c3aed`, `#5b21b6`
- **Accent Cyan**: `#06b6d4`, `#0891b2`
- **Success**: Cyan tones
- **Warning**: Yellow tones
- **Danger**: Red tones
- **Muted**: Gray tones

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All dashboard pages are fully responsive with:
- Stack layouts on mobile
- Side-by-side on desktop
- Touch-friendly buttons
- Readable font sizes

---

## 🚦 Form Validation

Current validation:
- Required fields marked with *
- Title, description, content required
- Category selection required
- Optional: Tags, shlokas

Add custom validation as needed:
```typescript
// Example custom validation
const validateArticle = (data) => {
  if (data.title.length < 10) {
    return "Title must be at least 10 characters"
  }
  if (data.content.length < 100) {
    return "Content must be at least 100 characters"
  }
  return null
}
```

---

## 📈 Analytics Integration (Future)

Add tracking for:
- Article creation rate
- Most edited articles
- Draft to published conversion
- User engagement metrics

---

## 🎉 Summary

The dashboard is **production-ready** for mock data and provides:
✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Beautiful UI matching main theme
✅ Responsive design
✅ Form validation
✅ Preview mode
✅ Statistics display
✅ Search and filter
✅ Smooth animations

**Next Steps**:
1. Connect to real database
2. Add authentication
3. Implement API routes
4. Add image upload for articles
5. Rich text editor (optional)
6. Analytics dashboard

---

**Created**: November 2025  
**Version**: 1.0  
**Framework**: Next.js 15 + React 18

