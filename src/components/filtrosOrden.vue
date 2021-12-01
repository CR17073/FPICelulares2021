<template>
  <v-row style="width: 100%" width="100%">
    <v-row no-gutters style="width: 100%" width="100%">
      <v-col cols="3" justify="center" class="d-none d-lg-flex d-lg-none mt-8">
        <v-card
          color="#e4b660"
          class="pa-auto mx-auto"
          justify="center"
          outlined
          shaped
          elevation="18"
        >
          <v-card-title>Rangos de precio:</v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="mr-1" cols="5">
                <v-text-field
                  color="#69491a"
                  v-model="des"
                  oninput="if(this.value < 0) this.value = 0;"
                  type="number"
                  label="Desde:"
                ></v-text-field>
              </v-col>
              <v-col class="m-1" cols="5">
                <v-text-field
                  color="#69491a"
                  v-model="has"
                  label="Hasta"
                  oninput="if(this.value < 0) this.value = 0;"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5" lg="3" class="mx-15 mt-8 d-none d-lg-flex d-lg-none">
        <v-card class="pa-auto" color="#e4b660" elevation="18" outlined shaped>
          <v-card-title>Ordenar por:</v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="mr-1">
                <v-radio-group row v-model="filtro">
                  <v-radio
                    value="precio"
                    cols="6"
                    color="#69491a"
                    label="Precio"
                  ></v-radio>
                  <v-radio
                    value="fecha"
                    cols="6"
                    color="#69491a"
                    label="Fecha"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Filtros que solo se muestran en menores que lg -->
      <v-row align="center">
        <v-col cols="11" sm="4" class="d-lg-none .d-lg-flex">
          <v-card
            class="pa-auto justify-center"
            color="#e4b660"
            elevation="18"
            outlined
            shaped
            
          >
            <v-card-title>
              <v-row align="center">
                <v-col cols="12" sm="6"   class="text-center"> Ordenar: </v-col>
                <v-col cols="12" sm="6">
                  <v-btn
                    style="background-color: #69491a"
                    @click="dialog = true"
                    class="d-lg-none .d-lg-flex"
                  >
                    <v-icon color="white">mdi-filter</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="mr-1">
                  <v-radio-group row v-model="filtro">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-radio
                          value="precio"
                          cols="6"
                          color="#69491a"
                          label="Precio"
                        ></v-radio>
                      </v-col>

                      <v-col cols="6">
                        <v-radio
                          value="fecha"
                          cols="6"
                          color="#69491a"
                          label="Fecha"
                        ></v-radio> </v-col
                    ></v-row>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <v-card color="#ffd954">
              <v-card-title style="background-color: #f2ab39"
                >Filtros</v-card-title
              >
              <v-divider></v-divider>
              <v-card-text style="height: 300px">
                <filtros_datos_mobil></filtros_datos_mobil>
              </v-card-text>

              <v-card-actions style="background-color: #f2ab39">
                <v-btn color="dark" text @click="dialog = false">
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-row>
    <br />
    <v-row no-gutters class="pt-7 px-1" style="width: 100%">
      <v-col cols="12">
        <datos
          :productos="productosXp"
          :page="pagina"
          :orden="filtro"
          :desde="des"
          :hasta="has"
        ></datos>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-container>
          <v-col cols="12" md="9">
            <v-container class="max-width">
              <v-pagination
                color="#69491a"
                v-model="pagina"
                class="my-4"
                :length="paginas"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-container>
      </v-col>
      <v-col cols="6" class="d-none d-md-flex d-md-none">
        <v-col cols="6" class="mt-7">
          <v-select
            v-model="productosXp"
            :items="opcionPaginacion"
            label="Productos por pagina"
          ></v-select>
        </v-col>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import datos from "../components/datos.vue";
import filtros_datos_mobil from "./filtros_datos_mobil.vue";
import { db } from "../firebase";

export default {
  name: "filtrosOrden",
  data: () => ({
    has: "0",
    des: "0",
    filtro: "precio",
    tamanio: "",
    paginas: 0,
    productosXp: 8,
    pagina: 1,
    opcionPaginacion: [4, 8, 12, 16],
    color: "rojo",
    fixed: true,
    overlay: false,
    dialogm1: "",
    dialog: false,
  }),
  created() {
    this.sizeOfanuncios();
  },
  methods: {
    async sizeOfanuncios() {
      let this2 = this;
      await db
        .collection("anuncios")
        .get()
        .then(function (snap) {
          this2.tamanio = snap.size;

          this2.paginar();
        });
    },
    paginar() {
      let pag = this.tamanio / this.productosXp;
      let entero = Math.trunc(pag);
      if (pag > entero) {
        this.paginas = entero + 1;
      }
    },
  },
  components: {
    datos,
    filtros_datos_mobil,
  },
  watch: {
    productosXp: function (val) {
      console.log(val);
      this.paginar();
    },
    //add snackbar
  },
};
</script>
