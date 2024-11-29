import { useState, useEffect } from 'react';

function useImages(url) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);

                // Verificar si las imágenes ya están en el localStorage
                const cachedImages = localStorage.getItem('gubblegumImages');
                if (cachedImages) {
                    // Si están en caché, las usamos
                    setImages(JSON.parse(cachedImages));
                    setLoading(false);
                    return;
                }
                console.log('no estan cacheadas')
                // Si no están en caché, hacer la petición
                const response = await fetch(url);
                const data = await response.json();

                // Almacenar las imágenes en caché
                localStorage.setItem('gubblegumImages', JSON.stringify(data.images));

                setImages(data.images);
            } catch (err) {
                console.error('Error al obtener las imágenes:', err);
                setError('No se pudieron cargar las imágenes');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [url]);

    return { images, loading, error };
}

export default useImages;
