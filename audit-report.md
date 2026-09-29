# Codebase Audit Report: One Vision

**Date:** 2026-09-29T00:38:15.689Z  
**Total Files Audited:** 155  
**Critical Errors:** 0  
**Warnings:** 10  

## Executive Summary

| Category | Count | Status |
| --- | --- | --- |
| Clean Files | 150 | ✅ Pass |
| Files with Warnings | 5 | ⚠️ Warning |
| Files with Critical Errors | 0 | ❌ Fail |

## ⚠️ Warnings & Heuristic Flags

### `components\ai\agent-chat.tsx`

- **Line 247** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  "size-6 rounded-full shrink-0 flex items-center justify-center font-mono text-[10px] border transition-colors mt-0.5",
  ```
- **Line 327** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <div className="size-6 rounded-full shrink-0 flex items-center justify-center bg-safety-orange/10 text-safety-orange bor
  ```

### `components\composition\ContactForm.tsx`

- **Line 92** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="size-3 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
  ```

### `components\prompt-kit\loader.tsx`

- **Line 73** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="size-1.5 rounded-full bg-safety-orange animate-bounce [animation-delay:-0.3s]" />
  ```
- **Line 74** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="size-1.5 rounded-full bg-safety-orange animate-bounce [animation-delay:-0.15s]" />
  ```
- **Line 75** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="size-1.5 rounded-full bg-safety-orange animate-bounce" />
  ```
- **Line 82** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="absolute inline-flex size-full rounded-full bg-safety-orange/40 animate-ping" />
  ```
- **Line 83** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  <span className="relative inline-flex size-1.5 rounded-full bg-safety-orange" />
  ```

### `components\prompt-kit\prompt-suggestion.tsx`

- **Line 21** [anti-pattern-excessive-radius]: Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.
  ```tsx
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-normal transition-all duration-200 curso
  ```

### `components\ui\table.tsx`

- **Line 10** [anti-pattern-overflow-x]: 'overflow-x-auto' found. Avoid masking layout overflows; ensure content fits within viewport.
  ```tsx
  className="relative w-full overflow-x-auto [-webkit-overflow-scrolling:touch]"
  ```

