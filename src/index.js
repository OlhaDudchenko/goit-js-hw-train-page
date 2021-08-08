import "../node_modules/modern-normalize/modern-normalize.css"
import MovieApiService from "./js/fetchMovie";
import oneCard from "./templates/oneCard.hbs";
import './sass/main.scss';

const movieBox = document.querySelector(".gallery");
console.log(movieBox);
const pagination = document.querySelector(".pagination");

const movieApiService = new MovieApiService();

async function fetchMovie() {
    const { results, total_pages } = await movieApiService.fetchMovies();
    console.log(results)
    appendMovieMarkup(results);

}


function appendMovieMarkup(results) {
    // console.log(results);
    // console.log(genres);
    
    
    // const genre = genres.map(genre => genre.id);
    // // console.log(...genre);
    // const genreName = genres.map(genre => genre.name);
    // // console.log(genreName)
    // // let resultId = results.flatMap(result => result.genre_ids);
    // // console.log(resultId)
    // if (resultId.includes(...genre)) {
    //     // console.log(resultId = genreName);
    //     // console.log("true")
     
    // }
    // let name = [];
    // results.forEach(result => {
    //     result.genre_ids.map(id => {
            
    //         genres.map(genre => {
    //             // console.log(genre.id)
    //             if (genre.id === id) {
    //                 id = genre.name;
    //                 name.push(id)
                    
    //                 // movieBox.insertAdjacentHTML('beforeend', oneCard({ results,genres}));
    //             }
            
    //         })
    //     })
    // })

 movieBox.insertAdjacentHTML('beforeend', oneCard(results));
}
fetchMovie();
createPages();

pagination.addEventListener("click", onBtnClick);
// console.log(pagination);
// const parentBtnPrevious = pagination.firstElementChild;
// console.log(parentBtnPrevious)
// const btnPrevious = parentBtnPrevious.firstElementChild;
//     console.log(btnPrevious)

let pageNumbers = [1];
let visibleCountPages = 10;

async function onBtnClick(e) {
    console.log(e.target)
    const btnPrevious=document.querySelector('button[name="previous"]')
    // console.log(e.target.classList.contains('page_item'))
    if (!(e.target.classList.contains('page_item')||e.target.classList.contains("page_link_next")||e.target.classList.contains("page_link_previous")) ){
       return;
    }
    if (e.target.textContent === "2"||pageNumbers.length=== 1) {
        // console.log(pageNumbers.length)
        btnPrevious.disabled=false;
    }
    const items = document.querySelectorAll(".page_item");
    // console.log(items)
    if (+e.target.dataset.index >(visibleCountPages/2)) {
        
        // const items = document.querySelectorAll(".page_item");
        
        items.forEach((item)=> {
            // items.slice()
            if (!((+item.textContent) === 500)) {
                return item.textContent = Number(item.textContent) + 1;
            }
        
        })
    }
 if((+e.target.dataset.index)<(visibleCountPages/2)) {
   
     for (let item of items) {
        
         if ((+item.textContent)=== 500||(item.textContent)===1) {
           
             break;
           }
          item.textContent = Number(item.textContent) - 1;
     }
          
        
    };
    clearMovieBox();

    if (e.target.classList.contains("page_item")) {
    const savedValue = +e.target.textContent;
    pageNumbers.push(savedValue);
    }
console.log(pageNumbers)
    const numberBeforeNext = pageNumbers[pageNumbers.length - 1];
    // console.log(numberBeforeNext)
    if (e.target.textContent === "Next") {
        console.log(pageNumbers);
        // console.log(numberBeforeNext)
        movieApiService.pag = numberBeforeNext + 1;
        pageNumbers.push(movieApiService.pag);
        fetchMovie();
        items.forEach((item) => {
            // items.slice()
            if (!((+item.textContent) === 500)) {
                return item.textContent = Number(item.textContent) + 1;
            }
        
        })
    }
     if (e.target.textContent === "Previous") {
        // console.log(pageNumbers);
        for (let item of items){
         if ((+item.textContent)=== 500||(+e.target.textContent)===1) {
        //    btnPrevious.disabled=true;
             break;
           }
          item.textContent = Number(item.textContent) - 1;
     }
        
        
    
        movieApiService.pag = numberBeforeNext - 1;
        pageNumbers.push(movieApiService.pag);
        fetchMovie();
        if (movieApiService.pag === 1) {
            btnPrevious.disabled=true;
        }
         
    }
     else {
     movieApiService.pag = +e.target.textContent;
    console.log(movieApiService.pag);
    console.log(e.target.textContent)
    fetchMovie(); 
    }
   
   

}
// console.log(pageNumbers);

function clearMovieBox() {
    movieBox.innerHTML = "";
}

 
async function createPages() {
    
    const {results,total_pages } = await movieApiService.fetchMovies();
    for (let i = 1; i <= total_pages; i++) {
        pagination.insertAdjacentHTML("beforeend", `<li class="page_item"  data-index="${i}">${i}</li>`);
  }
    const items = document.querySelectorAll(".page_item");
    // console.log(items);
    items.forEach(item => {
           
        if (item.textContent > 10) {
                // console.log(item.textContent)
                item.style.display = 'none';
            // item.setAttribute("data-visibility","visible");
            }
         if (item.textContent === total_pages.toString()) {
             item.style.display = 'block';
             item.insertAdjacentHTML("beforebegin",'<div class="dots">...</div>')
            }
            });

    pagination.insertAdjacentHTML("afterbegin",'<button name="previous" class="page_link_previous" >Previous</button>')
    pagination.insertAdjacentHTML("beforeend",'<button name="next" class="page_link_next">Next</button> ')
    const btnPrevious=document.querySelector('button[ name="previous"]')
    // console.log(btnPrevious)
    btnPrevious.disabled=true;
     
}
//  --------------------------------------------------------------------
const modal = document.querySelector('.js-lightbox');
console.log(modal)
// const modalImg = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');
movieBox.addEventListener('click', openModalOnClick);
function openModalOnClick(e) {
    
    e.preventDefault()
console.log(e.target)
    if (!e.target.classList.contains('movie_image')) {
        return;
    }
    modal.classList.add('is-open');
 
    console.log(+e.target.dataset.index);
    window.addEventListener('keydown', closeModalOnEsk);
    buttonClose.addEventListener('click', closeModalOnClick);
    overlay.addEventListener('click', closeModalOnClick);
}

function closeModalOnClick() {
    modal.classList.remove('is-open');
    // modalImg.src = '';
    // modalImg.alt='';
    window.removeEventListener('keydown', closeModalOnEsk);
    buttonClose.removeEventListener('click',closeModalOnClick);
    overlay.removeEventListener('click', closeModalOnClick);
};
 
function closeModalOnEsk(e) {
     if(e.code==="Escape"){
          closeModalOnClick();
     }
};