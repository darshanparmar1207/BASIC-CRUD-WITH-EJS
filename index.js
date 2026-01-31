const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render("index");
})

app.get('/read', async(req,res) => {
    let allusers = await userModel.find()
    res.render("read" , {users: allusers});
})

// that is post data 
app.post('/create', async (req,res) => {
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    });

    res.redirect("/read")
})

// that is delete data
app.get('/delete/:id', async(req,res) => {
    let allusers = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read");
})


// that is update data 
app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findById(req.params.id);
    res.render("edit", { user });
});
// that code update and post data 
app.post('/update/:userid', async (req, res) => {
    let {image, name, email} = req.body;
    await userModel.findOneAndUpdate(req.params.id, {image, name, email});
    res.redirect("/read");
});

app.listen(3000);