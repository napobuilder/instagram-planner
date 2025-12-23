# Plan de Desarrollo: SAAS MVP - Instagram Planner

Este documento describe el plan de acción para desarrollar el MVP de la herramienta de planificación de feeds de Instagram.

## Stack Tecnológico Propuesto

*   **Frontend:** **React** (con **Vite** para el entorno de desarrollo).
*   **Estilos:** **Tailwind CSS**.
*   **Drag & Drop:** **`dnd-kit`**.
*   **Backend y Base de Datos:** **Supabase** (para autenticación, base de datos PostgreSQL y almacenamiento de archivos).
*   **Gestión de Estado:** **Zustand**.

---

## Fases del Proyecto

### Fase 0: Análisis y Configuración (Completada)

1.  **Analizar `index.html`:** Entender la estructura de datos y componentes existentes.
2.  **Estructurar el Proyecto:**
    *   Inicializar un proyecto React con Vite y TypeScript.
    *   Configurar Tailwind CSS.
    *   Instalar dependencias (`lucide-react`, `zustand`, `dnd-kit`).
3.  **Solucionar problemas de entorno local** (Reinicio de la máquina para liberar procesos bloqueados).

### Fase 1: El Simulador de Feed (Core MVP - Completada)

1.  **Maquetación de Componentes:** Migrar la lógica y el JSX del `index.html` a archivos de componentes `.tsx` individuales (`App`, `ProfileHeader`, `StoryHighlight`, `FeedGrid`, `PostItem`, `Modal`, `StoryViewer`).
2.  **Crear un Store de Estado:** Usar `Zustand` para manejar el estado de la aplicación (la lista de posts, el perfil, etc.). Inicialmente, se cargará con la data estática del `index.html`.
3.  **Implementar Drag & Drop:** Integrar `dnd-kit` en el `FeedGrid` para permitir que el usuario reorganice los `PostItem`. La acción de soltar (`onDragEnd`) actualizará el orden de los posts en el store de Zustand.
4.  **Habilitar Edición (Local):** Permitir hacer clic en un post o en la bio para abrir un modal o formulario que permita editar la información. Los cambios se guardarán únicamente en el estado local de Zustand.

### Fase 2: Conexión a Backend y Gestión de Usuarios

1.  **Configurar Supabase:**
    *   Crear un nuevo proyecto en Supabase.
    *   Definir las tablas de la base de datos (ej: `users`, `clients`, `posts`).
    *   Configurar el Almacenamiento (Storage) para los archivos multimedia de los posts.
2.  **Implementar Autenticación:**
    *   Crear las páginas de Login y Registro utilizando Supabase Auth.
    *   Proteger las rutas de edición para que solo los usuarios autenticados puedan acceder.
3.  **Persistencia de Datos:**
    *   Conectar la aplicación React con el SDK de Supabase.
    *   Reemplazar el estado estático de Zustand con llamadas a la API de Supabase para leer y escribir los posts.
    *   Al reorganizar con Drag & Drop, actualizar un campo `position` o `order` en la base de datos.
4.  **Subida de Archivos:** Implementar la funcionalidad para subir imágenes/videos a Supabase Storage y guardar la URL en el registro del post correspondiente.

### Fase 3: Funcionalidades para el Cliente y Despliegue

1.  **Crear la Vista de Cliente (Compartible):**
    *   Diseñar una ruta especial (ej: `/share/:planId`) que cargue los datos de un plan en modo "solo lectura".
    *   Esta vista no tendrá controles de edición.
2.  **Implementar Descarga de Archivos:** En la vista de cliente, añadir un botón "Descargar" en cada post que utilice la URL de Supabase Storage para descargar el archivo en alta calidad.
3.  **Gestión Multi-Cliente:**
    *   Añadir la lógica para que un usuario pueda tener y gestionar múltiples "perfiles" o "clientes".
    *   Crear una UI (ej: un menú desplegable en el Nav) para cambiar entre los diferentes perfiles de cliente.
4.  **Despliegue:** Preparar y desplegar la aplicación en una plataforma como Vercel o Netlify.
