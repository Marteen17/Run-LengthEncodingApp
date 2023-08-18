class RunLengthDecoder {
  static decode(encoded: string): string {
    let decodedText = '';
    let countStr = '';

    for (let char of encoded) {
      if (isNaN(Number(char))) {
        
        if (countStr) {
          
          decodedText += char.repeat(Number(countStr));
          countStr = ''; 
        } else {
          decodedText += char; 
        }
      } else {
        countStr += char; 
      }
    }

    return decodedText;
  }
}

export default RunLengthDecoder;