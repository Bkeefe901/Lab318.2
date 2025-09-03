// Imports
import express from 'express';
import logReq from './middleware/loggingMiddleware.mjs';
import fs from 'fs';

// Setups
const app = express();
const PORT = 3000;


// Template Engine Def

app.engine('cool', (filePath, options, callback)=>{
    fs.readFile(filePath, (err, content)=>{
        if(err) return callback(err);

        const rendered = content.toString().replaceAll('#heading#', options.heading).replace('#content#', options.content);

        return callback(null, rendered);
    });
});

// Directory for templates:
app.set("views", "./views");
// Register template engine
app.set("view engine", "cool");


// Middleware

app.use(logReq);


// Routes
app.get("/home", (req, res)=>{
    let option = {
        heading: "Welcome to The Tunderdome!!",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    res.render("home", option);
});

app.get("/signUp", (req, res)=>{
    let option = {
        heading: "Sign Up Form",
        content: "Your email address"
    }
    res.render("signUp", option);
});

app.post("/new", (req, res)=>{
    let option = {
        heading: "You cannot join the ThunderDome!!",
        content: "Please leave!!"
    }
    res.render("new", option);
})



// Global Error Handling Middleware




// Server Listener

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
});
