<template>
    <div>Home</div>
</template>

<script>
    import { mapActions } from 'vuex';
export default {
   name: "HomeMy",
   data() {
       return {}
   },
   mounted() {
       this.GetHexaList();
   },
   methods: {
       ...mapActions({
          GetHexaList: 'hexagram/GetHexaList',
       }),
   },
}
</script>

<style>
</style>