const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');

const blogRoutes= require('./routes/blogRoutes');

const { result } = require('lodash');
const { redirect } = require('statuses');

const app=express();

//connect mongodb
const dbURI='mongodb+srv://abdullarauf:test123@blogstutes.xovdyzh.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine

app.set('view engine','ejs');

//listen for request

//mongoose and mongo sand box
// app.get('/add-blog',(req,res)=>{
//     const blog= new Blog({
//         title:'new Blog',
//         snippet:'About my new Blog',
//         body:'more about my new Blog'
//     });
//     blog.save()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });
// app.get('/single-blog',(req,res)=>{
//     Blog.findById('64feaaa4cb6d158b8193375d ')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

//middleware example
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.redirect('/blogs');});


app.get('/about',(req,res)=>{
    res.render('about',{ title : 'About'});
});
//blog routes
app.use('/blogs',blogRoutes);



//404 page
app.use((req,res)=>{
    res.status(404).render('404',{ title : '404'});
});