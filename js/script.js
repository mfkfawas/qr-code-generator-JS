const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") alert("Please enter a URL");
  else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQR(url, size);

      qr.querySelector("img").addEventListener("load", () => {
        const saveUrl = qr.querySelector("img").src;
        createSaveButton(saveUrl);
      });
    }, 1000);
  }
});

const generateQR = (url, size) => {
  qr.innerHTML = "";

  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const createSaveButton = (saveUrl) => {
  // remove the existing save button if it exists
  const prevSaveButton = document.getElementById("save-button");
  if (prevSaveButton) prevSaveButton.remove();

  const saveButton = document.createElement("a");
  saveButton.href = saveUrl;
  saveButton.download = "qrcode";
  saveButton.textContent = "Save";
  saveButton.id = "save-button";
  saveButton.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 mx-auto my-5";
  document.getElementById("generated").appendChild(saveButton);
};

const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

hideSpinner();
