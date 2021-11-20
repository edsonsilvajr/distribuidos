<template>
  <v-app>

    <v-main>
      <v-container v-if="!conectado">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="display-2 font-weight-bold mb-3">Conectar ao Servidor</h1>
          </v-col>

          <v-col class="mb-5" cols="5">
            <div>
              <v-text-field label="IP" outlined v-model="ip" :disabled="conectado"></v-text-field>
            </div>
          </v-col>
          <v-col class="mb-5" cols="5">
            <div>
              <v-text-field label="Porta" outlined v-model="porta" :disabled="conectado"></v-text-field>
            </div>
          </v-col>

          <v-col class="mb-5" cols="2">
            <v-btn @click="Connect" v-if="!conectado">Conectar</v-btn>
          </v-col>

          <v-col class="mb-5" cols="2">
            <v-btn @click="sendMessage('testando EDSUU')" v-if="!conectado">Enviar mensagem</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import net from "net";
import split from 'split';
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      ip: '',
      porta: '',
      socket: null,
      conectado: false,
      stream: null,
    }
  },

  mounted() {
    this.socket = new net.Socket();
    this.ip = 'localhost';
    this.porta = '8082';
    this.conectado = false;

    this.stream = this.socket.pipe(split());

    this.stream.on('data', response => {
      console.log('Recebido:' + response);
    });

    this.socket.on('close', () => {
      console.log('Conexão perdida');
      this.Disconnect();
      this.setSnack({message: "Conexão perdida"});
    });
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations([
      'SET_MESSAGE',
    ]),
    sendMessage(mensagem) {
      this.socket.write(mensagem + '\n');
    },
    Connect() {
      console.log("conectando em ", {port: this.porta, host: this.ip});
      this.socket.connect({host: this.ip, port: this.porta}, ()=>{
        this.conectado = true;
        this.$router.push({name: 'Login'})
      });
      this.socket.write('cheguei 8)');
    },
    Disconnect() {
      this.socket.destroy();
      this.conectado = false;
      this.$router.push({name: 'Dashboard'});
    }
  },
  computed: {
    ...mapState({
      mensagem: state => state.socket.message
    })
  },
  watch: {
    mensagem(value) {
      this.sendMessage(value);
    }
  },
};
</script>
