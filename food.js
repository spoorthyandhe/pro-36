 class Food{
        constructor(){
            this.foodstock=0;
            this.lastFed;
            this.image = loadImage("Milk.png");
        }

       updateFoodStock(foodstock){
            this.foodstock = foodstock
      }

      getFedTime(lastFed){
          this.lastFed=lastFed;
      }

      deductFood(){
        if(this.foodstock>0){
            this.foodstock=this.foodstock-1;
        }
        }

        getFoodStock(){
            return this.foodstock;
        }

        bedroom(){
            background(bedroom,500,500)
        }
     
        garden(){
            background(garden,550,500);
        }

        washroom(){
            background(washroom,550,500);
        }
        
     display(){
         var x=80,y=100;

         imageMode(CENTER);
         image(this.image,720,220,70,70);

         if(this.foodStock != 0){
             for(var i = 0;i < this.foodstock;i++){
                 if(i%10==0){
                     x=80;
                     y=y+50;
                 }
                 image(this.image,x,y,50,50);
                 x=x+30;
             }
         }
     }
    }
