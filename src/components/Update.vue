<template>
  <div align="center" class="teste">
    <h1>{{ updating ? 'Atualizar Cadastro' : 'Bem vindo!' }}</h1>
    <h2 v-if="!updating">
      Para esta primeira versão, é possível atualizar o cadastro dos usuários,
      insira o usuário que deseja alterar!
    </h2>
    <v-text-field
      class="mt-4"
      v-model="username"
      label="Usuario"
      v-if="!updating"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="name"
      label="Nome completo"
      v-if="updating"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="city"
      label="Cidade"
      v-if="updating"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="state"
      label="Estado"
      v-if="updating"
      outlined
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="password"
      label="Senha"
      v-if="updating"
      outlined
    ></v-text-field>

    <v-select
      v-model="receptor"
      :items="receptorOptions"
      item-text="label"
      item-value="value"
      v-if="updating"
    >
    </v-select>

    <div class="button-wrapper">
      <v-btn @click="update">{{
        updating ? 'Atualizar cadastro' : 'Requisitar alteração'
      }}</v-btn>

      <v-btn @click="$emit('finished', true)" color="red" outlined class="mt-4"
        >BACK</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Landing',
  data() {
    return {
      username: '',
      updating: false,
      name: '',
      city: '',
      state: '',
      password: '',
      receptor: null,
      receptorOptions: [
        { label: 'Quero receber doações', value: 0 },
        { label: 'Usuário Padrão (doador)', value: 99 },
      ],
    }
  },
  methods: {
    ...mapMutations(['SET_MESSAGE', 'SET_SNACK']),
    logout() {
      this.SET_MESSAGE({
        protocol: 199,
      })
      this.$router.push({ name: 'Login' })
    },
    teste() {
      console.log(this.user)
    },
    update() {
      if (this.updating) {
        // alterar cadastro
        this.SET_MESSAGE({
          protocol: 720,
          message: {
            name: this.name,
            city: this.city,
            state: this.state,
            password: this.password,
            receptor: this.receptor,
          },
        })
      } else {
        // solicitar alteração
        this.SET_MESSAGE({
          protocol: 710,
          message: {
            username: this.username,
          },
        })
      }
    },
  },
  computed: {
    ...mapState({
      mensagem: (state) => state.socket.incomingMessage,
      user: (state) => state.user.user,
    }),
  },
  watch: {
    mensagem(value) {
      const json = JSON.parse(
        value['message'].toString('utf8').replace('\r', '')
      )
      if (typeof json === 'object') {
        switch (json.protocol) {
          case 711:
            this.updating = true
            this.name = json.message.name
            this.city = json.message.city
            this.state = json.message.state
            this.password = json.message.password
            this.receptor = json.message.receptor
            break
          case 712:
            this.SET_SNACK({ message: json.message.reason, erro: true })
            break
          case 721:
            this.SET_SNACK({
              message: 'Usuário alterado com sucesso!',
              erro: false,
            })
            this.updating = false
            break
          case 722:
            this.SET_SNACK({ message: json.message.reason, erro: true })
            break
          default:
            break
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
  margin-top: auto;
  margin-bottom: auto;
}
.button-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
