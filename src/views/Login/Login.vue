<template>
  <div class="teste">
    <h1 align="center">Login</h1>
    <v-text-field v-if="cadastrando" v-model="nome" label="Nome" outlined/>
    <v-text-field v-model="usuario" label="Usuario" outlined/>
    <v-text-field v-model="senha" type="password" label="Senha" outlined/>
    <v-btn @click="login">Click me! c:</v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      cadastrando:false,
      usuario: "",
      senha: "",
    }
  },
  methods: {
    ...mapMutations([
      'SET_MESSAGE'
    ]),
    showAll() {
      this.SET_MESSAGE(JSON.stringify({nome: this.usuario, senha: this.senha}))
    },
    login() {
      this.SET_MESSAGE(JSON.stringify({protocol: 100, nome: this.usuario, senha: this.senha}))
      console.log(this.$store)
      //TODO: definir metodo de login, enviar mensagem ao servidor
    }
  },
}
</script>

<style>
.teste{
  margin-left: 20%;
  margin-right: 20%;
}
</style>