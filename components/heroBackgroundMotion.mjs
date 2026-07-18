export function pauseWhenReducedMotion(mediaQuery, pause) {
  const pauseIfReduced = ({ matches }) => {
    if (matches) pause()
  }

  pauseIfReduced(mediaQuery)
  mediaQuery.addEventListener('change', pauseIfReduced)

  return () => mediaQuery.removeEventListener('change', pauseIfReduced)
}
