# Color Contrast Accessibility Check

**Priority:** High
**Reason:** WCAG compliance for accessibility

## What to Check

You need to verify that all text/background color combinations meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

## Tool to Use

https://webaim.org/resources/contrastchecker/

## Colors to Test

### 1. Purple on Light Background
**Where:** Links, buttons, headings in light mode

- **Foreground:** `#8B5CF6` (purple-500)
- **Background:** `#FFFFFF` (white)
- **Background:** `#60A5FA` (blue-400, light mode bg)

**Required ratio:** 4.5:1 (normal text) or 3:1 (large text)

**If it fails:**
```typescript
// tailwind.config.ts - adjust to darker purple
colors: {
  purple: {
    500: '#7C3AED', // Darker purple for better contrast
  }
}
```

### 2. Dark Mode Text
**Where:** All text in dark mode

- **Foreground:** `#FFFFFF` (white text)
- **Background:** Dark blue from `darkBlue` custom color
- **Check your `app/globals.css` for the exact darkBlue value**

### 3. Link Hover States
**Where:** Navigation, social links, project links

Test all interactive elements in both light and dark mode.

### 4. Form Error Text
**Where:** Contact form validation messages

- **Foreground:** Red error text (check exact color in your CSS)
- **Background:** Form background color

### 5. Button Text
**Where:** All buttons (Send button, Magic buttons, etc.)

- Test text color against button background
- Test hover states

## How to Test

1. Go to https://webaim.org/resources/contrastchecker/
2. Enter foreground color hex (e.g., `#8B5CF6`)
3. Enter background color hex (e.g., `#FFFFFF`)
4. Check the results:
   - ✅ **Pass:** Ratio ≥ 4.5:1 for normal text
   - ✅ **Pass:** Ratio ≥ 3:1 for large text (18pt+)
   - ❌ **Fail:** Below these ratios

## If Colors Fail

### Option 1: Darken the text color
```typescript
// Make purple darker
colors: {
  purple: {
    500: '#7C3AED', // Was #8B5CF6
  }
}
```

### Option 2: Lighten the background
```typescript
// Make light mode background lighter
colors: {
  blue: {
    400: '#93C5FD', // Was #60A5FA
  }
}
```

### Option 3: Use different colors for light/dark mode
```typescript
// In your components
<p className="text-purple-600 dark:text-purple-400">
  // Darker purple in light mode, lighter in dark mode
</p>
```

## Quick Reference: WCAG Standards

| Level | Normal Text | Large Text (18pt+) |
|-------|-------------|-------------------|
| AA (Minimum) | 4.5:1 | 3:1 |
| AAA (Enhanced) | 7:1 | 4.5:1 |

Aim for **AA minimum**, AAA is ideal but not required.

## Browser DevTools Check

You can also check in Chrome/Firefox DevTools:

1. Right-click on text → Inspect
2. Look for contrast ratio in the color picker
3. Chrome shows ✅/❌ for WCAG compliance

## After Testing

Update this file with your results:

```
RESULTS:
- [ ] Purple (#8B5CF6) on white: ___ : 1 (Pass/Fail)
- [ ] Purple on light blue bg: ___ : 1 (Pass/Fail)
- [ ] White text on dark mode bg: ___ : 1 (Pass/Fail)
- [ ] Link hover states: Pass/Fail
- [ ] Form error text: Pass/Fail
- [ ] Button text: Pass/Fail
```
