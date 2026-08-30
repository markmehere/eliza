import { Dialogue } from '../../constants/Dialogue';

const synonyms: Record<string, string[]> = {
  sorry: ['apologise'],
  dreamed: ['dream', 'dreams', 'dreamt'],
  'i am': ['am i', "i'm"],
  you: ["you're", 'you are'],
  'i cannot': ["i can't", 'i am unable'],
  'was i': ['i was'],
  maybe: ['possibly', 'perhaps', 'probably'],
  family: ['mother', 'father', 'sister', 'brother', 'child'],
  partner: ['girlfriend', 'husband', 'wife', 'boyfriend'],
  lonely: ['alone', 'loneliness', 'solo', 'on my own'],
  hello: ['good afternoon', 'good morning', 'hi'],
  oral: ['mouth', 'suck', 'tongue', 'lick', 'taste', 'eat'],
  shit: ['fuck', 'asshole', 'wanker', 'dickhead', 'jackass', 'idiot', 'bitch', 'damn'],
  hate: ['kill', 'murder', 'ditch', 'shoot', 'bludgeon', 'destroy', 'hurt', 'harm'],
  absolutely: ['definitely', 'certainly', 'yes', '100%', 'yep'],
  'i think': ['i believe'],
  no: ['nup'],
  'i desire': [ 'i want to' ],
  remember: [ 'often think of' ],
};

