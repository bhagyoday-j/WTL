const fetchBtn = document.getElementById("fetchBtn");
const status = document.getElementById("status");
const userContainer = document.getElementById("userContainer");

fetchBtn.addEventListener("click", fetchUsers);

async function fetchUsers() {

    userContainer.innerHTML = "";
    status.innerHTML = "Loading users...";

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const users = await response.json();

        status.innerHTML = `✅ ${users.length} Users Loaded Successfully`;

        users.forEach(user => {

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="avatar">
                    ${user.name.charAt(0)}
                </div>

                <h2>${user.name}</h2>

                <p><strong>Email:</strong> ${user.email}</p>

                <p><strong>Phone:</strong> ${user.phone}</p>

                <p><strong>Website:</strong> ${user.website}</p>

                <p><strong>Company:</strong> ${user.company.name}</p>

                <p><strong>City:</strong> ${user.address.city}</p>
            `;

            userContainer.appendChild(card);

        });

    } catch (error) {

        status.innerHTML = `<span class="error">${error.message}</span>`;

    }

}