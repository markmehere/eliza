import { useCallback, useEffect, useState } from 'react';
import { CompletionBar } from './components/CompletionBar/CompletionBar';
import { Eliza } from './components/Eliza/Eliza';
import { SaneStamp } from './components/SaneStamp/SaneStamp';
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
  const [forcedDialogue, setForcedDialogue] = useState(-1);
  const setPage = useCallback((page: Page, immediate?: boolean) => {
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

  useEffect(() => {
    const lastTimer = setTimeout(() => rawSetPage((value) => ({ current: value.current, previous: null })), 1000);
    return () => clearTimeout(lastTimer);
  }, [page]);

  return (
    <>
      {isActive(Page.App) && (
        <div className="flex items-center flex-col h-screen">
          <Eliza className="w-25 ml-2 mt-5 shrink-0" prebake={700} />
          <CompletionBar className="p-5 shrink-0" forceDialogue={setForcedDialogue} />
          <Scratchpad forcedDialogue={forcedDialogue} clearForcedDialogue={() => setForcedDialogue(-1)} />
          <SendMessageBar />
        </div>
      )}
      {isActive(Page.Splash) && <Splash onClick={() => setPage(Page.App)} hide={page.previous === Page.Splash} />}
    </>
  );
}
