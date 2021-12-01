<template>
  <v-row style="width: 100%">
    <v-col
    md="4"
      lg="3"
      cols="6" 
      v-for="(cel, index) in anuncios"
      :key="index"
    >
      <v-card elevation="15" class="ma-1 mb-5" max-height="350"  max-width="374" outlined
  shaped>
        <v-img contain height="250" max-height="260" :src="cel.imagen" class=""></v-img>
        <v-card-title color="#d69e02" style="background-color:#fbf383"> 
          <v-row>
            <v-col cols="12" sm="6" class="text-center">
                ${{ cel.precio }}
            </v-col>
            <v-col cols="12" sm="6" >
              <v-btn @click="veranuncio(cel.id)" color="#69491a" dark small absolute right>Ver mas </v-btn>
            </v-col>
          </v-row>
          </v-card-title
        >
        <v-card-text style="background-color:#fbf383" >
          <v-row align="center" class="mx-0 overflow-ellipsis">
            <v-col cols="1" sm="12" >
             <p class="overflow-ellipsis"> {{ cel.descripcion }}</p>
            </v-col>
            </v-row>
            </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { db, st } from "../firebase";
import {bus} from "../main"

export default {
  name: "datos",
  props: {
    productos: Number,
    page: Number,
    orden: String,
    desde: String,
    hasta: String,
  },
  data: () => ({
    buscador:"",
    estad:false,
     marcas:[],
    sistemas:[],
    pantallas:[],
    partidalCelul: [],
    limit: 0,
    inicio: 0,
    contador: 0,
    celular: {},
    celulares: [],
    anuncios: [],
  }),
  created() {
    bus.$on("filtroSearch", (data)=>{
      
      this.buscador=data;
      this.filtrarPorBuscador();
    })

    bus.$on("cambiosEnFiltro", (data)=>{
      this.marcas=data.marca;
      this.sistemas=data.sistema;
      this.pantallas=data.pantalla;
      this.estad=data.stat;
      this.filtrar();
    })

    this.traerCelulares();
  },
  methods: {
    async traerCelulares() {
      this.limit = this.page * this.productos;
      this.inicio = this.limit - this.productos;
      this.celulares = [];
      let this2 = this;

      await db
        .collection("anuncios")
        .orderBy(this.orden, "desc")
        .get()
        .then(async function (query) {
          for (const doc of query.docs) {
            let anuncio = {
              id: doc.id,
              precio: doc.data().precio,
              marca: doc.data().marca,
              descripcion: doc.data().descripcion,
              pantalla: doc.data().tamanio,
              sistema:doc.data().sistemaop,
              modelo: doc.data().modelo,
              estado:doc.data().estado,
              imagen: await st
                .ref()
                .child(doc.id + "/1.jpg")
                .getDownloadURL(),
            };

            this2.celulares.push(anuncio);
          }
        });
      this.partidalCelul = this.celulares;
      this.recorrerDatos();
    },
    recorrerDatos() {
      this.anuncios = [];
      for (let i = this.inicio; i < this.limit; i++) {
        if (i < this.celulares.length) {
          this.anuncios.push(this.celulares[i]);
        } else {
          break;
        }
      }
    },
    orderByPrecio() {
      this.celulares = this.partidalCelul;
      let datosporPrecio = [];
      let this2 = this;
      this.celulares.forEach(function (elemento) {
        if (elemento.precio >= this2.desde && elemento.precio <= this2.hasta) {
          datosporPrecio.push(elemento);
        }
      });
      // if (datosporPrecio.length > 0) {
        // this.celulares = [];
        this.celulares = datosporPrecio;
        console.log(this.celulares);
        this.recorrerDatos();
      // }
    },
    filtrar(){
      let encontrados=0;
      let filtrosActivos=[];
      let this2=this;
      if(this.marcas==0 && this.pantallas==0 && this.sistemas==0 && this.estad==false){
        this.recorrerDatos();
      }else{
        this.celulares.forEach(function (elemento) {
          if(this2.estad==true){
            if(elemento.estado=="nuevo"){
               encontrados=1;
            }
            // console.log(elemento.estado+"-"+)
           
          }
          for(const marca of this2.marcas){
              if(marca==elemento.marca){
              encontrados=1;
            }
          }
          for(const pantalla of this2.pantallas){
            if(pantalla==elemento.pantalla){
              encontrados=1;
            }
          }
          for(const sistema of this2.sistemas){
            if(sistema==elemento.sistema){
              encontrados=1;
            }
          }
          if(encontrados==1){
          filtrosActivos.push(elemento);
          }

       
          encontrados=0;
        });
      
        this.anuncios=filtrosActivos;
      
      }
       
     
    },
    filtrarPorBuscador(){
      let coincidencias=[];
      let this2=this;
      if(this.buscador===""){
        this.recorrerDatos();
      }else{
          this.celulares.forEach(function (elemento) {
            // console.log(elemento);
            // console.log(this2.buscador+"-"+elemento.modelo)
         if(this2.buscador===elemento.modelo){
           coincidencias.push(elemento);
         }
          });
      }
      if(coincidencias.length>0){
        // console.log("entra")
        this.anuncios=coincidencias;
      }else{
        // console.log("no entra")
          this.recorrerDatos();
      }

    },
    veranuncio(id){
        this.$router.push("anuncio/"+id);
    }
  },
  watch: {
    productos: function (val) {
      // this.anuncios = [];
      console.log(val);
      this.traerCelulares();
    },
    page: function (val) {
      // this.anuncios = [];
      console.log(val);
      this.traerCelulares();
    },
    orden: function (val) {
      this.traerCelulares();
      console.log(val);
    },
    hasta: function (val) {
      if (this.hasta > 0) {
         let resta=val-this.desde;
        if (resta>0) {
  
          this.orderByPrecio();
        } else {
          console.log(val);
        }
      }
    },
    desde: function (val) {
      if (this.hasta > 0) {
        let resta=this.hasta-val;
        if (resta>0) {
          this.orderByPrecio();
        } else {
          console.log(val);
        }
      }
    },
  },
};
</script>
<style scoped>
p {
  /* BOTH of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
}
  .overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>