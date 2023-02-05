<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <RouterLink :to="{ name: 'HomeMy' }" @click="removeNav" class="navbar-brand">Главная</RouterLink>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'MyKnowledge' }" class="nav-link active" aria-current="page" @click="removeNav">Мои знания</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="removeNav" href="https://github.com/den089120">Мой github</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Мои работы
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link :to="{ name: 'AnimationCSS' }" class="dropdown-item" @click="removeNav">Анимации CSS</router-link></li>
                            <li><router-link :to="{ name: 'CreateHexagram' }" class="dropdown-item" @click="changeShowhexaNav('ShowHexaNavigation')">Книга перемен</router-link></li>
                            <li><router-link :to="{ name: 'T_M_S_List' }" class="dropdown-item" @click="changeShowhexaNav('ShowKeeperNav')">программа - Склад</router-link></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
                <ul v-if="loginIn.isLogin" class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <div class="nav-link">Здравствуте {{loginIn.firstName}}</div>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'HomeMy' }" class="nav-link" aria-current="page" @click="removeGl">Выйти</router-link>
                    </li>
                </ul>
                <ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'RegistrationUser' }" class="nav-link" aria-current="page" @click="removeNav">Регистрация</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'LoginIn' }" class="nav-link" aria-current="page" @click="removeNav">Войти</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex';
export default {
  name: "NavBar",
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      loginIn: state => state.General.loginIn,
    }),
  },
  methods: {
    ...mapMutations({
      changeShowhexaNav: 'General/changeShowhexaNav',
      removeNav: 'General/removeNav',
    }),
    ...mapActions({
      removeUser: "General/removeUser",
    }),
    removeGl() {
      this.removeUser()
      this.removeNav()
    },
  },
}
</script>

<style>
</style>