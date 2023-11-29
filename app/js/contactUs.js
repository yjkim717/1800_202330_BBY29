//TODO: I don't think real PHP is needed in project so just pretend that message was sent
function sendEmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    simulateEmailSending();
}

function simulateEmailSending() {
    setTimeout(function () {
        showSuccessMessage();
    });
}

function showSuccessMessage() {
    let successMessage = document.createElement("div");
    successMessage.id = "successMessage";
    successMessage.innerText = "Email sent successfully!";

    successMessage.style.position = "fixed";
    successMessage.style.top = "50%";
    successMessage.style.left = "50%";
    successMessage.style.transform = "translate(-50%, -50%)";
    successMessage.style.background = "rgba(255, 216, 228, 0.4)";
    successMessage.style.border = "8px solid rgba(255, 216, 228, 0.9)";
    successMessage.style.backdropFilter = "blur(10px)";
    successMessage.style.color = "#625B71";
    successMessage.style.padding = "20px";
    successMessage.style.borderRadius = "8px";

    document.body.appendChild(successMessage);

    setTimeout(function () {
        let successMessage = document.getElementById("successMessage");
        if (successMessage) {
            document.body.removeChild(successMessage);
        }
    }, 3000);
}
