# Run-Length Encoding App

![GitHub](https://img.shields.io/github/license/Marteen17/run-length-encoding-app)

## Descripción

Esta es una aplicación simple que implementa la técnica de codificación Run-Length Encoding (RLE) para comprimir y descomprimir archivos de texto. El RLE es un método de compresión sin pérdida que funciona codificando secuencias repetidas de caracteres en un único carácter seguido del número de repeticiones.

## Lenguaje y Dependencias

- Lenguaje: TypeScript
- Dependencias: 
  - Node.js (v20.5.1) - [Descargar aquí](https://nodejs.org/)
  - @types/node (v20.5.0) - Para proporcionar tipos TypeScript para el módulo `fs`

## Funcionalidad

La aplicación permite realizar las siguientes operaciones:

### Codificación

```
npm start input.txt encode [compress|no-compress]
```

- `input.txt`: El nombre del archivo de texto a codificar.
- `encode`: Indica que se debe realizar la codificación.
- `[compress|no-compress]`: Opcional. Especifica si se debe comprimir el archivo codificado con la biblioteca zlib (`compress`) o no (`no-compress`).

### Decodificación

```
npm start input.txt decode
```

- `input.txt`: El nombre del archivo de texto a decodificar.
- `decode`: Indica que se debe realizar la decodificación.

## Ejemplos

### Codificación y compresión

```
npm start input.txt encode compress
```

Este comando codificará el archivo `input.txt`, luego comprimirá el resultado usando la biblioteca zlib y guardará el archivo codificado y comprimido en `input.txt.encoded`.

### Codificación sin compresión

```
npm start input.txt encode no-compress
```

Este comando codificará el archivo `input.txt` sin comprimirlo y guardará el archivo codificado en `input.txt.encoded`.

### Decodificación

```
npm start input.txt.encoded decode
```

Este comando decodificará el archivo `input.txt.encoded` y guardará el resultado en `input.txt.decoded`.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

---
