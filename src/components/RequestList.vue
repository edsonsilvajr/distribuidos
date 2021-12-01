<template>
  <div class="container">
    <h1>Tabela de usuários</h1>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="list"
      :items-per-page="5"
      :single-select="true"
      item-key="username"
      show-select
      class="elevation-1"
    ></v-data-table>
    <div class="mt-4 d-flex flex-column col-6">
      <v-btn @click="request()" class="mt-4">Solicitar Lista</v-btn>
      <v-btn @click="turnToReceptor(1)" class="mt-4" v-if="selected.length > 0"
        >Validar pedido</v-btn
      >
      <v-btn @click="turnToReceptor(99)" class="mt-4" v-if="selected.length > 0"
        >Invalidar pedido</v-btn
      >
      <v-btn
        @click="
          $emit('finished', true)
          list = []
        "
        class="mt-4"
        color="red"
        outlined
        >BACK</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      showList: false,
      list: [],
      selected: [],
      headers: [
        {
          text: 'Nome de usuário',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Nome Completo', value: 'name' },
        { text: 'Cidade', value: 'city' },
        { text: 'Estado', value: 'state' },
      ],
    }
  },
  methods: {
    ...mapMutations(['SET_MESSAGE', 'SET_SNACK']),
    request() {
      this.SET_MESSAGE({
        protocol: 600,
      })
    },
    turnToReceptor(valid) {
      const username = this.selected[0].username
      this.SET_MESSAGE({
        protocol: 610,
        message: {
          username,
          receptor: valid,
        },
      })
    },
  },
  computed: {
    ...mapState({
      mensagem: (state) => state.socket.incomingMessage,
    }),
  },
  watch: {
    mensagem(value) {
      const json = JSON.parse(value['message'].toString('utf8'))
      if (json.protocol == 601) {
        this.showList = true
        this.list = json.message.list
        this.selected = []
      }
      if (json.protocol == 611) {
        this.SET_SNACK({
          message: 'Usuário foi alterado com sucesso!',
          erro: false,
        })
        this.SET_MESSAGE({
          protocol: 600,
        })
      }
    },
  },
}
</script>

<style>
.btn-wrapper {
  height: 250px;
  justify-content: space-between;
}
</style>
