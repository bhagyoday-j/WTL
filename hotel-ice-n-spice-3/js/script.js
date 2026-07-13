const themeBtn = document.getElementById("themeBtn");

if(themeBtn){
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

const form = document.getElementById("contactForm");

if(form){
    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        alert("Message Sent Successfully!");
        form.reset();
    });
}