
// const express = require("express");

// const app = express();

// const PORT = 3000;

// // Middleware
// app.use(express.json());

// // Home route
// app.get("/", (req, res) => {
//     res.send("Welcome! Express Server is Running Successfully.");
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [];

// GET API - Display all students
app.get("/api/students", (req, res) => {
    res.status(200).json({
        message: "Student records fetched successfully",
        students: students
    });
});

// POST API - Create student
app.post("/api/students", (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate mandatory fields
    if (
        id === undefined ||
        !name ||
        !email ||
        !course ||
        age === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check duplicate ID
    if (students.some(student => student.id === id)) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    // Create student
    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        student: student
    });
});

// Home route
app.get("/", (req, res) => {
    res.send("Express Server is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
