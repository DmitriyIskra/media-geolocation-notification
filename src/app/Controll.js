export default class Controll {
    constructor(draw) {
        this.draw = draw;

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    init() {
        this.registerEvents();
    }
 
    registerEvents() {
        this.draw.board.addEventListener('click', this.onClick);
        this.draw.form.addEventListener('submit', this.onSubmit);
    }

    onClick(e) {

        if(e.target.closest('.eye')) {
            const element = e.target.previousElementSibling;
            this.draw.visibleCoords(element);
        }

        if(e.target.matches('.board')) {
            this.draw.initModal('text');
        }
    }

    onSubmit(e) {
        e.preventDefault()
        
        if(navigator.geolocation) {
            this.draw.getGeolocation('text');

            return;
        } 

    }
}