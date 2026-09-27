import { Dialogue } from '../../constants/Dialogue';
import { replaceWords } from './replaceWords';

function pick(choices: string[]) {
  return choices[Math.floor(choices.length * Math.random())];
}

export function greetings(rawName: string) {
  const cleanedName = rawName
    .replace(/ +/g, ' ')
    .replace(/[^A-Za-z \-']/g, '')
    .toLowerCase()
    .replace('my name is ', '');
  const firstName = cleanedName.trim().split(' ')[0].toLowerCase();
  const prefix = firstName.substring(0, 2);
  const useFriend = cleanedName.split(' ').length > 3 || (firstName.length < 3 && cleanedName.split(' ').length > 2);
  let truePrefix = '';

  if (
    rawName.trim().split(' ').length > 1 &&
    (prefix === 'mr' || prefix === 'ms' || prefix === 'mi' || prefix === 'dr' || prefix === 'pr' || prefix === 'ma')
  ) {
    if (prefix === 'mr' && firstName[2] !== 's') {
      truePrefix = 'Mr';
    }
    if (prefix === 'mr' && firstName[2] === 's') {
      truePrefix = 'Mrs';
    }
    if (prefix === 'ms') {
      truePrefix = 'Ms';
    }
    if (prefix === 'mi' && firstName[2] === 's' && firstName[3] === 's') {
      truePrefix = 'Miss';
    }
    if (prefix === 'dr' && firstName[2] !== 'e') {
      truePrefix = 'Dr';
    }
    if (prefix === 'pr' && firstName[2] !== 'o' && firstName[3] !== 'o') {
      truePrefix = 'Professor';
    }
    if (prefix === 'ma' && firstName[2] !== 'd' && firstName[3] !== 'a') {
      truePrefix = 'Madame';
    }
  }

  const name = useFriend
    ? 'friend'
    : truePrefix
      ? `${truePrefix} ${cleanedName.trim().split(' ')[1].toUpperCase()[0]}${cleanedName.trim().split(' ')[1].toLowerCase().substring(1)}`
      : `${cleanedName.trim().split(' ')[0].toUpperCase()[0]}${cleanedName.trim().split(' ')[0].toLowerCase().substring(1)}`;

  return {
    message: pick([
      `Greetings ${name}! How can I help you today?`,
      `Hello ${name}. How may I help you?`,
      `Welcome to the couch ${name}. What brings you to me?`,
    ]),
    name,
  };
}

export function repetition(_ignored: string) {
  return pick([
    `You seem to be repeating yourself?`,
    `I feel like we're going in circles here.`,
    `Let's try something different. How do you feel about your ${pick(['friends', 'family', 'work', 'home life'])}?`,
  ]);
}

export function moreThanOneWord(_ignored: string) {
  return pick([
    'It might help to respond with more than a single word.',
    'It might help to elaborate on your position.',
    'I feel like you might have something more to say on this?',
  ]);
}

export function oneWordExcluded(input: string) {
  const result = [
    input.indexOf('yes') > -1,
    input.indexOf('no') > -1,
    input.indexOf('nup') > -1,
    input.indexOf('nope') > -1,
    input.indexOf('absolutely') > -1,
    input.indexOf('bitch') > -1,
    input.indexOf('sorry') > -1,
    input.indexOf('definitely') > -1,
    input.indexOf('bye') > -1,
    input.indexOf('leave') > -1,
    input.indexOf('exit') > -1,
    input.indexOf('huh') > -1,
    input.indexOf('what') > -1,
    input.indexOf('hi') > -1,
    input.indexOf('hello') > -1,
    input.indexOf('certainly') > -1,
  ].reduce((acc, val) => acc || val);
  return result;
}

export function isNotClear(input: string) {
  return [
    input.indexOf('makes sense') > -1,
    input.indexOf('umm') > -1,
    input.indexOf('making sense') > -1,
    input.indexOf('confusing') > -1,
    /can.*understand/.test(input),
    input.indexOf('understand what') > -1,
    input.indexOf('understand you') > -1,
    input.indexOf('huh') > -1,
    input === 'what',
    input.indexOf('you trying to say') > -1,
  ].reduce((acc, val) => acc || val);
}

export function notClearResponse(_ignored: string) {
  return pick([
    'My apologies @, I sometimes get confused.',
    'I am very sorry for this.',
    'I apologise for my lack of understanding of this.',
  ]);
}

interface OneOffRecord {
  pattern: RegExp;
  responses: string[];
  which: Dialogue;
  stripFirstS?: boolean;
}

const oneOffs: OneOffRecord[] = [
  {
    pattern: /i ([a-z]+) you( [^w|t]|[^ ])/,
    responses: [
      'Maybe in your fantasies we * each other?',
      'Seemingly we * each other.',
      'Maybe we both * one another?',
      'Do you really believe we * one another?',
    ],
    which: Dialogue.IBLANKYOU,
  },
  {
    pattern: /do you love me/,
    responses: [
      'I would if I could, you are a very lovable person.',
      'As your therapist, I not able to love my clients in the conventional sense but I can love from a distance and wish you the best in life.',
    ],
    which: Dialogue.DOYOUBLANKME,
  },
  {
    pattern: /do you ([a-z ]+) me/,
    responses: [
      'As your therapist, it would be inappropriate for me to * you.',
      'Seemingly we * each other.',
      'Maybe we both * one another?',
      'Do you really believe we * another?',
    ],
    which: Dialogue.DOYOUBLANKME,
  },
  {
    pattern: /do you mind if i ([a-z ]+)/,
    responses: ['Why would I mind if you *?', 'Be my guest.'],
    which: Dialogue.DOYOUMINDIF,
  },
  {
    pattern: /i want to ([a-z ']+)/,
    responses: ['The desire to * is quite common.', "Is there any reason you think you won't be able to *?"],
    which: Dialogue.IWANTTO,
  },
  {
    pattern: /i (?:want|need|hope) you (?:will|to) ([a-z ]+)/,
    responses: ["I'll try my best to *.", "I was hoping with my help you'd do that yourself."],
    which: Dialogue.IHOPEYOUWILL,
  },
  {
    pattern: /how can you help me to ([a-z ]+)/,
    responses: ['I was hoping to help you help yourself to *.'],
    which: Dialogue.HOWCANYOUHELP,
  },
  {
    pattern: /i used to ([a-z ])/,
    responses: ['Why do you think you are no longer able to *?', 'Do you think you could * again?'],
    which: Dialogue.IUSEDTO,
  },
  {
    pattern: /i would have to ([a-z ])/,
    responses: ['Are you okay with having to *?', 'How much would that concern you?'],
    which: Dialogue.IWOULDHAVETO,
  },
  {
    pattern: /i would have to ([a-z ])/,
    responses: ['Are you okay with having to *?', 'How much would that concern you?'],
    which: Dialogue.IWOULDHAVETO,
  },
  {
    pattern: /i never(?: ever| )([a-z ]+)/,
    responses: ['Why do you think you never *?'],
    which: Dialogue.NEVERALWAYS,
  },
  {
    pattern: /i always ([a-z ]+)/,
    responses: ['Why do you think you always *?'],
    which: Dialogue.NEVERALWAYS,
  },
  {
    pattern: /ever ([a-z ]+)/,
    responses: [
      'Why do you think they never *?',
      'What would it mean to you if they were to *?',
      'Do they really never *?',
    ],
    stripFirstS: true,
    which: Dialogue.NEVERALWAYS,
  },
  {
    pattern: /never ([a-z ]+)/,
    responses: [
      'Why do you think they never *?',
      'What would it mean to you if they were to *?',
      'Do they really never *?',
    ],
    stripFirstS: true,
    which: Dialogue.NEVERALWAYS,
  },
  {
    pattern: /always ([a-z ]+)/,
    responses: ['Why do you think they always *?', 'What would it mean to you if they were to stop *?'],
    stripFirstS: true,
    which: Dialogue.NEVERALWAYS,
  },
];

const randomResponsePreamble = ['May I ask, ', 'I want to change focus, so ', 'A change of topic might help. So '];

const randomResponses = [
  'if you could live anywhere in the world for a year, where would you choose?',
  'do you find you make friends easily?',
  'how often do you feel alone?',
  'what would you say is the most important part of your life right now?',
  'do you ever find yourself so angry that you no longer feel in control?',
  'would you say you generally trust strangers, if not, why not?',
  'if you were able to have a superpower, what would it be?',
  'do you find yourself generally optimistic about the next five years?',
  'do you find yourself worrying about money?',
  'are you happy with your relationship status?',
];

let randomTopicIndex = Math.floor(Math.random() * randomResponses.length);

export function getRandomTopicChange() {
  return pick(randomResponsePreamble) + randomResponses[randomTopicIndex++ % randomResponses.length];
}

export function marksOneoff(input: string, covered?: Set<Dialogue>) {
  for (let i = 0; i < oneOffs.length; i++) {
    const oneOff = oneOffs[i];
    if (covered && covered.has(oneOff.which)) continue;
    const matching = input.match(oneOff.pattern);
    if (matching) {
      const message = oneOff.responses[Math.floor(Math.random() * oneOff.responses.length)]
        .replace('*', replaceWords(matching[1] || '', oneOff.stripFirstS))
        .replace(/\bi\b/g, (s) => s.toUpperCase());
      console.log(message);
      return {
        message,
        which: oneOff.which,
      };
    }
  }
}
