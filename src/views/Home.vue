<template>
<v-row>
    <v-col md="2"> <filtros_datos></filtros_datos></v-col>

    <v-col cols="10" class="d-none d-lg-flex d-lg-none mt-8"
      ><filtrosOrden> </filtrosOrden
    ></v-col>

    <v-col cols="12" class="ml-5 d-lg-none .d-lg-flex"
      ><filtrosOrden> </filtrosOrden
    ></v-col>

    <v-row>
      <v-col cols="12">
        <v-footer dark padless class="d-none d-lg-flex d-lg-none">
          <v-card class="flex" flat tile>
            <v-card-title style="background-color: #f2ab39">
              <strong class="subheading black--text"
                >Creado y elaborado por: Kevin Humberto Cabeza Ruiz --->
                Carnet:CR17073</strong
              >

              <v-spacer></v-spacer>

              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                dark
                icon
                href="https://www.facebook.com/Kevin.Cabeza.1973/"
                target="_blank"
              >
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="py-2 white--text text-center">
              {{ new Date().getFullYear() }} —
              <strong>Derechos reservados :)</strong>
            </v-card-text>
          </v-card>
        </v-footer>
      </v-col>
    </v-row>
 </v-row>
</template>

<script>
import filtros_datos from "../components/filtros_datos.vue";
import filtrosOrden from "../components/filtrosOrden.vue";

export default {
  name: "Home",

  components: {
    filtros_datos,
    filtrosOrden,
  },
  data: () => ({
    icons: ["mdi-facebook", "mdi-instagram"],
  }),
};
</script>
