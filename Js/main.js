document.addEventListener("DOMContentLoaded", function () {
    let hero = {
        name: "",
        vida: 100,
        daño: 5,
        armadura: 2,
        gold: 100,
        inventario: [],
    };
    
    
    
    let encRandom ;
    let accion;

    let k=0;
    let vidaMons; 
    let dañoMons;
    let armMons;
    let caso3=false;
    let encEsp;


    let inputText = document.getElementById("inputText");
    let submitButton = document.getElementById("submitButton");
    let outputDiv = document.getElementById("msjDiv");
    let btns = document.getElementsByClassName("interactive__btn__btns");

    let btnAtacar = document.getElementById("atacar");
    let btnHuir = document.getElementById("huir");
    let btnSi = document.getElementById("si");
    let btnNo = document.getElementById("no");
    let btnsArray = [...btns];
    
    function ocultarInput(){
        inputText.style.display="none";
        submitButton.style.display="none";
    }

    function mostrarInput(){
        inputText.style.display ="flex";
        submitButton.style.display="flex";
    }

    function mostrarSiNo(){
        btnSi.style.display="flex";
        btnNo.style.display="flex";
    }

    function ocultarSiNo(){
        btnSi.style.display="none";
        btnNo.style.display="none";
    }

    function mostrarAccion(){
        btnAtacar.style.display="flex";
        btnHuir.style.display="flex";
    }

    function ocultarAccion(){
        btnAtacar.style.display="none";
        btnHuir.style.display="none";
    }
    

    const primeraLetraMayuscula = (cadena) => cadena.charAt(0).toUpperCase() + cadena.substring(1)

    const mostrarMensaje = async (mensaje) => {
        const messageList = document.getElementById("msjDiv");
        messageList &&
            (() => {
                const mensajeElement = document.createElement("li");
                mensajeElement.textContent = mensaje;
                messageList.appendChild(mensajeElement);
                messageList.scrollTop = messageList.scrollHeight;
            })();
    };

    

    async function mostrarImagen(src) {
        const imageDisplay = document.getElementById("imageDisplay");
    
        if (imageDisplay) {
            imageDisplay.src = src;
        }
    }

    const obtenerInput = async (mensaje) => {
        return new Promise((resolve) => {
            mostrarMensaje(mensaje);

            submitButton.addEventListener("click", () => {
                ocultarInput();
                const userInput = inputText.value;
                outputDiv.hasChildNodes() && outputDiv.removeChild(outputDiv.lastChild);
                resolve(userInput);
            });

            btnsArray.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const userBtns = btn.textContent;
                    resolve(userBtns);
                });
            });
        });
    }
    
    function filtroEspada(item) {
        return item === "KATANA MALDITA LEGENDARIA";
    }

    const cargaItemsPrincipio = async () => {
        const response = await fetch('Js/items.json');
        const merchantItemsJson = localStorage.getItem(response);
        merchantItemsJson ?? (() => {
            const merchantItems = [
                { name: 'Espada', price: 10 },
                { name: 'Poción', price: 5 },
                { name: "Manzana", price: 5 },
                { name: "Caña de pescar", price: 15 },
                { name: "Catalejo", price: 30 },
                { name: "Mapa del tesoro", price: 50 }
            ];
            localStorage.setItem('merchantItems', JSON.stringify(merchantItems));
        })();
    };


    async function mostrarMercaderias() {

        let merchantItems = JSON.parse(localStorage.getItem('merchantItems'));

        await mostrarMensaje(`¡Bienvenido al comercio de Ixidor! Aquí tienes las mercaderías disponibles:`);
    
        for (const item of merchantItems) {
            await mostrarMensaje(`- ${item.name}: ${item.price} de oro`);
        }
    }


// Función para cargar los items del merchant desde el archivo JSON
    async function cargarItemsMerchant() {
        try {
            const merchantItemsJson = localStorage.getItem('merchantItems');
            return merchantItemsJson ? JSON.parse(merchantItemsJson) : [];
        } catch (error) {
            console.error('Error al cargar los items del merchant:', error);
            return [];
        }
    }

