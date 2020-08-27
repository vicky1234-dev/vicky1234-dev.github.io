const modal = {
    init(object) {
        // this._config = object
        
        const $el = $(object)
        let _this = this
        $(object).attr('data-target','none')

        this._addEventshandler = function () {
            
            $el.each(function (i, element) {
                 $(element).click(function(){
                    // (_this.makeModal.bind(this))()
                    _this.makeModal.call(this)
                 })
            })
        }

        this._addEventshandler();
    },

    makeModal() {
        //const onReach = this._config.onReach
            console.log('this.dataset.id')
            
            movies.fetchMovie(`https://api.themoviedb.org/3/movie/${this.dataset.id}/videos?api_key=4d47cb3ed5fd192971a9a94765f0624e`, this).then((response) => {
                   console.log(response)
                   const t = $("[data-tag~='modal']")

                   t
                       .addClass('show')
                       .find('.movie__name')
                       .html(this.querySelector('.movie__name').innerHTML)

                       .end()
                       .find('.movie__info')
                       .html(this.querySelector('.movie__info').innerHTML)
                       .addClass('maxheight')

                       .end()
                       .find('iframe') 
                       try {
                         t.find('iframe').attr('src', `https://www.youtube.com/embed/${response.results[0].key}?rel=0&modestbranding=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1`)
                           
                       } catch (error) {
                          alert('movies not found') 
                       }

                        t.find('.movie__details').addClass('posstatic')

                       t
                       .find("[data-tag~='closemodal']")
                       .one('click', function () {
                           console.log('closed')
                           t.removeClass('show')
                           t.find('iframe').attr('src', '')
                           t.removeClass('posstatic')
                       })
                
                //onReach && onReach(t)
            })
    }
}
                                            


 

