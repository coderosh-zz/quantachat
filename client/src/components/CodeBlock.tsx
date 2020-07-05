import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/darcula';

const CodeBlock: React.FC<{ language: string; value: any }> = (props) => (
  <SyntaxHighlighter language={props.language} style={theme}>
    {props.value}
  </SyntaxHighlighter>
);

export default CodeBlock;
