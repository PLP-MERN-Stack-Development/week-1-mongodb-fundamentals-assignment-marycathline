📚 Bookstore MongoDB Project
This repository contains MongoDB operations for managing a bookstore collection, including inserting, querying, updating, deleting, aggregating, and indexing books.

🛠️ Setup Instructions
1. 📂 Clone the Repository
bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. 🧩 Start MongoDB
Ensure MongoDB is installed and running. Use the MongoDB shell or a GUI like MongoDB Compass.

🏗️ Database and Collection Setup
3. 🗃️ Create the plp_bookstore Database and books Collection

use plp_bookstore

db.createCollection("books")
4. 📥 Insert Sample Books
db.books.insertMany([
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 15.99,
    published_year: 1988,
    in_stock: true
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    price: 20.00,
    published_year: 2018,
    in_stock: true
  }
  // Add more books here...
])
🔍 Queries and Operations
### Task 3: Advanced Queries
- Write a query to find books that are both in stock and published after 2010
- Use projection to return only the title, author, and price fields in your queries
- Implement sorting to display books by price (both ascending and descending)
- Use the `limit` and `skip` methods to implement pagination (5 books per page)

### Task 4: Aggregation Pipeline 
- Create an aggregation pipeline to calculate the average price of books by genre
- Create an aggregation pipeline to find the author with the most books in the collection
- Implement a pipeline that groups books by publication decade and counts them

### Task 5: Indexing
- Create an index on the `title` field for faster searches
- Create a compound index on `author` and `published_year`
- Use the `explain()` method to demonstrate the performance improvement with your indexes
