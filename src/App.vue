<template>
  <v-app style="background-color: #FAF5B4">
    <v-app-bar app color="#f2ab39" outlined flat dense >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-md-none"
      ></v-app-bar-nav-icon>
      <div class="align-center d-none d-md-flex d-md-none">
        <!-- <v-icon> mobile-alt </v-icon> -->
        <!-- <v-img
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Smartphone_icon_-_Noun_Project_283536_white.svg/1200px-Smartphone_icon_-_Noun_Project_283536_white.svg.png"
          transition="scale-transition"
          width="40"
        /> -->
        <v-btn to="/" plain>
           <v-icon>mdi-cellphone</v-icon>
        <v-toolbar-title style="font-style: Serif; font-weight: 500"
          >Cellphone</v-toolbar-title
        >
        </v-btn>
       
      </div>
      <v-autocomplete
      v-model="buscador"
        class="ml-6"
        :items="modelos"
        @change="filtroBuscar"
        filled
        rounded
        solo-inverted
        dense
        clearable
        hide-details
        hide-selected
        label="Modelo de telefono que busco..."
      ></v-autocomplete>
      <v-btn plain tile to="/" class="d-none d-md-flex d-md-none">
        <v-icon left> mdi-home </v-icon>
        Inicio
      </v-btn>
      <v-btn plain tile to="/estadisticas" class="d-none d-md-flex d-md-none">
        <v-icon left> mdi-chart-bar </v-icon>
        Estadisticas
      </v-btn>
      <v-btn plain tile to="/nuevo_anuncio" class="d-none d-md-flex d-md-none">
        <v-icon left> mdi-plus-circle</v-icon>
        Anuncio
      </v-btn>
      <v-badge
        color="#69491a"
        content="2"
        overlap
        class="d-none d-md-flex d-md-none"
      >
        <v-btn plain to="/Carrito" class="d-none d-md-flex d-md-none">
          <v-icon left>mdi-cart-arrow-down</v-icon>
          Carrito
        </v-btn>
      </v-badge>
    </v-app-bar>
    <!-- Panel Lateral de Navegacion -->
    <v-navigation-drawer app fixed temporary v-model="drawer" color="lime lighten-3">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-cellphone</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Cellphone</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in iconos" :key="item.title" :to="item.direccion">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="drawer=false" dark color="#69491a">
            Cerrar
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {bus} from "./main"
import {db} from "./firebase.js"
export default {
  name: "App",

  data: () => ({
   drawer: null,
   buscador:"",
   modelos:[],
    iconos: [
      { title: "Home", icon: "mdi-view-dashboard", direccion: "/" },
      { title: "Estadisticas", icon: "mdi-chart-bar", direccion: "/estadisticas" },
      { title: "Anuncio", icon: "mdi-plus-circle", direccion: "/nuevo_anuncio" },
      { title: "Carrito", icon: "mdi-cart-arrow-down", direccion:"/Carrito"},
    ],
  }),
  created(){
this.traerDatos();
  },
  methods:{
    async traerDatos(){
      let this2=this;
        await db.collection("anuncios").get().then( async function(arr){
            for(const qry of arr.docs){
              // console.log(qry);
                this2.modelos.push(qry.data().modelo);
            }
        })
    },

    filtroBuscar(){
      bus.$emit("filtroSearch",this.buscador);
    }
  }
};
</script>
