let addToy = false;
let toyCard = document.getElementById('toy-collection')

function divCardCreator(toys){
  toys.forEach(buildToy)
}

function buildToy(toy){
  const theToy = document.createElement('div')
  theToy.classList = "card"
  toyCard.appendChild(theToy)

  const toyNameElement = document.createElement('h2')
  theToy.appendChild(toyNameElement)
  let thisName = toy.name
  toyNameElement.textContent = thisName

  const toyImage = document.createElement("img")
  theToy.appendChild(toyImage)
  toyImage.src = toy.image
  toyImage.classList = "toy-avatar"

  const toyP = document.createElement("p")
  theToy.appendChild(toyP)
  toyP.textContent = toy.likes + " likes"

  const toyBtn = document.createElement("button")
  theToy.appendChild(toyBtn)
  toyBtn.classList = "like-btn"
  toyBtn.id = toy.id
  toyBtn.textContent = "Like"

  //console.log(theToy)
}


function submitBtn(){
  const addToyBtn = document.querySelector('.submit')
  addToyBtn.addEventListener('submit', addNewToy)
}

let addNewToy = (event) => {
  event.preventdefault()
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(formData => console.log(formData))
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => divCardCreator(data))
  submitBtn()
});

