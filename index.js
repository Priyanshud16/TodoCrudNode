const express = require("express");
const userdata = require("./db.json");
const fs = require("fs");

let data = userdata.todos;

const server = express();
server.use(express.json());

const port = 8080;


server.get("/", (req, res) => {
    let content = "";

    data.forEach((ele) => {
        content += `<h3>Id is ${ele.id} Title is ${ele.title} Status is ${ele.status}</h3>`;
    })
    res.send(content);
})


server.post("/addtodo", (req, res) => {
    const body = req.body;
    let newObj = { ...body, id: data.length + 1 }
    data.push(newObj)
    let gotoObj = { todos: data };
    console.log(gotoObj);

    fs.writeFileSync("./db.json", JSON.stringify(gotoObj));
    res.send(gotoObj);
})


server.put("/updatetodo", (req, res) => {

    let uodateData = data.map((ele) => {
        if (ele.id % 2 == 0) {
            ele.status = true;
            return ele;
        }
        else {
            return ele;
        }
    })

    let updatedObj = { todos: uodateData }
    console.log(updatedObj);
    fs.writeFileSync("./db.json", JSON.stringify(updatedObj));
    res.send(updatedObj);
})


server.delete("/deletetodo", (req, res) => {

    let deletetodo = data.filter((ele) => {
        if (ele.status != true) {
            return ele;
        }
    })

    let deleteObj = { todos: deletetodo }
    console.log(deletetodo);
    fs.writeFileSync("./db.json", JSON.stringify(deleteObj));
    res.send(deleteObj);
})


server.listen(port, () => {
    console.log(`server is running on ${port}`);
})