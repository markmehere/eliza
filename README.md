# Eliza

**Eliza** is an implementation of Joseph Weizenbaum's classic computer therapist.

Surprisingly most modern large language models struggle to mimic Eliza - possibly a training set gap as they can mimic great writers and politicians quite successfully.

Part of the joy of Eliza is his lack of intelligence allowing the user to riff with Eliza for their own entertainment. As Eliza often reflects back to the user what is written, it allows users to get quite dirty with the ever-patient Eliza and Eliza will never get annoyed or up the ante. There's also a joy in hearing a machine parrot your nom de plume back to you.

This version uses the core from [Keith Weaver's version](https://github.com/keithweaver/eliza) and draws inspiration from [Tom Bender's version](https://www.tex-edit.com/). It also gameifies Eliza by creating an endpoint for the game (where the user is considered "sane" after exhausting a fair chunk of repsonses).

The move to gameify Eliza is deliberate, Eliza is most definitely not recommended for actual thereputic use; especially in 2026.

## Build, test and run

```
nvm use 24
pnpm install
pnpm start
```

There are very few tests but you can try:

```
pnpm test
```

To distribute:

```
pnpm build
```

## Acknowledgements

* The core Eliza engine is actually an elaboration of [Keith Weaver's version](https://github.com/keithweaver/eliza)

## License

Eliza in its entirety is made available under the terms of the MIT License
