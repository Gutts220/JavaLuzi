 
let hero = {

    name : "",
    vida : 100,
    daño: 5,
    armadura: 2,
    inventario: [],
}

hero.name = prompt( "Ingrese su Nombre de heroe:");


let encRandom ;
let accion;

let k=0;
let vidaMons;
let dañoMons;
let armMons;




function encuentro1() {

    console.log("Un Goblin acaba de salir detras de un arbol!!");

    vidaMons = Math.ceil(Math.random()*(15 - 5) + 5);
    armMons = Math.ceil(Math.random()* 7) ;

    accion=prompt("quiere ATACAR o HUIR?");
    accion=accion.toUpperCase();
    let acum=0;
    let dañoH;
    while ((accion!=="ATACAR")&&(accion!=="HUIR")){
        console.log(hero.name + " no entiende que quieres hacer");
        accion=prompt("quiere ATACAR o HUIR?");
        accion=accion.toUpperCase();
        
    }
    if (accion=="ATACAR"){
        while (vidaMons > 0 && hero.vida > 0){
            dañoH =Math.ceil(Math.random()*(hero.daño-1)+1);
            dañoMons = Math.ceil(Math.random()*(5-1)+1);
            let diceH = Math.ceil(Math.random()*20);
            let diceM = Math.ceil(Math.random()*8);
            if (diceH >= armMons){
                        
                vidaMons-= dañoH;
                if (vidaMons < 0){
                    vidaMons = 0
                }
                console.log(hero.name + " le cortó el brazo al goblin haciendole " + dañoH + " de daño");
                if (vidaMons == 0 ) {
                    console.log( "el goblin murio");
                }
            }else {
                console.log(hero.name+" falló el ataque");
                console.log("==================================================================================================");
            }
            if ((diceM >= hero.armadura)&&(vidaMons!=0)){
                hero.vida-=dañoMons;
                acum+=dañoMons;
                console.log("El goblin apuñaló a " + hero.name + " con una daga haciendole " + dañoMons + " de daño" );
                console.log(hero.name + " esta sangrando le queda " + hero.vida +" vida");
                console.log("==================================================================================================");
            }else if (vidaMons!=0) {
                console.log("El gobling falló el ataque");
                console.log("==================================================================================================");
            }

        } 
        console.log(hero.name+" quedo con "+ hero.vida +" puntos de vida..."); 
        console.log("el gobling en total le hizo "+ acum +" de daño");
        console.log("==================================================================================================");
    }else if (accion=="HUIR"){
        console.log(hero.name + " ha huido exitosamente, el goblin grita desde la distancia");
        console.log("==================================================================================================");    
    }
}

function encuentro2(){

    let cofre = prompt(hero.name + " encontró un cofre entre los arbustos, parece que no hay nadie cerca ¿lo quieres abrir? (SI o NO)");
    cofre = cofre.toUpperCase();
    if(cofre=="SI"){
     

        cofreRandom = Math.ceil ( Math.random()*4);

        let preg;

        switch (cofreRandom) {

            case 1:
                console.log(hero.name + " abrió el cofre encontró una ESPADA DE CRUZADO!!!")
                preg=prompt("¿Equipar la ESPADA DE CRUZADO? (SI o NO)");
                preg = preg.toUpperCase();
                let espada = "ESPADA DE CRUZADO";
                if((preg=="SI")&&(!hero.inventario.includes(espada))){
                    hero.inventario[0+k] = espada ;
                    hero.daño += 1;
                    console.log("Fuerza del heroe AUMENTÓ en 1, ahora posee "+ hero.daño +" str !!!!");
                }else {
                    console.log(hero.name +" ya posee este objeto, no se puede equipar ")
                }
            break;

            case 2:
                preg = prompt(hero.name + "abrió el cofre y encontró un LIBRO MISTERIOSO, ¿Llevar LIBRO MISTERIOSO? (SI o NO)");
                preg = preg.toUpperCase();
                if (preg=="SI"){
                    hero.inventario[0+k] = "LIBRO MISTERIOSO";
                }
            break;

            case 3:
                console.log(hero.name+" abrió el cofre pero no encontró nada... ");
            break;

            case 4:
                preg=prompt(hero.name + " abrió el cofre y encontro una ARMADURA RELUCIENTE, ¿Equipar ARMADURA RELUCIENTE? (SI o NO)");
                preg = preg.toUpperCase();
                let arm = "ARMADURA RELUCIENTE"
                if((preg=="SI"&&(!hero.inventario.includes(arm)))){
                    hero.inventario[0+k] = arm;
                    hero.armadura = 2
                    console.log("La armadura del heroe AUMENTÓ !!!")
                }else {
                    console.log(hero.name +" ya posee este objeto, no se puede equipar ")
                }
            break;

            case 5:
                preg=prompt(hero.name + " abrió el cofre y encontro una POCION DE CURACION, ¿Usar POCION? (SI o NO)");
                preg = preg.toUpperCase();
                if(preg=="SI"){
                    if(hero.vida<100){
                        hero.vida+=10;
                        (hero.vida>100)?hero.vida=100:hero.vida;
                        console.log ("La poción restauro 10 puntos de vida, ahora "+ hero.name + " posee " + vida.hero + " HP!!! "); 
                    }else{
                        console.log(hero.name + " tomó la poción pero no sintió ningún efecto...");
                    }
                    
                }

            break;
        }
    }
    k++;
}



let pasosHero = prompt( "Ingrese cuanto quiere caminar en el bosque" );

for (let i = 0; i < pasosHero; i++) {

    encRandom = Math.ceil ( Math.random()*2);

    switch (encRandom) {
        case 1:
            encuentro1();
            break;
        case 2:
            encuentro2();
            break;

    }
   
}



console.log(hero.name + " ha podido salir del bosque ileso, encontró: " + hero.inventario );
console.log(" Al salir del bosque el puede divisar un castillo " + hero.name + "irá a aventurarse en el?...");


