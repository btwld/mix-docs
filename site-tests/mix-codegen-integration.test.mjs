import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

test('shows MixWidget from the Mix homepage through generated output', () => {
  const homeContent = readFileSync(join(root, 'components/HomeContent.tsx'), 'utf8')
  const showcase = readFileSync(join(root, 'components/MixWidgetShowcase.tsx'), 'utf8')
  const generatorGuide = readFileSync(
    join(root, 'src/content/documentation/mix/ecosystem/mix-generator.mdx'),
    'utf8',
  )

  assert.match(homeContent, /import \{ MixWidgetShowcase \} from "\.\/MixWidgetShowcase"/)
  assert.match(homeContent, /<MixWidgetShowcase \/>/)

  assert.match(showcase, /@MixWidget/)
  assert.match(showcase, /AppCard/)
  assert.match(showcase, /\/documentation\/mix\/ecosystem\/mix-generator#mixwidget/)
  assert.doesNotMatch(showcase, /widgetParameters/)

  assert.match(generatorGuide, /@MixWidget\(\)\s*\nfinal appCardStyle/)
  assert.match(generatorGuide, /class AppCard extends StatelessWidget/)
  assert.match(generatorGuide, /return appCardStyle\.call\(/)
  assert.match(generatorGuide, /mix_generator:spec_styler_generator:\s*\n\s+enabled: true/)
  assert.match(generatorGuide, /dart run build_runner build --delete-conflicting-outputs/)
})
