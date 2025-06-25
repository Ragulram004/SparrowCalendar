# 📅 Sparrow Calendar App
A modern, responsive Google Calendar–like application built with **React**, **Zustand** for global state, and **TailwindCSS** for styling. Easily manage events, label them with colors, and navigate through months and years.

---
![image](https://github.com/user-attachments/assets/d5ff7872-709d-4990-9a1a-b6b4b3784d05)
---

## 🚀 Features

- ✅ Month-based calendar grid with day cells
- ✅ Add, edit, and delete events
- ✅ Label-based event categorization with color indicators
- ✅ Modal-based event form with dynamic state
- ✅ Filter events by selected labels
- ✅ Persist data using `localStorage`
- ✅ Highlight today, current day, and shade event days
- ✅ Responsive UI using TailwindCSS
- ✅ Zustand-powered global state management

---

## 🛠 Tech Stack

- **React** – frontend UI
- **Zustand** – lightweight global state store
- **TailwindCSS** – utility-first styling
- **Day.js** – date/time formatting
- **React Icons** – icon library
- **React Hot Toast** – feedback/toast notifications
- **LocalStorage** – persistent event saving

---

## 📁 Folder Structure

<div>
  📦src
┣ 📂components
┃ ┣ 📄Header.jsx
┃ ┣ 📄Sidebar.jsx
┃ ┣ 📄MonthCalendar.jsx
┃ ┣ 📄Day.jsx
┃ ┣ 📄EventModel.jsx
┃ ┣ 📄MyLabels.jsx
┃ ┗ 📄Footer.jsx
┣ 📂Store
┃ ┗ 📄useCalendarStore.js
┣ 📂utils
┃ ┗ 📄helper.js
┣ 📄App.jsx
┗ 📄main.jsx
</div>



---

## 🧠 Zustand Store Overview

Stored in `useCalendarStore.js`, Zustand manages:

- `monthIndex`, `currentYear` → for calendar navigation
- `savedEvents` → all events (persisted in localStorage)
- `filteredEvents` → events filtered by active labels
- `showEventModal`, `selectedEvent`, `daySelected`
- `labels` → label colors and filters

---

## 🖥 Installation

```bash
# Clone the repository
git clone [https://github.com/your-username/sparrow-calendar.git](https://github.com/Ragulram004/SparrowCalendar.git)
cd sparrowCalendar

# Install dependencies
npm install

# Run locally
npm run dev
