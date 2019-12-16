// Code your solution here
const sideBarShoes = document.querySelector("#shoe-list")
const mainContainer = document.querySelector("#main-shoe")

fetch("http://localhost:3000/shoes")
.then(r => r.json())
.then((arrayOfShoes) =>
    arrayOfShoes.forEach((shoe) => {
        makeSideJSONtoHTML(shoe)
    })
)

function makeSideJSONtoHTML(shoe) {
    let newLi = document.createElement("li")
    newLi.className = "list-group-item"
    newLi.innerText = shoe.name
    newLi.dataset.id = `${shoe.id}`
    newLi.addEventListener("click", (event) => {
        let tempID = event.target.dataset.id
        fetch(`http://localhost:3000/shoes/${tempID}`)
        .then(r => r.json())
        .then((shoe1) => {
            mainContainer.innerHTML = `
                <img class="card-img-top" id="shoe-image" src="${shoe1.image}">
                <div class="card-body">
                    <h4 class="card-title" id="shoe-name">${shoe1.name}</h4>
                    <p class="card-text" id="shoe-description">${shoe1.description}</p>
                    <p class="card-text"><small class="text-muted" id="shoe-price">${shoe1.price}</small></p>
                    <div class="container" id="form-container">
                        <form id="new-review">
                            <div class="form-group">
                                <textarea class="form-control" id="review-content" rows="3"></textarea>
                                <input type="submit" class="btn btn-primary"></input>
                            </div>
                        </form>
                    </div>
                </div>
                <h5 class="card-header">Reviews</h5>
                <ul class="list-group list-group-flush" id="reviews-list">
                </ul>
            `
        let reviewUl = document.querySelector("#reviews-list")
        shoe1.reviews.forEach((review) => {
            let newReviewLi = document.createElement("li")
            newReviewLi.className = "list-group-item"
            newReviewLi.innerText = review.content
            reviewUl.append(newReviewLi)
        })
        let reviewContainer = document.querySelector("#new-review")
        reviewContainer.addEventListener("submit", (event) => {
            event.preventDefault()
            let newReview = event.target.querySelector("#review-content").value
            fetch(`http://localhost:3000/shoes/${shoe1.id}/reviews`, {
                method: "POST",
                headers: {
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: newReview
                })
            })
            .then(r => r.json())
            .then((newReview) => {
                let newReviewLi = document.createElement("li")
                newReviewLi.className = "list-group-item"
                newReviewLi.innerText = newReview.content
                reviewUl.append(newReviewLi)
            })
        })
    })
    })
    sideBarShoes.append(newLi)
}

fetch("http://localhost:3000/shoes/1")
.then(r => r.json())
.then((shoe1) => {
    mainContainer.innerHTML = `
        <img class="card-img-top" id="shoe-image" src="${shoe1.image}">
        <div class="card-body">
            <h4 class="card-title" id="shoe-name">${shoe1.name}</h4>
            <p class="card-text" id="shoe-description">${shoe1.description}</p>
            <p class="card-text"><small class="text-muted" id="shoe-price">${shoe1.price}</small></p>
            <div class="container" id="form-container">
                <form id="new-review">
                <div class="form-group">
                    <textarea class="form-control" id="review-content" rows="3"></textarea>
                    <input type="submit" class="btn btn-primary"></input>
                </div>
                </form>
            </div>

        </div>
    <h5 class="card-header">Reviews</h5>
    <ul class="list-group list-group-flush" id="reviews-list">

    </ul>
    `
    let reviewUl = document.querySelector("#reviews-list")
    shoe1.reviews.forEach((review) => {
        let newReviewLi = document.createElement("li")
        newReviewLi.className = "list-group-item"
        newReviewLi.innerText = review.content
        reviewUl.append(newReviewLi)
    })
    let reviewContainer = document.querySelector("#new-review")
    reviewContainer.addEventListener("submit", (event) => {
        event.preventDefault()
        let newReview = event.target.querySelector("#review-content").value
        fetch(`http://localhost:3000/shoes/${shoe1.id}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newReview
            })
        })
        .then(r => r.json())
        .then((newReview) => {
            let newReviewLi = document.createElement("li")
            newReviewLi.className = "list-group-item"
            newReviewLi.innerText = newReview.content
            reviewUl.append(newReviewLi)
        })
    })
})
