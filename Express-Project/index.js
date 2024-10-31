const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000; 
const users = require("./MOCK_DATA.json");

//middleware - (plugin)
app.use(express.urlencoded({extended : false}))

//Routes (to make our api hybrid we must add component to render html on mobile application)
app.get("/users", (req, res) => {
    const html = 
    `<ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    
    </ul>`;
    res.send(html);
})


//REST API
app.get("/api/users", (req,res) =>{
    res.json(users);
})


app.route("/api/users/:id")
.get((req,res) =>{
    //read info of user with id
    const id = Number(req.params.id);
    const user =  users.find((user) =>  user.id === id);
    return res.json(user);

}).patch((req , res) => {
     //edit use with id
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    if (body.first_name) user.first_name = body.first_name;
    if (body.last_name) user.last_name = body.last_name;
    if (body.email) user.email = body.email
    res.json(user);
 }).delete((req,res) => {
        //delete user with id
        const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);
        users.splice(index, 1);
        res.json(users);
})

app.post("/api/users" , (req,res) =>{

    //todo : create new user
    const body =  req.body;
    users.push({...body,    id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err, data) =>{
        return res.json({status: "success" , id : users.length})
    })
    
})



app.listen(PORT , ()=> {console.log(`Server started at PORT${PORT}`)}) //callback function
