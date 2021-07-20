import Jabber from 'jabber';
import { random, sample, uniqueId } from 'lodash';

const themeWords = [
  'Progressive Web App (PWA)',
  'design system',
  'accessibility',
  'responsive',
  'web standards',
  'web app',
  'HTML',
  'CSS',
  'JavaScript',
  'SVG',
  'testing',
  'animation',
  'service worker',
  'performance',
  '<code>picture</code> element',
  'usability',
  'design token',
  'open source',
  'experience',
  'adaptive',
  'input',
  'talk',
  'this <a href="https://cloudfour.com/thinks/progressive-web-apps-simply-make-sense/">article</a>',
  'project',
  'case study',
  'specification',
  'polyfill',
  'progressive enhancement',
  'repository',
  'automate',
  'typography',
  'font-loading',
  'web component',
  'preload',
  'HTTP/2',
  'sticky notes',
  'sketching',
  'mockups',
  'agile',
  'dependency',
  'in-browser',
  'prototype',
  'UX',
  'WOFF',
  'variable font',
  'sufficient contrast',
  'readable',
  'intuitive',
  'accessible',
  'issue',
  'TL;DR',
  'IMHO',
  'YMMV',
  'thank you',
  'community',
  'fallback',
  'mobile-first',
  'cross-disciplinary',
  'multidisciplinary',
  'collaborative',
  'theming',
  'transparency',
  'use case',
  'audience',
  'animated GIF',
  'deploy',
  'integration',
];

const placeImgCategories = ['animals', 'arch', 'nature', 'people', 'tech'];

const jabber = new Jabber(themeWords, 1.5);

export const makeComment = ({
  isChild = false,
  replies = 0,
  approved = true,
} = {}) => {
  const id = uniqueId();
  const paragraphs = [];
  const paragraphCount = random(1, 2);
  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(jabber.createParagraph(random(5, 30)));
  }
  const content = `<p>${paragraphs.join('</p><p>')}</p>`;

  const result = {
    ID: id,
    link: `#comment-${id}`,
    date: new Date(),
    avatar: `https://placeimg.com/92/92/${sample(placeImgCategories)}`,
    author: {
      name: jabber.createFullName().split(' ').slice(1).join(' '),
    },
    comment_content: content,
    is_child: isChild,
    children: [] as any,
    approved,
  };

  if (replies > 0) {
    result.children = makeThread({
      length: replies,
      isChild: true,
    });
  }

  return result;
};

export const makeThread = ({ length = random(1, 3), isChild = false } = {}) => {
  const comments: any[] = [];
  for (let i = 0; i < length; i++) {
    comments.push(makeComment({ isChild }));
  }
  return comments;
};
