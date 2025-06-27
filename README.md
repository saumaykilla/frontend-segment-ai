# 📄 Document Parser – Interview Submission

This project is a document parser web app built with **Next.js** and **Supabase**. Users can upload and manage documents with CRUD functionality, secured by Supabase’s Row-Level Security.

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/saumay23/document-parser
cd document-parser
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Once created, go to **Settings > API** and copy:
   - **Project URL**
   - **Anon Public Key**

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗄️ Database Setup

### Create Tables in Supabase

#### `documents` Table

| Field       | Type                  |
|-------------|-----------------------|
| `id`        | UUID (Primary Key)    |
| `created_at`| Timestamp (default now()) |
| `rows`      | JSONB or TEXT         |
| `user_id`   | UUID (foreign key to `auth.users.id`) |

#### `productCatalog` Table

Import the `productCatalog.csv` or create a table with fields matching the CSV columns 


---

### 🔐 Add Row-Level Security (RLS)

Enable **RLS** on the `documents` table and add these policies:

```sql
-- Select Policy
CREATE POLICY "Select own documents"
ON documents
FOR SELECT
USING (auth.uid() = user_id);

-- Insert Policy
CREATE POLICY "Insert own documents"
ON documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update Policy
CREATE POLICY "Update own documents"
ON documents
FOR UPDATE
USING (auth.uid() = user_id);

-- Delete Policy
CREATE POLICY "Delete own documents"
ON documents
FOR DELETE
USING (auth.uid() = user_id);
```

Make sure **RLS is enabled** on the `documents` table.

---

## ▶️ Run the App

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📽️ Demo 


Try the demo here:  
[Demo](https://document-parser-super-base.vercel.app/)

Watch the demo here:  
[Demo Video on Google Drive](https://drive.google.com/file/d/1RyNZuEc43DhGHq2-WgGUjnUMkwiVW6Pe/view?usp=drive_link)

---

## ✅ Features

- Supabase authenticated CRUD operations on documents.
- Product catalog data upload and reference.
- Secure user data access with Row-Level Security (RLS).

## 🛠️ Built With

- **Next.js** (App Router) – Full-stack React framework
- **Tailwind CSS** – For fast, responsive UI styling
- **SuperBase** - Backend Autnentication & secure storage
- **Axios** – For handling file upload and API communication
- **React Toastify** – For user notifications