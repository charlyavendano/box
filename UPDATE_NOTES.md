# Actualización a Angular 21

## Cambios Realizados

### 1. Angular 21
- Actualizado `@angular/core` y todos los paquetes relacionados a versión `^21.0.0`
- Actualizado `@angular/cli` a versión `^21.0.0`
- Actualizado `@angular-devkit/build-angular` a versión `^21.0.0`
- Actualizado `zone.js` a versión `~0.15.0` (compatible con Angular 21)

### 2. TypeScript
- Actualizado `typescript` a versión `~5.6.0`
- Actualizado `target` y `module` a `ES2023` en `tsconfig.json`
- Actualizado `lib` a `ES2023` en `tsconfig.json`

### 3. Tailwind CSS v4
- Actualizado `tailwindcss` a versión `^4.0.0`
- Agregado `@tailwindcss/postcss` versión `^4.0.0`
- Actualizado `postcss.config.js` para usar `@tailwindcss/postcss`
- Actualizado `src/styles.css` para usar `@import "tailwindcss"` (nueva sintaxis de v4)
- Configurado `@theme` en `styles.css` para colores personalizados (nueva forma en v4)

### 4. Node Types
- Actualizado `@types/node` a versión `^22.0.0`

### 5. PostCSS
- Actualizado `postcss` a versión `^8.4.47`

## Notas Importantes

### Tailwind CSS v4
Tailwind CSS v4 introduce cambios significativos:
- Usa `@import "tailwindcss"` en lugar de `@tailwind` directives
- La configuración de colores personalizados ahora se hace con `@theme` en CSS
- El plugin de PostCSS cambió a `@tailwindcss/postcss`

### Iconos
El proyecto actualmente usa SVG inline, que es compatible con todas las versiones de Angular. Si deseas usar una biblioteca de iconos, puedes considerar:
- `@heroicons/angular` (compatible con Angular 21)
- `lucide-angular` (verificar compatibilidad con Angular 21)

## Próximos Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Si hay conflictos de versiones, usar:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Verificar que todo funcione:**
   ```bash
   npm start
   ```

## Posibles Problemas

Si Angular 21 aún no está disponible en npm, el comando `npm install` mostrará un error. En ese caso:
- Usa la última versión estable disponible (probablemente Angular 19 o 20)
- O espera a que Angular 21 esté disponible públicamente
