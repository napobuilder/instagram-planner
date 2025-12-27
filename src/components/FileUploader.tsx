import { useState, useCallback } from 'react';
import { Upload, Loader2, ExternalLink } from 'lucide-react';

interface FileUploaderProps {
    onUploadComplete: (url: string, type: 'image' | 'video') => void;
}

const FileUploader = ({ onUploadComplete }: FileUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        setProgress(0);
        setError(null);

        try {
            // Try using Netlify Function if in production
            const isProduction = window.location.hostname !== 'localhost';
            
            if (isProduction) {
                // Use Netlify Function
                const formData = new FormData();
                formData.append('fileToUpload', file);
                formData.append('reqtype', 'fileupload');

                // Simulate progress
                const progressInterval = setInterval(() => {
                    setProgress(prev => Math.min(prev + 10, 90));
                }, 200);

                const response = await fetch('/.netlify/functions/upload', {
                    method: 'POST',
                    body: formData,
                });

                clearInterval(progressInterval);
                setProgress(100);

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(data.error || 'Upload failed');
                }

                const type = file.type.startsWith('video/') ? 'video' : 'image';
                onUploadComplete(data.url, type);
                
            } else {
                // Development: Use local preview
                for (let i = 0; i <= 100; i += 20) {
                    setProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                const localUrl = URL.createObjectURL(file);
                const type = file.type.startsWith('video/') ? 'video' : 'image';
                
                onUploadComplete(localUrl, type);
                setError('preview-local');
            }
            
        } catch (error: any) {
            console.error('Error uploading:', error);
            
            // Fallback: local preview
            const localUrl = URL.createObjectURL(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            onUploadComplete(localUrl, type);
            setError('preview-local');
        } finally {
            setIsUploading(false);
            setTimeout(() => {
                setProgress(0);
            }, 1000);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            uploadFile(file);
        }
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadFile(file);
        }
    };

    return (
        <div>
            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer
                    transition-all duration-200
                    ${isDragging 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : error && error !== 'preview-local'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : error === 'preview-local'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                    ${isUploading ? 'pointer-events-none opacity-60' : ''}
                `}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    {isUploading ? (
                        <>
                            <Loader2 className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Uploading...</span> {progress}%
                            </p>
                            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </>
                    ) : error === 'preview-local' ? (
                        <>
                            <div className="text-yellow-700 dark:text-yellow-300 text-center">
                                <p className="text-sm font-semibold mb-2">✓ Preview cargado</p>
                                <p className="text-xs mb-2">Archivo listo para preview local</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    💡 Para URL permanente, pega el link abajo
                                </p>
                            </div>
                        </>
                    ) : error ? (
                        <>
                            <div className="text-red-500 text-center">
                                <p className="text-sm font-semibold mb-2">⚠️ Error</p>
                                <p className="text-xs">{error}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Image or Video
                            </p>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileInput}
                    disabled={isUploading}
                />
            </label>
            
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
                <p className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <ExternalLink size={14} /> Recomendación: Upload Manual
                </p>
                <ol className="text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                    <li>Sube tu archivo a <a href="https://catbox.moe" target="_blank" rel="noopener noreferrer" className="underline font-semibold">catbox.moe</a></li>
                    <li>Copia la URL que te da</li>
                    <li>Pégala en el campo "Permanent URL" abajo 👇</li>
                </ol>
            </div>
        </div>
    );
};

export default FileUploader;
