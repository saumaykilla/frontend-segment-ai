# 📄 Document Processing Demo

This is a web-based demo of an automated document extraction and matching system. Users can upload a document (e.g., a PDF), review and edit the extracted data, and then view AI-generated match suggestions based on each entry.

🎥 **Demo Video**: [Watch Demo on Google Drive](https://drive.google.com/file/d/1wRBWADmmY6YjOxuUUJ2EoLQW1u0ZmExK/view?usp=drive_link)



## 📦 Setup Instructions

Clone the repository and install dependencies using [Yarn](https://yarnpkg.com/):

```bash
git clone https://github.com/saumay23/document-parser.git
cd document-parser
yarn install
yarn dev


## 🚀 How to Try the Demo

1. **Click "Try Demo"** to launch the application.
2. **Upload a File** (PDF preferred). Supported formats: PDF, DOCX, JPG, PNG.
3. Wait a few seconds while the system processes the document.
4. **Extract Tab**:
   - Shows the extracted line items.
   - You can manually edit fields if needed.
5. **Match Tab**:
   - Displays top AI-generated match results for each item.
   - You can choose the best match from a dropdown list.
6. **Click "Save"** to combine the selected matches with the extracted data.

## 🛠️ Built With

- **Next.js** (App Router) – Full-stack React framework
- **Tailwind CSS** – For fast, responsive UI styling
- **Axios** – For handling file upload and API communication
- **React Toastify** – For user notifications

## 📦 Features

- Intelligent document parsing and field extraction
- Editable extracted data table
- AI-driven item matching using a third-party matching API
- Clean and responsive UI

## 📁 Folder Structure (Simplified)

