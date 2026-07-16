import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

test('shows MixWidget from the Mix homepage through generated output', () => {
  const homepage = readFileSync(join(root, 'components/MixWidgetShowcase.tsx'), 'utf8')
  const generatorGuide = readFileSync(
    join(root, 'src/content/documentation/mix/ecosystem/mix-generator.mdx'),
    'utf8',
  )

  assert.match(homepage, /@MixWidget/)
  assert.match(homepage, /AppCard/)
  assert.match(homepage, /\/documentation\/mix\/ecosystem\/mix-generator#mixwidget/)

  assert.match(generatorGuide, /@MixWidget\(widgetParameters: \.only\(\{'child'\}\)\)/)
  assert.match(generatorGuide, /class AppCard extends StatelessWidget/)
  assert.match(generatorGuide, /return appCardStyle\.call\(/)
  assert.match(generatorGuide, /dart run build_runner build --delete-conflicting-outputs/)
})
