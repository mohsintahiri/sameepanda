# BAMBU Website Project

## Overview
This is a website rebuild for the BAMBU client. The website is built using Next.js, React, TypeScript, and TailwindCSS with ShadCN UI components.

## Pages Implemented

### Landing Page
- Created a landing page with a background gradient image with very subtle blur and darkening overlay
- Implemented the BAMBU logo as an image component with brightness enhancement and glow effect
- Added a glossy white "ENQUIRE NOW" button with purple text for high visibility and subtle glow effects
- Added a modern tubelight-style navigation bar with animated indicators
- Applied copy protection to images (disabled right-click, drag, and selection)
- Converted page to a client component with "use client" directive for event handling
- Optimized element positioning to match reference design (button overlaps bottom portion of logo)
- Enhanced foreground-background contrast with subtle darkening overlay and blur effects
- Improved logo visibility with brightness enhancement and white glow effect

### Shop Page
- Created a responsive product grid layout with the following items:
  - 1 Hour Brand Consultation (500,00 €) with "Book Now" button
  - Haramain Photo Pack (30) (82,00 €) with "Add to cart" button
  - Haramain Photo Pack (60) (152,00 €) with "Add to cart" button 
  - Haramain Photo Pack (90) (210,00 €) with "Add to cart" button
- Integrated actual product images with faster hover animations (reduced to 150ms)
- Added "View Details" overlay on image hover for better UX
- Implemented subtle image scaling animations on hover (now 105% for faster response)
- Used product category labels ("Consultation Services" and "Haramain Packages")
- Created individual product detail pages with advanced features:
  - Interactive full-screen image viewing mode with click-to-zoom functionality
  - Smart zooming that focuses on the exact area where the user clicks
  - Boundary-protected zoom that prevents viewing outside image edges
  - Click-outside-to-close behavior for the full-screen view
  - Image gallery with thumbnails for products with multiple images
  - Detailed product information and specifications
  - Prominent call-to-action buttons (Book Now/Add to Cart)
- Implemented keyboard accessibility (ESC key to exit full-screen mode)
- Maintained consistent design style with the main landing page
- Modified background gradient to use fixed positioning for a consistent appearance
- Used a four-column layout on large screens for optimal product display
- Styled the "Book Now" button differently from "Add to cart" buttons for visual distinction

### Cart Page
- Created a functional cart view with sample items
- Added cart summary with subtotal, shipping, and total calculations
- Implemented "Checkout" button with consistent styling
- Added empty cart state with prompt to visit shop
- Included remove item functionality UI

### Login Page
- Created a modern login form with email and password fields
- Added form validation and accessibility features
- Included "Remember me" option and "Forgot password" link
- Maintained brand styling with frosted glass effects
- Added sign-up link for new users

### Enquire Page
- Designed a comprehensive contact form with validation
- Included name, email, phone, and message fields with appropriate icons
- Added form validation with error messaging for required fields
- Implemented success state with confirmation message
- Maintained consistent design language with frosted glass panels
- Responsive layout that works on both mobile and desktop devices

## Navigation
- Implemented a responsive navbar that appears at the top on desktop and bottom on mobile
- Navigation items include:
  - Home
  - Shop
  - Cart
  - Log In
- Features animated indicators and hover effects for improved UX
- Collapses to icon-only view on mobile devices
- Smoothly transitions between pages with active state indicator
- Used Framer Motion for the "tubelight" animation effect
- Updated to solid white background for better visibility and contrast
- Optimized animation speed with faster spring transitions for smoother navigation
- Purple highlight for active items with subtle tubelight effect
- Improved text contrast with gray text on white background
- Implemented path-based active tab detection to keep navigation in sync with current route
- Switched from spring physics to tween animation for extremely fast, consistent transitions
- Reduced animation duration to 0.15 seconds for near-instant tab switching
- Refined z-index for proper layering without overlapping interactive elements
- Improved navigation handling to ensure consistent behavior across all pages
- Used controlled navigation with programmatic routing for more reliable tab switching
- Added proper pointer-events management to prevent navbar from blocking underlying content

