# Remix — Landing Page Copy

**Product:** Remix — the Flutter component library built on Mix
**Inspiration:**
- [astryx.atmeta.com](https://astryx.atmeta.com) — one-idea-per-section rhythm, three-verb taglines, "Beta · Built on X" line, `Explore →` links.
- [heroui.pro](https://heroui.pro) — craftsmanship voice, the "by default" quality motif, `You stop rebuilding…` contrast framing, live app demos, FAQ.

**Audience:** Flutter developers building custom design systems who are tired of fighting Material.

> Honesty guardrails: Remix is early. No borrowed scale stats ("13,000 apps"), no invented pricing tiers — Remix is open source and free. The agent/CLI angle is framed as roadmap, not shipped. "Beta" and the roadmap section turn early-stage into a trust signal.

---

## 🏆 Hero

**Headline:** Build Flutter UI you're proud to ship.

**Subheadline:** An open source component library for Flutter — accessible, headless components paired with a fluent styling engine. Made for teams that care about the details.

**Support line:** Currently in Beta · Built on Flutter and Mix

**Primary CTA:** `Get started →`
**Secondary CTA:** `Browse components`

_Alt headlines to A/B:_

- _"Headless components. Fluent styling. Fully yours."_
- _"Flutter components that behave. Styling that's finally yours."_

---

## ⚡ Positioning

# Start anywhere. Style anything. Ship faster.

Remix hands you accessible, headless components and gets out of the way. Interaction logic is handled — hover, focus, press, keyboard navigation — so you spend your time on the design, not the plumbing.

**You stop rebuilding the same button, the same checkbox, the same focus ring over and over.** Remix gives you a solid baseline so you can spend time on your product, not on reimplementing UI decisions Flutter should have handled.

`See how it works →`

---

## 🧩 Component Library

**20+ components. Polished by default. Every interaction state, handled.**

Accessible, themeable Flutter components with hover, focus, press, keyboard navigation, and animation built in — not bolted on. Button, Card, Select, Slider, Switch, Tabs, TextField, Tooltip, Accordion, Avatar, Badge, Checkbox, Radio, Progress, Menu, and more.

`Browse components →`

---

## 🎨 Styling

**Fully customizable styles, ready for use.**

Make it yours without starting from scratch. Define a look once with Mix's fluent API, then reuse and adapt it across your whole app — no deep widget trees, no copy-pasted variants that drift out of sync.

```dart
final button = RemixButtonStyler()
    .paddingX(16)
    .paddingY(10)
    .color(Colors.blue)
    .borderRadius(.circular(8))
    .onHovered(.color(Colors.blue.shade700))
    .animate(.spring(300.ms));
```

`Explore styling →`

---

## 👀 See It Live

**Not a screenshot. A running component.**

Every example in the docs is a real Flutter app compiled to WebAssembly — interactive, right in the page. Hover it, focus it, press it, and read the exact code that produced it.

`Try the live previews →`

---

## 🔌 Built on Mix

**The styling engine comes included.**

Remix pairs headless components (inspired by Naked UI) with [Mix](https://github.com/btwld/mix)'s composable styling system. You get the behavior for free and keep full control over the look — no Material to override, no framework to fight.

`Read the Mix docs →`

---

## ✨ Three Reasons

**Design for speed** — Behavior, accessibility, and animation ship inside every component. Compose, don't reimplement.

**Built by people who use it** — Remix is open source and shaped in the open, alongside the Mix community.

**Ready for what's next** — Beta and moving fast. References, guides, and richer tooling are landing continuously.

---

## ❓ FAQ

**Is Remix free?**
Yes. Remix is open source and free — no tiers, no license fees, no lock-in.

**How is it different from Material or Cupertino?**
Material and Cupertino give you a look you then have to fight. Remix gives you behavior with _no_ opinionated look — you style every pixel with Mix. Full control, no override wars.

**Do I need to know Mix first?**
It helps, but no. Remix ships with sensible styles you can use immediately, then customize with Mix's fluent API as you grow.

**Is it accessible and keyboard-navigable?**
Yes — built into every component. You don't wire it up yourself.

**Is it production-ready?**
Remix is in Beta and evolving fast. The component set is real and usable today; references, guides, and tutorials land continuously.

**Can I use it in a commercial app?**
Yes. It's open source — build whatever you want.

---

## 📣 Footer CTA

# Discover the full design system.

Open source, free, and built on Mix. Explore the components, join the community, and build Flutter UI that's finally, entirely yours.

`Get started →`   `Star on GitHub`   `Join the Discord`

_No lock-in · Open source · Built on Mix_

---

## 💡 Notes for Implementation

- **Cadence (from Astryx):** one idea per section, generous whitespace, a short bold statement + one supporting line + an `Explore →` link. Keep paragraphs to 1–2 lines.
- **Voice (from HeroUI):** craftsmanship over hype. Lean on the "by default" motif and the `You stop rebuilding…` contrast. Active, capability-focused ("you get," "you keep," "you stop").
- **Live previews are your hero asset.** HeroUI and Astryx use polished mockups; you have something better — real WASM Flutter components. Put interactive `RemixButton` / `RemixCard` demos directly in the Component, Styling, and "See It Live" sections.
- **Keep the green accent** as the single action color for every CTA.
- **Don't borrow their proof.** No scale stats, no pricing tiers. Add GitHub stars / pub.dev downloads only once the numbers are real.
- **Beta is a feature, not an apology.** The "Currently in Beta" line + "Ready for what's next" reframe early-stage as momentum.

### A/B Test Ideas

- Hero: "Build Flutter UI you're proud to ship." vs. "An open source design system for Flutter — fully customizable, behavior included." vs. "Headless components. Fluent styling. Fully yours."
- Positioning verb-line: "Start anywhere. Style anything. Ship faster." vs. "Own the design. Skip the boilerplate."
- Component headline: "Polished by default. Every interaction state, handled." vs. "20+ components, and growing."
- Primary CTA: "Get started" vs. "Browse components" vs. "Start building"
