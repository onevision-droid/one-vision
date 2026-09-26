# Design System & Direction (One Vision)

## 1. Core Philosophy
- **Editorial, architectural, calm**: Generous negative space and minimal distraction.
- **Asymmetrical but disciplined grids**: Visual interest without chaos.
- **Muted mineral colours**: Sand, mist, slate, and ink to convey grounding and dignity.
- **Dignity over spectacle**: Never use poverty, illness, or disaster as visual decoration.

## 2. Typography
- **Heading (Serif)**: Clean, high-contrast modern serif used for H1/H2 and hero sections.
- **Body (Sans)**: Legible, straightforward sans-serif for functional UI and reading blocks.
- *Strict separation*: No blending of display fonts. Unified type scale established in `design-tokens.json`.

## 3. UI Components
- **Buttons**: Square edges (`rounded-none`), stark contrast (Navy/Black fills, light borders), uppercase tracking for primary calls to action.
- **Cards**: Flat designs, 1px borders (`border-border-default`), muted backgrounds (`bg-paper`, `bg-surface`, `bg-surface-alt`).
- **Grids**: Perfect symmetry where possible (6-of-6 or 3-of-3 layout matrices) to avoid orphan cells.
- **Selected States**: Explicit visual affordances for interactive elements (e.g., segmented controls, donation amounts).

## 4. Illustration Language
- Retro-modernist cinematic illustration.
- Geometric perspective with hard side lighting and long cast shadows.
- No glossy corporate CGI, watermarks, or text inside images.
- Flat colour blocks with subtle grain/matte paper texture.

## 5. Mobile & Responsive
- Predictable stacking.
- Mobile navigation uses a full-screen or sliding drawer mechanism without nested hover menus.
- Touch targets strictly ≥48px.
