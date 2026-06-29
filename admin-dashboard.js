const attendanceURL = 'http://localhost:3002/attendance';

async function getLiveUpdates() {
    try {
        const response = await fetch(attendanceURL);
        if(!response.ok) return;
         const logs = await response.json();

         const updateContainer = document.getElementById("liveUpdate");

        //  make updateContainer empty
        updateContainer.innerHTML = "";

        // if nothing is the Container, return a message

        if(logs.length === 0) {
            updateContainer.innerHTML = `<p class = "text-black text-sm">No Logs yet. Please Check again later</p>`; return}

            // Reverse method ensures the newest log in is at the top
            logs.reverse().forEach(log => {
                const logCard = document.createElement("div");
                logCard.className = "flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl"
                logCard.innerHTML = `
                <div>
                <p>TSC Number</p>
                <p>${log.teacherId}</p>
                </div>
                <span>
                ${log.direction}
                </span>`;
                updateContainer.appendChild(logCard)
            });

        
    }catch(error) {
        console.log("Error updating updates:", error);
    }
}
document.addEventListener("DOMContentLoaded", getLiveUpdates);

// setting for changes after 5s

setInterval(getLiveUpdates, 5000);