// Función para guardar los items del merchant en el archivo JSON
    async function guardarItemsMerchant(items) {
        localStorage.setItem('merchantItems', JSON.stringify(items));
    }

    async function encuentroMerchant(hero) {
        ocultarAccion();
        ocultarSiNo();
        mostrarInput();
        await mostrarImagen("assets/imagenes/merchant.jpeg");
        
        let merchantItems = await cargarItemsMerchant();
    
        mostrarMercaderias();
    
        let itemNombre = await obtenerInput("¿Qué artículo desea comprar? (Escriba salir para dejar al mercader)");
        itemNombre = primeraLetraMayuscula(itemNombre);
        
        if (itemNombre === 'Salir'){
            await mostrarMensaje(hero.name + " ha deja atras al mercader misterioso, este se vuelve a esconder entre las sombras..." )
            return;
        }

        
    
            
        let itemIndex = merchantItems.findIndex((item) => item.name === itemNombre);
    
        if (itemIndex === -1) {
            await mostrarMensaje("El comerciante no tiene ese artículo en venta.");
            return;
        }

        let item = merchantItems[itemIndex];

        if (!item) {
            await mostrarMensaje("El comerciante no tiene ese artículo en venta.");
            return;
        }
    
        if (hero.gold < item.price) {
            await mostrarMensaje("No tienes suficiente oro para comprar ese artículo.");
            return;
        }
        

        hero.gold -= item.price;
        hero.inventario.push(item.name);
    
        
        merchantItems = merchantItems.filter((merchantItem) => merchantItem.name !== item.name);
        merchantItems.splice(itemIndex, 1);

        
        localStorage.setItem('merchantItems', JSON.stringify(merchantItems));
        
        await guardarItemsMerchant(merchantItems);
    
        await mostrarMensaje(`${hero.name} ha comprado ${item.name} por ${item.price} de oro.`);
    }

    async function encuentro1() {
        return new Promise(async (resolve) => {
            ocultarInput();
            ocultarSiNo();
            mostrarAccion();

            await mostrarImagen("assets/imagenes/goblin.jpeg");
            await mostrarMensaje("Un Goblin acaba de salir detras de un arbol!!");
            
            
            vidaMons = Math.ceil(Math.random()*(15 - 5) + 5);
            armMons = Math.ceil(Math.random()* 7) ;
    
            accion= await obtenerInput("quiere ATACAR o HUIR?");
            accion=accion.toUpperCase();
            
            let acum=0;
            let dañoH;
            let cont=0;
            while ((accion!=="ATACAR")&&(accion!=="HUIR")){
                await mostrarMensaje(hero.name + " no entiende que quieres hacer");
                accion=await obtenerInput("quiere ATACAR o HUIR?");
                accion=accion.toUpperCase();
            }
            if (accion=="ATACAR"){
                while (vidaMons > 0 && hero.vida > 0){
                    cont++;
                    await mostrarMensaje("================== Ronda "+ cont +" =====================");
                    dañoH =Math.ceil(Math.random()*(hero.daño-1)+1);
                    dañoMons = Math.ceil(Math.random()*(5-1)+1);
                    let diceH = Math.ceil(Math.random()*20);
                let diceM = Math.ceil(Math.random()*8);
                if (diceH >= armMons){
                            
                    vidaMons-= dañoH;
                    if (vidaMons < 0){
                        vidaMons = 0
                    }
                    await mostrarMensaje(hero.name + " le cortó el brazo al goblin haciendole " + dañoH + " de daño");
                    if (vidaMons == 0 ) {
                        await mostrarMensaje( "el goblin murio");
                    }
                }else {
                    await mostrarMensaje(hero.name+" falló el ataque");
                    
                }
                if ((diceM >= hero.armadura)&&(vidaMons!=0)){
                    hero.vida-=dañoMons;
                    acum+=dañoMons;
                    await mostrarMensaje("El goblin apuñaló a " + hero.name + " con una daga haciendole " + dañoMons + " de daño" );
                    await mostrarMensaje(hero.name + " esta sangrando le queda " + hero.vida +" vida");
                    
                }else if (vidaMons!=0) {
                    await mostrarMensaje("El gobling falló el ataque");
                    
                }
    
            } 
            await mostrarMensaje(hero.name+" quedo con "+ hero.vida +" puntos de vida..."); 
            await mostrarMensaje("el gobling en total le hizo "+ acum +" de daño");
            await mostrarMensaje("==================================================================================================");
        }else if (accion=="HUIR"){
            await mostrarMensaje(hero.name + " ha huido exitosamente, el goblin grita desde la distancia");
            await mostrarMensaje("==================================================================================================");    
        }

        resolve();
        });
    }
    
    async function encuentro2(){
        ocultarInput();
        ocultarAccion();
        mostrarSiNo();

        await mostrarImagen("assets/imagenes/cofre.jpeg");
        let cofre = await obtenerInput(hero.name + " encontró un cofre entre los arbustos, parece que no hay nadie cerca ¿lo quieres abrir? (SI o NO)");
        
        cofre = cofre.toUpperCase();
        if(cofre=="SI"){
         
    
            cofreRandom = Math.ceil ( Math.random()*5);
    
    
            let preg;
    
            switch (cofreRandom) {
    
                case 1:
                    await mostrarImagen("assets/imagenes/espada.jpeg");
                    await mostrarMensaje(hero.name + " abrió el cofre encontró una ESPADA DE CRUZADO!!!");
                    
                    preg=await obtenerInput("¿Equipar la ESPADA DE CRUZADO? (SI o NO)");
                    preg = preg.toUpperCase();
                    let espada = "ESPADA DE CRUZADO";
                    if((preg=="SI")&&(!hero.inventario.includes(espada))){
                        hero.inventario.push(espada) ;
                        hero.daño += 1;
                        await mostrarMensaje("Fuerza del heroe AUMENTÓ en 1, ahora posee "+ hero.daño +" str !!!!");
                       
                    }else {
                        await mostrarMensaje(hero.name +" ya posee este objeto, no se puede equipar ");
                    }
                break;
    
                case 2:
                    await mostrarImagen("assets/imagenes/libro_mist.jpeg");
                    let libro = "LIBRO MISTERIOSO";
                    
                    preg = await obtenerInput(hero.name + " abrió el cofre y encontró un LIBRO MISTERIOSO, ¿Llevar LIBRO MISTERIOSO? (SI o NO)");
                    preg = preg.toUpperCase();
                    if (preg=="SI"){
                        hero.inventario.push(libro);
                    }
                break;
    
                case 3:
                    await mostrarImagen("assets/imagenes/cofre.jpeg");
                    await mostrarMensaje(hero.name+" abrió el cofre pero no encontró nada... ");
                    
                break;
    
                case 4:
                    await mostrarImagen("assets/imagenes/armadura.jpeg");
                    preg=await obtenerInput(hero.name + " abrió el cofre y encontro una ARMADURA RELUCIENTE, ¿Equipar ARMADURA RELUCIENTE? (SI o NO)");
                    preg = preg.toUpperCase();
                    let arm = "ARMADURA RELUCIENTE"
                    if((preg=="SI"&&(!hero.inventario.includes(arm)))){
                        hero.inventario.push(arm);
                        hero.armadura = 2
                        await mostrarMensaje("La armadura del heroe AUMENTÓ !!!")
                    }else {
                        await mostrarMensaje(hero.name +" ya posee este objeto, no se puede equipar ")
                    }
                break;
    
                case 5:
                    await mostrarImagen("assets/imagenes/pocion.jpeg")
                    preg=await obtenerInput(hero.name + " abrió el cofre y encontro una POCION DE CURACION, ¿Usar POCION? (SI o NO)");
                    
                    preg = preg.toUpperCase();
                    if(preg=="SI"){
                        if(hero.vida<100){
                            hero.vida+=10;
                            (hero.vida>100)?hero.vida=100:hero.vida;
                            await mostrarMensaje("La poción restauro 10 puntos de vida, ahora "+ hero.name + " posee " + hero.vida + " HP!!! "); 
                        }else{
                            await mostrarMensaje(hero.name + " tomó la poción pero no sintió ningún efecto...");
                        }
                        
                    }
    
                break;
            }
        }
        
    }
    
    async function encuentro3(){

        ocultarInput();
        ocultarAccion();
        mostrarSiNo();
        let arma = "KATANA MALDITA LEGENDARIA";
        await mostrarImagen("assets/imagenes/tumba.jpeg")
        let tumba = await obtenerInput(hero.name + " encontró una tumba de un HEROE ANTIGUO, ¿la quieres saquear? (SI o NO)");
        
        tumba = tumba.toUpperCase();
        if(tumba=="SI"){
            await mostrarImagen("assets/imagenes/katana.jpeg");
            await mostrarMensaje(hero.name+" ha encontrado una KATANA MALDITA LEGENDARIA!!!!");
            
            let preg=await obtenerInput("Desea equipar KATANA MALDITA LEGENDARIA? (SI o NO)");
            preg = preg.toUpperCase();
            if(preg=="SI"){
                await mostrarMensaje(hero.name+" se siente mas poderoso pero tambien mas vulnerable ");
                hero.inventario.push(arma);
                hero.arm = 1 ;
                hero.daño = 10 ;
                hero.inventario = hero.inventario.filter(filtroEspada);
    
                await mostrarMensaje(hero.name+" puede sentir la maldicion...");
                await mostrarMensaje("La "+arma+" ha consumido todo tu inventario...");
                await mostrarMensaje(hero.name+" no quiere encontrar más items, solo MATAR...");
                await mostrarMensaje("殺す...");
                
    
            }
    
        }else{
            await mostrarImagen("../assets/imagenes/bald_forest.jpeg");
            await mostrarMensaje(hero.name+" ha abandonado la tumba para adentrarse mas en el bosque...");
           
            return false;
        }
        return true;
    }

    async function encuentrosJuego(pasosHero) {
        for (let i = 0; i < pasosHero; i++) {
            encRandom = Math.ceil(Math.random() * 2);
    
            switch (encRandom) {
                case 1:
                    caso3 ? await maldicion(caso3) : await (Math.ceil(Math.random() * 3) === 3 ? encuentroMerchant(hero) : await encuentro1());
                    break;
                case 2:
                    if (caso3) {
                        break;
                    }
                    encEsp = Math.ceil(Math.random() * 20);
                    caso3 = encEsp === 20 ? await encuentro3() : caso3;
                    await (caso3 ? null : await encuentro2());
                    break;
            }
        }
    }

    async function theStart(){
        ocultarAccion();
        ocultarSiNo();
        mostrarInput();
        hero.name = await obtenerInput("Ingrese su Nombre de héroe:");
        
        await mostrarMensaje( hero.name + " se esta por adentrar en un bosque desconocido...");
        await mostrarImagen("assets/imagenes/heroe.jpeg");
       
    }

    async function juego() {
          
        
        
        await theStart();
        await cargaItemsPrincipio();
        let pasosHero = Math.ceil (Math.random()*(15-9)+9);
        
        await encuentrosJuego(pasosHero);
        
        ocultarAccion();
        ocultarInput();
         ocultarSiNo();

        await mostrarImagen("assets/imagenes/castle.jpg")
        await mostrarMensaje(hero.name + " ha logrado salir del bosque sin un rasguño, encontró: " + hero.inventario)
        await mostrarMensaje(" Al salir del bosque puede divisar un castillo " + hero.name + " irá a aventurarse en el?...")    
    }
    
    ocultarAccion();
    ocultarInput();
    ocultarSiNo();

    Swal.fire( {
        title: 'The Misty Forest',
        html: '<img id="swal_image"src="assets/imagenes/bald_forest.jpg" alt="Adventure Game" >',
        imageWidth: 400,
        imageHeight: 200,
        color: '#86440d',
        background: '#fff url(assets/imagenes/texture_3.jpeg)',
        confirmButtonText: 'Empezar',
        confirmButtonColor: '#86440d',
      }).then(async (result) => {
        if (result.isConfirmed) {
          
         await juego();
        }
      })
});