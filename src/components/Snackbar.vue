<template>
  <v-snackbar v-model="show" :color="color">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: 'gray',
    }
  },
  computed: {
    snack() {
      return this.$store.state.socket.snack
    },
  },
  watch: {
    snack(snack) {
      if (snack != '') {
        this.show = true
        this.message = snack.message
        this.color = snack.erro ? 'red' : 'green'
      }
    },
  },
}
</script>
