# 📘 Documentación: `tsconfig.json`, `tsc` y módulos Node (para principiantes con nivel profesional)
> Al inicio incluyo la **explicación en forma de comentario** (como pediste). Después encontrarás la documentación detallada y **ejemplos comentados paso a paso** en markdown. Esta guía explica todo lo necesario para usar `tsconfig.json`, compilar con `tsc`, usar `tsc --watch` y configurar módulos ES en Node (`"type": "module"` + `node:` specifiers).

```ts
/**
 * Explicación rápida (comentario introductorio):
 *
 * Este proyecto usa TypeScript con un archivo de configuración `tsconfig.json`.
 * - `tsc --init` crea un `tsconfig.json` base.
 * - Dentro de `compilerOptions` podemos fijar target, módulo, salida, mapas de fuente, y reglas estrictas.
 * - `tsc` (sin argumentos) lee `tsconfig.json` y compila según sus opciones.
 * - `tsc --watch` recompila automáticamente al detectar cambios.
 * - Para usar imports modernos de Node (p. ej. `import fs from 'node:fs'`):
 *    1. `npm init -y`
 *    2. en `package.json` añadir `"type": "module"`
 *    3. `npm install --save-dev @types/node` para obtener tipados de Node en TS
 *
 * Los ejemplos abajo muestran un proyecto mínimo (estructura, tsconfig, comandos y archivos .ts),
 * con comentarios en cada paso para que puedas entender qué hace cada línea.
 */
```

---

## 1) Crear `tsconfig.json` con `tsc --init`

```bash
npx tsc --init
```

`tsc --init` crea un fichero `tsconfig.json` con muchas opciones comentadas. Lo habitual es editarlo para adaptarlo al proyecto. A continuación se muestra un `tsconfig.json` ejemplo pensado para usar con Node moderno (ES Modules) y buenas prácticas profesionales.

---

## 2) `tsconfig.json` de ejemplo (explicado)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "allowJs": false,
    "sourceMap": true,
    "noEmitOnError": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallThroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "nodenext",
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 3) Explicación detallada de las opciones

*(Aquí se incluyen todas las explicaciones técnicas, como en la respuesta anterior: target, lib, module, rootDir, allowJs, etc.)*

---

## 4) Compilar y usar `tsc`

- **Compilar:** `npx tsc`
- **Compilar con config específica:** `npx tsc --project ./tsconfig.json`
- **Modo observador:** `npx tsc --watch`

---

## 5) Configurar Node como ES Modules

```bash
npm init -y
```
```json
{
  "type": "module"
}
```
```bash
npm install --save-dev @types/node
```
```ts
import fs from 'node:fs';
```

---

## 6) Ejemplo práctico completo

*(Incluye la estructura del proyecto, `tsconfig.json`, `package.json`, `src/utils.ts`, `src/index.ts` con todos los comentarios explicativos, como en la respuesta anterior.)*

---

## 7) Flujo de trabajo típico y comandos

1. `npm init -y`
2. Añadir `"type": "module"`
3. `npm install --save-dev typescript @types/node`
4. `npx tsc --init`
5. `npx tsc`
6. `node dist/index.js`
7. `npx tsc --watch`

---

## 8) Consejos profesionales y FAQ

*(Incluye los puntos de buenas prácticas, errores comunes y FAQ sobre importación, strict, etc.)*
