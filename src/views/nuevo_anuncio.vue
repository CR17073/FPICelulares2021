<template>
  <!-- class="d-flex flex-sm-wrap-reverse" -->
  <v-container>
    <v-row>
      <v-col cols="12" style="text-align: center">
        <h1 class="mt-3">Nuevo Anuncio</h1>
        <v-divider style="width: 100%"> inset ></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <form>
          <v-row>
            <v-col cols="12" sm="6">
              <v-radio-group label="Estado:" v-model="anuncio.estado" row>
                <v-radio color="#4a148c" label="Nuevo" value="nuevo"></v-radio>
                <v-radio color="#4a148c" label="Usado" value="usado"></v-radio>
              </v-radio-group>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-on="on"
                    label="Marca "
                    v-model="anuncio.marca"
                    required
                  >
                    <v-icon slot="prepend"> mdi-cellphone </v-icon>
                  </v-text-field>
                </template>
                <span>Todas las letras en minusculas</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Modelo "
                    v-model="anuncio.modelo"
                    v-bind="attrs"
                    v-on="on" >
                    <v-icon slot="prepend"> mdi-cellphone-cog </v-icon>
                  </v-text-field>
                </template>
                <span>Todas las letras en minusculas</span>
              </v-tooltip>

            
                  <v-text-field
                    label="Tamaño pantalla(en pulgadas) "
                    v-model="anuncio.tamanio"
                    ><v-icon slot="prepend"> mdi-cellphone-screenshot </v-icon>
                  </v-text-field>
                

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Sistema operativo "
                    v-model="anuncio.sistemaop"
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon slot="prepend">mdi-android </v-icon>
                  </v-text-field>
                </template>
                <span>Todas las letras en minusculas</span>
              </v-tooltip>

              <v-text-field label="Memoria ROM " v-model="anuncio.rom"
                ><v-icon slot="prepend"> mdi-memory</v-icon>
              </v-text-field>
              <v-text-field label="Memoria RAM " v-model="anuncio.ram"
                ><v-icon slot="prepend"> mdi-memory</v-icon>
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="anuncio.titulo"
                class="mt-7"
                label="Titulo breve del anuncio "
                ><v-icon slot="prepend"> mdi-format-text</v-icon></v-text-field
              >
              <v-text-field v-model="anuncio.vendedor" label="Vendedor "
                ><v-icon slot="prepend">
                  mdi-account-circle</v-icon
                ></v-text-field
              >

              <v-text-field
                v-mask="'####-####'"
                v-model="anuncio.telefono"
                label="Numero telefonico "
                ><v-icon slot="prepend"> mdi-phone</v-icon></v-text-field
              >
              <v-textarea
                v-model="anuncio.descripcion"
                label="Descripcion del producto"
                ><v-icon slot="prepend"> mdi-text-long</v-icon></v-textarea
              >

              <v-text-field
                v-model="anuncio.precio"
                oninput="if(this.value < 0) this.value = 0;"
                type="number"
                label="Precio: "
              >
                <v-icon slot="prepend">mdi-currency-usd</v-icon>
              </v-text-field>
            </v-col>
          </v-row>
        </form>
        <v-snackbar v-model="alert" timeout="3000" color="orange darken-3">
          <v-icon>mdi-cancel</v-icon>
          Debe seleccionar antes una imagen para subirla.
        </v-snackbar>

        <v-snackbar v-model="msganuncio" timeout="3000" color="lime darken-4">
          <v-icon>mdi-check</v-icon>
          Anuncio creado exitosamente
        </v-snackbar>

        <v-snackbar
          v-model="valid"
          timeout="3000"
          color="deep-orange darken-1"
          class="text-center"
        >
          <v-icon>mdi-alert</v-icon>
          {{ mensaje }}
        </v-snackbar>
      </v-col>
    </v-row>

    <!--   class="order-xs-first mb-15" -->
    <v-row>
      <v-col class="d-none d-sm-flex d-sm-none justify-center mb-15" sm="6">
        <v-simple-table style="background-color: #f2ab39">
          <template v-slot:default>
            <thead>
              <tr style="background-color: #5f543b">
                <th class="text-left">#</th>
                <th class="text-left">Tamaño</th>
                <th class="text-left">Tipo</th>
                <th class="text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(imagen, index) in imagenes"
                :key="index"
                style="background-color: #988249"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ imagen.tamanio }} kb</td>
                <td>{{ imagen.tipo }}</td>
                <td>
                  <v-btn
                    @click="eliminar_foto(index, imagen.name)"
                    class="red"
                    icon
                  >
                    <v-icon> mdi-minus </v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols="12" sm="6" class="">
        <v-card
          class="justify-center ml-4 mt-6"
          flat
          color="#FAF5B4"
          width="80%"
          height="100%"
        >
          <v-row>
            <v-col cols="12">
              <v-carousel v-model="model" height="200px" width="70%">
                <v-carousel-item
                  contain
                  v-for="(foto, index) in imagenes"
                  :key="index"
                  width="100%"
                  style="height: 100%"
                >
                  <v-sheet height="100%" width="100%" tile elevation="10">
                    <v-img contain :src="foto.link" width="100%" height="100%">
                      <v-progress-circular
                        v-if="cargando"
                        absolute
                        justify="center"
                        indeterminate
                        color="purple"
                      ></v-progress-circular>
                    </v-img>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-col>

            <v-col cols="10" sm="9">
              <v-file-input
                accept="image/*"
                outlined
                class="mb-10"
                v-model="imagen2"
              ></v-file-input>
            </v-col>
            <v-col cols="2" sm="1">
              <v-btn
                @click="subir_imagen"
                color="white"
                style="background-color: #69491a"
                icon
                fab
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-footer fixed color="#f2ab39">
      <v-row class="justify-center">
        <v-col cols="6" sm="4">
          <v-btn to="/" block style="color: white" color="red darken-4"
            >Cancelar</v-btn
          >
        </v-col>
        <v-col cols="6" sm="4">
          <v-btn
            @click="validaciones"
            block
            style="color: white"
            color="#69491a"
            >Crear anuncio</v-btn
          >
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script>
import { db, st } from "../firebase";

