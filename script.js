const dataSources = [
  "./Data.json",
  "https://github.com/sudhanshugaikwad/bogodata.git"
];

function renderCards(AllData) {
  console.log(AllData);

  let Data2 = AllData.map((value, index) => {
    return `
      <div>
        <div class="smallbox" onclick="showbig(${index})">
          <div class="smallleft">
            <ul>
              <li class="checked">
                <div>
                  <h2>${value.name} <span class="badget">${value.discount}</span></h2>
                  <p>Standard Price</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="smallright">
            <h2>${value.prise1}</h2>
            <p>${value.prise2}</p>
          </div>
        </div>

        <div class="big">
          <div class="mostpop">most popular</div>
          <div class="pricesection">
            <div class="smallleft bigleft">
              <ul>
                <li class="checked">
                  <div>
                    <h2>${value.name} <span class="badget">${value.discount}</span></h2>
                    <p>Standard Price</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="smallright">
              <h2>${value.prise1}</h2>
              <p>${value.prise2}</p>
            </div>
          </div>
          <div class="colorsection">
            <div class="colorhead colorrow">
              <div></div>
              <div class="colname">Size</div>
              <div class="colname">Colour</div>
            </div>
            ${colorsection(index)}
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("cards").innerHTML = Data2;
}

function loadData() {
  const tryFetch = (source) =>
    fetch(source).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });

  let index = 0;

  const next = () => {
    if (index >= dataSources.length) {
      throw new Error("Unable to fetch data from all sources.");
    }

    return tryFetch(dataSources[index++]).catch((error) => {
      if (index < dataSources.length) {
        return next();
      }
      throw error;
    });
  };

  next()
    .then((AllData) => renderCards(AllData))
    .catch((error) => console.error("Unable to fetch data:", error));
}

function colorsection(index) {
  let colorelements = "";
  for (let i = 0; i <= index; i++) {
    colorelements += `
      <div class="colorsecno colorrow">
        <div>#${i + 1}</div>
        <div>
          <select class="MainOption">
            <option>&nbsp;S</option>
            <option>&nbsp;M</option>
            <option>&nbsp;L</option>
          </select>
        </div>
        <div>
          <select class="MainOption">
            <option>&nbsp;Red</option>
            <option>&nbsp;Blue</option>
          </select>
        </div>
      </div>`;
  }

  return colorelements;
}

let prevCard = -1;
function showbig(ind) {
  const bigCards = document.querySelectorAll(".big");
  const smallCards = document.querySelectorAll(".smallbox");

  if (prevCard !== -1 && prevCard < bigCards.length) {
    bigCards[prevCard].classList.remove("active");
    smallCards[prevCard].classList.remove("hidden");
  }

  if (ind < bigCards.length) {
    prevCard = ind;
    bigCards[ind].classList.add("active");
    smallCards[ind].classList.add("hidden");
  }
}

loadData();
