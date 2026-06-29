
const examInput = document.getElementById("examInput");
const examList = document.getElementById("examList");
const examSheet = document.getElementById("examSheet");
const addBtn = document.getElementById("addBtn");
const userForm = document.getElementById("userForm");

userForm.addEventListener('submit', async function(event) {
    event.preventDefault();


    let selectedFile = examInput.value;
    if(selectedFile === "") {
       examSheet.textContent = "Please enter a file!"
       examSheet.style.color = "red";
       return;
    }

    examSheet.textContent = "";
    const examTitle = selectedFile.split('\\').pop();

    const examTime = {
        id: "exam-" + Date.now(),
        title: examTitle,
        durationMinute: "2"
    };

    try {
        const response = await fetch('http://localhost:3002/exams', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'},
                body: JSON.stringify(examTime)
        });
        if(response.ok) {
           // create li for the exams file
    let li = document.createElement("li");
    let textSpan = document.createElement("span");
    textSpan.textContent = `${examTitle}`;
    li.appendChild(textSpan);
// create remove button

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.style.color = "blue" 

    removeBtn.addEventListener("click", () => {
    li.remove();
    
});
    li.appendChild(removeBtn);
    examList.appendChild(li)
    examInput.value = "";
    }
    }catch (error) {
        console.log("Issue:", error);
    }
});








    