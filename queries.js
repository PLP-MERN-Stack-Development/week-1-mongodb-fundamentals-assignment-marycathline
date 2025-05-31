
//creating database and switching to it
use plp_bookstore


//creating collection for books
db.createCollection("books")


//inserting books into the database
db.books.insertMany([
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Historical Fiction",
    published_year: 1958,
    price: 12.99,
    in_stock: true,
    pages: 209,
    publisher: "Heinemann"
  },
  {
    title: "Half of a Yellow Sun",
    author: "Chimamanda Ngozi Adichie",
    genre: "Historical Fiction",
    published_year: 2006,
    price: 14.99,
    in_stock: true,
    pages: 448,
    publisher: "Knopf/Anchor"
  },
  {
    title: "So Long a Letter",
    author: "Mariama Bâ",
    genre: "Epistolary Fiction",
    published_year: 1979,
    price: 9.95,
    in_stock: false,
    pages: 90,
    publisher: "Heinemann"
  },
  {
    title: "The Famished Road",
    author: "Ben Okri",
    genre: "Magical Realism",
    published_year: 1991,
    price: 13.50,
    in_stock: true,
    pages: 500,
    publisher: "Jonathan Cape"
  },
  {
    title: "We Need New Names",
    author: "NoViolet Bulawayo",
    genre: "Literary Fiction",
    published_year: 2013,
    price: 11.75,
    in_stock: true,
    pages: 304,
    publisher: "Reagan Arthur Books"
  },
  {
    title: "Petals of Blood",
    author: "Ngugi wa Thiong'o",
    genre: "Political Fiction",
    published_year: 1977,
    price: 10.00,
    in_stock: false,
    pages: 432,
    publisher: "Heinemann"
  },
  {
    title: "Season of Migration to the North",
    author: "Tayeb Salih",
    genre: "Postcolonial Fiction",
    published_year: 1996,
    price: 12.00,
    in_stock: true,
    pages: 169,
    publisher: "Heinemann"
  },
  {
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    genre: "Contemporary Fiction",
    published_year: 2013,
    price: 15.99,
    in_stock: true,
    pages: 588,
    publisher: "Alfred A. Knopf"
  },
  {
    title: "The Hairdresser of Harare",
    author: "Tendai Huchu",
    genre: "Satire",
    published_year: 2010,
    price: 10.50,
    in_stock: true,
    pages: 256,
    publisher: "Weaver Press"
  },
  {
  title: "The Shadow of Imana",
  author: "Veronique Tadjo",
  genre: "Non-fiction",
  published_year: 2000,
  price: 13.25,
  in_stock: true,
  pages: 130,
  publisher: "Heinemann"
  }
]);

//Queries
// querie to find books by a specific genre

db.books.find({genre: "Historical Fiction"})

// querie to find books published after a certain year
db.books.find({published_year: {$gt: 2000}})

// querie to find books by a specific author
db.books.find({author: "Chimamanda Ngozi Adichie"})

//querie to update the price of a book
 db.books.updateOne({title: "Petals of Blood"}, 
    {$set:{Price: 18.20}})

//querie to delete a book by title
db.books.deleteOne({title:"The Shadow of Imana"})

//querie to find books that are in stock and published after 2010

db.books.find({in_stock: true, 
    published_year:{$gt: 2010}})

//querie to use projection to return only the title, author and price
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
);


//sort books by price
// Ascending order(low to higher)

db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: 1 });

// Descending Order (High to Low)

db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: -1 });

//Using the limit and skip methods to implement pagination (5 books per page)
//Page 1 (First 5 books)
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2000 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: 1 }).limit(5).skip(0);

//Page 2 (Next 5 books)
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2000 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: 1 }).limit(5).skip(2);

//page 3

db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2000 }
  },
  {
    _id: 0,
    title: 1,
    author: 1, 
    price: 1
  }
).sort({ price: -1 }).limit(10).skip(1);

 //query to create an agregation pipeline to calculate average preice of books by genre

 db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] }
    }
  }
])

// querie to create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      author: "$_id",
      totalBooks: 1
    }
  }
])

// query to implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      bookCount: "$count"
    }
  }
])

// index
//creating an index on the title field to improve search performance
db.books.createIndex({ title: 1 });

// createing a compound index on author and published_year to optimize queries that filter by both fields

db.books.createIndex({ author: 1, published_year: -1 })

//Using the explain() method to demonstrate the performance improvement with your indexes

db.books.find({ title: "Things Fall Apart" }).explain("executionStats")

