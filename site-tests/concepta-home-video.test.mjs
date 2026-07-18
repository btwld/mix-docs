import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')

test('uses an accessible, controllable, motion-aware video background on the Concepta hero', () => {
  const background = readFileSync(join(root, 'components/HeroBackground.tsx'), 'utf8')

  assert.match(background, /aria-hidden="true"/)
  assert.match(background, /<video/)
  assert.match(background, /autoPlay/)
  assert.match(background, /loop/)
  assert.match(background, /muted/)
  assert.match(background, /playsInline/)
  assert.match(background, /preload="metadata"/)
  assert.match(background, /prefers-reduced-motion: reduce/)
  assert.match(background, /concepta-hero-poster\.jpg/)
  assert.match(background, /concepta-hero\.mp4/)
  assert.match(background, /rgba\(42, 89, 255, 0\.09\)/)
  assert.match(background, /useReducedMotion/)
  assert.match(background, /useRef<HTMLVideoElement>/)
  assert.match(background, /ref=\{videoRef\}/)
  assert.match(background, /video\.pause\(\)/)
  assert.match(background, /video\.play\(\)/)
  assert.match(background, /setIsPlaying\(!video\.paused\)/)
  assert.match(background, /<button/)
  assert.match(background, /aria-label="Background motion"/)
  assert.match(background, /aria-pressed=\{isPlaying\}/)
  assert.doesNotMatch(background, /aria-label=\{isPlaying \?/)
  assert.match(background, /concepta-hero-video-control/)
  assert.match(background, /\.concepta-hero-video-control\s*\{[\s\S]*?top: 80px;/)
  assert.match(background, /focus-visible/)
  assert.doesNotMatch(background, /shouldReduceMotion !== true &&/)
  assert.match(background, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.concepta-hero-video-control\s*\{\s*display: none;/)
  assert.doesNotMatch(background, /HERO_VIDEOS|HERO_FILTERS|Hero video|Hero filter/)
  assert.ok(existsSync(join(root, 'public/assets/concepta-hero.mp4')))
  assert.ok(existsSync(join(root, 'public/assets/concepta-hero-poster.jpg')))
})
