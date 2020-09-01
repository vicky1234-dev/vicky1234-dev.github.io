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

            console.log($('.last-active'))
            $('.last-active').removeClass('last-active')

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

                modal.init($('.mainsection').find("[data-target~='modal']"))
                })

                //$('.mainsection .movie').filter(':even').attr('data-aos','fade-right')
                //$('.mainsection .movie').filter(':odd').attr('data-aos','fade-left')

                return;
            }

            $(document).off('scroll')
            $(`.${btn.previousElementSibling.classList[0]}`).slick('unslick')

            btn.previousElementSibling.classList.add('more__movies')
            btn.parentNode.classList.add('mainsection')

            var txt2 = $(`<button class='goback'>Close button</button>`).text("Homepage");   // Create with jQuery
            $('.mainsection').prepend(txt2)
            
            txt2.click(function(){
                $('.displayNone').removeClass('displayNone')
                $('.mainsection').removeClass('mainsection')

                addSlick('more__movies', $('.more__movies').get() )
                scrollLoad.init({
                    element: `.section:not(.loaded) .movieClass`,
                    onReach(element, config) {

                        movies.c = movies.c + 1;
                        element.classList.remove('lazy');
                        $(element).parent().addClass('loaded')

                        let key =  element.parentNode.dataset.lzscrollSection ;
                        movies.displayHomepage(movies.getlink(key), element, false).then((resp) => {

                            addSlick(element.classList[0],element);
                            modal.init($(element).find("[data-target~='modal']"))

                        });
                    }
                }) 
                $(this).parent().find('.more__movies').removeClass('more__movies')
                $(this).remove()
            })

            document.querySelectorAll('.section:not(.mainsection)').forEach((element) => {
                element.classList.add('displayNone')
                console.log($('.mainsection .movie').filter(':even'))

            })
        })
            
        onReach && onReach(this.btns);                
    },
    

    hideMovieDetails() {
        this.querySelector('.movie__info').classList.remove('maxheight');
    }
}
