<template>
    <div>
  <div class="nota" v-for="(nota,index) in notaBuscada" :key="index">
<b-card class="card" >
    <h4>{{nota.titulo}}</h4>
    <h6><b>{{nota.autor}}</b></h6>
    <b-card-text>
      <b-form-textarea
      id="textarea"
      v-model="nota.texto"
      placeholder=nota.texto
      ></b-form-textarea>
    </b-card-text>


    <b-button variant="warning" @click="guardar(nota)">Guardar</b-button>
  </b-card>
  </div>
    </div>
</template>

<script>
import { db } from "@/main";
export default {
    data(){
        return{
            notas:[],
            buscarNota : ""
        }
    },
    firestore(){
        return{
            notas : db.collection("notas_publicas")
        }
    },
    created(){
        console.log(this.notas)
    },
    computed:{
      notaBuscada(){
        return this.notas
        .filter(n=>{
          return n.titulo
          .toLowerCase()
          .includes(this.buscarNota.toLowerCase())
        })
      }
    },
    mounted() {
    this.$root.$on('buscarNota', data => {
        console.log(data);
        this.buscarNota = data
    });
    },
    methods: {
      guardar(nota){
        db.collection("notas_publicas").doc(nota['.key']).set({
          texto: nota.texto,
          titulo : nota.titulo,
          is_public : nota.is_public,
          autor : nota.autor
        }).then(data=> {
          console.log(data.texto)
        })
      },
    }
}

</script>

<style scoped>
.card{
    max-width: 30%;
    margin: 1em;
    float: left;
}
</style>