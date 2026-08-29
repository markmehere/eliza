import { Dialogue } from '../constants/Dialogue';
import { greetings, isNotClear, moreThanOneWord, notClearResponse, oneWordExcluded, repetition } from './aux/mresponses';
import { processInput, replaceWords } from './aux/replaceWords';
import {
  containsKeywordWithWildcard,
  findBasicKeywordFromKeywordWithWildcard,
  keywordsByWeight,
  responses,
  selectResponse,
} from './aux/wresponses';

export class ElizaBrain {
  keywords: { word: string; weight: number }[] = [];

  endChatTerms = ['goodbye', 'i have to leave', 'quit', 'bye', 'exit'];

  usedResponses: string[] = [];

  conversationOver = false;

  name = 'friend';

  constructor() {
    this.keywords = keywordsByWeight();
  }

  analyzeOne(message: string, preamble = '') {
    let found = false;
    let response: { message: string; which: Dialogue } | undefined;
    let newMessage = processInput(message).replace(/you're +/g, 'you are ');
    let word = '';

    if (this.endChatTerms.find(m => m.indexOf(newMessage) > -1)) {
      this.conversationOver = true;
      newMessage = 'goodbye';
    }

    for (let i = 0; i < this.keywords.length; i++) {
      word = this.keywords[i].word;

      if (word[0] === '!' && containsKeywordWithWildcard(newMessage, word) && !found) {
        response = selectResponse(findBasicKeywordFromKeywordWithWildcard(word), this.usedResponses);
        found = true;
        break;
      } else if (
        ((newMessage.indexOf(word) !== -1 && newMessage.length === word.length) ||
          newMessage.indexOf(`${word} `) !== -1 ||
          newMessage.indexOf(` ${word}`) !== -1) &&
        !found
      ) {
        response = selectResponse(word, this.usedResponses);
        found = true;
        break;
      }
    }

    if (!found) {
      response = {
        message: responses.NOTFOUND.responses[Math.floor(Math.random() * responses.NOTFOUND.responses.length)],
        which: Dialogue.NOTFOUND,
      };
      word = '';
    }

    if (word && response && response.message.indexOf('*') !== -1) {
      const remainingInput = newMessage.substring(newMessage.indexOf(word) + word.length + 1, newMessage.length).trim();
      const rightOfWildcardInResponse = response.message.substring(response.message.indexOf('*') + 1);
      const startOfResponseToWildcard = response.message.substring(0, response.message.indexOf('*'));
      const startOfInputMinusOneCharacter = remainingInput.substring(0, remainingInput.length - 1);
      const remainingOfInputOnRight = remainingInput
        .substring(remainingInput.length - 1, remainingInput.length)
        .replace(/[^A-Za-z]/g, '')
        .trim();

      response.message =
        startOfResponseToWildcard +
        replaceWords(startOfInputMinusOneCharacter + remainingOfInputOnRight) +
        rightOfWildcardInResponse;
    }

    if (!word && response && response.message.indexOf('*') !== -1) {
      response.message = response.message.replace(/ +\* */g, '')
        .replace(/  +/g, ' ').replace(/ \?/g, '?');
    }
    else if (response) {
      response.message = response.message.replace(/  +/g, ' ').replace(/ \?/g, '?');
    }

    if (response && response.message.indexOf('@') !== -1) {
      response.message = response.message.replace('@', this.name);
    }

    if (response && preamble) {
      response.message = preamble + response.message;
    }

    return response!;
  }

  analyze(exchange: string[], becameSane = false) {
    const last = exchange[exchange.length - 1];
    const beforeLast = exchange[exchange.length - 3];
    const preamble = becameSane ? "I think it's important to note we've made real progress in our sessions. So... " :
      '';

    if (exchange.length === 2) {
      const result = greetings(last);
      this.name = result.name;
      return {
        message: preamble + result.message,
        which: Dialogue.WELCOME,
      };
    } else if (processInput(last) === processInput(beforeLast)) {
      return {
        message: preamble + repetition(last),
        which: Dialogue.REPETITION,
      };
    } else if (isNotClear(last)) {
      return {
        message: preamble + notClearResponse(last).replace('@', this.name),
        which: Dialogue.NOTCLEAR,
      }
    } else if (
      processInput(last).indexOf(' ') === -1 &&
      processInput(beforeLast).indexOf(' ') === -1 &&
      !oneWordExcluded(last)
    ) {
      return {
        message: preamble + moreThanOneWord(last),
        which: Dialogue.ELABORATE,
      };
    } else {
      return this.analyzeOne(last, preamble);
    }
  }
}
