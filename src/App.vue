<template>
  <v-app>
    <v-main>
      <v-container v-if="!conectado">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2 font-weight-bold mb-3">
              Conectar ao Servidor
            </h1>
          </v-col>

          <v-col class="mb-5" cols="5">
            <div>
              <v-text-field
                label="IP"
                outlined
                v-model="ip"
                :disabled="conectado"
              ></v-text-field>
            </div>
          </v-col>
          <v-col class="mb-5" cols="5">
            <div>
              <v-text-field
                label="Porta"
                outlined
                v-model="porta"
                :disabled="conectado"
              ></v-text-field>
            </div>
          </v-col>

          <v-col class="mb-5" cols="2">
            <v-btn @click="Connect" v-if="!conectado">Conectar</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import net from 'net'
import { mapMutations, mapState, mapActions } from 'vuex'
import Snackbar from './components/Snackbar'

export default {
  name: 'App',
  components: { Snackbar },
  data() {
    return {
      ip: '',
      porta: '',
      socket: null,
      conectado: false,
      stream: null,
      message: false,
    }
  },

  mounted() {
    this.socket = new net.Socket()
    this.ip = 'localhost'
    this.porta = '16314'
    this.conectado = false

    this.socket.on('data', (response) => {
      console.log('Recebido:' + response)
      this.SET_INCOMINGMESSAGE(response)
    })

    this.socket.on('close', () => {
      console.log('Conexão perdida')
      this.Disconnect()
    })
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['SET_MESSAGE', 'SET_INCOMINGMESSAGE']),
    sendMessage(mensagem) {
      console.log('Enviado:' + mensagem)
      this.socket.write(JSON.stringify(mensagem) + '\n')
    },
    Connect() {
      this.message = true
      console.log('conectando em ', { port: this.porta, host: this.ip })
      this.socket.connect({ host: this.ip, port: this.porta }, () => {
        this.conectado = true
        this.$router.push({ name: 'Login' })
      })
    },
    Disconnect() {
      this.socket.destroy()
      this.conectado = false
      if (this.$router.history.current.path != '/') {
        this.$router.push({ name: 'Dashboard' })
      }
    },
  },
  computed: {
    ...mapState({
      mensagem: (state) => state.socket.message,
      close: (state) => state.socket.close,
    }),
  },
  watch: {
    mensagem(value) {
      this.sendMessage(value)
    },
    close() {
      this.Disconnect()
    },
  },
}
</script>
