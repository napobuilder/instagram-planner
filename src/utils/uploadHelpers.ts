// Utility to upload files to Catbox.moe (no API key required)

export const uploadToCatbox = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('fileToUpload', file);
    formData.append('reqtype', 'fileupload');

    try {
        const response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const url = await response.text();
        return url.trim();
    } catch (error) {
        console.error('Error uploading to Catbox:', error);
        throw error;
    }
};

export const isVideoFile = (filename: string): boolean => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

export const isImageFile = (filename: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

// Detecta el tipo de media basándose en la URL
export const detectMediaTypeFromUrl = (url: string): 'image' | 'video' => {
    if (!url) return 'image';
    
    const urlLower = url.toLowerCase();
    
    // Extensiones de video comunes
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.m4v', '.flv', '.3gp'];
    const hasVideoExtension = videoExtensions.some(ext => urlLower.includes(ext));
    
    if (hasVideoExtension) {
        return 'video';
    }
    
    // Extensiones de imagen comunes
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => urlLower.includes(ext));
    
    if (hasImageExtension) {
        return 'image';
    }
    
    // Si no tiene extensión clara, intentar detectar por el path
    // Catbox.moe URLs pueden no tener extensión en el path principal
    // pero podemos intentar hacer una petición HEAD para verificar el Content-Type
    // Por ahora, asumimos imagen por defecto si no podemos determinar
    return 'image';
};




