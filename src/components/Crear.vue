<template>
  <div>
  <div class="login">
  
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.titulo"
          type="titulo"
          required
          placeholder="Título"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.texto"
          required
          placeholder="Descripción"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.is_public" id="checkboxes-4">
          <b-form-checkbox value=true>Publica</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Crear</b-button>
    </b-form>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from "@/main";
  export default {
    data() {
      return {
          usuario: localStorage.getItem('usuario'),
        form: {
          titulo: '',
          texto: '',
          autor: '',
          is_public: []
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        var refNotas = db.collection('notas_publicas')
        if (this.form.is_public == "true"){
            this.form.is_public = true
            this.form.autor = this.usuario
            refNotas.add(this.form).then(data=>{
                console.log('agregado a notas publicas')
            })
        }
        console.log(this.form.is_public)
        var ref = db.collection('usuarios').doc(this.usuario).collection('notas')
        ref.add(this.form).then(doc=>{
            console.log(doc.id)
            this.$router.replace('/notas')
        })
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('/login')
        })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.titulo = ''
        this.form.texto = ''
        this.form.is_public = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>
.navbar{
    z-index: 99999;
}
.login{
    max-width: 50%;
    margin: auto;
    position: fixed;
    top: 5em;
    left: 40%;
    padding: 1em;
}
.login button{
    margin-left: 1em;
}
</style>