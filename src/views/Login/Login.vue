<template>
  <div class="teste">
    <h1 align="center">{{ cadastrando ? 'Cadastro' : 'Login' }}</h1>
    <v-text-field v-model="usuario" label="Usuario" outlined />
    <v-text-field
      v-if="cadastrando"
      v-model="nome"
      label="Nome Completo"
      outlined
    />
    <v-text-field v-if="cadastrando" v-model="cidade" label="Cidade" outlined />
    <v-text-field v-if="cadastrando" v-model="estado" label="Estado" outlined />
    <v-text-field v-model="senha" type="password" label="Senha" outlined />
    <div class="column">
      <v-btn class="mb-2" @click="login">{{
        cadastrando ? 'Cadastrar' : 'Logar'
      }}</v-btn>
      <v-btn @click="cadastrando = !cadastrando">{{
        cadastrando ? 'Voltar' : 'Cadastrar novo usuário'
      }}</v-btn>
      <v-btn class="close-socket" @click="showAll" color="red"
        >Encerrar Conexão</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      cadastrando: false,
      usuario: '',
      nome: '',
      senha: '',
      cidade: '',
      estado: '',
      snack: false,
      message: '',
    }
  },
  methods: {
    ...mapMutations(['SET_MESSAGE', 'SET_SNACK', 'DISCONNECT']),
    showAll() {
      this.DISCONNECT()
    },
    login() {
      if (this.cadastrando) {
        this.SET_MESSAGE({
          protocol: 700,
          message: {
            username: this.usuario,
            name: this.nome,
            city: this.cidade,
            state: this.estado,
            password: this.senha,
          },
        })
      } else {
        this.SET_MESSAGE({
          protocol: 100,
          message: {
            username: this.usuario,
            password: this.senha,
          },
        })
      }
      //this.SET_MESSAGE(JSON.stringify({protocol: 100, nome: this.usuario, senha: this.senha}))
      //TODO: definir metodo de login, enviar mensagem ao servidor
    },
  },
  computed: {
    ...mapState({
      mensagem: (state) => state.socket.incomingMessage,
    }),
  },
  watch: {
    mensagem(value) {
      const json = JSON.parse(value.toString('utf8').replace('\r', ''))
      if (typeof json === 'object') {
        const status = json.message.result
        const protocol = json.protocol
        if (status) {
          if (protocol == 101) {
            this.SET_SNACK({ message: 'Logado com sucesso!', erro: false })
            this.$router.push({ name: 'Landing' })
          }
          if (protocol == 701) {
            this.SET_SNACK({ message: 'Cadastrado com sucesso!', erro: false })
            this.cadastrando = false
          }
        } else {
          this.SET_SNACK({ message: json.message.reason, erro: true })
        }
      }
    },
  },
}
</script>

<style>
.teste {
  margin-left: 20%;
  margin-right: 20%;
}

.column {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.close-socket {
  margin-top: 200px;
}
</style>
