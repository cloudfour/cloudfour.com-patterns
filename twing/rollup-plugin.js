const fs = require('fs/promises');
const glob = require('tiny-glob');
const path = require('path');

/** @returns {import('vite').Plugin} */
const twingPlugin = () => {
  const twingEnv = '\0twingEnv';
  const twingLoader = '\0twingLoader';
  return {
    name: 'twing',
    async resolveId(id) {
      if (id === twingEnv) return twingEnv;
      if (id === twingLoader) return twingLoader;
    },
    async load(id) {
      if (id === twingLoader) {
        const files = await glob('src/**/*.twig', { cwd: process.cwd() });

        // const preloadedFiles = (
        //   await Promise.all(
        //     files.map(async (f) => {
        //       const newName = f.replace(/^src\//g, '@cloudfour/');
        //       return `${JSON.stringify(newName)}: ${JSON.stringify(
        //         await fs.readFile(f, 'utf8')
        //       )}`;
        //     })
        //   )
        // ).join(',\n');
        return `
          import { TwingLoaderArray } from '@cloudfour/twing-browser-esm'
          import { environment } from ${JSON.stringify(twingEnv)}
          ${files
            .map(
              (f, i) => `import rawTwig${i} from ${JSON.stringify(`/${f}?raw`)}`
            )
            .join('\n')}
          const files = {
            ${files
              .map(
                (f, i) =>
                  `${JSON.stringify(
                    f.replace(/^src\//g, '@cloudfour/')
                  )}: rawTwig${i}`
              )
              .join(',\n')}
          }
          export const loader = new TwingLoaderArray(files)
          export const currentlyRenderedElements = new Set()
          if (import.meta.hot) {
            const update = () => {
              environment.loadedTemplates.clear()
              const renderUpdateQueue = [...currentlyRenderedElements]
              for (const renderedElement of renderUpdateQueue) {
                // not attached to DOM
                if (renderedElement.el.getRootNode() === renderedElement.el) {
                  currentlyRenderedElements.delete(renderedElement)
                } else {
                  currentlyRenderedElements.delete(renderedElement)
                  const newRoot = renderedElement.render(renderedElement.args)
                  renderedElement.el.replaceWith(newRoot)
                }
              }
            }
            ${files.map(
              (f) => `import.meta.hot.accept(${JSON.stringify(
                `/${f}?raw`
              )}, async (mod) => {
                const templateName = ${JSON.stringify(
                  f.replace(/^src\//g, '@cloudfour/')
                )}
                await loader.setTemplate(templateName, mod.default)
                update()
              })`
            )}
          }
        `;
      }
      if (id === twingEnv) {
        return `
          import { TwingEnvironment } from '@cloudfour/twing-browser-esm'
          import { loader } from ${JSON.stringify(twingLoader)}
          export const environment = new TwingEnvironment(loader, { cache: false })
        `;
      }
    },
    async transform(_code, id) {
      const templateName = path
        .relative(process.cwd(), id)
        .replace(/^src\//g, '@cloudfour/');
      if (id.startsWith('\0') || !id.endsWith('.twig')) return;

      return `
        import { environment } from ${JSON.stringify(twingEnv)}
        import { loader, currentlyRenderedElements } from ${JSON.stringify(
          twingLoader
        )}
        import { useState, useEffect } from 'react'

        const templateName = ${JSON.stringify(templateName)};
        const getHTML = async (args) => {
          const template = await environment.load(templateName)
          return template.render(args)
        }

        const render = (args = {}, callback = () => {}) => {
          const el = document.createElement('div')
          let cleanup = null
          if (import.meta.hot) {
            currentlyRenderedElements.add(() => {
              cleanup?.()
              cleanup = null
              // not in the document, ignore
              if (el.getRootNode() === el) return
              getHTML(args).then((html) => {
                el.innerHTML = html
                cleanup = callback()
              }).catch((err) => {
                el.innerHTML = err.stack
              })
            })
          }
          el.__twigSourceFile = templateName
          el.__onStoryBookAttach = () => {
            getHTML(args).then((html) => {
              el.innerHTML = html
              cleanup = callback()
            }).catch((err) => {
              el.innerHTML = err.stack
            })
          }
          el.__onStoryBookDetach = () => {
            cleanup?.()
            cleanup = null
          }
          return el
        }
        export default render

        if (import.meta.hot) {
          import.meta.hot.accept((mod) => {})
        }
      `;
    },
  };
};

module.exports = { twingPlugin };
