<template>
  <div class="absolute bg-blue-900 w-screen h-screen">
    <div
      class="flex flex-col w-full h-full justify-center items-center space-y-20"
    >
      <div class="text-6xl text-white font-serif">
        {{ questionAnswer.question }}
      </div>

      <button
        class="cursor-pointer text-3xl text-white underline"
        @click="showAnswer"
      >
        Show answer
      </button>
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
  emits: ["show-answer"]
})
export default class ModalQuestion extends Vue {
  questionAnswer!: QuestionAnswer;

  showAnswer() {
    this.$emit("show-answer");
  }
}
</script>
