// ==========================================
// JOB APPLICATION TRACKER
// ==========================================


// Get HTML elements
const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const locationFilter = document.getElementById("locationFilter");

const applicationsList =
    document.getElementById("applicationsList");

const addApplicationBtn =
    document.getElementById("addApplicationBtn");


// ==========================================
// LOAD APPLICATIONS FROM LOCAL STORAGE
// ==========================================

let applications =
    JSON.parse(localStorage.getItem("applications")) || [

        {
            company: "TCS",
            role: "Software Engineer",
            location: "Hyderabad",
            date: "Sep 15, 2026",
            salary: "₹5 LPA",
            status: "Applied"
        },

        {
            company: "Infosys",
            role: "Python Developer",
            location: "Bangalore",
            date: "Sep 13, 2026",
            salary: "₹6 LPA",
            status: "Interview"
        },

        {
            company: "Wipro",
            role: "Web Developer",
            location: "Hyderabad",
            date: "Sep 10, 2026",
            salary: "₹4.5 LPA",
            status: "Rejected"
        },

        {
            company: "TechNova",
            role: "Full Stack Developer",
            location: "Chennai",
            date: "Sep 08, 2026",
            salary: "₹7 LPA",
            status: "Applied"
        },

        {
            company: "Accenture",
            role: "Associate Software Engineer",
            location: "Hyderabad",
            date: "Sep 05, 2026",
            salary: "₹5.5 LPA",
            status: "Interview"
        }

    ];


// ==========================================
// SAVE TO LOCAL STORAGE
// ==========================================

function saveApplications() {

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

}


// ==========================================
// DISPLAY APPLICATIONS
// ==========================================

function displayApplications(data) {

    applicationsList.innerHTML = "";


    if (data.length === 0) {

        applicationsList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No applications found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(function (application) {

        const realIndex =
            applications.indexOf(application);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${application.company}
                </strong>
            </td>

            <td>
                ${application.role}
            </td>

            <td>
                ${application.location}
            </td>

            <td>
                ${application.date}
            </td>

            <td>

                <span class="status ${application.status.toLowerCase()}">

                    ${application.status}

                </span>

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editApplication(${realIndex})">

                    ✏️

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteApplication(${realIndex})">

                    🗑️

                </button>

            </td>

        `;


        applicationsList.appendChild(row);

    });

}


// Show applications when page opens

displayApplications(applications);


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    filterApplications
);


// ==========================================
// STATUS FILTER
// ==========================================

statusFilter.addEventListener(
    "change",
    filterApplications
);


// ==========================================
// LOCATION FILTER
// ==========================================

locationFilter.addEventListener(
    "change",
    filterApplications
);


// ==========================================
// FILTER FUNCTION
// ==========================================

function filterApplications() {

    const searchText =
        searchInput.value.toLowerCase();


    const selectedStatus =
        statusFilter.value;


    const selectedLocation =
        locationFilter.value;


    const filtered =
        applications.filter(function (application) {


            const matchesSearch =

                application.company
                    .toLowerCase()
                    .includes(searchText)

                ||

                application.role
                    .toLowerCase()
                    .includes(searchText);


            const matchesStatus =

                selectedStatus === "all"

                ||

                application.status === selectedStatus;


            const matchesLocation =

                selectedLocation === "all"

                ||

                application.location === selectedLocation;


            return (

                matchesSearch

                &&

                matchesStatus

                &&

                matchesLocation

            );

        });


    displayApplications(filtered);

}


// ==========================================
// DELETE APPLICATION
// ==========================================

function deleteApplication(index) {

    const application =
        applications[index];


    const confirmation =
        confirm(
            `Delete ${application.company} application?`
        );


    if (confirmation) {

        applications.splice(index, 1);


        saveApplications();


        filterApplications();


        alert(
            "Application deleted successfully!"
        );

    }

}


// ==========================================
// EDIT APPLICATION
// ==========================================

function editApplication(index) {

    const application =
        applications[index];


    const company =
        prompt(
            "Enter company name:",
            application.company
        );


    if (company === null) {
        return;
    }


    const role =
        prompt(
            "Enter job role:",
            application.role
        );


    if (role === null) {
        return;
    }


    const location =
        prompt(
            "Enter location:",
            application.location
        );


    if (location === null) {
        return;
    }


    application.company =
        company;

    application.role =
        role;

    application.location =
        location;


    saveApplications();


    filterApplications();


    alert(
        "Application updated successfully!"
    );

}


// ==========================================
// ADD APPLICATION MODAL
// ==========================================

const applicationModal =
    document.getElementById("applicationModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const applicationForm =
    document.getElementById("applicationForm");


// Open modal

addApplicationBtn.addEventListener(
    "click",
    function () {

        applicationModal.classList.add("show");

    }
);


// Close modal

closeModal.addEventListener(
    "click",
    function () {

        applicationModal.classList.remove("show");

    }
);


// Cancel modal

cancelModal.addEventListener(
    "click",
    function () {

        applicationModal.classList.remove("show");

        applicationForm.reset();

    }
);


// ==========================================
// SAVE NEW APPLICATION
// ==========================================

applicationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const company =
            document.getElementById("company").value;

        const role =
            document.getElementById("role").value;

        const location =
            document.getElementById("location").value;

        const date =
            document.getElementById("date").value;

        const salary =
            document.getElementById("salary").value;

        const status =
            document.getElementById("status").value;

        const jobUrl =
            document.getElementById("jobUrl").value;

        const notes =
            document.getElementById("notes").value;


        const newApplication = {

            company: company,

            role: role,

            location: location,

            date: date,

            salary: salary,

            status: status,

            jobUrl: jobUrl,

            notes: notes

        };


        // Add application

        applications.push(
            newApplication
        );


        // ⭐ SAVE IT PERMANENTLY

        saveApplications();


        // Update table

        filterApplications();


        // Clear form

        applicationForm.reset();


        // Close popup

        applicationModal.classList.remove("show");


        alert(
            "Application saved successfully! 🎉"
        );

    }
);