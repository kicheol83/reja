console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return `<li
    class="list-group-item list-group-item-info d-flex align-items-center justify-content-between"
  >
    <span class="item-text">${item.reja}</span>
    <div>
      <button
        data-id="${item._id}"
        class="edit-me btn-secondary btn-sm mr-1"
      >
        Ozgartirish
      </button>
      <button
       data-id="${item._id}"
        class="delete-me btn btn-danger btn-sm"
      >
        Ochirish
      </button>
    </div>
  </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); //Traditional API
  console.log("STEP-1: Frontenddan malumot oldim");
  alert(createField.value);

  console.log("STEP-2: FRONTEND =. BACKEND POST QILYAPMAN..");
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      console.log("STEP-7: BACKEND => FRONTENDGA QAYTADIM");
      console.log(response);

      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling");
    });
});

document.addEventListener("click", function (e) {
  //delete oper
  if (e.target.classList.contains("delete-me")) {
    console.log("STEP-1: BOSILGANDA QOLGA OVOLYAPTI");

    if (confirm("Aniq ochirmoqsimisiz?")) {
      console.log("STEP-2: FRONTENDdan => BACKENDga post qilyapmiz");
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          console.log("STEP-7: BACKENDAN => FRONTENDGA qaytdim");
          console.log(response.data);

          console.log("STEP-8: DELETE SUCCESS");
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling");
        });
    }
  }

  // edit oper
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Ozgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    console.log("STEP-1: FRONTENDdan malumot oldim...");


    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling");
        });
    }
  }
});

document.getElementById("clean-all").addEventListener("click", function () {
  axios.post("/delete-all", { delete_all: true }).then((response) => {
    alert(response.data.state);
    document.location.reload();
  });
});
