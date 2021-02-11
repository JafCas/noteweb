<template>
    <div>
   <div class="nota" v-for="(nota,index) in notas" :key="index">
    <b-card class="card" >
    <h4>{{nota.titulo}}</h4>
    <h6><b>{{nota.autor}}</b></h6>
    <b-card-text>
      {{nota.texto}}
    </b-card-text>


    <a href="editar" class="card-link">Editar nota</a>
    <a href="#" @click="borrar(nota)" class="card-link">Eliminar nota</a>
    <a href="#" @click="publicar(nota)" class="card-link">Publicar</a>
  </b-card>
   </div>

        <div class="login">
        <img src="../assets/note.png" alt="">
        <b-form-input v-model="usuario" placeholder="Ingrese usuario"></b-form-input>
        <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
        <b-button @click="auth">Ingresar</b-button>
        <b-button @click="registrarse">Registrarse</b-button>


</div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from "@/main";
export default {
    data(){
        return {
            usuario:"",
            password : ""
        }
    },
    methods: {
        registrarse(){
            this.$router.replace('/registro')
        },
        auth() {
            firebase.auth().signInWithEmailAndPassword(this.usuario, this.password).then(
                (user) => {
                    var index = this.usuario.indexOf("@")
                    var usuario = this.usuario.substring(0,index)
                    console.log(usuario)
                    localStorage.setItem("usuario",usuario)
                    this.$router.replace('/feed')
                }
            )
        }
    }
}
</script>

<style scoped>
.login{
    max-width: 50%;
    margin: auto;
    position: absolute;
    top: 32%;
    left: 40%;
    padding: 1em;
}
.login input{
    margin-top: 1em;
}
.login button{
    margin: 1em;
}
</style>