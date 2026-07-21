import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

test('wires the focus hubs into the Concepta site shell', () => {
  const homepage = readFileSync(join(root, 'components/ConceptaHome.tsx'), 'utf8')
  const navbar = readFileSync(join(root, 'components/FloatingNavbar.tsx'), 'utf8')
  const layout = readFileSync(join(root, 'src/app/layout.jsx'), 'utf8')

  assert.ok(existsSync(join(root, 'src/app/hubs/page.tsx')))
  assert.ok(existsSync(join(root, 'src/app/hubs/[slug]/page.tsx')))
  assert.match(homepage, /<HubsPreview \/>/)
  assert.match(navbar, /href="\/hubs"/)
  assert.match(navbar, /pathname\.startsWith\('\/hubs\/'\)/)
  assert.match(layout, /p\.startsWith\('\/hubs\/'\)/)
})

test('defines three distinct hubs around one reliable-delivery standard', () => {
  const hubData = readFileSync(join(root, 'components/hubs/hubData.ts'), 'utf8')
  const hubsHome = readFileSync(join(root, 'components/hubs/HubsHome.tsx'), 'utf8')

  assert.match(hubData, /slug: "generative-ui"/)
  assert.match(hubData, /slug: "governed-ai-workflows"/)
  assert.match(hubData, /slug: "legacy-modernization"/)
  assert.match(hubsHome, /Reliable delivery/i)
  assert.match(hubData, /name: "Mix"/)
  assert.match(hubData, /name: "Ack"[\s\S]*?mode: "Shared foundation"/)
  assert.match(hubData, /name: "Stargate"/)
  assert.match(hubData, /name: "Voyager"/)
  assert.match(hubData, /href: "\/reports\/generative-ui"/)
  assert.match(hubData, /href: "\/reports\/production-gap"/)
})
