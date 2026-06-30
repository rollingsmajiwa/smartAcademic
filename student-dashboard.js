const URL = "http://localhost:3002";
let activeExamId = "";
let countdown = null;



// fetching exams from database endpoint
async function getExams() {
    try {
        const reslt = await fetch(`${URL}/exams`);
        const exams = await reslt.json();
        const listDiv = document.getElementById("examList");
        listDiv.innerHTML = "";
        exams.forEach(exam => {
            const duration = exam.durationMinute || 2;
            const safeTitle = exam.title.replace(/\\/g, "\\\\").replace(/'/g, "\\' ");
            listDiv.innerHTML += `
            <div class = "flex justify-between items-center p-3 w-md border border-black rounded-md">
           
            <div>
             <p class = "text-gray-700">${exam.title}</p>
            <span class ="text-sm text-gray-400 block">Duration: ${duration} Minutes</span>
            </div>
            <button onclick = "startExam('${exam.id}', '${exam.title}', ${duration})" class = "bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-500">Start</button>
            
            </div>
            `
        });

    }catch (error) {
        console.log(document.getElementById("status").innerText="Error connecting to server")
    }
}

// show the exam box and start countdown

function startExam(id, title, minute) {
    activeExamId = id;
    document.getElementById("examTitle").innerText = title;

    // switch views
    document.getElementById("lobby").classList.replace("block", "hidden");
    document.getElementById("examBox").classList.replace("hidden", "block");

    let timeLeft = minute * 60;
    const timerDisplay = document.getElementById("timer");
    countdown = setInterval(()=> {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        timerDisplay.innerText = m + ":" + (s<10 ? "0" : "") + s;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time is Up!")
            submitExam()
        }
    }, 1000);
}

// send the students result

async function submitExam() {
    clearInterval(countdown);
    const studentrsult = document.getElementById("answers").value;

    const studeData = {
        examId: activeExamId,
        answers: studentrsult,
        submittedAt: new Date().toISOString()
    };
    try {
        await fetch(`${URL}/exam-submission`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(studeData)
        });
        alert("Submitted");
        location.reload();
    }
    catch (error) {
        alert("Failed to submit")
    }
}
getExams();