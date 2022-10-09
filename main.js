let array;
function inputValid(e) {
  let invalidChars = ["-", "+", "e", "E", "0"];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function checkValidKeyword(key_array) {
  const key_set = [...new Set(key_array)];
  // console.log(key_set,key_set.length,Math.min(...key_set),Math.max(...key_set));
  if (key_set.length !== key_array.length) return false;
  if (Math.min(...key_set) !== 1) return false;
  if (Math.max(...key_set) !== key_set.length) return false;
  return true;
}

function encrypt() {
  let plain_text = document.getElementById("input_plain_text").value;
  let key = document.getElementById("key_encrypt").value;
  let cipher_text = document.getElementById("cipher_text");
  let result = "";
  let key_array = key.split("").map(Number);

  // if (!checkValidKeyword(key_array)) {
  //   showSnakeBar();
  //   return;
  // }

  if (plain_text.length === 0) return;

  



  
  cipher_text.innerHTML = result;
  //   console.log(key_array, array);
  // createMatrixDisplay("matrixEncrypt");
}

const pressEnterEncrypt = (e, flag) => {
  inputValid(e);
  if (e.key === "Enter") {
    flag ? encrypt() : decrypt();
  }
};

const saveFileEncrypt = () => {
  result = document.getElementById("cipher_text").innerHTML;
  handleSaveFile(result, "ciphertext.txt");
};

function decrypt() {
  let cipher_text = document.getElementById("input_cipher_text").value;
  let key = document.getElementById("key_decrypt").value;
  let plain_text = document.getElementById("plain_text");
  let result = "";
  let key_array = key.split("").map(Number);

  // if (!checkValidKeyword(key_array)) {
  //   showSnakeBar();
  //   return;
  // }

  // if (cipher_text.length === 0) return;






  // plain_text.innerHTML = result;
  // createMatrixDisplay("matrixDecrypt");
}

function showSnakeBar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

const saveFileDecrypt = () => {
  result = document.getElementById("plain_text").innerHTML;
  // if(result!=="")
  handleSaveFile(result, "plaintext.txt");
};

async function handleSaveFile(result, fileName) {
  if (result === "") return;
  if (window.showSaveFilePicker) {
    const handle = await showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "txt",
          accept: {
            "text/markdown": [".txt"],
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(result);
    writable.close();
  } else {
    const SaveFile = document.createElement("a");
    SaveFile.href = URL.createObjectURL(result);
    SaveFile.download = fileName;
    SaveFile.click();
    setTimeout(() => URL.revokeObjectURL(SaveFile.href), 60000);
  }
}

function createMatrixDisplay(id) {
  let key = document.getElementById("key_encrypt").value;
  let key_array = key.split("").map(Number);
  let plain_text = document.getElementById("input_plain_text").value;
  const matrix = document.getElementById(id);
  //   console.log(matrix, key, plain_text.length);
  while (matrix.firstChild) {
    matrix.removeChild(matrix.lastChild);
  }

  const table1 = document.createElement("table");
  table1.className = "table-encrypt";

  if (id === "matrixEncrypt") {
    for (let i = 0; i < key_array.length; i++) {
      const thELe = document.createElement("th");
      thELe.innerHTML = key_array[i];
      table1.appendChild(thELe);
      matrix.appendChild(table1);
    }
  }

  for (let i = 0; i < key_array.length; i++) {
    const trEle = document.createElement("tr");
    if (id === "matrixDecrypt") {
      const thELe = document.createElement("td");
      thELe.classList.add("th");
      thELe.innerHTML = key_array[i];
      trEle.appendChild(thELe);
    }
    for (let j = 0; j < array[0].length; j++) {
      const tdEle = document.createElement("td");
      //   tdEle.id = 'cell-'+i+'-'+j;
      tdEle.innerHTML = array[i][j] === " " ? "&nbsp;" : array[i][j];
      trEle.appendChild(tdEle);
    }
    table1.appendChild(trEle);
    matrix.appendChild(table1);
  }
}
