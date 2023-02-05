<template>
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs d-flex justify-content-center">
            <li class="nav-item">
                <router-link :to="{ name: 'T_M_S_List' }" :class="{ 'active': activeList.isActive }" class="nav-link" @click="changeActive('isActive')">Список Товарно-Материальных Ценностей</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'MovementList' }" :class="{ 'active': activeList.isActive_1 }" class="nav-link" @click="changeActive('isActive_1')">Список перемещений ТМЦ</router-link>
            </li>
            <li v-if="loginIn.isLogin" class="nav-item">
                <router-link :to="{ name: 'T_M_S_Add' }" :class="{ 'active': activeList.isActive_2 }" class="nav-link" @click="changeActive('isActive_2')">Добавить ТМЦ</router-link>
            </li>
            <!--      <li v-if="loginIn.isLogin" class="nav-item">-->
            <!--        <router-link :to="{ name: 'T_M_S_Update' }" :class="{ 'active': activeList.isActive_3 }" class="nav-link" @click="changeActive('isActive_3')" >Добавить перемещение</router-link>-->
            <!--      </li>-->
            <!--      <li v-if="loginIn.isLogin" class="nav-item">-->
            <!--        <router-link :to="{ name: 'HistoryPrediction' }" :class="{ 'active': activeList.isActive_3 }" class="nav-link" @click="changeActive('isActive_3')" >История предсказаний</router-link>-->
            <!--      </li>-->
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "NavigationKeeper",
  data() {
    return {
      activeList: {
        isActive: true,
        isActive_1: false,
        isActive_2: false,
        isActive_3: false,
      },

    }
  },
  computed: {
    ...mapState({
      loginIn: state => state.General.loginIn,
    }),
  },
  methods: {
    changeActive(isAct) {
      let key = Object.keys(this.activeList)
      for (let i = 0; i < key.length; i++) {
        this.activeList[key[i]] = false
      }
      this.activeList[isAct] = true
    },
  },
}
</script>

<style scoped>
</style>