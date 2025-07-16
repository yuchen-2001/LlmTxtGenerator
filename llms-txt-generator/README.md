# LLMs.txt Generator

A web application that helps create llms.txt files for websites to improve AI/LLM compatibility. Built for Profound's Frontend Developer Task.

The website analysis currently uses smart mock data generation based on domain patterns (since I focused primarily on frontend architecture and abstracted the backend complexity), but the API structure is designed to easily integrate real web crawling services.

**Live Demo**: [live demo link](https://llms-txt-generator-demo.vercel.app)

## Tech Stack

- **Frontend**: React 19, Next.js 15, Tailwind CSS
- **Backend**: Next.js API Routes  
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start

### Requirements
- Node.js 18+ 
- npm

### Run Locally

```bash
# Clone the repo
git clone 
cd llms-txt-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Key Features Implemented

### Frontend Architecture
- Component-based design
- Custom design system with consistent theming
- Responsive layout that works both on mobile and desktop
- Loading states and error handling throughout

### User Experience
- 3-second guaranteed loading animation for consistency
- Real-time form validation with error messages
- Toast notifications for feedback
- Drag-and-drop page reordering
- Bulk selection and category editing


