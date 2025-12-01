# TaskSync – App móvil (Expo)

Frontend móvil de **TaskSync**, desarrollado con **React Native**, **Expo** y **TypeScript**, usando **Expo Router** para la navegación basada en archivos.

La app permite:

- Iniciar sesión contra el backend usando un usuario demo (JWT).
- Ver la lista de tareas sincronizadas con el backend.
- Crear, editar y eliminar tareas.
- Enviar opcionalmente la ubicación (`latitude`, `longitude`) junto con cada tarea.

---

## Requerimientos

- Node.js >= 18
- npm o yarn
- App **Expo Go** instalada en el teléfono (o emulador Android/iOS)
- Backend de TaskSync corriendo (por defecto en `http://localhost:3000` o en la IP de tu máquina)

---

## Cómo correr el proyecto

1. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto Expo:

```env
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

- `EXPO_PUBLIC_API_URL` debe apuntar al backend (IP de tu máquina en la red local o `http://localhost:3000` si usas simulador iOS).
- En el código, la URL del backend se lee desde esta variable, por ejemplo en el módulo `sync-api`:

  ```ts
  const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
  ```

2. Instalar dependencias

```bash
npm install
```

3. Levantar la app

```bash
npx expo start
```

Se abrirá la consola de Expo (Metro). Desde ahí puedes:

- Escanear el QR con **Expo Go** en tu móvil.
- Presionar `a` para abrir en emulador Android.
- Presionar `i` para abrir en simulador iOS.

---

## Arquitectura de carpetas

Estructura principal del proyecto Expo:

```text
TASKSYNC/
  app/
    (pages)/
      (tabs)/
        ...
      sign-in/
        index.tsx
      _layout.tsx
      index.tsx
    components/
      ui/
        external-link.tsx
        haptic-tab.tsx
        hello-wave.tsx
        parallax-scroll-view.tsx
        themed-text.tsx
        themed-view.tsx
    module/
      auth/
      home/
      sign-in/
      sync-api/
  assets/
    images/
      ...
  constants/
    theme.ts
  hooks/
    use-color-scheme.ts
    use-color-scheme.web.ts
    use-theme-color.ts
  package.json
  tsconfig.json
  babel.config.js
  .env.example (opcional)
```

### Descripción rápida

- `app/(pages)`  
  Carpeta controlada por **Expo Router**.

  - `index.tsx`: pantalla inicial (redirección o lista de tareas).
  - `sign-in/`: pantalla de login.
  - `(tabs)/`: pestañas principales de la app (por ejemplo Home / Tasks / Perfil).
  - `_layout.tsx`: layout raíz del router (envuelve las pantallas, maneja tema, header, etc.).

- `app/module/auth`  
  Lógica relacionada con autenticación:

  - Llamada a `/auth/login` del backend.
  - Gestión del token JWT en memoria (y/o AsyncStorage).
  - Hooks para saber si el usuario está autenticado.

- `app/module/home`  
  Lógica y componentes del “home” (lista de tareas, acciones principales).

- `app/module/sign-in`  
  Componentes específicos de la pantalla de login (formularios, validación, etc.).

- `app/module/sync-api`  
  Encapsula las llamadas HTTP al backend:

  - Login.
  - CRUD de tareas.
  - Endpoint de `seed`.
    Aquí se configura también la **URL base** del backend.

- `app/components/ui`  
  Componentes puros de interfaz reutilizables, como:

  - `themed-view`, `themed-text`: abstraen el tema (oscuro/claro).
  - `haptic-tab`: pestañas con feedback háptico.
  - `parallax-scroll-view`, `hello-wave`, etc.

- `assets/images`  
  Iconos, splash screen e imágenes de la app.

- `constants/theme.ts`  
  Paleta de colores, tamaños de fuente, espaciamiento; base para el sistema de diseño y los componentes themed.

- `hooks/`  
  Hooks personalizados para integrarse con el tema de Expo/React Native:
  - `use-color-scheme`, `use-theme-color`, etc.

---

## Flujo de la app

1. **Sign-in**

   - El usuario llega a la pantalla `sign-in`.
   - Introduce email y password (preconfigurados para el usuario demo).
   - La app llama a `POST /auth/login` en el backend.
   - Si la respuesta es correcta, guarda el token y navega a la pantalla principal (tabs).

2. **Lista de tareas**

   - Al entrar al tab principal, la app llama a `GET /tasks` con el header `Authorization: Bearer <jwt>`.
   - Se muestran las tareas existentes.
   - Desde esta pantalla se puede:
     - Crear una tarea nueva.
     - Editar / marcar como completada.
     - Eliminar tareas.

3. **Creación/edición de tarea**
   - Formulario con campos:
     - Título
     - Descripción
     - Estado de completada
     - Botón para obtener ubicación actual (opcional).
   - La app usa la API de geolocalización y envía `latitude` y `longitude` al backend al guardar.

---

## Decisiones técnicas

- **Expo Router**  
  Se eligió Expo Router para aprovechar:

  - Navegación basada en archivos (menos boilerplate).
  - Integración nativa con Expo.
  - Estructura clara entre páginas y módulos.

- **Separación `module/*` vs `components/ui`**

  - `module/*` contiene lógica de dominio (auth, sincronización, home).
  - `components/ui` contiene componentes visuales, reutilizables y agnósticos del dominio.

- **Tipado con TypeScript**

  - Asegura que el modelo `Task` en el front coincida con el backend (`id`, `title`, `description`, `completed`, `latitude`, `longitude`).
  - Reduce errores de integración al consumir la API.

- **JWT en el cliente**
  - Se guarda el token al hacer login y se adjunta en todas las llamadas protegidas.
  - Permite modelar un flujo realista de autenticación aunque sólo haya un usuario demo.

---

## Funcionalidad nativa: geolocalización

La app usa la API nativa de geolocalización (por ejemplo, con `expo-location`) para:

1. Solicitar permiso de ubicación.
2. Obtener las coordenadas (`latitude`, `longitude`) del dispositivo.
3. Incluir esas coordenadas en el cuerpo de la tarea al crear o actualizar.

Esto permite asociar cada tarea a un lugar físico. En futuras mejoras se podría:

- Mostrar las tareas en un mapa.
- Filtrar por tareas cercanas.
- Ordenar por distancia a la ubicación actual.

---

## Posibles mejoras futuras

- Persistencia offline (guardar tareas y token en AsyncStorage y sincronizar cuando haya conexión).
- Manejo de temas (dark/light) configurable por el usuario.
- Vista de mapa usando `react-native-maps` para visualizar tareas por ubicación.
- Internacionalización (i18n) para soportar múltiples idiomas.
- Manejo avanzado de errores (toasts, banners, reintentos automáticos).
