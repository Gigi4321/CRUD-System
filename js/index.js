// todo:________ start of variables decliration______//
//modal contact variables
var nameInput = document.getElementById("user_name");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var noticeInput = document.getElementById("message_text");
var favouriteInput = document.getElementById("favourite");
var emergencyInput = document.getElementById("emergency");

//status section varaibles
var total = 0;
var favoriteCount = 0;
var emergencyCount = 0;

//search variables
var searchInput = document.getElementById("search");

//array  that have objects of all cards
var cards = [];

//current index i use it can update info of any card
var currentIndex = null;

// todo______: start of functions _______//

// load cards from localStorage
window.onload = function () {
  var storedCards = localStorage.getItem("cards");
  if (storedCards) {
    cards = JSON.parse(storedCards);
    display(); // display cards after loading
    displayFav();
    displayEmergency();
    updateCounters();
  }
};

//add product that will show after click on add contact
function addProduct() {
  if (!validateForm()) return;

  var object_card = {
    user_name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    address: addressInput.value,
    group: groupInput.value,
    message_text: noticeInput.value,
    favourite: favouriteInput.checked,
    emergency: emergencyInput.checked,
  };

  // edit contact
  if (currentIndex !== null) {
    cards[currentIndex] = object_card;
    currentIndex = null;

    Swal.fire({
      icon: "success",
      title: "Updated Successfully",
      text: "Contact information has been updated.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
  // add new contact
  else {
    cards.push(object_card);

    Swal.fire({
      icon: "success",
      title: "Added Successfully",
      text: "New contact has been added.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
  localStorage.setItem("cards", JSON.stringify(cards));
  display();
  updateCounters();
  displayFav();
  displayEmergency();
  clear_inputs();
}

//clear function for clear forms after add product
function clear_inputs() {
  nameInput.value = null;
  phoneInput.value = null;
  emailInput.value = null;
  addressInput.value = null;
  groupInput.value = null;
  noticeInput.value = null;
  favouriteInput.checked = null;
  emergencyInput.checked = null;
}
//display all object in (array_of_object [cards] =>that have all data for every card ) to show the cards that user added
function display() {
  var cartona = "";
  if (cards.length === 0) {
    cartona += `
         <!-- empty msg for no search output or empty cards -->
                        <div class="empty-message d-flex flex-column justify-content-center align-items-center  p-5 my-5"
                            id="empty-msg">
                            <span class="icon-holder p-5 rounded-4 bg-body-secondary  text-secondary fs-3 mb-3">
                                <i class="fa-solid fa-mobile-vibrate "></i>
                            </span>
                            <h4 class="fw-medium h5 text-secondary mb-1">No contacts found</h4>
                            <p class="fw-normal text-secondary">Click "Add Contact" to get started</p>
                        </div>
        `;
  } else {
    for (var i = 0; i < cards.length; i++) {
      cartona += `
                  <!-- card -->
                            <div class="col-md-6">
                                <div class="card shadow-sm rounded-4 bg-white overflow-hidden">
                                    <!-- card header (name , favourite icon , emergecy icon , phone number) -->
                                    <div class="card-header p-3 d-flex gap-3 bg-white border-0">
                                        <div
                                            class="img-holder position-relative rounded-3 bg-primary  text-white bg-gradient fs-6" id="icons-active">
                                            <span class="fw-bold">EO</span>
                                            <div id="favourite_icon" class="${
                                              cards[i].favourite
                                                ? "d-flex"
                                                : "d-none"
                                            }">
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                            <div id="emergency_icon"  class="${
                                              cards[i].emergency
                                                ? "d-flex"
                                                : "d-none"
                                            }">
                                                <i class="fa-solid fa-heart-pulse"></i>
                                            </div>
                                        </div>
                                        <div class="text ">
                                            <h3 class="h6 fw-bold">${
                                              cards[i].user_name
                                            }</h3>
                                            <div class="phone d-flex align-items-center gap-2" id="phone_card">
                                                <div class="icon-holder bg-info-subtle fs-12 text-info rounded-2">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <div id="user_phone" class="text-secondary">
                                                    ${cards[i].phone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body p-3">
                                        <div class="email d-flex gap-3 align-items-center mb-3">
                                            <div class="icon-holder bg-warning-subtle fs-12 text-warning  rounded-2">
                                                <i class="fa-solid fa-envelope"></i>
                                            </div>
                                            <div id="user_email" class="text-secondary">
                                                ${cards[i].email}
                                            </div>
                                        </div>
                                        <div class="address d-flex gap-3 align-items-center mb-3">
                                            <div class="icon-holder bg-success-subtle fs-12 text-success  rounded-2">
                                                <i class="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div id="user_address" class="text-secondary">
                                                ${cards[i].address}
                                            </div>
                                        </div>
                                        <div class="spans d-flex gap-2">
                                            <span id="user_group_badge" class="badge text-bg-primary bg-opacity-25 text-primary p-2 ${
                                              cards[i].group
                                                ? "visible"
                                                : "invisible"
                                            } ">${cards[i].group}</span>
                                            <span id="user_emergency_badge" class="badge text-bg-danger bg-opacity-25 text-danger p-2 ${
                                              cards[i].emergency
                                                ? "visible"
                                                : "invisible"
                                            } "> <i class="fa-solid fa-heart-circle-bolt"></i> emergency </span>
                                            
                                        </div>
                                    </div>
                                    <div class="card-footer p-3 d-flex justify-content-between">
                                        <div class="left d-flex gap-2">
                                            <button class="icon-holder bg-info-subtle text-info rounded-2">
                                                <i class="fa-solid fa-phone"></i>
                                            </button>
                                            <button class="icon-holder bg-warning-subtle  text-warning  rounded-2">
                                                <i class="fa-solid fa-envelope"></i>
                                            </button>
                                        </div>
                                        <div class="right d-flex gap-1 ">
                                            <button class="icon-holder text-secondary fs-6 rounded-2" onclick="favToggle(${i})">
                                                <i class="fa-regular fa-star"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2" onclick="EmerToggle(${i})">
                                                <i class="fa-regular fa-heart"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2" data-bs-toggle="modal" data-bs-target="#contact-modal" onclick=edit(${i})>
                                                <i class="fa-solid fa-pen"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2" onclick=deleteProduct(${i})>
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `;
    }
  }
  document.getElementById("card_row").innerHTML = cartona;
}

//delete card from the array and from the interface design
function deleteProduct(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "This contact will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      cards.splice(i, 1);
      //delete from local storage
      localStorage.setItem("cards", JSON.stringify(cards));
      display();
      updateCounters();
      displayEmergency();
      displayFav();

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        text: "The contact has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

//update card details
function edit(i) {
  nameInput.value = cards[i].user_name;
  phoneInput.value = cards[i].phone;
  emailInput.value = cards[i].email;
  addressInput.value = cards[i].address;
  groupInput.value = cards[i].group;
  noticeInput.value = cards[i].message_text;
  favouriteInput.checked = cards[i].favourite;
  emergencyInput.checked = cards[i].emergency;
  currentIndex = i;
}

// function search
function search() {
  var cartona = "";
  var word = searchInput.value.toLowerCase().trim();

  // if search is empty display and stop function
  if (word === "") {
    display();
    updateCounters();
    displayEmergency();
    displayFav();
    return;
  }

  for (var i = 0; i < cards.length; i++) {
    if (
      cards[i].user_name.toLowerCase().includes(word) ||
      String(cards[i].phone).includes(word) ||
      cards[i].email.toLowerCase().includes(word) ||
      cards[i].address.toLowerCase().includes(word) ||
      cards[i].group.toLowerCase().includes(word)
    ) {
      cartona += `
        <!-- card -->
                            <div class="col-md-6">
                                <div class="card shadow-sm rounded-4 bg-white overflow-hidden">
                                    <!-- card header (name , favourite icon , emergecy icon , phone number) -->
                                    <div class="card-header p-3 d-flex gap-3 bg-white border-0">
                                        <div
                                            class="img-holder position-relative rounded-3 bg-primary  text-white bg-gradient fs-6" id="icons-active">
                                            <span class="fw-bold">EO</span>
                                            <div id="favourite_icon">
                                                <i class="fa-solid fa-star"></i>
                                            </div>
                                            <div id="emergency_icon">
                                                <i class="fa-solid fa-heart-pulse"></i>
                                            </div>
                                        </div>
                                        <div class="text ">
                                            <h3 class="h6 fw-bold">${cards[i].user_name}</h3>
                                            <div class="phone d-flex align-items-center gap-2" id="phone_card">
                                                <div class="icon-holder bg-info-subtle fs-12 text-info rounded-2">
                                                    <i class="fa-solid fa-phone"></i>
                                                </div>
                                                <div id="user_phone" class="text-secondary">
                                                    ${cards[i].phone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body p-3">
                                        <div class="email d-flex gap-3 align-items-center mb-3">
                                            <div class="icon-holder bg-warning-subtle fs-12 text-warning  rounded-2">
                                                <i class="fa-solid fa-envelope"></i>
                                            </div>
                                            <div id="user_email" class="text-secondary">
                                                ${cards[i].email}
                                            </div>
                                        </div>
                                        <div class="address d-flex gap-3 align-items-center mb-3">
                                            <div class="icon-holder bg-success-subtle fs-12 text-success  rounded-2">
                                                <i class="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div id="user_address" class="text-secondary">
                                                ${cards[i].address}
                                            </div>
                                        </div>
                                        <div class="spans d-flex gap-2">
                                            <span id="user_group_badge" class="badge text-bg-primary bg-opacity-25 text-primary p-2">${cards[i].group}</span>
                                            <span id="user_emergency_badge" class="badge text-bg-danger bg-opacity-25 text-danger p-2"><i class="fa-solid fa-heart-pulse"></i> ${cards[i].emergency}</span>
                                            
                                        </div>
                                    </div>
                                    <div class="card-footer p-3 d-flex justify-content-between">
                                        <div class="left d-flex gap-2">
                                            <button class="icon-holder bg-info-subtle text-info rounded-2">
                                                <i class="fa-solid fa-phone"></i>
                                            </button>
                                            <button class="icon-holder bg-warning-subtle  text-warning  rounded-2">
                                                <i class="fa-solid fa-envelope"></i>
                                            </button>
                                        </div>
                                        <div class="right d-flex gap-1 ">
                                            <button class="icon-holder text-secondary fs-6 rounded-2">
                                                <i class="fa-regular fa-star"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2">
                                                <i class="fa-regular fa-heart"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2" data-bs-toggle="modal" data-bs-target="#contact-modal" onclick=edit(${i})>
                                                <i class="fa-solid fa-pen"></i>
                                            </button>
                                            <button class="icon-holder text-secondary fs-6 rounded-2" onclick=deleteProduct(${i})>
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
      `;
    }
  }

  //empty msg for no search output
  if (cartona === "") {
    cartona = `
      <div class="empty-message d-flex flex-column justify-content-center align-items-center  p-5 my-5"
                            id="empty-msg">
                            <span class="icon-holder p-5 rounded-4 bg-body-secondary  text-secondary fs-3 mb-3">
                                <i class="fa-solid fa-mobile-vibrate "></i>
                            </span>
                            <h4 class="fw-medium h5 text-secondary mb-1">No contacts found</h4>
                            <p class="fw-normal text-secondary">Click "Add Contact" to get started</p>
                        </div>
    `;
  }

  document.getElementById("card_row").innerHTML = cartona;
}

//validation functions
//name rejex: only letters and spaces, min length 3
function validateName() {
  var regex = /^[a-zA-Z\s]{3,}$/;
  return regex.test(nameInput.value.trim());
}
//phone rejex: Egyptian phone number format starting with 010, 011, 012, or 015 and followed by 8 digits
function validatePhone() {
  var regex = /^01[0125][0-9]{8}$/;
  return regex.test(phoneInput.value.trim());
}
//email rejex: standard email format including "@" and domain
function validateEmail() {
  if (emailInput.value.trim() === "") return true;
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailInput.value.trim());
}
//address rejex: optional, min length 5 if provided
function validateAddress() {
  if (addressInput.value.trim() === "") return true;
  return addressInput.value.trim().length >= 5;
}
//group validation
function validateGroup() {
  return groupInput.value !== "selected a ground" && groupInput.value !== "";
}

// helper function for showing validation alert
function showValidationAlert() {
  Swal.fire({
    icon: "error",
    title: "Invalid Data",
    text: "Please fill all required fields correctly.",
  });
}

function validateForm() {
  var isValid = true;

  // Validate Name
  if (!validateName()) {
    nameInput.classList.add("is-invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  // Validate Phone
  if (!validatePhone()) {
    phoneInput.classList.add("is-invalid");
    isValid = false;
  } else {
    phoneInput.classList.remove("is-invalid");
  }

  // Validate Email
  if (emailInput.value.trim() !== "" && !validateEmail()) {
    emailInput.classList.add("is-invalid");
    isValid = false;
  } else {
    emailInput.classList.remove("is-invalid");
  }

  // Show alert if Name or Phone is empty
  if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
    showValidationAlert();
    return false;
  }

  return isValid;
}

function favToggle(i) {
  cards[i].favourite = !cards[i].favourite;
  display();
  updateCounters();
  displayFav();
  localStorage.setItem("cards", JSON.stringify(cards));
}

function EmerToggle(i) {
  cards[i].emergency = !cards[i].emergency;
  display();
  displayEmergency();
  updateCounters();
  localStorage.setItem("cards", JSON.stringify(cards));
}

function displayFav() {
  var counter = 0;
  var cartona = "";
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].favourite === true) {
      counter++;
      cartona += `
                                <div class="col-12 col-md-6 col-lg-12 ${
                                  cards[i].favourite ? "d-block" : "d-none"
                                }">
                                    <div class="contact px-3">
                                        <div
                                            class="content d-flex justify-content-between align-items-center rounded-4 p-2 ">
                                            <div class="left d-flex align-items-center gap-2">
                                                <div
                                                    class="img-holder bg-success bg-gradient rounded-3 text-white d-flex justify-content-center align-items-center shadow-sm">
                                                    <span id="first_letter" class="text-white fs-12 fw-bold">AB</span>
                                                </div>
                                                <div class="text">
                                                    <h6 id="favourite_user_name" class="m-0 h6">${
                                                      cards[i].user_name
                                                    }</h6>
                                                    <span id="favourite_phone" class="text-muted h6">${
                                                      cards[i].phone
                                                    }</span>
                                                </div>
                                            </div>
                                            <div class="right rounded-3 bg-success bg-opacity-25 text-success ">
                                                <i class="fa-solid fa-phone"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
          `;
    }
  }

  if (counter == 0) {
    cartona += `
          <div id="empty-msg-favourite">
            <p class="h6 fw-medium text-secondary p-5 text-center">No favourite yet</p>
          </div>
        `;
  }
  document.getElementById("favCard").innerHTML = cartona;
}

function displayEmergency() {
  var cartona = "";
  var counter = 0;

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].emergency) {
      counter++;
      cartona += `
          <div class="col-12 col-md-6 col-lg-12 ${
            cards[i].emergency ? "d-block" : "d-none"
          }">
              <div class="contact px-3 py-2">
                  <div
                      class="content d-flex justify-content-between align-items-center p-2 rounded-4">
                      <div class="left d-flex align-items-center gap-2">
                          <div class="img-holder bg-success bg-gradient rounded-3 text-white d-flex justify-content-center align-items-center shadow-sm">
                              <span id="first_letter" class="text-white fs-12 fw-bold">AB</span>
                          </div>
                          <div class="text">
                              <h6 id="emergency_user_name" class="m-0 h6">${
                                cards[i].user_name
                              }</h6>
                              <span id="emergency_phone" class="text-muted h6">${
                                cards[i].phone
                              }</span>
                          </div>
                      </div>
                      <div class="right rounded-3 bg-success bg-opacity-25 text-success">
                          <i class="fa-solid fa-phone"></i>
                      </div>
                  </div>
              </div>
          </div>
        `;
    }
  }
  if (counter == 0) {
    cartona += `
         <div id="empty-msg-emergency">
           <p class="h6 fw-medium text-secondary p-5 text-center">No empty yet</p>
         </div>
      `;
  }
  document.getElementById("emergency-card").innerHTML = cartona;
}

function updateCounters() {
  total = 0;
  favoriteCount = 0;
  emergencyCount = 0;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].favourite) favoriteCount++;
    if (cards[i].emergency) emergencyCount++;
  }
  total = favoriteCount + emergencyCount;

  document.getElementById("total_count").innerHTML = total;
  document.getElementById("favourite_count").innerHTML = favoriteCount;
  document.getElementById("emergency_count").innerHTML = emergencyCount;
}
