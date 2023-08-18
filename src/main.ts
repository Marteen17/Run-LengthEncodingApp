// Importa el módulo fs para trabajar con el sistema de archivos
import * as fs from 'fs';
import * as zlib from 'zlib'; // Importa la biblioteca zlib para la compresión

// Función para codificar usando Run-Length Encoding
function encodeRunLength(input: string): string {
  if (!input) {
    return '';
  }

  let encoded = '';
  let count = 1;

  for (let i = 1; i < input.length; i++) {
    // Compara el carácter actual con el carácter anterior
    if (input[i] === input[i - 1]) {
      count++; // Incrementa el contador si los caracteres son iguales
    } else {
      // Agrega la cantidad y el carácter anterior a la cadena codificada
      encoded += count + input[i - 1];
      count = 1; // Reinicia el contador
    }
  }

  // Agrega la cantidad y el último carácter a la cadena codificada
  encoded += count + input[input.length - 1];
  return encoded; // Retorna la cadena codificada
}

// Función para decodificar usando Run-Length Encoding
function decodeRunLength(encoded: string): string {
  if (!encoded) {
    return '';
  }

  let decoded = '';
  let countStr = '';

  for (let char of encoded) {
    if (isNaN(Number(char))) {
      // Si el carácter no es un número, es un carácter individual
      if (countStr) {
        // Si hay un contador almacenado, repite el carácter la cantidad de veces especificada
        decoded += char.repeat(Number(countStr));
        countStr = ''; // Reinicia el contador
      } else {
        decoded += char; // Agrega el carácter directamente
      }
    } else {
      countStr += char; // Agrega el carácter al contador
    }
  }

  return decoded; // Retorna la cadena decodificada
}

// Función principal que se ejecuta al correr el script
async function main() {
  const args = process.argv.slice(2); // Obtiene los argumentos de la línea de comandos

  if (args.length < 2 || args.length > 3) {
    // Si no se proporcionan los argumentos correctos
    console.log('Usage: ts-node src/main.ts <file-name> <encode|decode> [<compress|no-compress>]');
    return;
  }

  const fileName = args[0]; // Obtiene el nombre de archivo de los argumentos
  const option = args[1]; // Obtiene la opción (encode o decode) de los argumentos

  try {
    // Lee el contenido del archivo especificado
    const fileContent = await fs.promises.readFile(`files/${fileName}`, 'utf-8');

    if (option === 'encode') {
      // Opción adicional para la compresión
      const encodeOption = args[2];
      if (encodeOption === 'compress') {
        // Codifica y luego comprime el contenido
        const encodedContent = encodeRunLength(fileContent);
        const compressedContent = await encodeWithZlib(encodedContent);
        await fs.promises.writeFile(`files/${fileName}.encoded`, compressedContent);
        console.log('File encoded and compressed with zlib successfully.');
      } else if (encodeOption === 'no-compress') {
        // Codifica sin comprimir
        const encodedContent = encodeRunLength(fileContent);
        await fs.promises.writeFile(`files/${fileName}.encoded`, encodedContent);
        console.log('File encoded without compression.');
      } else {
        console.log('Invalid encode option. Use "compress" or "no-compress".');
      }
    } else if (option === 'decode') {
      // Decodifica el contenido
      const decodedContent = decodeRunLength(fileContent);
      await fs.promises.writeFile(`files/${fileName}.decoded`, decodedContent);
      console.log('File decoded successfully.');
    } else {
      console.log('Invalid option. Use "encode" or "decode".');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('An error occurred:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

// Función para codificar usando zlib
async function encodeWithZlib(input: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    zlib.deflate(Buffer.from(input, 'utf-8'), (err, compressed) => {
      if (err) {
        reject(err);
      } else {
        resolve(compressed);
      }
    });
  });
}

// Llama a la función principal para iniciar el proceso
main();