## Design System
- Using TailwindCSS for styling
- Using ShadCN UI components
- Typography:
  - Primary font: Inter (clean, modern sans-serif for body text)
  - Secondary font: Montserrat (sharper, geometric sans-serif for headings and buttons)
  - Letter spacing: Wider tracking for buttons and headings for a premium look
- Image assets:
  - Background gradient image: `/public/images/Web Gradient copy.png`
  - Logo: `/public/images/Main Logo white.png`
- Background treatments:
  - Strong blur effect (blur-[3px]) on background image
  - Light black overlay (bg-black/10) for gentle contrast
  - Subtle backdrop blur (backdrop-blur-[0px]) for softening without losing vibrancy
  - Fixed positioning for shop page background to ensure consistency
  - Centered object position to maintain optimal background appearance
- Logo enhancements:
  - Brightness adjustment (brightness-100)
  - Subtle white glow shadow effect (drop-shadow)
  - Higher z-index (z-20) to ensure it appears above all overlays
- Brand colors:
  - Primary: Purple (for background gradients)
  - Text on dark background: White
  - Button: White with transparency and glow effects
  - Button text: Purple (text-purple-700) for optimal readability against white
  - Navigation: White background with purple accents for active items
- UI Elements:
  - Minimalist, clean design aesthetic
  - Semi-transparent elements with backdrop blur for a frosted glass effect
  - Subtle glow animations using box-shadow
  - Sharper corners (rounded-md instead of rounded-full) for a more refined look
  - White glow border for important buttons
  - Form inputs with icon prefixes for enhanced visual cues
  - Consistent focus states with purple accent rings
- Layout:
  - Button positioned to overlap with bottom of logo using smaller negative margin (-mt-3 on mobile, -mt-5 on desktop)
  - Centered alignment for main page elements
  - Responsive navbar that adapts to screen size
  - Content adjusted for different screen sizes with appropriate padding
  - Strategic z-index management for proper interaction layering

## Components
- ShadCN initialized with New York style and Neutral color scheme
- Custom components:
  - Tubelight Navbar: Modern navigation bar with animated indicators and responsive design
  - RainbowButton: Available but not currently used (gradient animation too vibrant for current design)

## Form Features
- Custom styled form inputs with left-aligned icons
- Error handling and validation for required fields
- Success states with confirmation messages
- Responsive textarea elements
- Focus states with consistent styling
- Form state management using React hooks

## Dependencies
- framer-motion: Used for the animation effects in the navbar
- lucide-react: Used for the icon set in the navbar and other UI elements

## Asset Requirements
- Background gradient image placed at: `/public/images/Web Gradient copy.png`
- Logo: `/public/images/Main Logo white.png`

## Security Features
- Images are protected against common copying methods:
  - Right-click context menu disabled
  - Image dragging disabled
  - Pointer events disabled on image containers
  - Selection disabled on image elements

## Bug Fixes
- Fixed "Event handlers cannot be passed to Client Component props" error by adding 'use client' directive to make page.tsx a client component
- Fixed button positioning issue by using negative margin-top instead of gap spacing
- Fine-tuned button position to create proper overlap with logo as shown in reference design
- Improved text visibility by changing from transparent text to solid purple color
- Enhanced logo visibility against dark background with brightness and glow effects
- Fixed backdrop blur syntax error in darkening overlay
- Optimized navbar animations by increasing transition speed and improving spring physics parameters
- Fixed navbar active indicator to correctly track current page/route
- Enhanced animation speed by switching from spring physics to tween animation
- Reduced animation duration for much faster tab transitions
- Resolved navbar interaction issues that prevented proper navigation between pages
- Fixed z-index conflicts where navbar was overlaying important interactive elements
- Improved reliability of navigation by implementing programmatic routing with Next.js Router
- Added dependable active state tracking to ensure visual state always matches the current route
- Addressed background image consistency issue on shop page by using fixed positioning
- Fixed image zoom functionality to prevent zooming outside of image boundaries by:
  - Implementing mathematical constraints on zoom coordinates (25%-75% range)
  - Centering the image in the viewport to avoid edge cases
  - Ensuring consistent zoom behavior across all image dimensions
  - Preventing zoom focus from showing empty space outside the actual image
