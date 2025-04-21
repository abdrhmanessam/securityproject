function createKey(key) {
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let keySet = new Set(key);
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let keyMatrix = [];

    for (let char of key) {
        if (!keyMatrix.includes(char)) {
            keyMatrix.push(char);
        }
    }

    for (let char of alphabet) {
        if (!keyMatrix.includes(char)) {
            keyMatrix.push(char);
        }
    }

    return keyMatrix;
}


function encrypt() {
    let keyword = document.getElementById("keyword").value.toUpperCase().replace(/[^A-Z]/g, "");
    let inputText = document.getElementById("inputText").value.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let keyMatrix = createKey(keyword);
    let encryptedText = "";

    for (let i = 0; i < inputText.length; i += 2) {
        let a = inputText[i];
        let b = inputText[i + 1] || 'X'; 

        let aIndex = keyMatrix.indexOf(a);
        let bIndex = keyMatrix.indexOf(b);

        let aRow = Math.floor(aIndex / 5);
        let aCol = aIndex % 5;
        let bRow = Math.floor(bIndex / 5);
        let bCol = bIndex % 5;

        if (aRow === bRow) {
            encryptedText += keyMatrix[aRow * 5 + (aCol + 1) % 5];
            encryptedText += keyMatrix[bRow * 5 + (bCol + 1) % 5];
        } else if (aCol === bCol) {
            encryptedText += keyMatrix[((aRow + 1) % 5) * 5 + aCol];
            encryptedText += keyMatrix[((bRow + 1) % 5) * 5 + bCol];
        } else {
            encryptedText += keyMatrix[aRow * 5 + bCol];
            encryptedText += keyMatrix[bRow * 5 + aCol];
        }
    }

    document.getElementById("outputText").value = encryptedText;
}


function decrypt() {
    let keyword = document.getElementById("keyword").value.toUpperCase().replace(/[^A-Z]/g, "");
    let inputText = document.getElementById("inputText").value.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let keyMatrix = createKey(keyword);
    let decryptedText = "";

    for (let i = 0; i < inputText.length; i += 2) {
        let a = inputText[i];
        let b = inputText[i + 1] || 'X';

        let aIndex = keyMatrix.indexOf(a);
        let bIndex = keyMatrix.indexOf(b);

        let aRow = Math.floor(aIndex / 5);
        let aCol = aIndex % 5;
        let bRow = Math.floor(bIndex / 5);
        let bCol = bIndex % 5;

        if (aRow === bRow) {
            decryptedText += keyMatrix[aRow * 5 + (aCol + 4) % 5];
            decryptedText += keyMatrix[bRow * 5 + (bCol + 4) % 5];
        } else if (aCol === bCol) {
            decryptedText += keyMatrix[((aRow + 4) % 5) * 5 + aCol];
            decryptedText += keyMatrix[((bRow + 4) % 5) * 5 + bCol];
        } else {
            decryptedText += keyMatrix[aRow * 5 + bCol];
            decryptedText += keyMatrix[bRow * 5 + aCol];
        }
    }

    document.getElementById("outputText").value = decryptedText;
}