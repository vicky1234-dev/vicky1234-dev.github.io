const movies = {

    init() {
        this._inputSubmit = $('form'); //top form
        this._input = $('.input'); //top form input element
        this._searchResults = $('.searchedMovies'); // searched moviessection 
        this._searchSection = $('.searchResults').get(0); // searched moviessection wrapper
        this._pageNo = 1;

        this.urls = [];
        this.receivedMoviArray = [];
        this.genres = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Science Fiction",
            10770: "TV Movie",
            53: "Thriller",
            10752: "War",
            37: "Western",
            10759: "Action & Adventure",
            10767: "Talk",
            10768: "War & Politics",
            10766: "Soap",
            10762: "Kids",
            9648: "Mystery",
            10763: "News",
            10764: "Reality",
            10765: "Sci-Fi & Fantasy",
            empty: ''
        }
        this.sectionType = {
            1: 'discover',
            2: 'trending',
            3: 'toprated',
            4: 'upcoming'
        }
        this.addEvents();
    },

    getlink(key) {
        return `https://api.themoviedb.org/3/movie/${key}?api_key=4d47cb3ed5fd192971a9a94765f0624e&language=en-US&page=${this._pageNo}`
    },

    main: { //making object to store movie arrays
        discoverArray: [],
        trendingArray: [],
        topArray: [],
        upcomingArray: [],
        idArray: []
    },

    async fetchMethod(url, element, flag) { // fetch method 
        let promises;
        promises = await (async () => {
            let response = await fetch(url);
            let req = await response.json();
            this.receivedMoviArray.push(...req.results);

            return req
        })();

        // for video player ids
        this.main.idArray = this.receivedMoviArray.map((arrayElement) => {
            return arrayElement.id
        }).filter((v, i, arr) => arr.indexOf(v) === i)
        return promises
    },

    async displayHomepage(url, element, flag) {
        let results = await this.fetchMethod(url)
        this.showData(results.results, element, flag)
    },

    showData(movies, sectionType, flag) { //showing data on page
        // if (typeof sectionType == 'object') {

        movies.forEach((movie) => {
            // Popular movies type
            function renderHello() {
                console.log(this)
                var template = document.getElementById('template').innerHTML;
                console.log(template)
              //  var rendered = Mustache.render(template, {
              //      movie: movie,
              //      movies: this,
               //     genres: movies.genres[]
             //   });

                console.log(rendered)
                $(sectionType).append(`${rendered}`)
            }
            
            //renderHello.call(this)
            $(sectionType).append(`
                    <div class ="movie" data-id = "${movie.id}" data-target = 'modal' >
                         <div class="movie__wrapper">
                            <div class = "movie__image" style="height:300px;background-size: 100% 100%;background-image: url('https://image.tmdb.org/t/p/w200${movie.poster_path}'), url('images/Default.png');" >
                                 <i class = "visibilityhidden fas fa-play-circle" aria - hidden = "true" ></i>  
                             </div>
                               <div class = 'movie__details'>
                                   <p class="movie__name">${movie.original_title}</p>
                                   <p class='movie__viewcount'>${movie.vote_count} voting</p>
                                   <span class='movie__genres'>${this.genres[( ( movie.genre_ids ) ?  movie.genre_ids[0] != undefined : undefined ) ? movie.genre_ids[0] : 'empty']}</span>
                                   <span class='movie__genres'>${this.genres[( ( movie.genre_ids ) ?  movie.genre_ids[1] != undefined : undefined ) ? movie.genre_ids[1] : 'empty']}</span>
                                   <span class='movie__genres'>${this.genres[( ( movie.genre_ids ) ?  movie.genre_ids[2] != undefined : undefined ) ? movie.genre_ids[2] : 'empty']}</span>
                                   <p class="movie__info">${movie.overview}</p>
                               </div>
                           </div>
                       </div>
               `)
        });
    },

    addEvents() { //adding submit event to input 
        this._inputSubmit.on('submit', this.eventProcess.bind(this));
    },

    eventProcess(event) { //input submit event handler
        event.preventDefault();
        this._searchSection.classList.remove('show');
        this._searchSection.classList.add('show');

        (this._searchResults.html() == '') ? '' : $('.searchedMovies').slick('unslick');
        this._searchResults.html('')
        this.searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=4d47cb3ed5fd192971a9a94765f0624e&language=en-US&page=2&query=${this._input.val()}`;
        this.displayHomepage([this.searchUrl], this._searchResults).then(() => {
            addSlick('searchedMovies');
            modal.init($("[data-target~='modal']"))
        })
    },

    async fetchMovie(urls) {
        let request = await fetch(urls);
        let response = await request.json();
        return response
    }

}