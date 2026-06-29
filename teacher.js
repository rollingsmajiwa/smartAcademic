const latFence = -1.1701575;
const lonFence = 36.82750325;
const radius = 0.002;


//function to get GPS

async function runGeoFence(statusDirect) {
  const statusLabel =document.getElementById("status");
    const teacherInputId = document.getElementById("teacherId").value;
    

    if(!teacherInputId) {
        statusLabel.innerText = "Please enter your TSC Number!"
        statusLabel.style.color = "red";
        return;
    }
    
        statusLabel.innerText = "Checking School location.."
        statusLabel.style.color = "orange";
    
    //ask the browser for the coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
    try {
        let userLat = position.coords.latitude;
        let userLon = position.coords.longitude;

        //to check the location my browser is reading
        console.log("my exact location", userLat, userLon);

        //calculate difference in distance
        const latDistance = Math.abs(userLat - latFence);
        const lonDistance = Math.abs(userLon - lonFence);

        const isInside = latDistance < radius && lonDistance < radius;

        if (isInside) {
            statusLabel.innerText = "You are inside the school";
            const response = await fetch('http://localhost:3002/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    teacherId: teacherInputId,
                    direction: statusDirect
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                statusLabel.innerText = `Success! Clocked In ${statusDirect}`
                statusLabel.style.color = "green";
                console.log("Data saved", result);
            }
            else {
                statusLabel.innerText = "Log rejected!"
                statusLabel.style.color = "red"
            }
        }
         else {
             statusLabel.innerText = "You are outside the school compound";
             statusLabel.style.color = "red";
         }
}catch (error) {
    document.getElementById("status").innerText = "GPS Error";
}
    }, (gpsError) => {
        statusLabel.innerText = "GPS ERROR! permission blocked";
        statusLabel.style.color = "red";
        console.log("Hardware GPS Code Error")
    });
}

// Adding and Publishing exams




