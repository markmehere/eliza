# Eliza

**Eliza** is an implementation of Joseph Weizenbaum's classic computer therapist.

Surprisingly most modern large language models struggle to mimic Eliza - possibly a training set gap as they can mimic great writers and politicians quite successfully.

Part of the joy of Eliza is his lack of intelligence allowing the user to riff with Eliza for their own entertainment. As Eliza often reflects back to the user what is written, it allows users to get quite dirty with the ever-patient Eliza and Eliza will never get annoyed or up the ante. There's also a joy in hearing a machine parrot your nom de plume back to you.

This version uses the core from [Keith Weaver's version](https://github.com/keithweaver/eliza) and draws inspiration from [Tom Bender's version](https://www.tex-edit.com/). It also gameifies Eliza by creating an endpoint for the game (where the user is considered "sane" after exhausting a fair chunk of repsonses).

The move to gameify Eliza is deliberate, Eliza is most definitely not recommended for actual thereputic use; especially in 2026.

## Future work

As Tom Bender's latest version does not run on the latest macOS, I think at one point there was a desire to recreate the genius of Tom's original Eliza.

However towards the end there was a stronger desire to just move the project from the "unfinished projects" pile to "finished projects" pile.

If my interest ever rekindles in the project, I may run through the core and try to order and clean it up. It'd be interesting to see Eliza riff on subjects of interest say football, music or film.

I'm also wondering if you could reduce Eliza down to a finite input token-space and finite output token-space and implement him using the transformer architecture as a small language model.

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
