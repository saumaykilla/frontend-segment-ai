
# Segment AI Frontend

This is the frontend web application for the Segment AI project. It provides a user interface to query an LLM for population segmentation insights and explore results interactively.

## Features

- User authentication via Supabase  
- Query and display customer segment insights  
- Clean, responsive UI built with React and Next.js  

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- Access to a Supabase project  
- Backend API running (see backend repo below)  

### Backend Setup

Before running the frontend, you need to clone and run the backend:

```bash
git clone https://github.com/saumaykilla/backend-segment-ai.git
cd backend-segment-ai
```

Make sure to set up the backend environment variables (`EXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GOOGLE_API_KEY`) as described in the backend README, then start the backend server.

### Environment Variables

Create a `.env.local` file in the root of this frontend project and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
BACKEND_URL=your-backend-api-url
```

### Installation

1. Clone this repository:

```bash
git clone https://github.com/saumaykilla/frontend-segment-ai.git
cd frontend-segment-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

The frontend is deployed on Vercel. To deploy your own version, connect your repo to Vercel and configure the environment variables accordingly.


