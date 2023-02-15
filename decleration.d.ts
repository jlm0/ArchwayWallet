declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const type: any;
  export default type;
}

declare module '*.jpg' {
  const type: any;
  export default type;
}

declare module '*.gif' {
  const type: any;
  export default type;
}
