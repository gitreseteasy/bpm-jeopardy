<template>
  <div class="absolute bg-blue-900 w-screen h-screen">
    <div
      class="flex flex-col w-full h-full justify-center items-center space-y-20"
    >
      <div class="text-6xl text-white font-serif">
        {{ questionAnswer.question }}
      </div>

      <div class="w-1/2 flex justify-between">
        <button
          class="text-3xl text-white underline"
          @click="$emit('set-answer', 'correct')"
        >
          CORRECT
        </button>
        <button
          class="text-3xl text-white underline"
          @click="$emit('set-answer', 'wrong')"
        >
          WRONG
        </button>
      </div>

      <button
        class="cursor-pointer text-3xl text-white underline"
        @click="showAnswer"
      >
        Show answer
      </button>

      <div>
        <PlayerPointsSquare :player="displayedPlayer" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Player, QuestionAnswer } from "@/models";
import PlayerPointsSquare from "@/components/PlayerPointsSquare.vue";

@Options({
  components: {
    PlayerPointsSquare
  },
  props: {
    questionAnswer: {
      type: Object,
      required: true
    },
    selectedPlayer: {
      type: Object,
      required: true
    },
    isStealMode: {
      type: Boolean,
      default: false
    },
    stealingPlayer: {
      type: Object,
      required: true
    }
  },
  emits: ["show-answer", "set-answer"]
})
export default class ModalQuestion extends Vue {
  questionAnswer!: QuestionAnswer;
  selectedPlayer!: Player;
  isStealMode!: boolean;
  stealingPlayer!: Player;

  get displayedPlayer(): Player {
    return this.isStealMode ? this.stealingPlayer : this.selectedPlayer;
  }

  showAnswer() {
    this.$emit("show-answer");
  }
}
</script>
