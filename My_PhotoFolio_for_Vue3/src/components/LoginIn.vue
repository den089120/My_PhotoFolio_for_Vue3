<template>
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click.prevent="loginUser">Submit</button>
    </form>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="redirectFor"></button>
                </div>
                <div v-if="loginIn.isLogin" class="modal-body">
                    Добро пожаловать: {{loginIn.firstName}} {{loginIn.lastName}}!
                </div>
                <div v-else class="modal-body">
                    Неверный email или пароль, попробуте еще раз.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="redirectFor">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "LoginIn",
  components: {},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      users: state => state.General.users,
      loginIn: state => state.General.loginIn,
    }),
  },
  methods: {
    ...mapMutations({
        loginSet: "General/loginSet",

        setEmail: "General/setEmail",
        setPassword: "General/setPassword",
    }),
    ...mapActions({
        setUser: "General/setUser",
        logUser: "General/logUser",
        GetSelectHexagramList: "hexagram/GetSelectHexagramList",
        GetHexaList: "hexagram/GetHexaList",
    }),

      async loginUser() {
          this.setEmail(this.email)
          this.setPassword(this.password)
          await this.logUser()
          this.GetSelectHexagramList()
          this.GetHexaList()

      //this.users.forEach( el => {
      //  if (el.email === this.email) {
      //    if (el.password === this.password) {
      //      this.loginSet(
      //          {
      //            firstName: el.firstName,
      //            lastName: el.lastName,
      //          }
      //      )
      //      this.setUser()
      //    }
      //  }
      //})
    },
    redirectFor() {
      if (this.loginIn.isLogin) {
        this.$router.push({ name: 'HomeMy'})
      } else {
        this.$router.push({ name: 'LoginIn'})
      }
    },
  },
}
</script>

<style scoped>
</style>