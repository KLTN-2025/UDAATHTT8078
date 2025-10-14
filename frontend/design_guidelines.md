# DeFAI Platform - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from leading DeFi platforms with data-focused precision:
- **Primary Reference**: Uniswap for clean data presentation and wallet integration patterns
- **Secondary References**: Aave for professional dark mode aesthetics, Linear for dashboard clarity, Raydium for DEX-specific patterns
- **Design Principles**: Data transparency, performance clarity, trust through professional aesthetics, AI insights highlighted as premium features

## Core Design Elements

### A. Color Palette

**Dark Mode Foundation** (Primary):
- Background Base: 220 15% 8%
- Surface Cards: 220 15% 12%
- Surface Elevated: 220 15% 16%
- Border Subtle: 220 10% 20%
- Border Strong: 220 10% 28%

**Brand & Accent Colors**:
- Primary (AI/Action): 210 100% 60% (Vibrant blue for AI features, CTAs)
- Success/Positive: 142 76% 45% (Green for APR gains, profits)
- Warning/Caution: 38 92% 50% (Amber for IL warnings)
- Danger/Loss: 0 84% 60% (Red for losses, high risk)
- Secondary/Info: 260 60% 65% (Purple for AI recommendations badge)

**Text Hierarchy**:
- Primary Text: 220 10% 95%
- Secondary Text: 220 8% 70%
- Tertiary/Muted: 220 6% 50%
- Disabled: 220 5% 35%

**Light Mode** (Optional toggle):
- Background: 220 20% 98%
- Surface: 220 15% 100%
- Text Primary: 220 15% 15%
- Adjust accent colors for appropriate contrast

### B. Typography

**Font Families**:
- Primary Interface: 'Inter' (Google Fonts) - Clean, modern, excellent readability for data
- Monospace Numbers: 'JetBrains Mono' - For precise financial figures, wallet addresses, transaction hashes
- Headings: 'Inter' with tighter letter-spacing (-0.02em) for impact

**Type Scale**:
- Display/Hero: text-5xl md:text-6xl, font-bold (Dashboard titles)
- H1: text-4xl, font-semibold (Page headers)
- H2: text-3xl, font-semibold (Section titles)
- H3: text-2xl, font-semibold (Card headers)
- Body Large: text-lg (Primary content)
- Body: text-base (Default text)
- Body Small: text-sm (Secondary info, labels)
- Caption: text-xs (Metadata, timestamps)
- Numbers/Data: Use tabular-nums for alignment

### C. Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-8, space-y-12
- Card gaps: gap-4, gap-6
- Page margins: Container with px-4 md:px-8 lg:px-16

**Grid System**:
- Dashboard: 12-column grid (grid-cols-12)
- Portfolio cards: 3-column on desktop (lg:grid-cols-3), stack on mobile
- Pool listings: 1-column cards with internal grid for data points
- Metrics display: 4-column stat grid (grid-cols-2 lg:grid-cols-4)

**Responsive Breakpoints**:
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)
- Wide: > 1536px (max-width constraints at 1400px)

### D. Component Library

**Navigation**:
- Sidebar navigation (desktop): Fixed left sidebar, 240px width, collapsible to icon-only
- Top bar: Wallet connection + network selector + user profile (always visible)
- Mobile: Bottom tab bar with 4 primary routes

**Wallet Connection**:
- Prominent "Connect Wallet" button (top-right): Primary color, medium size
- Multi-wallet modal: Grid of wallet options with icons (Phantom, Sui Wallet, MetaMask)
- Connected state: Show truncated address (0x1234...5678) with colored status dot
- Network badge: Chain indicator with icon (Solana/Sui)

**Data Cards**:
- Portfolio summary card: Gradient border (primary color), glass-morphism effect, large typography for TVL
- Pool cards: Bordered surface with hover elevation, organized data rows, prominent APR display
- Metric cards: Icon + label + value + trend indicator (up/down arrows with colors)

**Tables**:
- Pool listings table: Sticky header, alternating row backgrounds, sortable columns
- Transaction history: Monospace fonts for hashes, status badges, timestamp formatting
- Responsive: Convert to stacked cards on mobile

**Charts & Visualizations**:
- APR trends: Line chart with gradient fill, dual y-axis for comparison
- Impermanent Loss: Area chart with warning color gradient
- Portfolio allocation: Donut chart with legend
- All charts: Dark theme compatible, animated on scroll

**AI Agent Section**:
- Recommendation cards: Purple accent border, AI badge icon, confidence score display
- Strategy comparison: Side-by-side cards with visual diff indicators
- Chat interface (optional): Message bubbles, typing indicators, code-style for addresses

**Forms & Inputs**:
- Input fields: Dark surface with lighter border, focus state with primary color
- Amount inputs: Large font size, max/percentage quick-select buttons
- Dropdowns: Custom styled select with chain/pool icons
- Sliders: For ratio adjustments with real-time preview

**Buttons**:
- Primary: Solid primary color, medium size, rounded-lg
- Secondary: Outline style with primary border
- Ghost: Subtle hover background for icon buttons
- Sizes: sm (charts/tables), md (default), lg (main CTAs)

**Status Indicators**:
- Connection status: Colored dot + text (green=connected, amber=pending, red=disconnected)
- Transaction status: Badge components (success, pending, failed)
- Risk levels: Color-coded labels (low=green, medium=amber, high=red)

**Modals & Overlays**:
- Transaction confirmation: Center modal with details breakdown, gas estimates
- Strategy simulator: Full-screen overlay with before/after comparison
- Pool details: Slide-over panel from right with detailed metrics

### E. Animation & Interactions

**Subtle Micro-interactions**:
- Card hover: Slight elevation (shadow-lg), border glow with primary color (150ms ease)
- Button press: Scale down to 0.98 (100ms)
- Data updates: Fade-in new values, highlight changed numbers briefly
- Chart rendering: Stagger animation for data points
- Loading states: Skeleton screens for data-heavy sections

**Avoid**: Excessive animations, distracting transitions, auto-playing carousels

## Images

**Hero Section** (Dashboard Landing):
- Abstract DeFi visualization: Interconnected nodes, liquidity flows, AI neural network overlay
- Style: Gradient mesh background (blue to purple), semi-transparent geometric shapes
- Placement: Top of dashboard, 50vh height, content overlay with blur backdrop
- Alternative: Animated WebGL liquidity pool simulation (subtle, non-distracting)

**AI Agent Interface**:
- AI assistant avatar/icon: Futuristic bot illustration or abstract AI symbol
- Placement: Top of AI recommendations section, medium size (80x80px)

**Empty States**:
- No pools illustration: Minimal line art of empty liquidity pool
- No history illustration: Abstract clock/calendar icon
- Placement: Center of empty sections with call-to-action below

**Wallet Icons**:
- High-quality SVG logos: Phantom, Sui Wallet, MetaMask
- Placement: Wallet connection modal, navigation bar when connected
- Source: Official brand assets or icon libraries

**Chain Logos**:
- Solana and Sui network logos
- Placement: Network selector, pool cards (to indicate chain)
- Size: Small (24x24px) in UI elements

All images should maintain dark mode compatibility with appropriate opacity and blend modes.