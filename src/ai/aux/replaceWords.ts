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
  myself: 'yourself'
};

export function processInput(message?: string) {
  return (message || '')
    .replace(/[,;.?!:]/g, '')
    .replace(/[\n ]+/g, ' ')
    .trim()
    .toLowerCase();
}

/*
  While it may seem inelegant - any solution to replace words needs to
  not overwrite its own replacements. If you replace words one at a time,
  the string:

  "live in my house" becomes "live in your house" before once more becoming
  "live in my house" - the final returned value
*/
export function replaceWords(input: string, stripFirstS?: boolean) {
  const inputSplit = input.split(' ');

  const newSplit: string[] = [];
  for (let i = 0; i < inputSplit.length; i++) {
    const currentInputWord = inputSplit[i];
    if (currentInputWord in wordsForReplacement) {
      const replacementWord = wordsForReplacement[currentInputWord];
      newSplit[i] = replacementWord;
    } else {
      console.log(i === 0 ? (stripFirstS ? currentInputWord.replace(/([aeiou])s$/, (s) => s[1]) : 'notstripping') : '');
      if (i === 0 && stripFirstS) newSplit[i] = currentInputWord.replace(/([a-z][a-z])s$/, (s) => {
        if (s[0] === 's') return 's';
        return `${s[0]}${s[1]}`;
      });
      else newSplit[i] = currentInputWord;
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
