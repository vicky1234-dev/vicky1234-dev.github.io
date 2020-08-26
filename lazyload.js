const scrollLoad = {
    init(object) {

        this._config = object
        this.sections = []
        // this._loadedSections = 0;
        $(`${object.element}`).addClass('lazy')

        this._handler = function(){

            this.sections = $(`${object.element}.lazy`)
            this.onScroll();
        }
        this._handler();
        // init for visible sections
        $(document).scroll(this._handler.bind(this))
    },
    
    onScroll() {
        if (this.sections.length === 0) {
            // unbind events
            $(document).off('scroll',this._handler)
        }               
        const onReach = this._config.onReach
        this.sections.each((index , section) => {

            if (section.offsetTop < (window.innerHeight + window.pageYOffset)) {
                
                onReach && onReach( section );
                // this._loadedSections++
            }
        });
    }
}
