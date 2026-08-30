declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.css';

interface Window {
  gitVersion: string;
  saneShown: boolean;
}
