import React from 'react';
import myHtmlContent from './sign-in.html';

function MyHtmlComponent() {
  return <div dangerouslySetInnerHTML={{ __html: myHtmlContent }} />;
}

export default MyHtmlComponent;
