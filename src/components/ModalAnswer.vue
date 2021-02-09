<template>
  <div class="absolute bg-blue-900 w-screen h-screen">
    <div
      class="flex flex-col w-full h-full justify-center items-center space-y-20"
    >
      <div class="text-3xl text-white font-serif">
        Answer:
      </div>
      <div class="text-6xl text-white font-serif">
        {{ questionAnswer.answer }}
      </div>

      <div class="w-1/2 flex justify-center">
        <button class="text-3xl text-white underline" @click="$emit('go-home')">
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { QuestionAnswer } from "@/models";

@Options({
  props: {
    questionAnswer: {
      type: Object,
      required: true
    }
  },
  emits: ["set-answer"]
})
export default class ModalAnswer extends Vue {
  questionAnswer!: QuestionAnswer;
}
</script>
