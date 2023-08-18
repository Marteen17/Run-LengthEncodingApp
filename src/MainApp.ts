import * as fs from 'fs';
import RunLengthEncoder from './RunLengthEncoder';
import RunLengthDecoder from './RunLengthDecoder';

class MainApp {
  static async run(fileName: string, option: string): Promise<void> {
    try {
      const fileContent = await fs.promises.readFile(`files/${fileName}`, 'utf-8');
      let processedContent = '';

      if (option === 'encode') {
        processedContent = RunLengthEncoder.encode(fileContent);
        console.log('File encoded without compression.');
      } else if (option === 'decode') {
        processedContent = RunLengthDecoder.decode(fileContent);
        console.log('File decoded successfully.');
      } else {
        console.log('Invalid option. Use "encode" or "decode".');
        return;
      }

      await fs.promises.writeFile(`files/${fileName}.${option}`, processedContent, 'utf-8');
      console.log(`Processed content written to files/${fileName}.${option}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('An error occurred:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }
}

export default MainApp;