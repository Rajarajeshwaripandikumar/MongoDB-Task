# Zen Class MongoDB Project

This project designs and queries a **MongoDB database** for the Zen Class programme.

## 📂 Collections
- `users`
- `mentors`
- `topics`
- `tasks`
- `attendance`
- `codekata`
- `company_drives`

## ⚡ Queries Implemented
1. Topics & tasks taught in October  
2. Company drives between **15–31 Oct 2020**  
3. Company drives with students who appeared  
4. Number of CodeKata problems solved by each user  
5. Mentors with more than 15 mentees  
6. Users absent **and** not submitted tasks between **15–31 Oct 2020**

## 🚀 How to Run
```bash
# 1. Install dependencies
npm install mongodb

# 2. Run queries (auto-seeds if empty)
node run_queries.js
