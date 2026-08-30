import { useCallback, useEffect, useState } from 'react';
import { CompletionBar } from './components/CompletionBar/CompletionBar';
import { Eliza } from './components/Eliza/Eliza';
import { Scratchpad } from './components/Scratchpad/Scratchpad';
import { SendMessageBar } from './components/SendMessageBar/SendMessageBar';
import { Splash } from './components/Splash/Splash';

enum Page {
  Splash = 0,
  App = 1,
}

export function App() {
  const [page, rawSetPage] = useState({
    current: Page.Splash,
    previous: null as Page | null,
  });
  const combinedInput = useState('');
  const [forcedDialogue, setForcedDialogue] = useState(-1);
  const [simplifiedMobile, setSimplifiedMobile] = useState(false);
  const setPage = useCallback((page: Page, immediate?: boolean) => {
    combinedInput[1]('');
    if (immediate) {
      rawSetPage({ current: page, previous: null });
    } else {
      rawSetPage((old) => {
        if (old.current === page) return old;
        console.log(`Setting current ${page} ${old.current}`);
        return { current: page, previous: old.current };
      });
    }
  }, []);
  const isActive = (testPage: Page) => page.current === testPage || page.previous === testPage;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const lastTimer = setTimeout(() => rawSetPage((value) => ({ current: value.current, previous: null })), 1000);
    return () => clearTimeout(lastTimer);
  }, [page]);

  return (
    <>
      {isActive(Page.App) && (
        <>
          {simplifiedMobile ? (
            <div>
              <Scratchpad forcedDialogue={forcedDialogue} clearForcedDialogue={() => setForcedDialogue(-1)} ghost={combinedInput[0]} simplified />
              <SendMessageBar combination={combinedInput} setSimplified={setSimplifiedMobile} simplified />
            </div>
          ) : (
            <div className="flex items-center flex-col h-dvh">
              <Eliza className={`h-[10dvh] ml-2 ${isTouchDevice ? 'mt-5' : ''} flex-none`} prebake={700} />
              <CompletionBar className="p-5 flex-none" forceDialogue={setForcedDialogue} />
              <Scratchpad forcedDialogue={forcedDialogue} clearForcedDialogue={() => setForcedDialogue(-1)} />
              <SendMessageBar combination={combinedInput} setSimplified={setSimplifiedMobile} />
            </div>
          )}
        </>
      )}
      {isActive(Page.Splash) && <Splash onClick={() => setPage(Page.App)} hide={page.previous === Page.Splash} />}
    </>
  );
}
