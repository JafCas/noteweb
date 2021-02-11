<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{name: 'feed'}">noteWeb</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{name: 'feed'}">Feed</b-nav-item>
        <b-nav-item :to="{name: 'notas'}">Mis Notas</b-nav-item>
        <b-nav-item :to="{name: 'crear'}">Crear Nota</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" v-model="buscarNota" placeholder="Buscar Notas"></b-form-input>
        </b-nav-form>
  <b-button variant="dark" v-if="mostrarBoton" @click="logout">Cerrar Sesion</b-button>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data(){
        return {
            mostrarBoton:true,
            buscarNota : ""
        }
    },
    watch:{
        $route (to, from){
            if(this.$router.history.current.path=='/login' || this.$router.history.current.path=='/registro'){
                this.mostrarBoton = false
            }
            else{
                this.mostrarBoton = true
            }
        },
        buscarNota(){
             this.$root.$emit("buscarNota", this.buscarNota);
        }
    },
    methods:{
     logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('/login')
          
        })
      },
      ruta(){
          return this.$router.history.current.path=='/login' || this.$router.history.current.pathe=='/registro'
          
      }
}
}
</script>