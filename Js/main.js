// alert();
 
let hero = prompt( "Ingrese su Nombre de heroe:");
let vidaHero = 100;
let dañoBasicoHero = Math.ceil(Math.random()*(10-1)+1);
let armHero = 10;
let inventario = [];

let encRandom ;
let accion;

let k=0;
let vidaMons;
let dañoMons;
let armMons;


function encuentro1() {

    console.log("Un Goblin acaba de salir detras de un arbol!!");

    vidaMons = Math.ceil(Math.random()*(20 - 10) + 10);
    dañoMons = Math.ceil(Math.random()*(10-1)+1);
    armMons = Math.ceil(Math.random()* 5) ;
    accion=prompt("quiere ATACAR o HUIR?");
    accion=accion.toUpperCase();

    if (accion=="ATACAR"){
        while (vidaMons > 0 && vidaHero > 0){
            if (dañoBasicoHero >= armMons){
                        
                vidaMons-=dañoBasicoHero;
                if (vidaMons < 0){
                    vidaMons = 0
                }
                console.log(hero + " le cortó el brazo al goblin haciendole " + dañoBasicoHero + " de daño");
                if (vidaMons == 0 ) {
                    console.log( "el goblin murio");
                }
            }
            if (dañoMons >= armHero){
                vidaHero-=dañoMons;
                console.log("El goblin apuñaló a " + hero + " con una daga haciendole " + dañoMons + " de daño" );
                }
            } 
    }else if (accion=="HUIR"){
        console.log(hero + " ha huido exitosamente, el goblin grita desde la distancia");
    }else{
        console.log(hero + " no entiende que quieres hacer");
    }
}

function encuentro2(){

    let cofre = prompt(hero + " encontró un cofre entre los arbustos, parece que no hay nadie cerca ¿lo quieres abrir? (SI o NO)");

    if(cofre=="SI"){
     

        cofreRandom = Math.ceil ( Math.random()*4);

        let preg;

        switch (cofreRandom) {

            case 1:
                console.log(hero + " abrió el cofre encontró una ESPADA nueva!!!")
                preg=prompt("¿Equipar la ESPADA nueva?");
                if(preg=="SI"){
                    if (inventario[0+k]==true){
                        k++;
                    }
                    inventario[0+k] = "ESPADA";
                    dañoBasicoHero = Math.ceil(Math.random()*(15-5)+5);
                    console.log("daño basico del heroe AUMENTÓ !!!");
                }
            break;

            case 2:
                preg = prompt(hero + "abrió el cofre y encontró un LIBRO MISTERIOSO, ¿Llevar LIBRO MISTERIOSO? (SI o NO)");
                if (preg=="SI"){
                    if (inventario[0+k]==true){
                        k++;
                    }
                    inventario[0+k] = "LIBRO MISTERIOSO";
                }
            break;

            case 3:
                console.log(hero+" abrió el cofre pero no encontró nada... ");
            break;

            case 4:
                preg=prompt(hero + " abrió el cofre y encontro una ARMADURA RELUCIENTE, ¿Equipar ARMADURA RELUCIENTE? (SI o NO)");
                if(preg=="SI"){
                    if (inventario[0+k]==true){
                        k++;
                    }
                    inventario[0+k] = "ARMADURA RELUCIENTE";
                    armHero = 30
                    console.log("La armadura del heroe AUMENTÓ !!!")
                }
            break;
        }
    }
}



let pasosHero = prompt( "Ingrese cuanto quiere caminar en el bosque" );

for (let i = 0; i < pasosHero; i++) {

    encRandom = Math.ceil ( Math.random()*4);

    switch (encRandom) {
        case 1:
            encuentro1();
            break;
        case 2:
            encuentro2();
            break;
        case 3:
            break;
        case 4:
            break;

    }
   
}



console.log(hero + " ha podido salir del bosque ileso, encontró: " + inventario );
console.log(" Al salir del bosque el puede divisar un castillo " + hero + "irá a aventurarse en el?...");


