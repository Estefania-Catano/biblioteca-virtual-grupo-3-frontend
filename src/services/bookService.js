const GOOGLE_BOOKS_QUERY = import.meta.env.VITE_GOOGLE_BOOKS_QUERY || 'best seller'
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || ''

function buildGoogleBooksUrl(query) {
  const params = new URLSearchParams({
    q: query,
    maxResults: '8',
    printType: 'books',
    projection: 'lite',
  })

  if (GOOGLE_BOOKS_API_KEY) {
    params.set('key', GOOGLE_BOOKS_API_KEY)
  }

  return `https://www.googleapis.com/books/v1/volumes?${params.toString()}`
}

function buildOpenLibraryUrl(query) {
  return `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8`
}

function mapGoogleBooksResponse(data) {
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) return null

  return data.items.map((item) => {
    const info = item.volumeInfo || {}
    const imageUrl =
      info.imageLinks?.thumbnail ||
      info.imageLinks?.smallThumbnail ||
      info.imageLinks?.small ||
      info.imageLinks?.medium ||
      info.imageLinks?.large ||
      info.imageLinks?.extraLarge ||
      ''

    return {
      title: info.title || 'Sin título',
      category: Array.isArray(info.categories) ? info.categories[0] : info.categories || 'General',
      image: imageUrl ? imageUrl.replace(/^http:/, 'https:') : '',
    }
  })
}

function mapOpenLibraryResponse(data) {
  if (!data?.docs || !Array.isArray(data.docs) || data.docs.length === 0) return null

  return data.docs.map((doc) => ({
    title: doc.title || 'Sin título',
    category: Array.isArray(doc.subject) ? doc.subject[0] : 'General',
    image: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
  }))
}

async function fetchJson(url, errorLabel) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${errorLabel}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export async function fetchBookData(query) {
  const searchQuery = query || GOOGLE_BOOKS_QUERY
  const customUrl = import.meta.env.VITE_BOOK_API_URL?.trim()

  if (customUrl) {
    const data = await fetchJson(customUrl, 'Error al cargar libros')
    return Array.isArray(data.books) ? data.books : []
  }

  try {
    const googleData = await fetchJson(buildGoogleBooksUrl(searchQuery), 'Error al cargar libros')
    const googleBooks = mapGoogleBooksResponse(googleData)
    if (googleBooks && googleBooks.length > 0) return googleBooks
  } catch (error) {
    console.warn('Google Books no estuvo disponible, usando Open Library como respaldo.', error)
  }

  const openLibraryData = await fetchJson(buildOpenLibraryUrl(searchQuery), 'Error al cargar libros desde Open Library')
  const openLibraryBooks = mapOpenLibraryResponse(openLibraryData)
  return openLibraryBooks && openLibraryBooks.length > 0 ? openLibraryBooks : []
}
