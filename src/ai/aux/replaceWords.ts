const wordsForReplacement: Record<string, string> = {
  i: 'you',
  you: 'i',
  me: 'you',
  my: 'your',
  am: 'are',
  are: 'am',
  was: 'were',
  "i'd": 'you would',
  "i've": 'you have',
  "i'll": 'you will',
  "you've": 'i have',
  "you'll": 'i will',
  your: 'my',
  yours: 'mine',
  'always had': 'alway have',
  yourself: 'myself',
  myself: 'yourself',
};

export function processInput(message?: string) {
  return (message || '')
    .replace(/[,;.?!:]/g, '')
    .replace(/[\n ]+/g, ' ')
    .trim()
    .toLowerCase();
}

export function replaceWords(input: string) {
  const inputSplit = input.split(' ');

  //Was having an overrite issue
  const newSplit: string[] = [];
  for (let i = 0; i < inputSplit.length; i++) {
    const currentInputWord = inputSplit[i];
    if (currentInputWord in wordsForReplacement) {
      const replacementWord = wordsForReplacement[currentInputWord];
      newSplit[i] = replacementWord;
    } else {
      newSplit[i] = currentInputWord;
    }
  }

  let updatedMessage = '';
  for (let i = 0; i < newSplit.length; i++) {
    const word = newSplit[i];
    if (updatedMessage !== '') {
      updatedMessage += ' ';
    }
    updatedMessage += word;
  }

  return updatedMessage;
}
