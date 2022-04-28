<template>
 <div>
   <div class="row">
     <Picker :data="emojiIndex" set="twitter" @select="showEmoji"/>
   </div>

   <div class="row">
     <div>
       {{ emojisOutput }}
     </div>
   </div>
 </div>
</template>

<script setup>
import data from "emoji-mart-vue-fast/data/all.json";
import {Picker,EmojiIndex} from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import {ref} from "vue";

const emojiIndex = ref(new EmojiIndex(data))
const emojisOutput = ref('')

function showEmoji(emoji) {
  emojisOutput.value = emojisOutput.value + emoji.native
}
</script>

<style scoped lang="scss">
.row {
  display: flex;
}

.row > * {
  margin: auto;
}
</style>