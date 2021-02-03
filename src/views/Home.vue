<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen bg-blue-900 relative"
  >
    <div>
      <h1 class="text-8xl mb-4 text-white" style="font-family: 'Gyparody'">
        Big Picture Jeopardy!
      </h1>

      <div class="space-y-8 flex flex-col items-center">
        <QuestionValuesTable
          :categories="questions"
          @select-question="selectQuestion"
        />

        <div class="flex space-x-4 text-3xl">
          <PlayerPointsSquare
            v-for="(player, index) in allPlayers"
            :key="index"
            :player="player"
          />
        </div>
      </div>
    </div>

    <ModalPlayerRegistration
      v-if="showRegistrationModal"
      @save-players="savePlayers"
    />

    <ModalAnswer
      v-if="selectedQuestionAnswer && showAnswerModal"
      :question-answer="selectedQuestionAnswer"
      @set-answer="setAnswer"
    />

    <ModalQuestion
      v-if="selectedQuestionAnswer && showQuestionModal"
      :question-answer="selectedQuestionAnswer"
      @show-answer="showAnswer"
    />
  </div>
</template>

<script lang="ts">
// https://www.soundboard.com/sb/price_is_right
import { Options, Vue } from "vue-class-component";
import questions from "../../questions/questions.json";
import { Player, QuestionAnswer, QuestionCategory } from "@/models";
import QuestionValuesTable from "@/components/QuestionValuesTable.vue";
import ModalQuestion from "@/components/ModalQuestion.vue";
import ModalAnswer from "@/components/ModalAnswer.vue";
import ModalPlayerRegistration from "@/components/ModalPlayerRegistration.vue";
import PlayerPointsSquare from "@/components/PlayerPointsSquare.vue";

type points = "200" | "400" | "800" | "1000";

@Options({
  components: {
    QuestionValuesTable,
    ModalQuestion,
    ModalAnswer,
    ModalPlayerRegistration,
    PlayerPointsSquare
  }
})
export default class Home extends Vue {
  questions!: { [key: string]: QuestionCategory };
  showQuestionModal = false;
  showAnswerModal = false;
  showRegistrationModal = true;
  selectedCategory: string | null = null;
  selectedPointsValue: points | null = null;
  allPlayers: Array<Player> = [];
  currentPlayer = 0;

  get selectedQuestionAnswer(): QuestionAnswer | null {
    if (!this.selectedCategory || !this.selectedPointsValue) {
      return null;
    }

    return this.questions[this.selectedCategory][this.selectedPointsValue];
  }

  created() {
    this.questions = questions;
  }

  selectQuestion(category: string, pointsValue: points): void {
    this.selectedCategory = category;
    this.selectedPointsValue = pointsValue;

    this.showQuestionModal = true;

    this.questions[this.selectedCategory][
      this.selectedPointsValue
    ].marked = true;
    this.questions = JSON.parse(JSON.stringify(this.questions));
  }

  showAnswer() {
    // cleanup
    this.showQuestionModal = false;

    // actions
    this.showAnswerModal = true;
  }

  savePlayers(playersList: Array<Player>) {
    this.allPlayers = [...playersList];
    this.goHome();
  }

  goHome() {
    // cleanup
    this.showRegistrationModal = false;
    this.showQuestionModal = false;
    this.showAnswerModal = false;
    this.selectedCategory = null;
    this.selectedPointsValue = null;
  }

  setAnswer(answer: string) {
    const pointsValue = Number(this.selectedPointsValue);
    if (answer === "correct") {
      this.allPlayers[this.currentPlayer].points += pointsValue;
    } else {
      this.allPlayers[this.currentPlayer].points -= pointsValue;
    }
    // this.incrementPlayer
    this.goHome();
  }
}
</script>
