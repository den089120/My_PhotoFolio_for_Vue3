<template>
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs d-flex justify-content-center">
            <li class="nav-item">
                <router-link :to="{ name: 'CreateHexagram' }" :class="{ 'active': isActive }" class="nav-link" @click="changeActive">Генерация гексаграммы</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'SelectHexagram' }" :class="{ 'active': isActive_1 }" class="nav-link" @click="changeActive1">Выбрать из таблицы</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'QuestionHexagram' }" :class="{ 'active': isActive_2 }" class="nav-link" @click="changeActive2">Задать вопрос</router-link>
            </li>
            <li v-if="loginIn.isLogin" class="nav-item">
                <router-link :to="{ name: 'HistoryPrediction' }" :class="{ 'active': isActive_3 }" class="nav-link" @click="changeActive3">История предсказаний</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "NavigationHexagram",
  data() {
    return {
      isActive: true,
      isActive_1: false,
      isActive_2: false,
      isActive_3: false,
    }
  },
  computed: {
    ...mapState({
      loginIn: state => state.General.loginIn,
    }),
  },
  methods: {
    changeActive() {
      this.isActive = true
      this.isActive_1 = false
      this.isActive_2 = false
      this.isActive_3 = false
    },
    changeActive1() {
      this.isActive = false
      this.isActive_1 = true
      this.isActive_2 = false
      this.isActive_3 = false
    },
    changeActive2() {
      this.isActive = false
      this.isActive_1 = false
      this.isActive_2 = true
      this.isActive_3 = false
    },
    changeActive3() {
      this.isActive = false
      this.isActive_1 = false
      this.isActive_2 = false
      this.isActive_3 = true
    },
  },
}
</script>

<style scoped>
</style>