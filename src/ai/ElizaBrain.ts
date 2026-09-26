import { Dialogue } from '../constants/Dialogue';
import { greetings, isNotClear, marksOneoff, moreThanOneWord, notClearResponse, oneWordExcluded, repetition } from './aux/mresponses';
import { processInput, replaceWords } from './aux/replaceWords';
import {
  containsKeywordWithWildcard,
  findBasicKeywordFromKeywordWithWildcard,
  keywordsByWeight,
  responseIsExhausted,
  responses,
  selectResponse,
} from './aux/wresponses';

export class ElizaBrain {
  keywords: { word: string; weight: number }[] = [];

  endChatTerms = ['goodbye', 'i have to leave', 'quit', 'bye', 'exit'];

  usedResponses: string[] = [];

  usedThisSession: Set<Dialogue> = new Set();

  conversationOver = false;

  name = 'friend';

  constructor() {
    this.keywords = keywordsByWeight();
  }

  analyzeOne(message: string, preamble = '', covered?: Set<Dialogue>) {
    let response: { message: string; which: Dialogue } | undefined;
    let newMessage = message.replace(/you're +/g, 'you are ');
    let word = '';

    if (this.endChatTerms.find(m => m.indexOf(newMessage) > -1)) {
      this.conversationOver = true;
      newMessage = 'goodbye';
    }

    for (let i = 0; i < this.keywords.length; i++) {
      word = this.keywords[i].word;

      if (word[0] === '!' && containsKeywordWithWildcard(newMessage, word) && !response) {
        if (responseIsExhausted(findBasicKeywordFromKeywordWithWildcard(word), covered)) continue;
        response = selectResponse(findBasicKeywordFromKeywordWithWildcard(word), this.usedResponses);
        break;
      } else if (
        ((newMessage.indexOf(word) !== -1 && newMessage.length === word.length) ||
          newMessage.indexOf(`${word} `) !== -1 ||
          newMessage.indexOf(` ${word}`) !== -1) &&
        !response
      ) {
        if (responseIsExhausted(word, covered)) continue;
        response = selectResponse(word, this.usedResponses);
        break;
      }
    }

    if (!response) {
      response = {
        message: responses.NOTFOUND.responses[Math.floor(Math.random() * responses.NOTFOUND.responses.length)],
        which: Dialogue.NOTFOUND,
      };
      word = '';
    }

    if (word && response && response.message.indexOf('*') !== -1) {
      const afterKeyword = newMessage.split(word)[1] ?? '';
      const capturedText = afterKeyword.split('.')[0].trim();
      const substituted = replaceWords(capturedText);
      response.message = response.message.replace('*', substituted);
    }

    if (!word && response && response.message.indexOf('*') !== -1) {
      response.message = response.message.replace(/ +\* */g, '')
        .replace(/  +/g, ' ').replace(/ \?/g, '?');
    }
    else if (response) {
      response.message = response.message.replace(/  +/g, ' ').replace(/ ([?|.])/g, (c) => c[1]);
    }

    if (response && response.message.indexOf('@') !== -1) {
      response.message = response.message.replace('@', this.name);
    }

    if (response && preamble) {
      response.message = preamble + response.message;
    }

    response.message = response.message.replace(/\bi\b/g, s => s.toUpperCase());

    return response;
  }

  analyze(exchange: string[], becameSane = false, covered?: Set<Dialogue>) {
    const last = processInput(exchange[exchange.length - 1]);
    const beforeLast = processInput(exchange[exchange.length - 3]);
    const preamble = becameSane ? "I think it's important to note we've made real progress in our sessions. So... " :
      '';

    if (exchange.length === 2) {
      const result = greetings(last);
      this.name = result.name;
      return {
        message: preamble + result.message,
        which: Dialogue.WELCOME,
      };
    } else if (last === beforeLast) {
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
      last.indexOf(' ') === -1 &&
      beforeLast.indexOf(' ') === -1 &&
      !oneWordExcluded(last)
    ) {
      return {
        message: preamble + moreThanOneWord(last),
        which: Dialogue.ELABORATE,
      };
    } else {
      return marksOneoff(last, this.usedThisSession) ||
        this.analyzeOne(last, preamble, covered);
    }
  }
}