- Fixed fullscreen image viewer cursor behavior by:
  - Adding an extra container with onMouseOut event to reliably detect when cursor leaves the image area
  - Using the actual image element boundaries rather than the container boundaries for precise detection
  - Implementing multiple mouse event handlers (enter, leave, move, out) for comprehensive coverage
  - Adding redundant detection methods to ensure the cursor changes correctly for both slow and fast mouse movements
  - Targeting the specific image element to get the exact visual boundaries rather than the container's
  - Setting fixed dimensions (1200×800) for the image with maxWidth/maxHeight constraints for more predictable boundary detection
- Enhanced fullscreen image viewer cursor management:
  - Improved detection of cursor position relative to the actual image boundaries
  - Implemented real-time cursor style changes based on whether cursor is inside or outside the image
  - Default cursor when outside image boundaries and zoom-in/zoom-out cursor when inside
  - Dynamically updated cursor based on zoom state (zoom-in when not zoomed, zoom-out when zoomed)
  - Used inline style property for base cursor styling with dynamic JavaScript updates for precise control
  - Removed multiple event handlers (mouseEnter/mouseLeave) in favor of a single, more reliable mouseMove handler
  - Simplified code and improved reliability with fewer event listeners and more direct style manipulation
- Fixed guest cart functionality issues by:
  - Creating the required database tables in Supabase (guest_carts, guest_cart_items, products)
  - Adding proper error handling and detailed logging in the CartProvider component
  - Improving the cart token storage and retrieval process
  - Adding try/catch blocks to handle localStorage errors and API failures
  - Enhancing the ensureGuestCartExists function with better error reporting
  - Adding explicit logging of cart operations for easier debugging
- Fixed cart price display issues:
  - Added proper handling of European-style price formats with comma as decimal separator
  - Implemented proper price parsing for products with currency symbols
  - Fixed subtotal calculations to handle different price formats consistently
  - Added dedicated price formatter for consistent display across the application
- Fixed product UI interactions:
  - Enhanced the "Add to Cart" button with appropriate loading and success states
  - Added toast notifications to confirm cart actions to users
  - Fixed cart quantity controls to properly update item quantities
  - Implemented proper error handling for cart operation failures
  - Added visual feedback for cart operations (loading spinners, success checkmarks)
- Fixed cart functionality on the main shop page:
  - Implemented direct "Add to Cart" buttons on the main shop page that properly use the cart context
  - Added loading states with a spinner animation when items are being added to cart
  - Added toast notifications for successful cart additions and error feedback
  - Made the buttons consistent with the product detail pages for a unified experience
  - Fixed an issue where clicking "Add to cart" on the main shop page didn't actually add products to the cart
  - Ensured all cart-related functionality across the site uses the same database operations and error handling
  - Made the cart functionality work properly across different pages and components (main shop page, product detail pages, and cart page)