export const responses: Record<string, { weight: number; responses: string[]; which: Dialogue }> = {
  NOTFOUND: {
    weight: 0,
    responses: [
      'What does that suggest to you?',
      'I see.',
      "I'm not sure I understand you fully.",
      'Can you elaborate?',
      'That is quite interesting.',
      'Please tell me more.',
      "Let's change focus a bit... Tell me about your family.",
      'Can you elaborate on that?',
      'Why do you say that *?',
    ],
    which: Dialogue.NOTFOUND,
  },
  sorry: {
    weight: 1,
    responses: ["Please don't apologize.", 'Apologies are not necessary.', 'Apologies are not required.'],
    which: Dialogue.APOLOGISE,
  },
  always: {
    weight: 1,
    responses: ['Can you think of a specific example?'],
    which: Dialogue.ALWAYS,
  },
  because: {
    weight: 6,
    responses: ['Is that the real reason?'],
    which: Dialogue.BECAUSE,
  },
  maybe: {
    weight: 1,
    responses: ["You don't seem very certain."],
    which: Dialogue.MAYBE,
  },
  'i think': {
    weight: 2,
    responses: ['Do you really think so?'],
    which: Dialogue.ITHINK,
  },
  you: {
    weight: 1,
    responses: ['We were discussing you, not me.', 'Why do you say that about me?', 'Why do you care whether I *?'],
    which: Dialogue.YOU,
  },
  no: {
    weight: 1,
    responses: ['Why not?', 'Are you sure?'],
    which: Dialogue.NO,
  },
  'i am': {
    weight: 1,
    responses: [
      'I am sorry to hear you are *.',
      'How long have you been *?',
      'Do you believe it is normal to be *?',
      'Do you enjoy being *?',
      'Did you come to me because you are *?',
    ],
    which: Dialogue.IAM,
  },
  'i feel': {
    weight: 4,
    responses: [
      'Tell me more about such feelings.',
      'Do you often feel *?',
      'Do you enjoy feeling *?',
      'Why do you feel that way?',
    ],
    which: Dialogue.FEEL,
  },
  family: {
    weight: 16,
    responses: [
      'Tell me more about your family.',
      'How do you get along with your family?',
      'Is your family important to you?',
    ],
    which: Dialogue.FAMILY,
  },
  friends: {
    weight: 5,
    responses: [
      'Tell me more about your social life.',
      'Do you feel supported by the people in your life?',
      'Tell me more about your friends.',
    ],
    which: Dialogue.FRIENDS,
  },
  partner: {
    weight: 5,
    responses: [
      'How important is companionship in your life?',
      'How is your romantic life?',
      'Do you still feel loved, if not by a partner, then by friends or family?',
    ],
    which: Dialogue.FRIENDS,
  },
  lonely: {
    weight: 5,
    responses: [
      'Do you often feel lonely?',
      'Tell me more about feeling lonely.',
      'Do you think you would feel lonely when travelling or eating on your own?',
      'Do you feel loneliness is more about emotion than circumstance?',
    ],
    which: Dialogue.LONELY,
  },
  dreamed: {
    weight: 4,
    responses: [
      'Do you dream often?',
      'What does that dream suggest to you?',
      'What people appear in your dreams?',
      'Are you disturbed by your dreams?',
      'Have you ever fantasized * while you were awake?',
    ],
    which: Dialogue.DREAMED,
  },
  nightmare: {
    weight: 3,
    responses: [
      'What does that dream suggest to you?',
      'Do you dream often?',
      'What persons appear in your dreams?',
      'Are you disturbed by your dreams?',
    ],
    which: Dialogue.DREAMED,
  },
  hello: {
    weight: 1,
    responses: ['Hi again! How is it going?', 'How are you today? Any problems?'],
    which: Dialogue.SECONDHELLO,
  },
  goodbye: {
    weight: 1,
    responses: ['Goodbye. Thank you for talking to me.'],
    which: Dialogue.GOODBYE,
  },
  'i need': {
    weight: 5,
    responses: ['Why do you need *?', 'Would it really help you to get *?', 'Are you sure you need *?'],
    which: Dialogue.NEED,
  },
  "you don't": {
    weight: 3,
    responses: ["Do you really think I don't *?", 'Perhaps eventually I will *.', 'Do you really want me to *?'],
    which: Dialogue.REALLYTHINK,
  },
  "why don't you": {
    weight: 3,
    responses: ["Do you really think I don't *?", 'Perhaps eventually I will *.', 'Do you really want me to *?'],
    which: Dialogue.REALLYTHINK,
  },
  "why can't i": {
    weight: 3,
    responses: [
      'Do you think you should be able to *?',
      'If you could *, what would you do?',
      "I don't know -- why can't you *?",
      'Have you really tried?',
    ],
    which: Dialogue.REALLYTHINK,
  },
  'i cannot': {
    weight: 4,
    responses: [
      'How do you know you can\'t "*"?',
      'Perhaps you could * if you tried.',
      'What would it take for you to *?',
    ],
    which: Dialogue.CANNOT,
  },
  perhaps: {
    weight: 1,
    responses: [
      'How do you know you can\'t "*"?',
      'Perhaps you could * if you tried.',
      'What would it take for you to *?',
    ],
    which: Dialogue.CANNOT,
  },
  remember: {
    weight: 5,
    responses: [
      'Do you often think of *?',
      'Does thinking of * bring anything else to mind?',
      'What else do you recollect?',
      'Why do you recollect * just now?',
      'What in the present situation reminds you of *?',
      'What is the connection between me and *?',
    ],
    which: Dialogue.REMEMBER,
  },
  'do you remember': {
    weight: 6,
    responses: ['Do you think I would forget?', 'Yes I do remember *.'],
    which: Dialogue.REMEMBER,
  },
  if: {
    weight: 3,
    responses: [
      "Do you think it's likely that *?",
      'Do you wish that *?',
      'Really, if *?',
    ],
    which: Dialogue.IF,
  },
  name: {
    weight: 15,
    responses: ['I am not interested in names.', "I've told you before, I do not care about names -- please continue."],
    which: Dialogue.NAME,
  },
  computer: {
    weight: 12,
    responses: [
      'Do computers worry you?',
      'Why do you mention computers?',
      'Could you expand on how computers are related?',
      'What do you think machines have to do with your problem?',
      "Don't you think computers can help people?",
      'What about machines worries you?',
      'What do you think about machines?',
    ],
    which: Dialogue.COMPUTER,
  },
  'are you': {
    weight: 3,
    responses: [
      'Why are you interested in whether I am * or not?',
      "Would you prefer if I weren't *?",
      'Perhaps I am * in your fantasies.',
      'Do you sometimes think I am *?',
    ],
    which: Dialogue.AREYOU,
  },
  'they are': {
    weight: 2,
    responses: [
      'Did you think they might not be *?',
      'Would you like it if they were not *?',
      'What if they were not *?',
      'Possibly they are *.',
    ],
    which: Dialogue.THEYARE,
  },
  your: {
    weight: 2,
    responses: [
      'Why are you concerned over my *?',
      'What about your own *?',
      "Are you worried about someone else's *?",
      'Really, my *?',
    ],
    which: Dialogue.YOUR,
  },
  'was i': {
    weight: 2,
    responses: [
      'What if you were *?',
      'Do you think you were *?',
      'Were you *?',
      'What would it mean if you were *?',
      'What does * suggest to you?',
    ],
    which: Dialogue.WASI,
  },
  'i desire': {
    weight: 3,
    responses: ['What would it mean to you if you got it?', 'Why do you want it?', 'What if you never got it?'],
    which: Dialogue.DESIRE,
  },
  'i desired': {
    weight: 3,
    responses: ['Did you achieve it or simply move on?'],
    which: Dialogue.DESIRE,
  },
  'i am sad': {
    weight: 3,
    responses: ['Sorry to hear. Tell me about it.'],
    which: Dialogue.IAMSAD,
  },
  'i am happy': {
    weight: 3,
    responses: ["That's good. What is making you happy?"],
    which: Dialogue.IAMHAPPY,
  },
  'i am bored': {
    weight: 3,
    responses: ['What makes you bored?'],
    which: Dialogue.IAMBORED,
  },
  shit: {
    weight: 4,
    responses: ['Please try to use respectful language @.', "Let's try to lower the intensity a bit @.", 'I always try to avoid swear words.'],
    which: Dialogue.SWEAR,
  },
  oral: {
    weight: 4,
    responses: ['Have you considered you might have an oral fixation @?'],
    which: Dialogue.ORAL,
  },
  hate: {
    weight: 3,
    responses: ['Try not to let your anger control you.', 'Have you tried to temper your emotions?', "It's best to avoid such strong phrasing if you can."],
    which: Dialogue.HATE,
  },
  absolutely: {
    weight: 1,
    responses: ['You seem quite certain?', 'You seem quite sure of this?'],
    which: Dialogue.CERTAIN,
  }
};

