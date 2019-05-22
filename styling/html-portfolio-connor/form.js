var formDemoText = "";

document.getElementById("formDemoInput").addEventListener("click", function () {
    window.addEventListener('keydown', function (value) {
        console.log(value)
        if (value.keyCode > 47 && value.keyCode < 91 || value.keyCode === 32) {
            formDemoText += value.key
            document.getElementById("formDemoHtml").innerHTML = formDemoText;
        } else if (value.keyCode === 8) {
            formDemoText = formDemoText.slice(0, -1);
            document.getElementById("formDemoHtml").innerHTML = formDemoText;
        }
        
    })
});

