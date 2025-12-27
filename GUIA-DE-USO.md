# 🍬 Captain Candy Manager - Guía de Uso

## 🎯 Características Implementadas

### ✅ Modo Editor (Para Ti)
- Crear nuevos posts con drag & drop de archivos
- Subida automática a Catbox.moe (sin API key)
- Reorganizar posts arrastrando
- Exportar feed a JSON
- Importar feed desde JSON
- Persistencia automática en localStorage

### ✅ Modo Cliente (Para Mostrar)
- Vista de solo lectura
- Sin botones de edición
- Feed bonito estilo Instagram
- Carga de feed desde URL

---

## 🚀 Cómo Usar

### MODO EDITOR

1. **Crear un Nuevo Post:**
   - Click en botón verde "New Post"
   - Arrastra imagen/video o click para subir
   - Espera que suba a Catbox.moe
   - Llena los campos (título, caption, hashtags, etc.)
   - Opcionalmente añade link de Google Drive
   - Click en "Create Post"

2. **Reorganizar Posts:**
   - Simplemente arrastra y suelta los posts
   - Se guardan automáticamente

3. **Exportar para Cliente:**
   - Click en botón morado "Export"
   - Se descarga archivo JSON
   - Sube el JSON a Catbox.moe:
     * Ve a https://catbox.moe
     * Arrastra el archivo JSON
     * Copia la URL (ej: https://files.catbox.moe/abc123.json)

4. **Importar Backup:**
   - Click en botón naranja "Import"
   - Selecciona tu archivo JSON
   - Los posts se cargarán automáticamente

---

### MODO CLIENTE

**Opción 1: Modo View Simple**
```
http://localhost:5174/?mode=view
```
o cuando despliegues:
```
https://tuapp.netlify.app/?mode=view
```

⚠️ **Limitación:** Solo funciona si el cliente tiene tus posts en su localStorage

---

**Opción 2: Con Feed desde URL** ⭐ RECOMENDADO
```
http://localhost:5174/?mode=view&feed=URL_DEL_JSON
```

**Ejemplo real:**
```
https://tuapp.netlify.app/?mode=view&feed=https://files.catbox.moe/abc123.json
```

---

## 📤 Workflow Completo: Tú → Cliente

### 1. Creas el Feed (Modo Editor)
- Creas posts
- Subes fotos/videos a Catbox
- Organizas el feed
- Todo se guarda en localStorage

### 2. Exportas el Feed
- Click en "Export" → descarga `captain-candy-feed-123456.json`

### 3. Subes el JSON a Catbox
- Ve a https://catbox.moe
- Arrastra el archivo JSON
- Copia URL: `https://files.catbox.moe/xyz123.json`

### 4. Compartes con el Cliente
Le envías:
```
https://tuapp.netlify.app/?mode=view&feed=https://files.catbox.moe/xyz123.json
```

### 5. Cliente Abre el Link
- Ve el feed completo
- Puede hacer click en posts para ver detalles
- Puede descargar archivos
- NO puede editar nada

---

## 🎨 Tipos de Posts

### Static Image
- Una sola imagen
- Perfecto para fotos de producto

### Reel (Video)
- Un video
- Se marca automáticamente con icono de video

### Carousel
- Múltiples imágenes/videos
- Usa las flechas para navegar
- Perfecto para mostrar variedad

---

## 💾 Persistencia

- **LocalStorage:** Todos los posts se guardan automáticamente
- **Export JSON:** Backup manual cuando quieras
- **Import JSON:** Restaurar desde backup

---

## 🔄 Cambiar entre Modos

Click en botón "View Mode" / "Edit Mode" en el navbar

O modifica la URL:
- `?mode=edit` → Modo editor
- `?mode=view` → Modo cliente

---

## 📱 Responsive

- ✅ Desktop perfecto
- ✅ Tablet adaptado
- ✅ Móvil optimizado

---

## 🆘 Troubleshooting

### El cliente no ve el feed
- ✅ Verifica que la URL del JSON sea correcta
- ✅ Asegúrate de incluir `?mode=view&feed=URL`

### Error al subir archivo
- ✅ Máximo 200MB por archivo
- ✅ Solo imágenes y videos
- ✅ Verifica tu conexión a internet

### Los posts no se guardan
- ✅ Revisa la consola del navegador (F12)
- ✅ El localStorage puede estar deshabilitado
- ✅ Usa Export como backup

---

## 🚀 Próximos Pasos

Para deploy a Netlify:
1. Sube el código a GitHub
2. Conecta con Netlify
3. Deploy automático
4. Tendrás una URL pública

---

¿Preguntas? Revisa la consola del navegador (F12) para ver logs de debug.

