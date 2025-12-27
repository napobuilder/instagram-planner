# 🍬 Captain Candy Manager - Instagram Planner

## 🎉 Nuevas Características Implementadas

### ✅ Date Picker
- Selector de fecha visual e intuitivo
- Preview del formato de fecha
- Formato automático: "Mon Dec 27"

### ✅ Marketing Objectives
- Lista completa de 18 objetivos de marketing
- Opciones profesionales:
  - Brand Awareness
  - Engagement
  - Lead Generation
  - Sales / Conversions
  - Product Launch
  - Educational Content
  - Y más...

### ✅ Eliminar Posts
- Botón rojo "Delete" en cada post (solo en modo editor)
- Confirmación antes de eliminar
- Actualización automática del feed

### ✅ Netlify Functions (Producción)
- Upload automático en producción
- Proxy para evitar CORS
- Fallback a preview local si falla

---

## 🚀 Deploy a Netlify

### Paso 1: Sube a GitHub

```bash
# Inicializa git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit: Captain Candy Manager"

# Crea repo en GitHub y sube
git remote add origin https://github.com/TU_USUARIO/captain-candy-manager.git
git branch -M main
git push -u origin main
```

### Paso 2: Deploy en Netlify

1. Ve a https://netlify.com
2. Click en "Add new site" → "Import an existing project"
3. Conecta con GitHub
4. Selecciona tu repositorio
5. **Build settings** (ya configurados en `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. Click "Deploy site"

### Paso 3: Configurar Dependencias de Functions

En tu `package.json`, añade las dependencias para las funciones:

```bash
npm install node-fetch form-data
```

Luego commit y push:

```bash
git add package.json package-lock.json
git commit -m "Add Netlify functions dependencies"
git push
```

Netlify redeployará automáticamente.

---

## 📝 Cómo Usar las Nuevas Funciones

### Crear Post con Date Picker:

1. Click en "New Post"
2. **Selecciona fecha** usando el date picker
3. **Elige objetivo** del dropdown de marketing
4. Sube tu archivo
5. Llena los demás campos
6. Create Post ✓

### Eliminar un Post:

1. Click en cualquier post
2. Click en botón rojo "Delete" (abajo a la izquierda)
3. Confirma la eliminación
4. ¡Listo!

### Upload en Producción:

**Desarrollo (localhost):**
- Usa preview local
- Pega URL de Catbox manualmente

**Producción (Netlify):**
- Intenta upload automático vía Netlify Function
- Si falla, usa preview local
- Siempre puedes pegar URL manual

---

## 🔧 Estructura de Archivos

```
instagram-planner/
├── netlify/
│   └── functions/
│       └── upload.js          # Function para upload
├── src/
│   ├── components/
│   │   ├── CreatePostModal.tsx  # ✨ Date picker + Objectives
│   │   ├── FileUploader.tsx     # ✨ Netlify Function support
│   │   ├── PostViewModal.tsx    # ✨ Delete button
│   │   └── ...
│   └── store/
│       └── useStore.ts          # ✨ deletePost function
├── netlify.toml                 # Configuración Netlify
└── package.json
```

---

## 🎯 Workflow Completo

### Desarrollo → Producción

1. **Desarrollas local** (localhost:5174)
2. **Commit y push** a GitHub
3. **Netlify autodeploya**
4. **URL pública** lista: `tuapp.netlify.app`

### Editor → Cliente

1. **Creas posts** en modo editor
2. **Exportas JSON**
3. **Subes JSON** a Catbox
4. **Compartes URL**: `tuapp.netlify.app/?mode=view&feed=URL_JSON`

---

## 📊 Objetivos de Marketing Disponibles

1. Brand Awareness
2. Engagement
3. Community Building
4. Lead Generation
5. Sales / Conversions
6. Product Launch
7. Educational Content
8. Behind the Scenes
9. User Generated Content
10. Social Proof / Testimonials
11. Seasonal / Holiday
12. Viral / Trending
13. Lifestyle
14. Storytelling
15. Influencer Collaboration
16. Contest / Giveaway
17. Customer Service
18. Announce / News

---

## 🐛 Troubleshooting

### Upload no funciona en Netlify

1. Verifica que las funciones estén desplegadas:
   - Ve a tu sitio en Netlify
   - Tab "Functions"
   - Debe aparecer "upload"

2. Instala dependencias:
```bash
npm install node-fetch form-data
git add . && git commit -m "Add deps" && git push
```

3. Alternativa: Sube manual a Catbox y pega URL

### Posts no se guardan

- Verifica localStorage del navegador
- Usa Export JSON como backup

---

¡Listo para producción! 🚀

