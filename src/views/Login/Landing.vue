<template>
  <div align="center">
    <div v-if="option == 0" class="d-flex flex-column col-6">
      <h1>Bem vindo {{ user.username }}!</h1>
      <v-btn @click="option = 1">Atualizar Cadastro</v-btn>
      <v-btn @click="option = 2" v-if="user.isAdmin"
        >Lista de requisitantes</v-btn
      >
      <v-btn @click="option = 3">Lista de receptores</v-btn>
      <v-btn @click="deleteUser()">Desvincular meu usuário do sistema</v-btn>
    </div>
    <Update v-if="option == 1" @finished="option = 0" />
    <RequestList v-if="option == 2" @finished="option = 0" />
    <ReceptorList v-if="option == 3" @finished="option = 0" />
    <v-btn @click="logout" color="red" class="mt-4 logout-btn">Logout</v-btn>
  </div>
</template>

<script>
import Update from '../../components/Update.vue'
import RequestList from '../../components/RequestList.vue'
import ReceptorList from '../../components/ReceptorList.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    Update,
    RequestList,
    ReceptorList,
  },
  data() {
    return {
      option: 0,
    }
  },
  methods: {
    ...mapMutations(['SET_MESSAGE', 'SET_SNACK']),
    logout() {
      this.SET_MESSAGE({
        protocol: 199,
      })
      this.$router.push({ name: 'Login' }).catch(()=>{});
    },
    showAll() {
      console.log(this.user)
    },
    deleteUser() {
      this.SET_MESSAGE({
        protocol: 900,
        message: { 
          username: this.user.username,
        },
      })
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      message: (state) => state.socket.incomingMessage,
    }),
  },
  watch: {
    message(value) {
      const json = JSON.parse(
        value['message'].toString('utf8').replace('\r', '')
      )
      if (json.protocol == 901) {
        this.SET_SNACK({ message: 'Usuário DELETADO!', erro: false })
        this.$router.push({ name: 'Login' }).catch(()=>{});
      }
      if (json.protocol == 902) {
        this.SET_SNACK({ mensagem: json.message.reason, erro: true })
      }
    },
  },
}
</script>

<style>
.logout-btn {
  position: absolute;
  top: 90%;
  left: 90%;
}
</style>
