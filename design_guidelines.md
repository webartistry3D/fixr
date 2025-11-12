# Fixr - Handyman Hub Design Guidelines

## Design Approach
**Cyberpunk/Neon Theme** - A bold, modern aesthetic inspired by cyberpunk interfaces with high-contrast dark backgrounds and vibrant neon accents. Think futuristic service directories with energy and visual impact.

## Core Design Elements

### A. Typography
- **Primary Font**: Modern sans-serif (e.g., Inter, Poppins) for clean readability
- **Headings**: Bold weights (600-700) for page titles and section headers
- **Body Text**: Regular weight (400) for descriptions and content
- **Accent Text**: Medium weight (500) for labels and metadata
- **Hierarchy**: Clear size distinction - Hero (3xl-4xl), Section Headers (2xl-3xl), Card Titles (lg-xl), Body (base)

### B. Layout System
**Spacing Units**: Consistent use of Tailwind units - primarily 4, 6, 8, 12, 16, 24 for padding/margins
- Tight spacing (2-4) for inline elements
- Medium spacing (6-8) for component internal padding
- Generous spacing (12-24) for section separation

**Grid System**:
- Desktop: 3-column grids for categories and handymen cards
- Tablet: 3-column maintained or 2-column for tighter screens
- Mobile: 2-column for categories, single column for detailed cards

### C. Color Palette
**Foundation**:
- Background: Deep charcoal (#1a1a1a, gray-900)
- Surface: Slightly lighter dark (gray-800) for cards and containers
- Borders: Subtle dark borders (gray-700) for card separation

**Accent Colors**:
- Primary: Vibrant cyan (#22d3ee, cyan-400) for primary actions, highlights, and active states
- Hover/Glow: Brighter cyan (#06b6d4, cyan-500) with glow effects
- Text Primary: White/near-white (gray-100) for high contrast
- Text Secondary: Light gray (gray-400) for supporting information

**Semantic Colors**:
- Success/Ratings: Keep cyan theme or use complementary teal
- WhatsApp CTA: Maintain brand green (#25D366) for recognition

### D. Component Library

**Category Cards**:
- Dark card background with subtle border
- Cyan accent on hover with glow effect
- Icon or emoji representing category
- Clickable with smooth transition (200-300ms)
- Selected state: cyan border with enhanced glow

**Handyman Cards**:
- Structured layout: Profile image top, info below
- Profile images: Circular with subtle cyan ring
- Star ratings with visual indicators
- Skills displayed as inline tags with cyan accents
- WhatsApp button: Prominent with icon, maintains WhatsApp green
- Hover state: Lift effect with subtle shadow and glow

**Search Bar**:
- Dark input field with cyan focus ring
- Placeholder text in gray-400
- Search icon embedded (left or right)
- Optional location dropdown with matching styling
- Full-width on mobile, constrained width on desktop

**Map Component**:
- Dark-themed map tiles (if available) or custom styling
- Cyan markers for handyman locations
- Popup cards matching handyman card design
- Responsive height: taller on desktop, moderate on mobile

**Admin Form**:
- Dark form fields with cyan focus states
- Clear labels above inputs
- Submit button with cyan background and hover glow
- Form validation states with cyan highlights
- Grouped logically: Personal info, Skills, Location, Contact

### E. Interaction & Effects

**Hover States**:
- Cards: Subtle lift (translate-y-1) with cyan glow
- Buttons: Brightness increase with glow shadow
- Links: Cyan underline appear from center

**Glow Effects**:
- Use box-shadow with cyan color at low opacity
- Example: `shadow-[0_0_15px_rgba(34,211,238,0.3)]`
- Intensify on hover: `shadow-[0_0_25px_rgba(34,211,238,0.5)]`

**Transitions**:
- Smooth 200-300ms duration for all interactive elements
- Ease-in-out timing for natural feel

### F. Layout Structure

**Homepage**:
1. **Header**: Logo left, "Add Handyman" admin link right, dark background with subtle bottom border
2. **Hero/Search Section**: Centered search bar with headline above, generous padding (py-16 to py-24)
3. **Categories Section**: Grid of category cards with section title
4. **Handymen Grid**: Filtered results displayed responsively, empty state when no results
5. **Map Section**: Full-width map showing all handymen locations
6. **Footer**: Minimal dark footer with credits/links

**Admin Page**:
- Centered form container (max-w-2xl)
- Clear heading explaining purpose
- Logical form sections with spacing
- Success feedback on submission
- Link back to homepage

### G. Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Single column stacking on mobile for all grids except categories (2-col)
- Touch-friendly button sizes (min 44px height)
- Adequate spacing for thumb navigation

## Images
**Profile Pictures**: Required for each handyman card - circular cropped photos. Placeholder: Abstract geometric patterns or avatars with cyan accents if real images unavailable.

**Category Icons**: Use icon library (Heroicons or similar) with cyan coloring, or emoji for quick visual recognition.

**No large hero image** - This is a utility-focused directory. Search functionality takes prominence over decorative imagery.

## Key Design Principles
1. **High Contrast**: Ensure text readability with white on dark backgrounds
2. **Neon Energy**: Cyan accents should feel vibrant but not overwhelming (use strategically)
3. **Clarity Over Flash**: While styled boldly, information architecture must be immediately clear
4. **Touch-Ready**: All interactive elements sized for mobile-first interaction
5. **Instant Feedback**: Visual responses to all user actions (clicks, hovers, selections)