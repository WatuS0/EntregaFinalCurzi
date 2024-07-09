

document.addEventListener("DOMContentLoaded", async () => {
    const reviewsContainer = document.getElementById("reviews")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    let currentIndex = 0
    const reviewsToShow = 4

    async function fetchReviews() {
        try {
            const response = await fetch("reviews.json")
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const reviews = await response.json();
            displayReviews(reviews)
        } catch (error) {
            console.error("Hubo un error con las Reviews:", error)
            reviewsContainer.innerHTML = `<p>Ocurrió un error al cargar las reseñas.</p>`
        }
    }

    function displayReviews(reviews) {
        reviewsContainer.innerHTML = ""
        reviews.forEach(review => {
            const reviewDiv = document.createElement("div")
            reviewDiv.className = "review"
            reviewDiv.innerHTML = `
                <h3>${review.nombre} ${review.apellido}</h3>
                <p>Calificación: ${review.calificacion} ${getStars(review.calificacion)}</p>
                <p>${review.reseña}</p>
            `
            reviewsContainer.appendChild(reviewDiv)
        })

        updateButtons()
    }

    function updateButtons() {
        const totalReviews = reviewsContainer.children.length
        const totalPages = Math.ceil(totalReviews / reviewsToShow)

        prevBtn.disabled = totalReviews <= reviewsToShow
        nextBtn.disabled = totalReviews <= reviewsToShow
    }

    function getStars(calificacion) {
        const totalStars = 5
        const filledStars = Math.round(calificacion)

        let starsHtml = ''
        for (let i = 0; i < filledStars; i++) {
            starsHtml += '<span>&#9733;</span>'
        }
        for (let i = filledStars; i < totalStars; i++) {
            starsHtml += '<span>&#9734;</span>'
        }

        return starsHtml
    }

    prevBtn.addEventListener("click", () => {
        const totalReviews = reviewsContainer.children.length
        const totalPages = Math.ceil(totalReviews / reviewsToShow)

        if (currentIndex > 0) {
            currentIndex--
        } else {
            currentIndex = totalPages - 1
        }

        reviewsContainer.style.transform = `translateX(-${currentIndex * 100 / totalPages}%)`
    })

    nextBtn.addEventListener("click", () => {
        const totalReviews = reviewsContainer.children.length
        const totalPages = Math.ceil(totalReviews / reviewsToShow)

        if (currentIndex < totalPages - 1) {
            currentIndex++
        } else {
            currentIndex = 0
        }

        reviewsContainer.style.transform = `translateX(-${currentIndex * 100 / totalPages}%)`
    })

    await fetchReviews()
})
