# Play And Share Design Guide

## Direction

Use the Pinterest `DESIGN.md` from `VoltAgent/awesome-design-md` as the visual
reference. Play And Share should feel image-led, friendly, and quiet enough for
travel photos to carry the interface.

## Implementation Rules

- Build UI from reusable React components.
- Prefer DaisyUI semantic classes and Tailwind CSS utilities.
- Add custom CSS only when DaisyUI and Tailwind CSS cannot express the design.
- Keep light and dark themes available through the global theme toggle.
- Lazy-load page-level components and expensive optional components when useful.
- Preserve accessible labels, focus states, and touch-friendly controls.

## Theme

### Light

- Canvas: `#ffffff`
- Soft surface: `#fbfbf9`
- Card surface: `#f6f6f3`
- Text: `#211922`
- Muted text: `#62625b`
- Primary action: `#e60023`
- Primary pressed: `#cc001f`

### Dark

- Canvas: `#211922`
- Soft surface: `#262622`
- Card surface: `#33332e`
- Text: `#fbfbf9`
- Muted text: `#c8c8c1`
- Primary action: `#e60023`

## Shape And Spacing

- Use `rounded-box` for standard cards and modals.
- Use pill shapes for filters, badges, search controls, and avatars.
- Use an 8px spacing rhythm for dense discovery content.
- Keep card shadows subtle. Let imagery create depth.

## Component Priorities

1. Shared navigation and theme toggle.
2. Search filters and selected filter chips.
3. Travel post cards and image layouts.
4. Modals, inputs, buttons, and loading states.
5. Schedule and expense views using the same surfaces and controls.

## Feed

- Make travel imagery the visual focus.
- Keep filters compact and pill-shaped.
- Use semantic DaisyUI colors instead of hard-coded page colors.
- Preserve lazy loading and infinite scrolling.
- Use skeleton cards while loading additional posts.

## Guardrails

- Do not add page-specific color systems.
- Do not duplicate button, card, or loading markup when a shared component fits.
- Do not use red decoratively. Reserve it for primary actions and key active states.
- Do not remove dark mode while adapting Pinterest's light-first reference.
