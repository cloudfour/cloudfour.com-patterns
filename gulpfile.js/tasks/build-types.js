const fs = require('fs').promises;
const path = require('path');
const { outDir, createVirtualRootEntry } = require('../helpers');
const tsGenerator = require('dts-bundle-generator');

const buildTypes = async () => {
  const virtualRootFile = path.join(outDir, 'virtual-root-module.ts');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(virtualRootFile, await createVirtualRootEntry());
  const result = tsGenerator.generateDtsBundle(
    [{ filePath: virtualRootFile }],
    {
      preferredConfigPath: 'tsconfig.json',
    }
  );
  await fs.writeFile(path.join(outDir, 'index.d.ts'), result[0]);
  // Remove the virtual root file, it was only used to generate index.d.ts
  await fs.unlink(virtualRootFile);
};

module.exports = buildTypes;
