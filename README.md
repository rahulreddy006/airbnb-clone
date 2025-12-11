# 🏡 Airbnb Clone — Full-Stack Lodging Platform

A full-stack Airbnb-style clone built with **Node.js**, **Express**, and **MongoDB**.  
Features user authentication (Passport.js), full CRUD for listings & reviews, Cloudinary image uploads, and MapTiler integration for maps. Deployed with a live backend + connected database.

---

## 🔗 Live Demo
https://rahulreddy-firstproject.onrender.com/

## 📦 Repository
https://github.com/rahulreddy006/airbnb-clone

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas, Mongoose  
- **Auth:** Passport.js (local strategy)  
- **Storage / Media:** Cloudinary  
- **Maps:** MapTiler API  
- **Templating / Views:** EJS (or your chosen view engine)  
- **Deployment:** Render (backend), MongoDB Atlas (DB)

---

## ⭐ Key Features

- Full CRUD for **Listings**
  - Create listing with title, description, price, images, location coordinates
  - Edit & Delete (authorization: only owner can edit/delete)
- **Image Uploads**
  - Upload multiple listing images
  - Images stored & served via Cloudinary
- **Reviews**
  - Add and delete reviews per listing (ratings + comments)
- **Authentication & Authorization**
  - Signup / Login (Passport.js)
  - Session-based auth with protected routes
- **Maps**
  - Display listing location on a map via MapTiler
- **Deployment**
  - Live backend connected to MongoDB Atlas

---

## 📁 Project Structure (example)
airbnb-clone/
├── app.js
├── package.json
├── routes/
│ ├── listings.js
│ ├── reviews.js
│ └── auth.js
├── controllers/
├── models/
│ ├── User.js
│ ├── Listing.js
│ └── Review.js
├── public/
│ └── (static assets)
├── views/
│ └── (EJS templates)
└── utils/
└── mapterUtil.js

---

## ⚙️ Setup & Run (Local)

1. Clone repo
```bash
git clone https://github.com/rahulreddy006/airbnb-clone
cd airbnb-clone

npm install

PORT=3000
MONGO_URL=<your_mongodb_atlas_connection_string>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
MAPTILER_API_KEY=<your_maptiler_key>
SESSION_SECRET=<a_secure_session_secret>

Run locally

npm run dev    # if you use nodemon
# or
npm start


Open http://localhost:3000 in your browser.

✅ Routes (High-level)

Auth

GET /register — Register page

POST /register — Create user

GET /login — Login page

POST /login — Authenticate (Passport)

GET /logout — Logout

Listings

GET /listings — All listings

GET /listings/new — New listing form

POST /listings — Create listing (with image upload)

GET /listings/:id — View listing

GET /listings/:id/edit — Edit form

PUT /listings/:id — Update listing

DELETE /listings/:id — Delete listing

Reviews

POST /listings/:id/reviews — Add review

DELETE /listings/:id/reviews/:reviewId — Delete review (owner or admin)

(Exact paths may vary — update these if your routes are named differently.)

🔐 Environment Variables (recap)
MONGO_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAPTILER_API_KEY=
SESSION_SECRET=
PORT=

🧪 Notes & Tips

Ensure Cloudinary credentials are correct so image uploads succeed.

MapTiler free tier requires an API key; add it in your views where you initialise the map.

For production, use secure session store (e.g., connect-mongo) instead of in-memory sessions.

Consider rate limiting and input validation for production readiness.

📄 License

MIT

🙏 Acknowledgements

Built to practice full-stack concepts: authentication, file upload, third-party APIs (MapTiler & Cloudinary), and real-world CRUD patterns.

