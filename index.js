async function predict() {
    let inputValue = document.getElementById("inputValue").value;
    if (inputValue<0 || inputValue>100 || inputValue==""){
        alert("Density should range from 0 to 100");
        document.getElementById("inputValue").value="";
        return;
    }
    let sentPackage= { a: parseInt(inputValue)}
    console.log(sentPackage);
    console.log(JSON.stringify(sentPackage));
    try {
        const response = await fetch('http://127.0.0.1:8000/predict/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sentPackage)
        });
        console.log(response)
        const res = await response.json()
        console.log(res);
        if (res.prediction==1){
            document.getElementById('out').textContent= "Traffic is Low"    
        }
        else{
            document.getElementById('out').textContent= "Traffic is High"    
        }
    } catch (error) {
        console.error('Error:', error);
    }
}