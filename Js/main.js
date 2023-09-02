// alert();
 
let hero = prompt( "Ingrese su Nombre de heroe:");
let vidaHero = 100;
let dañoBasicoHero = Math.random()*(10-1)+1;
let armHero = 10;

let encRandom ;
let accion;

let vidaMons;
let dañoMons;
let armMons;

let pasosHero = prompt( "Ingrese cuanto quiere caminar en el bosque" );


for (let i = 0; i < pasosHero; i++) {

    encRandom = Math.ceil ( Math.random()*100); 

    if (encRandom<=25){

        console.log("Un Goblin acaba de salir detras de un arbol!!");

        vidaMonster = Math.ceil(Math.random()*(20 - 10) + 10);

        dañoMons = Math.ceil(Math.random()*(10-1)+1);

        armMons = Math.ceil(Math.random()* 5) ;

        accion=prompt("quiere ATACAR o HUIR?");

        

        if (accion==="ATACAR"){

            while (vidaMons > 0 && vidaHero > 0){

                if (dañoBasicoHero >= armMons){

                    vidaMons-=dañoBasicoHero;
                    if (vidaMons < 0){
                        vidaMons = 0
                    }

                    console.log(hero + " le cortó el brazo al goblin haciendole" + dañoBasicoHero + "de daño");
                    
                    if (vidaMons == 0 ) {

                        console.log( "el goblin murio");
                    }

                }

                if (dañoMons >= armHero){

                    vidaHero-=dañoMons;

                    console.log("El goblin apuñaló a" + hero + "con una daga haciendole" + dañoMons + "de daño" );
                }

            } 
            


        }else if (accion=="HUIR"){

        }

    }     
    
    if (  encRandom>25 && encRandom<=50){

        console.log( hero + "encontró un tesoro!!!");
    }

}



console.log(hero);