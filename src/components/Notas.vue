<template>
    <div>
   <div class="nota" v-for="(nota,index) in notaBuscada" :key="index">
    <b-card class="card" >
    <h4>{{nota.titulo}}</h4>
    <b-card-text>
      <b-form-textarea
      id="textarea"
      v-model="nota.texto"
      placeholder=nota.texto
      ></b-form-textarea>
    </b-card-text>

    <b-button variant="success" @click="publicar(nota)">Publicar</b-button>
    <b-button variant="warning" @click="guardar(nota)">Guardar</b-button>
    <b-button variant="danger" @click="borrar(nota)">Eliminar</b-button>
  </b-card>
   </div>
  
    </div>
</template>

<script>
import { db } from "@/main";
import firebase from 'firebase'
export default {
    data(){
      return{
        usuario:localStorage.getItem("usuario"),
        notas:[],
        buscarNota : ""
      }
    },
    firestore(){
        return{
            notas : db.collection("usuarios").doc(this.usuario).collection("notas")
        }
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
    methods :{
      borrar(nota){
        console.log(nota['.key'])
        db.collection("usuarios").doc(this.usuario).collection("notas").doc(nota['.key']).delete().then(data=>{
          console.log("NOTA BORRADA")
        })
      },
      guardar(nota){
        db.collection("usuarios").doc(this.usuario).collection("notas").doc(nota['.key']).set({
          texto: nota.texto,
          titulo : nota.titulo,
          is_public : nota.is_public

        }).then(data=> {
          console.log(data.texto)
        })
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('/login')
        })
      },
      publicar(nota){
        if(nota.is_public == true){
          alert('La nota ya es publica')
        }
        else{
          var ref = db.collection("notas_publicas")
          nota.autor = this.usuario
          ref.add(nota).then(data =>{
            console.log(data.id)
            this.$router.replace('/feed')
            nota.is_public = true
            db.collection("usuarios").doc(this.usuario).collection("notas").doc(nota['.key']).set(nota).then(n=>{
              console.log("nota local editada")
            })
          })
        }
      }
    }
    
}
</script>

<style scoped>
.card{
    width: 20%;
    height: 20%;
    margin: 1em;
    float: left;
}
.nota button{
  margin:.5em;
}
</style>