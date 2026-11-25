# After-School Classes Booking System

A full-stack after-school lesson booking application developed for the **CST3144 Full Stack Development** coursework. Students can browse and book lessons, while administrators can manage lesson and teacher information through an admin interface.

## Live application

- **Frontend (GitHub Pages):** https://Manikiranuni.github.io/After-School/
- **Backend (Render):** https://m01022021-after-school.onrender.com/
- **Source code:** https://github.com/Manikiranuni/After-School

> The hosted backend may take some time to respond after a period of inactivity. The frontend relies on the Render API and MongoDB Atlas being available.

## Features

### Student features

- Browse available after-school lessons with images, locations, prices and remaining spaces.
- Search lessons using the backend search API.
- Sort lessons by subject, location, price or available spaces in ascending or descending order.
- Filter lessons by teacher.
- Add and remove lessons from the shopping cart, respecting available spaces.
- Validate customer name and phone number before submitting an order.
- Submit bookings and see an order confirmation.
- View purchased-space/enrolment information for lessons.

### Admin features

- Admin login using JSON Web Tokens (JWT).
- Dashboard with lesson, teacher and availability statistics.
- Add lessons, including image uploads, and edit lesson details.
- Create teachers and assign lessons to them.
- View booking records in the admin interface.

## Tech stack

| Part | Technologies |
| --- | --- |
| Frontend | Vue 3, Vite, JavaScript, HTML, external CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with the **native MongoDB Node.js driver** (not Mongoose) |
| Authentication | JWT and bcrypt |
| Image uploads | Multer |
| Hosting | GitHub Pages (frontend), Render (backend) |
| Deployment | GitHub Actions |

## Repository structure

```text
After-School/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── after-school-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/css/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── services/
│   │   ├── utils/
│   │   └── views/
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
└── after-school-backend/
    ├── controllers/
    ├── db/
    ├── middleware/
    ├── routes/
    ├── scripts/
    ├── public/images/
    ├── app.js
    ├── index.js
    └── package.json
```

## Requirements

- Node.js **22.18 or newer** (or a compatible supported version for the frontend)
- npm
- A MongoDB Atlas database or a reachable MongoDB deployment
- Git

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/Manikiranuni/After-School.git
cd After-School
```

### 2. Configure and start the backend

```bash
cd after-school-backend
npm install
```

Create `after-school-backend/.env` with the following variables, replacing the placeholders with your own values:

```dotenv
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
DB_NAME=afterschool
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=YOUR_STRONG_PASSWORD
PORT=3000
```

The admin setup script requires an admin password of at least 12 characters. Run it once to create an initial admin account if needed:

```bash
npm run create-admin
```

Then start the API:

```bash
npm run dev
```

The backend runs at `http://localhost:3000` unless a different port is configured.

### 3. Configure and start the frontend

Open a second terminal from the repository root:

```bash
cd after-school-frontend
npm install
```

Set `after-school-frontend/.env.development` to:

```dotenv
VITE_API_URL=http://localhost:3000
```

Start the Vue app:

```bash
npm run dev
```

Open the local URL shown by Vite (typically `http://localhost:5173`).

### 4. Build the frontend

```bash
npm run build
npm run preview
```

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/lessons` | Retrieve lessons |
| POST | `/lessons/post` | Create a lesson (admin; image upload) |
| PUT | `/lessons/:id` | Update lesson details or spaces |
| GET | `/search?q=...` | Search lessons |
| GET | `/teachers` | Retrieve teachers |
| POST | `/teachers` | Create a teacher (admin) |
| GET | `/teachers/:id/lessons` | Retrieve lessons for a teacher |
| GET | `/enrolment/:lessonid` | Retrieve lesson enrolment count |
| POST | `/orders` | Submit a booking |
| GET | `/orders` | Retrieve orders; **access control must be reviewed before real use** |
| POST | `/admin/login` | Authenticate an administrator |

## Deployment

**Frontend:** GitHub Actions builds the Vue app from `after-school-frontend/` and publishes the generated `dist/` files to GitHub Pages. The Vite production base path is `/After-School/`.

**Backend:** Render runs the Express application from `after-school-backend/` using `npm install` and `npm start`. Configure MongoDB credentials and other backend environment variables in Render rather than committing `.env` files.

**CORS:** Configure the backend to allow your GitHub Pages origin (`https://manikiranuni.github.io`). To support both local development and the deployed frontend, the Express CORS configuration must explicitly handle both origins.

## Important limitations and security notes

- The current checkout stores orders and adjusts availability in separate requests. Concurrent orders or interrupted requests can create inconsistencies; a server-controlled atomic booking operation is recommended for production use.
- Review access control before accepting real customer information. In particular, the order-listing and lesson-space update endpoints must not be publicly writable/readable where inappropriate.
- Images uploaded to Render's local filesystem may be lost when the service restarts or redeploys. Use persistent object/image storage for long-term uploads.
- Never commit MongoDB connection strings, admin passwords, JWT secrets or other private credentials to GitHub.

## Coursework

This project is developed for **CST3144 Full Stack Development**. Ensure the final submission, implementation details and declaration of any AI assistance comply with the module's coursework requirements.
