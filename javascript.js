
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Load student data from localStorage
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

// Display all studentss
function displayStudents() {
    table.innerHTML = "";

    students.forEach(function(student) {
        const row = document.createElement("tr");

        [student.id, student.name, student.course, student.marks]
            .forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Add a new student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = Number(document.getElementById("marks").value);

    if (!id || !name || !course ||
        marks < 0 || marks > 100) {
        alert("Please enter valid student details.");
        return;
    }

    // Prevent duplicate student IDs
    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    // Create a JSON-compatible student object
    const student = {
        id: id,
        name: name,
        course: course,
        marks: marks
    };

    students.push(student);

    // Save array of student objects as JSON
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    form.reset();
});

// Delete a student
function deleteStudent(id) {
    students = students.filter(function(student) {
        return student.id !== id;
    });

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Show saved records when the page opens
displayStudents();
