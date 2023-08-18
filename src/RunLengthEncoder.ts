class RunLengthEncoder {
    static encode(input: string): string {
      if (!input) {
        return '';
      }
  
      let encoded = '';
      let count = 1;
  
      for (let i = 1; i < input.length; i++) {
        if (input[i] === input[i - 1]) {
          count++;
        } else {
          encoded += count + input[i - 1];
          count = 1;
        }
      }
  
      encoded += count + input[input.length - 1];
      return encoded;
    }
  
    static decode(encoded: string): string {
      if (!encoded) {
        return '';
      }
  
      let decoded = '';
      let countStr = '';
  
      for (let char of encoded) {
        if (isNaN(Number(char))) {
          if (countStr) {
            decoded += char.repeat(Number(countStr));
            countStr = '';
          } else {
            decoded += char;
          }
        } else {
          countStr += char;
        }
      }
  
      return decoded;
    }
  }
  
  export default RunLengthEncoder;  