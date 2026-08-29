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
    name
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
    'I feel like you might have something more to say on this?'
  ])
}

export function oneWordExcluded(input: string) {
  return [
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
    input.indexOf('exit') > -1
  ].reduce((acc, val) => acc || val);
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
    input.indexOf('you trying to say') > -1
  ].reduce((acc, val) => acc || val);
}

export function notClearResponse(_ignored: string) {
  return pick([
    'My apologies @, I sometimes get confused.',
    'I am very sorry for this.',
    'I apologise for my lack of understanding of this.'
  ]);
}