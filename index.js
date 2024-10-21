const tbody = document.querySelector("tbody");
let users = [];

// Function to get users from the API
const getUsers = async () => {
    try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        users = res.data; // Store users in a global variable
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Function to display users in the table
const setUsers = async () => {
    await getUsers();
    tbody.innerHTML = ""; // Clear existing rows

    users.forEach((user, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${index + 1}</td>
            <td class="fw-bold">${user.name}</td>
            <td>${user.email}</td>
            <td>
                <a href="https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}" target="_blank">
                    ${user.address.city} ${user.address.street} ${user.address.suite}
                </a>
            </td>
            <td>${user.phone}</td>
            <td><a href="https://${user.website}" target="_blank">${user.website}</a></td>
            <td>${user.company.name}</td>
            <td class="btnss">
                <button onclick="openEditModal(${user.id})" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editUserModal">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// Function to delete a user
const deleteUser = async (id) => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        alert("Muvaffaqqiyatli o'chirildi");
        setUsers(); // Refresh user list
    } catch (error) {
        console.log(error);
    }
};

// Function to add a new user
const postUser = async () => {
    const fullname = document.getElementById("name").value;
    const email = document.getElementById("email").value + "@gmail.com";
    const site = document.getElementById("site").value;

    try {
        await axios.post("https://jsonplaceholder.typicode.com/users", {
            name: fullname,
            email: email,
            website: site,
        });

        alert("Muvaffaqqiyatli qo'shildi");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("site").value = "";
        setUsers(); // Refresh user list
        myModal.hide(); // Close modal
    } catch (error) {
        console.log(error);
    }
};

// Function to open the edit modal and populate it with user data
const openEditModal = (id) => {
    const user = users.find(u => u.id === id);
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email.split("@")[0]; // Get the username part
    document.getElementById("editSite").value = user.website;

    const editSaveButton = document.getElementById('editSaveButton');
    editSaveButton.onclick = function () {
        putUser(id); // Call update function
    };
    myModal.hide(); // Hide add user modal if open
};

// Function to update user information
const putUser = async (id) => {
    const fullname = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value + "@gmail.com";
    const site = document.getElementById("editSite").value;

    try {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
            name: fullname,
            email: email,
            website: site,
        });

        alert("Ma'lumotlar muvaffaqqiyatli tahrirlandi");
        setUsers(); // Refresh user list
        const editModal = bootstrap.Modal.getInstance(document.getElementById("editUserModal"));
        editModal.hide(); // Close edit modal
    } catch (error) {
        console.log(error);
    }
};

// Initial call to populate user data on page load
setUsers();
