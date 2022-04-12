import React from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ content }: { content: string }) => {
  return (
    <article className='prose max-w-none'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
};

export default Markdown;