## Design Changes
- Replaced the rainbow animated button with a sleek black button to better match the website's minimalist aesthetic
- Updated fonts from default system fonts to Inter and Montserrat for a more premium, less rounded appearance
- Changed button corners from fully rounded to slightly rounded (rounded-md) for a sharper, more professional look
- Added wider letter-spacing to text elements to improve readability and create a more refined aesthetic
- Repositioned button to overlap with the bottom portion of the logo using carefully adjusted negative margins
- Improved foreground-background contrast by adding light blur and subtle darkening overlay to the background
- Updated the CTA button to a glossy white design with solid purple text for better visibility
- Added subtle glow and shadow effects to make the button "pop" against the purple background
- Added brightness enhancement and glow effect to the logo to make it stand out against the background
- Increased blur effect on background image to 3px for a dreamier aesthetic
- Replaced login button with a comprehensive navigation bar
- Added responsive navigation with desktop/mobile adaptations
- Changed navbar from semi-transparent to solid white for better visibility and aesthetic appeal
- Updated navbar active indicator colors to match brand purple
- Significantly improved navbar animation speed for a more responsive feel
- Switched to tween animation for precise, ultra-fast tab transitions
- Refined navbar z-index to prevent overlay conflicts with interactive content
- Enhanced pointer-events handling for improved page element interactions
- Simplified Enquire page by removing contact information section for a cleaner, more focused form experience
- Made shop page background static using fixed positioning for a more consistent user experience
- Updated the ENQUIRE NOW button to have a glossy white appearance with purple text, less circular corners (rounded-md), and subtle glow effects using shadow and border effects
- Added a semi-transparent white background with hover effect to the button for improved glossy appearance
- Adjusted the logo size to maintain proper proportions on the page
- Enhanced button with subtle border and backdrop blur for a premium glossy effect
- Increased the size of the logo significantly (from 256px to 512px width) for better visual impact
- Reduced the spacing between logo and button for better composition
- Added mail icon to the ENQUIRE NOW button to improve visual hierarchy and user understanding
- Enhanced the ENQUIRE NOW button with a mail icon and improved hover animations (scaling effect and intensified glow)
- Added a color transition on hover to make the purple text slightly darker when hovered
- Increased the animation duration for smoother transitions on hover
- Implemented flexible layout with gap spacing between icon and text
- Refined the ENQUIRE NOW button to match the reference image more precisely:
  - Made the mail icon larger (size 20) and thicker (strokeWidth 2.5)
  - Reduced button padding (px-6 py-2) for a more compact appearance
  - Removed backdrop blur for a cleaner look
  - Adjusted shadow intensity for a subtler effect
  - Removed the size="lg" property for more default dimensions
  - Changed font weight from bold to semibold for better balance with the icon
- Enhanced the button with a subtle glowing border effect:
  - Added a combination of outer and inner shadow effects to create a halo around the button borders
  - Increased border opacity from 50% to 70% for better visibility
  - Improved hover state with stronger glow and solid white border
  - Created a layered shadow effect using both regular and inset shadows for depth
- Updated the Shop page "Book Now" button:
  - Changed style from purple-bordered to white background with purple text for consistency
  - Updated the button link to point directly to the product page instead of the enquire page
  - Made all product buttons visually consistent with white background and purple text

## Next Steps
- Connect cart functionality to a state management system
- Implement the actual product data for the shop
- Integrate Supabase for authentication on the login page
- Connect the enquire form to a backend service for email processing
- Add payment processing options to checkout

## Database Integration
- Supabase has been integrated for backend functionality:
  - Authentication for user accounts
  - Database for products, cart, orders, and consultation bookings
  - Row Level Security (RLS) policies for data protection
  
### Database Schema
- **Products**: Store product information including name, price, category, description, image, and slug
- **Product Features**: Store features specific to each product 
- **Product Images**: Store additional images for products with multiple photos
- **Cart Items**: Track items in user shopping carts
- **Orders**: Store order information including status and shipping details
- **Order Items**: Track individual items within orders
- **Consultation Bookings**: Store information about consultation appointments

### Authentication Flow
- Sign up and login functionality via Supabase Auth
- Protected routes requiring authentication
- User session management
- Remember me option for persistent sessions

### Data Flow
- Products are fetched from the database for display in the shop
- Cart functionality connects directly to the database for persistent shopping carts
- Booking system integrated with database and Calendly

## Animation Optimization
- The navbar animation has been optimized for smoother performance by:
  - Simplifying the animation effect by removing nested glow elements that caused performance issues
  - Adding proper AnimatePresence for better mounting/unmounting of animated elements
  - Using simpler opacity-based transitions with shorter durations (0.1s)
  - Implementing linear easing for more consistent animation performance
  - Reducing overall animation complexity to improve framerate

## Landing Page Design

