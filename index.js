// express server

// getting express module
const express = require('express')
const app = express() // we will get app object
const port = 3000
const bookBaseUrl = '/api/v1/books'

// app.get('/', (req, res) => {
//   console.log(req.query);
//   res.send('Hello World check!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// create read update delete
let books = []

app.use(express.json())
//create
app.post('/api/v1/books' , (req,res) => {
    console.log(req.body);
    const {name,author} = req.body;
    // validations
    book_validation(name,author);
    //save data
    const book = {name,author}
   books.push(book)
   // send response 
   res.status(201).send(book)
})

// Read
app.get(bookBaseUrl,(req,res) => {
    res.status(200).send(books);
})


// Update

app.put((bookBaseUrl+'/:id'),function(req,res) {
    console.log(req.params);
    const id = req.params.id;
    console.log("id"+id);
    if(id == undefined || id < 0 )
    {
        res.status(400).send({error:"invalid id"})
        return
    }
    const book = books[id];
    console.log("book"+books);
    if(book == undefined )
    {
        res.status(400).send({error:"book is invalid"})
        return
    }
    const {name,author} = req.body;
    book_validation(name,author);
    const updatedBook = {name,author};
    books[id]=updatedBook
    res.status(200).send(updatedBook)
})

app.delete((bookBaseUrl+'/:id'),function(req,res) {
    const id = req.params.id;
    console.log("id"+id);
    if(id == undefined || id < 0 )
    {
        res.status(400).send({error:"invalid id"})
        return
    }
    const book = books[id];
    console.log("book"+books);
    if(book == undefined )
    {
        res.status(400).send({error:"book is invalid"})
        return
    }
    console.log(req.params);
    // to delete something in array
    books.splice(id,1);
    res.status(200).send(books)
})

function book_validation(name,author)
{
    // validations
    if(name == undefined || name.length == 0)
    {
        res.status(400).send({error:"Name is empty"})
    }
    if(author == undefined || author.length == 0)
    {
        res.status(400).send({error:"author name empty"})
    }
}