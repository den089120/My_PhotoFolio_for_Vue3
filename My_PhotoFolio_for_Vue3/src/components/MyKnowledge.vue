<template>
    <div class="container text-center">
        <div v-for="el in KnowledgeList" :key="el.id" class="row align-items-center m-4">
            <div class="col">
                <img :src="el.pathImage" style="width: 25%;height: 25%;" alt="img" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="pathImage(el.pathImage)" />
            </div>
            <div class="col">{{el.description}}</div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <img :src="inImage" alt="img" data-bs-dismiss="modal" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "MyKnowledge",
        data() {
            return {
                inImage: '',
            }
        },
        computed: {
            ...mapState({
                KnowledgeList: state => state.myKnowledge.KnowledgeList,
            })
        },
        methods: {
            pathImage(path) {
                this.inImage = path
            }
        },
    }
</script>

<style>
</style>