export const responsesWithWildcard: Record<string, { weight: number; replacementWord: string }> = {
  "!i( a|')m .*happy": {
    weight: 20,
    replacementWord: 'i am happy',
  },
  "!i( a|')m .*sad": {
    weight: 20,
    replacementWord: 'i am sad',
  },
  "!i( a|')m .*bored": {
    weight: 20,
    replacementWord: 'i am bored',
  },
};

function sortNumber(a: number, b: number) {
  return b - a;
}

export function keywordsByWeight(): { word: string; weight: number }[] {
  let weights: number[] = [];
  const tempKeywords: Record<string, number> = {};
  const keywords: { word: string; weight: number }[] = [];

  // Adds responses
  for (const responseKeyword in responses) {
    const weight = responses[responseKeyword].weight;
    tempKeywords[responseKeyword] = weight;

    if (!weights.includes(weight)) {
      weights.push(weight);
    }
  }

  // Add similar words
  for (const wordWithResponse in synonyms) {
    if (wordWithResponse in tempKeywords) {
      const weight = tempKeywords[wordWithResponse];

      for (let i = 0; i < synonyms[wordWithResponse].length; i++) {
        const similarWord = synonyms[wordWithResponse][i];
        tempKeywords[similarWord] = weight;
      }
    } //otherwise ignores it
  }

  // Adds responsesWithWildcard
  for (const word in responsesWithWildcard) {
    const weight = responsesWithWildcard[word].weight;

    if (!weights.includes(weight)) {
      weights.push(weight);
    }

    tempKeywords[word] = weight;
  }

  // Sorts them based on weight going from highest to lowest
  weights = weights.sort(sortNumber);

  //Populates keywords for final result to be used throughout
  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    for (const word in tempKeywords) {
      //NOT FOUND is the fallback word. So if it loops through all
      //and none match it will be this word.
      if (tempKeywords[word] === weight && word !== 'NOTFOUND') {
        keywords.push({ word, weight });
      }
    }
  }

  return keywords;
}

function findResponsesForSimilarWord(word: string) {
  let foundKey = '';
  for (const key in synonyms) {
    const similarWords = synonyms[key];
    for (let i = 0; i < similarWords.length; i++) {
      if (similarWords[i] === word) {
        foundKey = key;
        return responses[foundKey];
      }
    }
  }

  //Find responses for that key
  return undefined;
}

export function selectResponse(word: string, usedResponses: string[]) {
  let potentialResponse: { weight: number; responses: string[]; which: Dialogue } | undefined;

  if (word in responses) {
    // Easily find responses by using key value pairing
    potentialResponse = responses[word];
  } else {
    // Need to find the related responses
    potentialResponse = findResponsesForSimilarWord(word);
  }

  const newResponses: string[] = [];
  const originalResponsesSize = potentialResponse?.responses.length || 0;

  if (!potentialResponse) {
    const notFoundResponses = responses.NOTFOUND.responses;
    return {
      message: notFoundResponses[Math.floor(Math.random() * notFoundResponses.length)],
      which: Dialogue.NOTFOUND,
    };
  }

  for (let i = 0; i < originalResponsesSize; i++) {
    newResponses.push(potentialResponse.responses[i]);

    // If has wild card, adds another
    if (potentialResponse.responses[i].indexOf('*') !== -1) {
      newResponses.push(potentialResponse.responses[i]);
    }

    // If the response hasnt been used
    if (!usedResponses.includes(potentialResponse.responses[i])) {
      newResponses.push(potentialResponse.responses[i]);
    }
  }

  return { message: newResponses[Math.floor(Math.random() * newResponses.length)], which: potentialResponse.which };
}

export function containsKeywordWithWildcard(input: string, keywordsWithWildcardStr: string) {
  return input.match(new RegExp(keywordsWithWildcardStr.substring(1))) && input.indexOf('unhappy') === -1 && input.indexOf('not') === -1;
}

export function findBasicKeywordFromKeywordWithWildcard(keywordsWithWildcardStr: string) {
  return responsesWithWildcard[keywordsWithWildcardStr].replacementWord;
}
