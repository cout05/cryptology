function modInverse(a, m) {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  while (a > 1) {
    let q = Math.floor(a / m);
    let t = m;
    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) {
    x1 += m0;
  }

  return x1;
}

const decrypt = (sol, str) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const formula = sol.split(/\D+/).filter(Boolean);
  const strUsed = str.toUpperCase();
  let encryptedText = "";

  if (formula.length <= 1) {
    const multInverse = modInverse(Number(formula[0]), 26);
    for (let i = 0; i < strUsed.length; i++) {
      let alp = alphabet.indexOf(strUsed[i]) + 1;
      const step1 = multInverse * alp;
      const index = step1 % 26;
      encryptedText += alphabet[index - 1];
    }
    decryptedText.innerHTML = encryptedText;
  } else if (formula.length > 1 && sol.includes("+")) {
    const multInverse = modInverse(Number(formula[0]), 26);
    console.log("+");
    for (let i = 0; i < strUsed.length; i++) {
      let alp = alphabet.indexOf(strUsed[i]) + 1;
      const step1 = multInverse * Math.abs(alp - Number(formula[1]));
      const index = step1 % 26;
      encryptedText += alphabet[index - 1];
    }
    decryptedText.innerHTML = encryptedText;
  } else {
    const multInverse = modInverse(Number(formula[0]), 26);
    for (let i = 0; i < strUsed.length; i++) {
      let alp = alphabet.indexOf(strUsed[i]) - 1;
      const step1 = multInverse * (alp + Number(formula[1]));
      const index = step1 % 26;
      encryptedText += alphabet[index - 1];
    }
    decryptedText.innerHTML = encryptedText;
  }
};

const formula = document.getElementById("formula");
const text = document.getElementById("text");
const decryptedText = document.getElementById("decryptedText");

const handleClick = () => {
  decrypt(formula.value, text.value);
};
