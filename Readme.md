# CRM Dashboard - Next.js Implementation

A modern, responsive CRM dashboard built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates the conversion of design mockups into a fully functional web application with mobile-first responsive design.
This simple Nextjs app with SIngle Page + Conditional Rendering since i did this for only two of the page
I could have followed Multipage-Routing but since this simple app i prefered to use the current architecture for faster load and switching tabs/pages

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Multi-language Support**: Russian and English language toggle
- **Interactive Dashboard**: Order management and client management systems
- **Real-time Search**: Global search functionality with filtering capabilities
- **Data Management**: Pagination, sorting, and CRUD operations
- **Modern UI**: Clean, professional interface matching provided designs
- **Client Details**: Detailed client cards with order history and information tabs

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📱 Responsive Features

### Desktop
- Full sidebar navigation
- Integrated search bar in header
- Multi-column layouts
- Hover states and interactions

### Mobile
- Collapsible hamburger menu
- Expandable search functionality
- Horizontal scrolling tables
- Touch-optimized interactions

## 🎯 Key Components

- **Dashboard Layout**: Main application shell with sidebar and header
- **Order Management**: Complete order tracking with status management
- **Client Management**: Client database with detailed profiles
- **Search & Filtering**: Real-time search across all data(not full for now)
- **Pagination**: Efficient data navigation
- **Multi-language**: Seamless language switching

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yosefMuluneh/crm-dashboard.git
cd crm-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── client-card/
│   ├── client-management/
│   ├── header/
│   ├── order-management/
│   ├── sidebar/
│   └── ui/
├── hooks/
├── lib/
├── types/
└── public/
```

## 🎨 Design Implementation

This project converts provided design mockups into a pixel-perfect, functional web application:

- **Design Fidelity**: Exact color schemes, typography, and spacing
- **Interactive Elements**: All buttons, forms, and navigation work as expected
- **Status Indicators**: Color-coded status badges and visual feedback
- **Data Visualization**: Clean tables and cards for data presentation

## 📊 Features Implemented

### Order Management(I used dummy data just mocked)
- ✅ Order listing with pagination
- ✅ Status filtering (In Progress, Pending, Completed)
- ✅ Real-time search functionality(not fully but the basics)
- ✅ Client name linking to profiles

### Client Management (I used dummy data just mocked)
- ✅ Client database with profiles
- ✅ VIP status indicators
- ✅ Contact information display
- ✅ Order history tracking
- ✅ Client detail pages with tabs

### Navigation & UX
- ✅ Responsive sidebar navigation
- ✅ Mobile hamburger menu
- ✅ Breadcrumb navigation
- ✅ Language switching

## 🔧 Development Approach

- **Mobile-First**: Designed for mobile devices, enhanced for desktop
- **Component-Based**: Modular, reusable React components
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized rendering and state management
- **Accessibility**: ARIA labels and keyboard navigation support

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers

## 📝 Skills Demonstrated

- **Frontend Development**: React, Next.js, TypeScript
- **Responsive Design**: Mobile-first CSS, Flexbox, Grid
- **UI/UX Implementation**: Design-to-code conversion
- **State Management**: React hooks and context
- **Component Architecture**: Scalable, maintainable code structure
- **Modern Tooling**: Next.js, Tailwind CSS, modern build tools

