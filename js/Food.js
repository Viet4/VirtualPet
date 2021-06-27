class Milk{
    constructor(){
        this.milk = loadImage("images/Milk.png");
        this.foodStock = foodS;
        this.lastFed;
    }
    /*
    getFoodStock(){
        var foodStockRef = database.ref("food");
        foodStockRef.on("value", function(data){
            foodS = data.val();
        });
    }
    updateFoodStock(state){
        //database.ref("/").update({
            this.foodStock = state;
        //});
    }
    deductFood(){
        if (this.foodStock>0){
            this.foodStock+=-1;
        }
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    

    bedroom(){
        background(bedroomImg,250,406);
    }
    garden(){
        background(gardenImg,250,406);
    }
    washroom(){
        background(washroomImg,250,406);
    }
    */

    display(){
        var x=110, y=500;

        imageMode(CENTER);

        this.foodStock = foodS;

        if (this.foodStock!==0) {
            for(var i = 0; i<this.foodStock; i++){
                if (i%10===0){
                    x=110;
                    y+=50;
                }
                image(this.milk,x,y,50,50);
                x+=30;
            }
        }
    }
}