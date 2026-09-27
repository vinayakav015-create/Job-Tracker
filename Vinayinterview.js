const addInterviewBtn =
    document.getElementById("addInterviewBtn");


addInterviewBtn.addEventListener(
    "click",
    function () {

        const company =
            prompt("Enter company name:");

        if (!company) {
            return;
        }


        const role =
            prompt("Enter job role:");

        if (!role) {
            return;
        }


        const date =
            prompt("Enter interview date:");

        if (!date) {
            return;
        }


        const time =
            prompt("Enter interview time:");

        if (!time) {
            return;
        }


        alert(
            `Interview added for ${company}!`
        );

    }
);