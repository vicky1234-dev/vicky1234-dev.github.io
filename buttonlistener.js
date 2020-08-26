const buttonlistener = {
    init(object) {
    
        this._config = object
        this.btns = []
        // this._loadedbtns = 0;

        this._handler = function () {

            this.btns = Array.from(document.querySelectorAll(`${object.element}`));
            this.onPagination();
        }

        this._handler();
    },

    onPagination() {
        let _this = this
        const onReach = this._config.onReach
        
        $(this.btns).click(function () {
            btn = this
            console.log(btn)

            if (btn.parentNode.classList.contains('mainsection')) {
                movies._pageNo = ++movies._pageNo
                
                let parent = btn.parentNode
                let previousElementsibling = btn.previousElementSibling
                $(btn).html(`<div style='text-align:center'><div class='loaderbtn'></div></div>`);
                console.log($(btn).css('background-color'))
                $(btn).css('background-color', 'transparent');

                let key = parent.dataset.lzscrollSection

                movies.displayHomepage(movies.getlink(key), previousElementsibling, false).then(() => {

                    previousElementsibling.querySelectorAll(".movie").forEach((element) => {
                        //element.addEventListener('mouseleave', _this.hideMovieDetails);
                    })

                $(btn).html('View More')
                console.log($(btn).css('background-color'))
                $(btn).css('background-color', 'red');

                })
                return;
            }

            $(`.${btn.previousElementSibling.classList[0]}`).slick('unslick')
            btn.previousElementSibling.classList.add('more__movies')
            btn.parentNode.classList.add('mainsection')

            document.querySelectorAll('.section:not(.mainsection)').forEach((element) => {
                element.classList.add('displayNone')
            })
        })
            
        onReach && onReach(this.btns);                
    },
    

    hideMovieDetails() {
        this.querySelector('.movie__info').classList.remove('maxheight');
    }
}