export default {
  name: "anuncio",
  mounted() {
    // this.crear_anuncio();
  },
  data: () => ({
    valid: false,
    mensaje: "",
    msganuncio: false,
    id_foto: 1,
    // id_anuncio: "",
    cargando: false,
    alert: false,
    contador: 0,
    codigo: "",
    imagen2: null,
    model: 0,
    anuncio: {
      estado: "",
      marca: "",
      modelo: "",
      tamanio: "",
      sistemaop: "",
      rom: "",
      ram: "",
      titulo: "",
      vendedor: "",
      telefono: "",
      descripcion: "",
      precio: 0,
      fecha: "",
    },
    imagen:
      "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    estado: "",
    imagenes: [],
  }),
  created() {
    this.numero_random();
  },
  methods: {
    async crear_anuncio() {
      this.anuncio.precio = parseInt(this.anuncio.precio);
      this.anuncio.fecha = new Date();
      let this2 = this;
      await db
        .collection("anuncios")
        .doc(this2.codigo)
        .set(this2.anuncio)
        .then(function () {
          this2.$router.push("/");
        })
        .catch((error) => {
          console.error("error:", error);
        });
    },
    // guardarAnuncio() {
    //   this.anuncio.precio=parseInt(this.anuncio.precio);
    //   let this2=this;
    //   db.collection("anuncios")
    //     .doc(this.id_anuncio).update(this.anuncio).then(function(){
    //        this2.$router.push("/");
    //     })
    // },
    async subir_imagen() {
      this.cargando = true;
      if (this.imagen2) {
        let this2 = this;
        this.contador++;
        try {
          const refs = st.ref();
          const imgref = await refs
            .child(this.codigo)
            .child(this.contador + ".jpg");
          imgref.put(this.imagen2).then(function () {
            this2.traer_imagen();
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.alert = true;
      }
    },
    async traer_imagen() {
      const refs = st.ref();
      let this2 = this;
      await refs
        .child(this.codigo + "/")
        .listAll()
        .then(function (result) {
          result.items.forEach(function (imgRefe) {
            let nombre = imgRefe.name;
            if (nombre == this2.contador + ".jpg") {
              let nueva_imagen = {};
              imgRefe.getMetadata().then(function (metadata) {
                nueva_imagen.name = nombre;
                nueva_imagen.tamanio = metadata.size / 1000;
                nueva_imagen.tipo = metadata.contentType;
              });
              imgRefe.getDownloadURL().then(function (url) {
                nueva_imagen.link = url;
                this2.imagenes.push(nueva_imagen);
                this2.cargando = false;
                this2.imagen2 = null;
                // if (this2.contador == 1) {
                //   this2.imagenes.shift();
                // }
              });
            }
          });
        });
    },
    eliminar_foto(indice, nombre) {
      const refs = st.ref();
      let this2 = this;
      var imgref = refs.child(this.codigo + "/" + nombre);

      imgref
        .delete()
        .then(function () {
          this2.imagenes.splice(indice, 1);
          this2.contador--;
        })
        .catch(function (error) {
          console.log("No se borro la imagen: " + error);
        });
    },
    numero_random() {
      this.codigo = Math.random().toString(36).substr(2, 20);
      console.log(this.codigo);
    },

    validaciones() {
      /* if(this.anuncio.marca.length<=5){
           
        
              let nuevo=   this.anuncio.marca.charAt(this.anuncio.marca.length-1);
            let nuevo2 = nuevo.toLowerCase();
              if(nuevo !== nuevo2){
                this.valid = true;
              this.mensaje=" La inicial debe de ser minuscula";
              console.log(nuevo+"variable en minusculas: "+nuevo2)
            }
         } */

      if (this.anuncio.marca.length == 0) {
        this.valid = true;
        this.mensaje = " Marca es requerido";
      } else if (this.anuncio.modelo == "") {
        this.valid = true;
        this.mensaje = "Necesitas llenar el campo Modelo";
      } else if (this.anuncio.tamanio == "") {
        this.valid = true;
        this.mensaje = "Necesitas llenar el campo Tamaño de pantalla ";
      } else if (this.anuncio.sistemaop == "") {
        this.valid = true;
        this.mensaje = "Necesitas llenar el campo [Sistema operativo] ";
      } else if (this.anuncio.rom == "") {
        this.valid = true;
        this.mensaje = "Necesitas llenar el campo [Memoria ROM] ";
      } else if (this.anuncio.ram == "") {
        this.valid = true;
        this.mensaje = "Necesitas llenar el campo [Memoria RAM] ";
      } else if (this.anuncio.titulo == "") {
        this.valid = true;
        this.mensaje = "Es necesario establecer un titulo a su anuncio";
      } else if (this.anuncio.vendedor == "") {
        this.valid = true;
        this.mensaje = "Es obligatorio el nombre del vendedor";
      } else if (this.anuncio.telefono == "") {
        this.valid = true;
        this.mensaje = "El campo Telefono es obligatorio ";
      } else if (this.anuncio.descripcion == "") {
        this.valid = true;
        this.mensaje = "Describe tu producto!!!";
      } else if (this.anuncio.descripcion.length < 10) {
        this.valid = true;
        this.mensaje = "Describe tu producto con almenos 10 caracteres ";
      } else if (this.anuncio.precio < 10) {
        this.valid = true;
        this.mensaje = "Digita un precio correcto ";
      } else if (this.imagenes.length === 0) {
        this.valid = true;
        this.mensaje = "Necesitas colocar almenos una foto de tu producto";
      } else {
        this.crear_anuncio();
        this.msganuncio = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>