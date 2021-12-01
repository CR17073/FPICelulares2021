<template>
  <v-container >
    <v-row no-gutters  dense  class="d-none d-lg-flex d-lg-none">
      <v-col dense>
        <v-card color="#e4b660"
            elevation="18"
            outlined
            shaped 
            class="justify-center" >
            <v-card-title>
               <v-switch 
        @change="emitirFiltros()"
        v-model="estado"
          class="pl-4"
          color="#69491a"
          hide-details
        ></v-switch>
        Nuevo
            </v-card-title>
        </v-card>
        <br />
        <v-card elevation="24" outlined color="#FAF66C" >
          <v-card-title style="background-color: #f2ab39">Marca</v-card-title>
          <v-card-text class="mt-4">
            <v-badge inline  color="#69491a" content="2" style="color: black;">
               <v-checkbox dense
               @change="emitirFiltros()"
               v-model="marcas"
               value="samsung"
              color="#69491a"
              style="transform: scale(0.9)"
              class="pa-0 ma-auto"
              label="Samsung"
            ></v-checkbox>
            </v-badge>
             <v-badge value="2" inline  color="#69491a" content="2" style="color: black;">
            <v-checkbox dense
              @change="emitirFiltros()"
             v-model="marcas"
               value="huawei"
              color="#69491a"
              style="transform: scale(0.9)"
              class="pa-0 ma-auto"
              label="Huawei"
            ></v-checkbox>
            </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox
              @change="emitirFiltros()"
             v-model="marcas"
               value="nokia"
              color="#69491a"
              dense
              style="transform: scale(0.9)"
              class="pa-0 ma-auto"
              label="Nokia"
            ></v-checkbox>
            </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox
              @change="emitirFiltros()"
             v-model="marcas"
               value="xiaomi"
              color="#69491a"
              dense
              style="transform: scale(0.9)"
              class="pa-0 ma-auto"
              label="Xiaomi"
            ></v-checkbox>
            </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox
              @change="emitirFiltros()"
             v-model="marcas"
               value="iphone"
              color="#69491a"
              dense
              style="transform: scale(0.9)"
              class="oa-0 ma-auto"
              label="IPhone"
            ></v-checkbox>  </v-badge>
         
          </v-card-text>
        </v-card>
        <br />
        <v-card elevation="4" outlined shaped tile color="#FAF66C">
          <v-card-title style="background-color: #f2ab39">Sistema</v-card-title>
          <v-card-text class="mt-4" style="background-color: #FAF66C">
           
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox
              @change="emitirFiltros()"
             v-model="sistemas"
               value="android"
              color="#69491a"
              dense
              class="pa-0 ma-auto"
              label="Android"
            ></v-checkbox>
              </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox dense
              @change="emitirFiltros()"
            v-model="sistemas"
               value="windows"
              color="#69491a"
              class="pa-0 ma-auto"
              label="Windows"
            ></v-checkbox>
              </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox dense
            v-model="sistemas"
              @change="emitirFiltros()"
               value="ios"
              color="#69491a"
              class="pa-0 ma-auto"
              label="Ios"
            ></v-checkbox>
              </v-badge>
          
          </v-card-text>
        </v-card>
        <br />
        <v-card elevation="4" outlined shaped color="#FAF66C">
          <v-card-title style="background-color: #f2ab39">Pantalla</v-card-title>
          <v-card-text class="mt-4" style="background-color: #FAF66C">
             
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox dense
              @change="emitirFiltros()"
            v-model="pantallas"
               value="6"
              color="#69491a"
              class="pa-0 ma-auto"
              label="6''"
            ></v-checkbox>
              </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox dense
              @change="emitirFiltros()"
            v-model="pantallas"
               value="5.5"
              color="#69491a"
              class="pa-0 ma-auto"
              label="5.5''"
            ></v-checkbox>
              </v-badge>
            <v-badge inline color="#69491a" content="2" style="color: black;">
          
            <v-checkbox dense
            v-model="pantallas"
              @change="emitirFiltros()"
               value="5"
              color="#69491a"
              class="pa-0 ma-auto"
              label="5''"
            ></v-checkbox>
              </v-badge>
       
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
   
</template>

<script>
import {bus} from "../main"
export default {
  name: "filtros_datos",
  data: () => ({
    estado: false,
    marcas: [],
    sistemas: [],
    pantallas:[]
  }),
  methods:{
    emitirFiltros(){
      // console.log("lo llamo")
      var filtros={marca:[],sistema:[],pantalla:[],stat:false};
      filtros.stat=this.estado;
      console.log(filtros.stat)
      if(this.marcas.length>0){
        filtros.marca=this.marcas
      }
      if(this.sistemas.length>0){
        filtros.sistema=this.sistemas
      }
      if(this.pantallas.length>0){
        filtros.pantalla=this.pantallas
      }

      bus.$emit("cambiosEnFiltro",filtros);

    }


  }
};
</script>
