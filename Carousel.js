class Carousel {
    constructor(){
        console.log("Carousel container")
        this.carouselContainer = document.querySelector(".carousel-container");
        this.track = document.querySelector(".track");
        this.items = document.querySelectorAll(".carousel-item");
        this.moving = false; 
        this.start = 0; 
        this.end = 0; 
        this.prevX = 0; 
        this.slideX = 0; 
        this.threshold = 10; 
    }

    swipeStart(positionX){
       this.start = positionX
       this.started = true; 
    }

    swipeEnd(positionX){
        this.moving = false; 
        this.started = false; 
        this.end = positionX
    
        if(this.start > this.end) return this.goLeft(); 
        if(this.start  < this.end) return this.goRight(); 
        else {
            this.slideX = this.prevX;
            this.slideCards(); 
        }
    }

     /* SLides part of the carousel for smoother user experience */
    slideHalf(e,positionX){
        const currentX = positionX;
        const diff = currentX - this.start; 
        const disable = this.carouselContainer.offsetWidth >= this.track.offsetWidth; 
        if(!disable && this.started && (diff > this.threshold || diff < -this.threshold) ){
            this.moving = true;
        }

        if(this.moving){
         
            const max = this.track.offsetWidth - this.items[0].offsetWidth; 
            const slideW = this.start < currentX ? this.items[0].offsetWidth : -this.items[0].offsetWidth; 

            const move = this.prevX + slideW / 2; 

            if(move > -max && move < 0){
                this.slideX = move; 
                this.slideCards();
            }
        }

    }

    slideCards(){
        this.track.style.transform = `translateX(${this.slideX}px)`   
    }

    goLeft(){
    
        const max = this.track.offsetWidth; 
        console.log("MAX ",max);
        const multiplier = Math.floor(this.carouselContainer.offsetWidth/this.items[0].offsetWidth);
        const step = this.items[0].offsetWidth * multiplier; 
        let move = this.prevX - step; 
        const nextMove = move - step; 
        console.log("move ", step);

        if(move > -max){
            console.log("MOVEMOVE")
         

            if(nextMove < -max || nextMove === -max){
                move = -max + this.carouselContainer.offsetWidth; 
                console.log("MOVE 2 ", move)
            }

            this.slideX = move; 
            this.prevX = this.slideX; 
            this.slideCards()

        }else{
            console.log("DONT MOVE")
        }
     
    }

    goRight(){
        const multiplier = Math.floor(this.carouselContainer.offsetWidth/this.items[0].offsetWidth);
        let move = this.prevX + this.items[0].offsetWidth * multiplier; 
        const nextMove = move * multiplier * this.items[0].offsetWidth; 

        if(move > this.items[0].offsetWidth || nextMove > this.items[0].offsetWidth){
            move = 0; 
        }

        if(move < this.items[0].offsetWidth){ 
            console.log("MOVE RIGHT")
            this.slideX = move; 
            this.prevX = this.slideX; 
            this.slideCards(); 
        }
    }
    
}

const carousel = new Carousel(); 


carousel.carouselContainer.addEventListener("touchstart", (e) => {
     carousel.swipeStart(e.touches[0].pageX); 
 }, {passive:true});

carousel.carouselContainer.addEventListener("touchend", (e) => {

     carousel.swipeEnd(e.changedTouches[0].pageX); 
 }, {passive:true});

 carousel.carouselContainer.addEventListener("touchmove", (e) => {

    carousel.slideHalf(e, e.touches[0].pageX); 
}, {passive:true});
 
