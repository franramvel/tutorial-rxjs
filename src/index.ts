import { fromEvent, map, tap } from "rxjs";

var buttonFrank = document.getElementById("btn-fran")!;

buttonFrank!.onclick = clickeado;

function clickeado(event){
    console.log("me has tocao!");
}

function clickeado2(event){
    //Existe logica
    //Toma mi nombre, toma mi apellido e imprimelo
    //@ts-ignore
    const numero1 = +document.getElementById("numero1")!.value;
    //@ts-ignore
    const numero2 = +document.getElementById("numero2")!.value;



    console.log(`La suma es ${numero1+numero2}!`);
}

buttonFrank!.addEventListener("click",clickeado2);

//Estos dos anteriores, son formas iguales de agregar funcionalidad para eventos en un botón, en general, en cualquier control HTML 

//Observable
var stream$ = fromEvent(buttonFrank,"click");

//Observador(Suscriptor)
var suscriptor = stream$
.pipe(
    tap(console.log),
    //Recuperar los valores de los campos
    //pipe para validacion
    //pipe para sumar
    map(()=>{
         //@ts-ignore
        const numero1 = +document.getElementById("numero1")!.value;
        //@ts-ignore
        const numero2 = +document.getElementById("numero2")!.value;
        //Y sumarlos
        return numero1+numero2
    }),
    //pipe multiplica por 0.5
    tap(console.log)
)
.subscribe((resultado)=>{
    console.log("Me clickearon desde rxjs, El resultado de tu suma es:"+resultado);
}
    
);