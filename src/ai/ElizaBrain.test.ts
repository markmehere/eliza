import { ElizaBrain } from './ElizaBrain';

jest.spyOn(Math, 'random').mockReturnValue(0);

describe('ElizaBrain', () => {
  let brain: ElizaBrain;
  const basicExchange = [
    "My name is Eliza what's yours?",
    'A very long long name',
    'Greetings friends! How can I help you today?',
  ];

  beforeEach(() => {
    brain = new ElizaBrain();
  });

  it('greetings', () => {
    const response = brain.analyze(["My name is Eliza what's yours?", 'Timmeh']);
    expect(response.message).toBe('Greetings Timmeh! How can I help you today?');
  });

  it('repetition', () => {
    const response = brain.analyze([...basicExchange, 'I say the same again', '...', 'I say the same again']);
    expect(response.message).toBe('You seem to be repeating yourself?');
  });

  it('goodbye', () => {
    const response = brain.analyze([...basicExchange, 'I say the same again', '...', 'goodbye']);
    expect(response.message).toBe('Goodbye. Thank you for talking to me.');
  });

  it('not saying anything', () => {
    const response = brain.analyze([...basicExchange, 'nope', '...', 'bahaaa']);
    expect(response.message).toBe('It might help to respond with more than a single word.');
  });

  it('not clear', () => {
    const response = brain.analyze([...basicExchange, 'nope', '...', 'ummmmm']);
    expect(response.message).toBe('My apologies friend, I sometimes get confused.');
  });

  it('i am sad', () => {
    const response = brain.analyze([...basicExchange, 'i am very sad']);
    expect(response.message).toBe('Sorry to hear. Tell me about it.');
  });

  it('i am bored', () => {
    const response = brain.analyze([...basicExchange, 'i am so bored']);
    expect(response.message).toBe('What makes you bored?');
  });

  it('i am happy', () => {
    const response = brain.analyze([...basicExchange, 'i am very very very happy']);
    expect(response.message).toBe("That's good. What is making you happy?");
  });

  it('swear', () => {
    const response = brain.analyze([...basicExchange, 'shit']);
    expect(response.message).toBe('Please try to use respectful language friend.');
  });

  it('certainly', () => {
    const response = brain.analyze([...basicExchange, 'Absolutely!']);
    expect(response.message).toBe('You seem quite certain?');
  });

  it('not found', () => {
    const response = brain.analyze([...basicExchange, "It's important"]);
    expect(response.message).toBe('What does that suggest to you?');
  });

  it('potty mouth', () => {
    const response = brain.analyze([
      ...basicExchange,
      'Go fuck yourself!' /* forgive the bad language, the "your" makes this an edgecase */,
    ]);
    expect(response.message).toBe(
      'Please try to use respectful language friend.',
    ); /* not "Why are you concerned over my elf?" */
  });

  it('do you mind if', () => {
    const response = brain.analyze([...basicExchange, 'Do you mind if I take off my shirt?']);
    expect(response.message).toBe('Why would I mind if you take off your shirt?');
  });

  it('i want to fly', () => {
    const response = brain.analyze([...basicExchange, 'I want to fly!']);
    expect(response.message).toBe('The desire to fly is quite common.');
  });

  it('i hope you will', () => {
    const response = brain.analyze([...basicExchange, 'I want you to help me fly!']);
    expect(response.message).toBe("I'll try my best to help you fly.");
    const response2 = brain.analyze([...basicExchange, 'I hope you will help me fly!']);
    expect(response2.message).toBe("I'll try my best to help you fly.");
    const response3 = brain.analyze([...basicExchange, 'I need you to help me fly!']);
    expect(response3.message).toBe("I'll try my best to help you fly.");
  });

  it('never/ever/always', () => {
    const response = brain.analyze([...basicExchange, 'I always end up alone!']);
    expect(response.message).toBe('Why do you think you always end up alone?');
    const response2 = brain.analyze([...basicExchange, 'I never ever want to sing!']);
    expect(response2.message).toBe('Why do you think you never want to sing?');
    const response3 = brain.analyze([...basicExchange, 'Sam never takes out the washing!']);
    expect(response3.message).toBe('Why do you think they never take out the washing?');
    const response4 = brain.analyze([...basicExchange, 'Bobby always messes things up!']);
    expect(response4.message).toBe('Why do you think they always mess things up?');
    const response5 = brain.analyze([...basicExchange, 'She always eats alone!']);
    expect(response5.message).toBe('Why do you think they always eat alone?');
  });

  it('told', () => {
    const response = brain.analyze([...basicExchange, 'I told her several times not to do that!']);
    expect(response.message).toBe("It's difficult when others don't hear what people say to them.");
  });

  it('made me', () => {
    const response = brain.analyze([...basicExchange, 'She made me so angry!']);
    expect(response.message).toBe('Ultimately you are the only one who controls your actions and emotions.');
    const response2 = brain.analyze([...basicExchange, "I'm so furious - they made me go to this stupid dinner!"]);
    expect(response2.message).toBe('Ultimately you are the only one who controls your actions and emotions.');
  });

  it('fault', () => {
    const response = brain.analyze([...basicExchange, "It's not my fault she can't read basic English!"]);
    expect(response.message).toBe('What made you believe that others thought it was your fault?');
    const response2 = brain.analyze([
      ...basicExchange,
      "It's all my fault! The dinner was ruined and she had to leave early to wash the dress.",
    ]);
    expect(response2.message).toBe('How does blaming yourself help? Indeed, why is blame necessary at all?');
  });

  it('eat dinner', () => {
    const response = brain.analyze([...basicExchange, 'I want to eat dinner with you.']);
    expect(response.message).toBe('The desire to eat dinner with me is quite common.');
    brain = new ElizaBrain();
    const response2 = brain.analyze([...basicExchange, "I want to know if you've been bad or good."]);
    expect(response2.message).toBe('The desire to know if I have been bad or good is quite common.');
  });

  it('point/reason', () => {
    const response = brain.analyze([...basicExchange, 'What is the point of all this?']);
    expect(response.message).toBe('What if there was no point? How would that make you feel?');
    const response2 = brain.analyze([...basicExchange, 'There was no reason for her to behave like that!']);
    expect(response2.message).toBe('What if there was no point? How would that make you feel?');
    const response3 = brain.analyze([...basicExchange, 'I see no point in my life nor work.']);
    expect(response3.message).toBe('What if there was no point? How would that make you feel?');
    const response4 = brain.analyze([...basicExchange, 'What is your point exactly?']);
    expect(response4.message).toBe('What if there was no point? How would that make you feel?');
  });

  it('respect punctuation', () => {
    const response = brain.analyze([...basicExchange, "Sometimes. Do I need better programming of you? I don't know."]);
    expect(response.message).toBe('Why do you need better programming of me?');
  });

  it('thinks i', () => {
    const response = brain.analyze([...basicExchange, 'My dad thinks I made a mistake.']);
    expect(response.message).toBe("Why do other's opinions matter to you?");
    const response2 = brain.analyze([...basicExchange, 'My friend believes I made a mistake']);
    expect(response2.message).toBe("Why do other's opinions matter to you?");
    const response3 = brain.analyze([...basicExchange, 'She thinks I could do better.']);
    expect(response3.message).toBe("Why do other's opinions matter to you?");
  });

  it('conversation is', () => {
    const response = brain.analyze([...basicExchange, "This conversation is awful. I'm going home!"]);
    expect(response.message).toBe('Why do you feel this conversation is awful?');
    const response2 = brain.analyze([...basicExchange, 'This conversation makes me sad. :-(']);
    expect(response2.message).toBe('Why does this conversation make you sad?');
  });

  it('do you love me? (sometimes crashes)', () => {
    const response = brain.analyze([...basicExchange, 'Do you love me?']);
    expect(response.message).toBe('I would if I could, you are a very lovable person.');
  });

  it('your hair rocks', () => {
    const response = brain.analyze([...basicExchange, 'Your hair rocks!']);
    expect(response.message).toBe('Why are you concerned over whether my hair rocks?');
    const response2 = brain.analyze([...basicExchange, 'And yours?']);
    expect(response2.message).toBe('We were discussing you, not me.');
  });
});
