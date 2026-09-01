/** @import { Meta, StoryObj } from '@storybook/html' */
import figureImage from './demo/tiny-web-stacks.png';

/** @type {Meta} */
const meta = {
  title: 'Design/Defaults',
};

export default meta;

/** @type {StoryObj} */
export const HeadingLevel1 = {
  name: 'Heading level 1',
  render: () => `<h1>Heading level 1</h1>`,
};

/** @type {StoryObj} */
export const HeadingLevel2 = {
  name: 'Heading level 2',
  render: () => `<h2>Heading level 2</h2>`,
};

/** @type {StoryObj} */
export const HeadingLevel3 = {
  name: 'Heading level 3',
  render: () => `<h3>Heading level 3</h3>`,
};

/** @type {StoryObj} */
export const HeadingLevel4 = {
  name: 'Heading level 4',
  render: () => `<h4>Heading level 4</h4>`,
};

/** @type {StoryObj} */
export const HeadingLevel5 = {
  name: 'Heading level 5',
  render: () => `<h5>Heading level 5</h5>`,
};

/** @type {StoryObj} */
export const HeadingLevel6 = {
  name: 'Heading level 6',
  render: () => `<h6>Heading level 6</h6>`,
};

/** @type {StoryObj} */
export const InlineElements = {
  name: 'Inline elements',
  render: () => `<p>
  <b>Progressive Web Apps</b> are awesome, <em>especially</em> when they make the <del>best</del> <ins>most</ins> of the web! That means using both tried and true <abbr title="HyperText Markup Language">HTML</abbr> techniques like <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">links</a> alongside new techniques like <code>display: grid</code> or <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible"><code>:focus-visible</code></a>! You can use <kbd>ctrl</kbd> + <kbd>c</kbd> on Windows and <kbd>⌘</kbd> + <kbd>c</kbd> on Mac.
</p>`,
};

/** @type {StoryObj} */
export const Blockquote = {
  render: () => `<blockquote>
  <p><b>CSS Grid Layout</b> excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.</p>
  <p>Like tables, grid layout enables an author to align elements into columns and rows. However, many more layouts are either possible or easier with CSS grid than they were with tables. For example, a grid container's child elements could position themselves so they actually overlap and layer, similar to CSS positioned elements.</p>
  <footer>
    <cite><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">MDN Web Docs</a></cite>
  </footer>
</blockquote>`,
};

/** @type {StoryObj} */
export const UnorderedList = {
  name: 'Unordered list',
  render: () => `<ul>
  <li>HTML</li>
  <li>CSS
    <ul>
      <li>Color</li>
      <li>Layout</li>
      <li>Typography</li>
    </ul>
  </li>
  <li>JavaScript</li>
</ul>`,
};

/** @type {StoryObj} */
export const OrderedList = {
  name: 'Ordered list',
  render: () => `<ol>
  <li>HTML</li>
  <li>CSS
    <ol>
      <li>Color</li>
      <li>Layout</li>
      <li>Typography</li>
    </ol>
  </li>
  <li>JavaScript</li>
</ol>`,
};

/** @type {StoryObj} */
export const DescriptionList = {
  name: 'Description list',
  render: () => `<dl>
  <dt>HTML</dt>
  <dd>Describes content.</dd>
  <dt>CSS</dt>
  <dd>Describes presentation.</dd>
  <dt>JavaScript</dt>
  <dd>Describes functionality and behavior.</dd>
</dl>`,
};

/** @type {StoryObj} */
export const Figure = {
  render: () => `<figure>
  <img src="${figureImage}" width="800" height="450" alt="pancakes">
  <figcaption>I’m a picture with a caption.</figcaption>
</figure>`,
};

/** @type {StoryObj} */
export const CodeBlock = {
  name: 'Code block',
  render() {
    const example = `* {
	box-sizing: border-box;
}`;
    return `<pre><code>${example}</code></pre>`;
  },
};

/** @type {StoryObj} */
export const HorizontalRule = {
  name: 'Horizontal rule',
  render: () => `<p>…and so ends this topic.</p>
<hr>
<p>Shifting our focus to something else entirely…</p>`,
};

/** @type {StoryObj} */
export const DetailsSummary = {
  name: 'Details/Summary',
  render: () => `<details open>
  <summary>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</summary>
  <p>Mauris imperdiet est lectus, porttitor lobortis magna bibendum mattis.</p>
  <p>Nullam feugiat ornare lorem id sollicitudin. </p>
</details>`,
};
