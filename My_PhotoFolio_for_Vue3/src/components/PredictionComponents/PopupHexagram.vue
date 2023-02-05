<template>
    <div v-if="popupOpen" class="popup" :class="{'open': popupOpen}">
        <div class="popup_body">
            <div class="popup_content" data-id="popup_content">
                <div class="popup_close btn" @click="popupClose">Закрыть</div>

                <div v-if="!hexagram" class="popup_title">На выш вопрос нет ответа</div>
                <div v-else class="popup_img" v-html="hexagramImages[hexagram.binaryCod]"></div>
                <div v-if="hexagram && hexagram.question" class="popup_text">Ваш вопрос: {{hexagram.question}}</div>
                <div v-if="hexagram && hexagram.date" class="popup_text">Дата и время: {{hexagram.date}}</div>
                <div v-if="hexagram" class="popup_title">{{hexagram.name}}</div>
                <div v-if="hexagram" class="popup_text">{{hexagram.description}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "PopupHexagram",
  props: [
    'popupOpen',
    'hexagram',
    'hexagramImages',
  ],
  data() {
    return {
      open: false
    }
  },
  methods: {
    popupClose() {
      this.$emit('close', this.open)
    },
  },
}
</script>

<style scoped>
    .popup {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        top: 0;
        left: 0;
        opacity: 0;
        visibility: hidden;
        overflow-y: auto;
        overflow-x: hidden;
        transition: all 0.8s ease 0s;
    }

        .popup.open {
            opacity: 1;
            visibility: visible;
            z-index: 5;
        }

            .popup.open .popup_content {
                transform: translate(0px, 0px);
                opacity: 1;
            }

    .popup_body {
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 10px;
        transition: all 0.8s ease 0s;
    }

    .popup_content {
        background-color: antiquewhite;
        color: #000;
        max-width: 800px;
        padding: 30px;
        position: relative;
        transition: all 0.8s ease 0s;
        opacity: 0;
        transform: translate(0px, -100%);
    }

    .popup_close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        color: #000;
        text-decoration: none;
    }

    .popup_img {
        width: 100px;
        height: 114px;
        margin: auto;
    }

    .popup_title {
        font-size: 30px;
        margin-bottom: 15px;
        margin-top: 15px;
    }
</style>