- Background: The landing page features a beautiful gradient image as background with a very subtle blur (3px) and minimal darkening overlay (10% black with no backdrop blur) for gentle contrast.
- Logo: The logo is displayed prominently in white, with slight brightness enhancement and a subtle drop shadow for better visibility against the background.
- CTA: A compact white "ENQUIRE NOW" button with a larger, thicker mail icon, subtle glowing borders, and purple text, creating an eye-catching focal point below the logo.
- Navigation: The site features a modern "tubelight" navbar with smooth hover animations, containing Home, Shop, Cart, and Login buttons.

## Navigation Structure

- Modern animated "tubelight" navbar implemented with framer-motion for smooth transitions
- Key navigation items: Home, Shop, Cart, and Login
- Optimized for performance using React.memo and useCallback to prevent unnecessary re-renders
- Interactive indicator that highlights the current active page

## Performance Optimizations

- Hardware acceleration applied to critical animations using `willChange` and `transform: translateZ(0)`
- Memoized components to reduce re-renders
- Debounced resize handlers with passive event listeners
- Optimized state updates in the navbar component
- Strategic use of minimal blur effects to maintain visual appeal without performance impact

## Technical Implementation

- Built with Next.js, React, TypeScript, and TailwindCSS
- Uses ShadCN UI components for consistent styling
- Framer Motion for smooth animations
- Lucide React for high-quality icons
- Optimized image loading with Next.js Image component (priority loading for critical visuals)

## Future Implementations

- Account system integration with Supabase (planned)
- Enhanced shopping functionality
- Additional pages and content sections

## Shop Page Organization

- Implemented two complementary approaches for product pages:
  1. **Dynamic Route Approach** (`[slug]`): A flexible template-based approach that can handle any product
  2. **Dedicated Product Pages**: Custom-tailored pages for specific products with enhanced features

- Created dedicated product pages with product-specific enhancements:
  - **Brand Consultation Page**: Features specific consultation details, expectation management, and tailored service details
  - **Haramain Photo Pack Page**: Includes pack-specific details, comparison with other packs, and specialized image gallery features

- Benefits of the dedicated product pages approach:
  - Allows for product-specific content, layout, and features
  - Enables more detailed and targeted product descriptions
  - Supports specialized UI elements tailored to each product category
  - Improves SEO with product-specific metadata and content
  - Maintains the same core functionality (image zoom, fullscreen view) across all product pages

- Enhanced product interactions:
  - Full-screen image viewer with click-to-zoom functionality
  - Smart boundary-protected zoom to prevent viewing outside image edges
  - Thumbnail navigation in both regular and fullscreen modes
  - Product-specific feature highlights with custom icons

## UI Improvements

### Landing Page
- Background: Gradient image with blur-[3px] effect and subtle darkening overlay (bg-black/10)
- Logo: Enhanced with brightness-100 and subtle white glow effect (drop-shadow-[0_0_7px_rgba(255,255,255,0.2)])
- ENQUIRE NOW button: Glossy white button with hover and focus states
- Navigation: TubeLightNavBar component with Home, Shop, Cart, and Login buttons

### Shop Pages
- Product Detail Pages: Each product has its own page with details, images, and pricing
- Fullscreen Image Viewer: 
  - Improved cursor handling for better UX
  - Cursor changes to default when outside image boundaries
  - Cursor toggles between zoom-in and zoom-out based on zoom state
  - Fixed issues with cursor staying as zoom-in when it should be zoom-out
- Brand Consultation Page:
  - Updated product description with more personal, engaging copy
  - Revised features list to include: 60-minute 1:1 session, personalized brand audit document, call recording, and Zoom meeting link
  - Added friendly closing note: "Looking forward to speaking to you and growing together!"
  - Book Now button on product detail page links directly to Calendly scheduling page for immediate booking
  - Button on main shop page leads to product detail page to allow users to learn more before booking
  - Consistent styling with all product pages while conveying more specific service details

