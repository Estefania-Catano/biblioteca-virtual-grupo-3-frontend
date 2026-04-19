/** HU07: URL base y rutas de API centralizadas (sin magic strings en la lógica de fetch) */
export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const ENDPOINTS = {
    POSTS: '/posts',
    USERS: '/users',
    TODOS: '/todos',
    ALBUMS: '/albums',
    COMMENTS: '/comments',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(path) {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return response.json();
}

/**
 * HU07/HU08: resumen del panel — varias peticiones GET usando ENDPOINTS
 */
export async function fetchDashboardStats() {
    const [posts, users, todos, albums] = await Promise.all([
        fetchJson(ENDPOINTS.POSTS),
        fetchJson(ENDPOINTS.USERS),
        fetchJson(ENDPOINTS.TODOS),
        fetchJson(ENDPOINTS.ALBUMS),
    ]);

    const profesores = users.filter((u) => u.id > 5).length;

    return {
        totalLibros: posts.length,
        totalEstudiantes: users.length,
        totalPrestamos: todos.length,
        totalCategorias: albums.length,
        totalProfesores: profesores,
        totalDevoluciones: todos.filter((t) => t.completed).length,
    };
}

/**
 * Últimos préstamos: combina todos + posts + users (GET)
 */
export async function fetchUltimosPrestamos(limit = 5) {
    const [todos, posts, users] = await Promise.all([
        fetchJson(`${ENDPOINTS.TODOS}?_limit=${limit}`),
        fetchJson(`${ENDPOINTS.POSTS}?_limit=${limit}`),
        fetchJson(ENDPOINTS.USERS),
    ]);

    return todos.map((t, i) => {
        const post = posts[i] || posts[0];
        const user = users[i % users.length];
        const dia = String(30 - i).padStart(2, '0');
        const diaDev = String(15 - i).padStart(2, '0');
        return {
            id: t.id,
            fechaPrestamo: `2025-05-${dia}`,
            libroTitulo: post?.title?.replace(/\n/g, ' ') ?? 'Libro',
            estudianteNombre: user?.name ?? 'Estudiante',
            fechaDevolucion: `2025-06-${diaDev}`,
            estado: t.completed ? 'Vencido' : 'Activo',
        };
    });
}

export const getLibros = async () => {
    try {
        const data = await fetchJson(`${ENDPOINTS.POSTS}?_limit=10`);
        return data.map((item) => ({
            id: item.id,
            titulo: item.title,
            descripcion: item.body,
            categoria: 'Ficción',
            disponible: true,
        }));
    } catch (error) {
        console.error('Hubo un error en GET libros:', error);
        return [];
    }
};

export const crearLibro = async (nuevoLibro) => {
    try {
        await delay(800);
        const response = await fetch(`${BASE_URL}${ENDPOINTS.POSTS}`, {
            method: 'POST',
            body: JSON.stringify(nuevoLibro),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) throw new Error('Fallo al crear recurso');
        return await response.json();
    } catch (error) {
        console.error('Hubo un error en POST libro:', error);
        throw error;
    }
};
