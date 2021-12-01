<template>
  <v-container>
    <v-row>
      <!-- Carrusel -->
      <v-col cols="12" md="5" class="my-3">
        <v-carousel
          cycle
          height="400"
          width="10"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(foto, index) in imagenes" :key="index">
                      <v-img
                        contain
                        :src="foto"
                        width="100%"
                        height="100%"
                      >
                      </v-img>
                    
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="7" class="text-center">
        <v-card shaped class="ml-5 mt-3" elevation="15" style="background-color:#fbf383">
          <v-card-text>
            <div>
              <h2 >{{anuncio.titulo}}</h2>
            </div>
            <div class="my-4 text-subtitle-1">• Precio: $ {{anuncio.precio}}</div>
            <div class="my-4 text-subtitle-1">
              • Vendedor: {{anuncio.vendedor}}
            </div>
            <div class="my-4 text-subtitle-1">• Telefono: {{anuncio.telefono  }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card color="#f2ab39" >
          <v-card-title class="justify-center" style="background-color:#fbf383">Descripcion</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="ml-3 mt-3" style="background-color:#fbf383" shaped outlined elevation="16">
                <v-card-text>
                  <div class="my-4 text-subtitle-1">• Estado: {{ anuncio.estado}}</div>
                  <div class="my-4 text-subtitle-1">
                    • Marca: {{anuncio.marca}}
                  </div>
                  <div class="my-4 text-subtitle-1">• Modelo: {{anuncio.modelo}}</div>
                  <div class="my-4 text-subtitle-1">
                    • Pantalla: {{anuncio.tamanio}} pulgadas
                  </div>
                  <div class="my-4 text-subtitle-1">• Sistema: {{anuncio.sistemaop}}</div>
                  <div class="my-4 text-subtitle-1">• Rom: {{anuncio.rom}}</div>
                  <div class="my-4 text-subtitle-1">• Ram: {{anuncio.ram}}</div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card shaped outlined elevation="16"
               class="mr-3 mt-3" height="355" 
               style="background-color:#fbf383">
                <v-card-text>
                  <div class="text-subtitle-1">
                    {{anuncio.descripcion}}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row class="mt-16">
      <v-footer fixed color="#FAF5B4">
        <v-row class="justify-center">
          <v-col cols="6" sm="4">
            <v-btn to="/" block style="color: white" color="red darken-4"
              >Volver</v-btn
            >
          </v-col>
          <v-col cols="6" sm="4">
            <v-btn block style="color: white" color="#69491a" to="/"
              >Comprar</v-btn
            >
          </v-col>
        </v-row>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>
import {  st, db } from "../firebase";

export default {
  name: "Anuncio",
  mounted() {
    this.traer_imagen();
  },
  data() {
    return {
    id_anuncio:"",
    anuncio:{},
    imagen2: null,
    contador: 0,
    imagenes:[],

    };
  },
  created(){
    this.id_anuncio=this.$route.params.id;
    this.traer_anuncio();
  },
    methods: {
      traer_anuncio(){
        let this2=this;
        this.anuncio=db.collection("anuncios").doc(this.id_anuncio).get().then(function(dato){
          this2.anuncio=dato.data();
        })
      },

      async traer_imagen() {
      const refs = st.ref();
      let this2 = this;
      await refs
        .child(this2.id_anuncio + "/")
        .listAll()
        .then(function (result) {
          console.log(result.items);
          result.items.forEach(function (imgRefe) {
             imgRefe.getDownloadURL().then(function (url) {
                console.log(url);
                this2.imagenes.push(url);
          });
          });
        });
    },
    }
};
</script>

<style>
</style>