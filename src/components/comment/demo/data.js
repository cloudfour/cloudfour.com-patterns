const Jabber = require('jabber');
const random = require('lodash/random');
const sample = require('lodash/sample');
const uniqueId = require('lodash/uniqueId');

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
  '<a href="https://cloudfour.com/thinks/progressive-web-apps-simply-make-sense/">article</a>',
  'project',
  'case study',
  'specification',
  'polyfill',
  'progressive enhancement',
  'repository',
  'automate',
];

const placeImgCategories = ['animals', 'arch', 'nature', 'people', 'tech'];

const jabber = new Jabber(themeWords, 2);

const makeComment = ({ isChild = false, replies = 0 } = {}) => {
  const id = uniqueId();
  const paragraphs = [];
  const paragraphCount = random(1, 3);
  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(jabber.createParagraph(random(10, 30)));
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
  };

  if (replies > 0) {
    result.children = makeThread({ length: replies, isChild: true });
  }

  return result;
};

const makeThread = ({ length = random(1, 3), isChild = false } = {}) => {
  const comments = [];
  for (let i = 0; i < length; i++) {
    comments.push(makeComment(isChild));
  }
  return comments;
};

module.exports = { makeComment, makeThread };
