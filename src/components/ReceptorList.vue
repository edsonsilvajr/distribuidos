<template>
  <div class="container">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2" v-if="selected[0]">
          Doação para {{ selected[0].username }}</v-card-title
        >
        <v-card-text class="mt-4">
          <v-text-field v-model="valor" label="Valor" outlined />
          <v-checkbox
            v-model="anonymous"
            :label="'Desejo fazer a doação de forma anônima'"
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancelar </v-btn>
          <v-btn color="primary" text @click="donation()"> Fazer doação </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>Lista de usuários receptores</h1>
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
      <v-btn
        @click="dialog = true"
        color="green"
        outlined
        class="mt-4"
        v-if="selected.length > 0"
        >Fazer Doação</v-btn
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
      valor: 0,
      anonymous: false,
      dialog: false,
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
      console.log("teste")
      this.SET_MESSAGE({
        protocol: 400,
        message: {
          filter: { }
          }
      })
    },
    donation() {
      const message = {
        receptor: this.selected[0].username,
        value: this.valor,
      }

      if (!this.anonymous) {
        message['donor'] = this.user.username
      }

      this.SET_MESSAGE({
        protocol: 510,
        message,
      })
      this.dialog = false
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      mensagem: (state) => state.socket.incomingMessage,
    }),
  },
  watch: {
    mensagem(value) {
      const json = JSON.parse(value['message'].toString('utf8'))
      if (json.protocol == 401) {
        this.showList = true
        this.list = json.message.list
        this.selected = []
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