### Latest Changes
- Reduced background darkness by lowering overlay opacity from 20% to 10%
- Increased blur effects from `blur-[1px]` to `blur-[1.5px]` and `backdrop-blur-[1px]` to `backdrop-blur-[1.5px]` for a softer appearance
- Modified the "ENQUIRE NOW" button to link to an external Google Forms URL instead of the internal "/enquire" page, with security attributes (`target="_blank"` and `rel="noopener noreferrer"`) for external links
- Enhanced the "ENQUIRE NOW" button with:
  - A glowing border effect with shadow (`shadow-[0_0_6px_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.5)]`)
  - Hover effects that increase the glow (`hover:shadow-[0_0_15px_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(255,255,255,0.7)]`)
  - Scale animation on hover (`hover:scale-105`)
  - Added a Mail icon to improve visual appeal and indicate action purpose
  - Changed text color to purple with white background for better contrast
- Implemented hardware acceleration for smoother animations using `transform: translateZ(0)` and `willChange` properties
- Updated the blur effect on the background image from `blur-[1.5px]` to `blur-[3px]` and removed backdrop blur on the overlay (`backdrop-blur-[0px]`)
- Updated the logo image path to use "Main Logo white.png" with optimized rendering settings
- Fixed cart functionality to work correctly with Supabase backend:
  - Created proper database tables for guest carts and products
  - Added robust error handling and logging for cart operations
  - Improved error messages to help debugging cart-related issues
  - Enhanced the cart context provider to handle edge cases and unexpected errors
  - Set up proper Row Level Security (RLS) policies for cart tables in Supabase
  - Added sample product data for testing cart functionality
- Enhanced product detail pages with real cart functionality:
  - Updated "Add to Cart" buttons on all product pages to use the cart context
  - Added loading states and success indicators for cart actions
  - Implemented toast notifications for cart updates using Sonner
  - Fixed price formatting to properly display European-style prices (comma as decimal separator)
  - Added quantity controls to the cart page for adjusting item quantities
  - Implemented proper cart item deletion with confirmation and loading states
  - Ensured all price calculations handle international number formats correctly
- Updated the cart system to enforce a maximum quantity of 1 per product
- This restriction is appropriate for the digital product nature of the shop (one-time purchases)
- Modified the product pages to:
  - Check if a product is already in the cart before allowing add to cart
  - Display "Already in Cart" instead of "Add to Cart" for products already in the cart
  - Disable the add to cart button for products already in the cart
- Updated the cart page interface:
  - Disabled the "+" quantity button since maximum quantity is 1
  - Added helpful tooltips explaining the quantity limitation
  - Improved user feedback when attempting to add duplicate items
- Implemented validation in the cart context to prevent adding more than one of the same product
- Updated button styling across product pages for consistency and improved visual feedback

## Supabase Integration
- Set up the following tables in the database:
  - `guest_carts`: Stores cart information for non-logged-in users
  - `guest_cart_items`: Stores items added to guest carts
  - `products`: Stores product information including name, price, and description
- Implemented Row Level Security policies for all tables to ensure proper data access
- Added sample product data for testing cart functionality
- Connected the cart context provider to the Supabase client for data operations
- Set up proper error handling and logging for all database operations

## Cart Functionality
- Implemented a context-based cart system that works for both guest users and logged-in users (guest only for now)
- Cart data is persisted in the Supabase database for reliability
- Guest carts are identified by a unique token stored in localStorage
- Cart operations include:
  - Adding items to cart
  - Removing items from cart
  - Updating item quantities
  - Clearing the entire cart
  - Calculating subtotal and item count
- Enhanced error handling to provide clear messages for debugging
- Added detailed logging to trace cart operations for troubleshooting
- Each cart operation is atomic and ensures data consistency
- Added real-time feedback for users:
  - Loading states during cart operations
  - Success indicators after successful operations
  - Toast notifications for cart updates and errors
  - Quantity controls for easily adjusting item quantities
  - Proper price formatting for different international formats
  - Clear empty cart state with call-to-action to browse shop
- Improved cart page UX:
  - Added quantity controls with plus/minus buttons
  - Implemented loading states for cart operations
  - Fixed price formatting to display correctly
  - Added responsive design for mobile and desktop
  - Implemented proper error handling for failed operations
