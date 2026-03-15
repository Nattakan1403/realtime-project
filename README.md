## Project Overview

This project is a real-time patient form monitoring system that allows staff to fill in forms and administrators to monitor incoming data in real time.

The system ensures that typing updates from staff users are instantly synchronized to the admin dashboard.

## Features

- Real-time form data synchronization
- Admin monitoring dashboard
- Responsive UI for different screen sizes
- Form submission and live typing display

## Tech Stack

- Next.js
- Tailwind CSS
- Supabase

## Installation

1. Clone repository

git clone https://github.com/Nattakan1403/realtime-project.git

2. Install dependencies

npm install

3. Run project

npm run dev

## Environment Variables

Create `.env.local`

NEXT_PUBLIC_SUPABASE_URL="https://ijbdmnjvgbuqanetleme.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_XwFoj58bKSWGA2Cmsm9lGA_Zo1SYR8Y"

## Application Links
Patient Link: https://realtime-project-nattakan-anu.vercel.app/patient-form
Staff Link: https://realtime-project-nattakan-anu.vercel.app/staff-monitor

## Bonus Features
- Live typing indicator
- Summary total of each status
- Filter Dashborad by status
