# Migracja do bazy danych - Plan implementacji

## Struktura obrazów w JSON vs Database

### Obecna struktura JSON
```json
{
  "image": "https://example.com/image.jpg",
  "images": [
    {
      "id": "main",
      "url": "https://example.com/main.jpg",
      "alt": "Główny widok kontrolera",
      "type": "main",
      "description": "Główny widok kontrolera"
    },
    {
      "id": "detail",
      "url": "https://example.com/detail.jpg", 
      "alt": "Szczegółowy widok",
      "type": "detail",
      "description": "Szczegółowy widok przycisków"
    }
  ]
}
```

### Struktura w bazie danych (PostgreSQL/MySQL)

#### Tabela `controllers`
```sql
CREATE TABLE controllers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  release_year INTEGER NOT NULL,
  -- ... inne pola
  main_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabela `controller_images`
```sql
CREATE TABLE controller_images (
  id VARCHAR(255) PRIMARY KEY,
  controller_id VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  type ENUM('main', 'detail', 'back', 'gallery', 'comparison') DEFAULT 'gallery',
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (controller_id) REFERENCES controllers(id) ON DELETE CASCADE
);
```

## Strategia migracji

### 1. Backward Compatibility
- Zachować pole `image` jako fallback
- Helper functions obsługują obie struktury
- Stopniowe przejście na nową strukturę

### 2. API Endpoints (przyszłość)

#### GET /api/controllers
```json
{
  "controllers": [
    {
      "id": "gamecube-controller",
      "name": "Nintendo GameCube Controller",
      "mainImage": "https://example.com/main.jpg",
      "images": [
        {
          "id": "main",
          "url": "https://example.com/main.jpg",
          "alt": "Główny widok",
          "type": "main",
          "description": "Główny widok kontrolera"
        }
      ]
    }
  ]
}
```

#### GET /api/controllers/{slug}/images
```json
{
  "images": [
    {
      "id": "main",
      "url": "https://example.com/main.jpg",
      "alt": "Główny widok",
      "type": "main",
      "description": "Główny widok kontrolera"
    },
    {
      "id": "detail", 
      "url": "https://example.com/detail.jpg",
      "alt": "Szczegółowy widok",
      "type": "detail", 
      "description": "Szczegółowy widok przycisków"
    }
  ]
}
```

### 3. Funkcje pomocnicze

```typescript
// Obecne helper functions są przygotowane na migrację
export const getMainImageUrl = (controller: Controller): string => {
  // Obsługuje zarówno JSON jak i API response
  if (controller.images && controller.images.length > 0) {
    const mainImage = controller.images.find(img => img.type === 'main');
    return mainImage ? mainImage.url : controller.images[0].url;
  }
  return controller.image || controller.mainImage;
};
```

## Korzyści z nowej struktury

### 1. Elastyczność
- Możliwość dodawania wielu obrazów
- Różne typy obrazów (main, detail, back, gallery)
- Sortowanie i organizacja

### 2. SEO i Accessibility
- Alt text dla każdego obrazu
- Opisy obrazów
- Lazy loading możliwości

### 3. Performance
- Różne rozmiary obrazów
- CDN integration
- Image optimization

### 4. Future-proof
- Łatwe dodawanie nowych typów obrazów
- API-first design
- Scalability

## Plan implementacji

### Faza 1: Przygotowanie (obecnie)
- ✅ Nowa struktura JSON z tablicą `images`
- ✅ Helper functions z backward compatibility
- ✅ Komponent ImageGallery
- ✅ Aktualizacja komponentów

### Faza 2: API Development
- [ ] REST API endpoints
- [ ] Database schema
- [ ] Migration scripts
- [ ] Image upload functionality

### Faza 3: Frontend Integration
- [ ] API service layer
- [ ] Error handling
- [ ] Loading states
- [ ] Image optimization

### Faza 4: Advanced Features
- [ ] Image cropping/editing
- [ ] Bulk image upload
- [ ] Image CDN integration
- [ ] Analytics tracking

## Przykłady użycia

### Dodawanie nowego kontrolera z obrazami
```typescript
const newController = {
  id: "new-controller",
  name: "New Controller",
  images: [
    {
      id: "main",
      url: "https://example.com/main.jpg",
      alt: "Główny widok",
      type: "main",
      description: "Główny widok kontrolera"
    },
    {
      id: "detail",
      url: "https://example.com/detail.jpg", 
      alt: "Szczegółowy widok",
      type: "detail",
      description: "Szczegółowy widok przycisków"
    }
  ]
};
```

### Wyświetlanie w komponencie
```typescript
// Automatycznie obsługuje zarówno starą jak i nową strukturę
const mainImageUrl = getMainImageUrl(controller);
const mainImageAlt = getMainImageAlt(controller);

// Dla galerii
{controller.images && controller.images.length > 1 && (
  <ImageGallery images={controller.images} />
)}
``` 