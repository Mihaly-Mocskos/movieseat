const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketPrice = +movieSelect.value;
// save selected movie index,price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}




//update total in count
function updateSelectedCount() {
    const selected = document.querySelectorAll('.row .seat.selected');


    // HAROM PONT ARRAYBAN AZ COPY
    //copy selected seats in to arr;
    //map throguh arrary
    //return a new arrayindexes;

    const seatsIndex = [...selected].map(seat => [...seats].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    const selectedSeatsCount = selected.length;
    // console.log(selectedSeatsCount);
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from localstorage and populate ui

function populateUI() {
    const selected = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selected);
    if (selected !== null && selected.length > 0) {
        seats.forEach((seat, index) => {
            if (selected.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select event

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})



//seat click eveent
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//initial count in totalset
updateSelectedCount();
