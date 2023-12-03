const dragArea = document.querySelector("#drag-areaOne");
const dragText = document.querySelector("#drag-areaOne .header");
const fileUpload = document.querySelector(".file-uploadOne");

let button = document.querySelector(".buttonOne");
let inputFileOne = document.querySelector("input#fileOne");

const dragAreaTwo = document.querySelector("#drag-areaTwo");
const dragTextTwo = document.querySelector("#drag-areaTwo .header");
const fileUploadTwo = document.querySelector(".file-uploadTwo");

let buttonTwo = document.querySelector(".buttonTwo");
let inputFileTwo = document.querySelector("input#fileTwo");

let file;
let fileTwo;

button.onclick = () => {
  inputFileOne.click();
};

inputFileOne.addEventListener("change", function () {
  file = this.files[0];
  dragArea.classList.add("active");
  displayFileOne();

  var form_data = new FormData();
  form_data.append("file", file);

  $.ajax({
    type: "POST",
    url: "/FileLoad",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
      $("#conteudo-tableOne").html("");
      $("#conteudo-tableOne").append(data.file);
      
      $.each(data.fileCollumns, function (index, value) {
        $("#selectOne").append("<option>" + value + "</option>");
      });
      
      desbloqueiBtnMerge()
    },
  });
});

dragArea.addEventListener("dragover", (event) => {
  dragText.textContent = "Realse to Upload";
  dragArea.classList.add("active");
});

dragArea.addEventListener("dragleave", (event) => {
    event.preventDefault();
  dragText.textContent = "Drag & Drop";
  
  dragArea.classList.remove("active");
});

dragArea.addEventListener("drop", (event) => {
  event.preventDefault();

  file = event.dataTransfer.files[0];
  displayFileOne();
});

function displayFileOne() {
  let fileType = file.type;

  let validExtensions = ["text/csv"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileUrl = fileReader;
    };
    fileReader.readAsDataURL(file);
    fileUpload.classList.add("show");
    let fileName = document.querySelector(".name-fileOne");
    fileName.innerHTML = file.name;
    dragArea.classList.add("hide");
  } else {
    alert("tipo invalido");
    dragArea.classList.remove("active");
  }
}

buttonTwo.onclick = () => {
  inputFileTwo.click();
};

inputFileTwo.addEventListener("change", function () {
  fileTwo = this.files[0];
  dragAreaTwo.classList.add("active");
  displayFileTwo();

  var form_data = new FormData();
  form_data.append("file", fileTwo);

  $.ajax({
    type: "POST",
    url: "/FileLoad",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
      $("#conteudo-tableTwo").html("");
      $("#conteudo-tableTwo").append(data.file);
      
      $.each(data.fileCollumns, function (index, value) {
        $("#selectTwo").append("<option>" + value + "</option>");
      });

      desbloqueiBtnMerge()
      
    },
  });
});

dragAreaTwo.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragTextTwo.textContent = "Realse to Upload";
  dragAreaTwo.classList.add("active");
});

dragAreaTwo.addEventListener("dragleave", (event) => {
  dragTextTwo.textContent = "Drag & Drop";
  dragAreaTwo.classList.remove("active");
});

dragAreaTwo.addEventListener("drop", (event) => {
  event.preventDefault();

  fileTwo = event.dataTransfer.files[0];
  displayFileTwo();
});

function displayFileTwo() {
  let fileType = fileTwo.type;

  let validExtensions = ["text/csv"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileUrl = fileReader;
    };
    fileReader.readAsDataURL(fileTwo);
    fileUploadTwo.classList.add("show");
    let fileName = document.querySelector(".name-fileTwo");
    fileName.innerHTML = fileTwo.name;
    dragAreaTwo.classList.add("hide");
  } else {
    alert("tipo invalido");
    dragAreaTwo.classList.remove("active");
  }
}

function desbloqueiBtnMerge(){
    if ($("#selectOne").val() != "" || $("#selectOne").val() != "") {
        $('#merge-files-btn').prop('disabled', false);
        console.log("sajajkdh")
    }
}