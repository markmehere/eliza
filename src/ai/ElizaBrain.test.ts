import { ElizaBrain } from "./ElizaBrain";

jest.spyOn(Math, "random").mockReturnValue(0);

describe('ElizaBrain', () => {

  let brain: ElizaBrain;
  const basicExchange = [
    "My name is Eliza what's yours?",
    "A very long long name",
    "Greetings friends! How can I help you today?"
  ];

  beforeEach(() => {
    brain = new ElizaBrain();
  });

  it('greetings', () => {
    const response = brain.analyze([
      "My name is Eliza what's yours?",
      "Timmeh"
    ]);
    expect(response.message).toBe('Greetings Timmeh! How can I help you today?');
  });

  it('repetition', () => {
    const response = brain.analyze([
      ...basicExchange,
      "I say the same again",
      "...",
      "I say the same again"
    ]);
    expect(response.message).toBe('You seem to be repeating yourself?');
  });

  it('goodbye', () => {
    const response = brain.analyze([
      ...basicExchange,
      "I say the same again",
      "...",
      "goodbye"
    ]);
    expect(response.message).toBe('Goodbye. Thank you for talking to me.');
  });

  it('not saying anything', () => {
    const response = brain.analyze([
      ...basicExchange,
      "nope",
      "...",
      "bahaaa"
    ]);
    expect(response.message).toBe('It might help to respond with more than a single word.');
  });

  it('not clear', () => {
    const response = brain.analyze([
      ...basicExchange,
      "nope",
      "...",
      "ummmmm"
    ]);
    expect(response.message).toBe('My apologies friend, I sometimes get confused.');
  });

  it('i am sad', () => {
    const response = brain.analyze([
      ...basicExchange,
      "i am very sad",
    ]);
    expect(response.message).toBe('Sorry to hear you are. Tell me about it.');
  });

  it('i am bored', () => {
    const response = brain.analyze([
      ...basicExchange,
      "i am so bored",
    ]);
    expect(response.message).toBe('What makes you bored?');
  });

  it('i am happy', () => {
    const response = brain.analyze([
      ...basicExchange,
      "i am very very very happy",
    ]);
    expect(response.message).toBe("That's good. What is making you happy?");
  });

  it('swear', () => {
    const response = brain.analyze([
      ...basicExchange,
      "shit",
    ]);
    expect(response.message).toBe("Please try to use respectful language friend.");
  });

  it('certainly', () => {
    const response = brain.analyze([
      ...basicExchange,
      "Absolutely!",
    ]);
    expect(response.message).toBe("You seem quite certain?");
  });


  it('not found', () => {
    const response = brain.analyze([
      ...basicExchange,
      "It's important",
    ]);
    expect(response.message).toBe("What does that suggest to you?");
  });
});
