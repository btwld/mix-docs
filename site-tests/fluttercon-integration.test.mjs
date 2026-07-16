import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

test('publishes the FlutterCon resource hub with the Remix Studio demo', () => {
  const pagePath = join(root, 'src/app/fluttercon2026/page.tsx')
  const navbar = readFileSync(join(root, 'components/FloatingNavbar.tsx'), 'utf8')
  const layout = readFileSync(join(root, 'src/app/layout.jsx'), 'utf8')

  assert.ok(existsSync(pagePath))

  const page = readFileSync(pagePath, 'utf8')

  assert.match(page, /https:\/\/remix-studio-btwld-demo\.web\.app/)
  assert.match(page, /More links will be added here/)
  assert.match(page, /target="_blank"/)
  assert.match(navbar, /pathname === '\/fluttercon2026'/)
  assert.match(layout, /p==='\/fluttercon2026'/)
  assert.ok(!existsSync(join(root, 'src/app/fluttercon/page.tsx')))
})
