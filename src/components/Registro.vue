<template>
    <div>
        
        <div class="login">
        <img src="../assets/note.png" alt="">
        <b-form-input v-model="usuario" placeholder="Ingrese usuario"></b-form-input>
        <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
        <b-button @click="registro">Registrar</b-button>

</div>
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from "@/main";
export default {
    name: 'registro',
    data (){
        return{
            usuario: '',
            password: ''
        };
    },
    methods: {
        registro: function(e){
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(this.usuario, this.password).then(data=>{
                    var index = this.usuario.indexOf("@")
                    var usuario = this.usuario.substring(0,index)               
                    db.collection("usuarios").doc(usuario).set({
                    id : usuario
                }).then(doc=>{
                    console.log(doc.id)
                })
                this.$router.replace('/login')
                console.log(data)
            })
        },
        logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('/login')
        })
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