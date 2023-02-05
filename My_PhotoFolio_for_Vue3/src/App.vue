<template>
    <NavBar />
    <PredHome v-if="isShow.ShowHexaNavigation" />
    <NavigationHexagram v-if="isShow.ShowHexaNavigation" />
    <KeeperHome v-if="isShow.ShowKeeperNav" />
    <NavigationKeeper v-if="isShow.ShowKeeperNav" />
    <router-view />
</template>

<script>
    import NavBar from "@/components/NavBar";
    import NavigationHexagram from "@/components/PredictionComponents/NavigationHexagram";
    import { mapState, mapActions } from 'vuex';
    import PredHome from "@/components/PredictionComponents/PredHome";
    import KeeperHome from "@/components/StoreKeeperComponents/KeeperHome";
    import NavigationKeeper from "@/components/StoreKeeperComponents/NavigationKeeper";

    export default {
        name: 'App',
        components: {
            NavigationKeeper,
            KeeperHome,
            NavigationHexagram,
            NavBar,
            PredHome,
        },
        computed: {
            ...mapState({
                isShow: state => state.General.isShow,
            }),
        },
        methods: {
            ...mapActions({
                getUser: "General/getUser",
                getShowNav: "General/getShowNav",
            }),
        },
        mounted() {
            this.getUser()
            this.getShowNav()
        },
    }
</script>

<style>
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>

