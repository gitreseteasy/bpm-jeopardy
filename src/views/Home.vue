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
            :highlighted="currentPlayer === index"
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
      @go-home="goHome"
      @set-steal-answer="setStealAnswer"
      :is-steal-mode="isStealMode"
      :selected-player="selectedPlayer"
      :stealing-player="stealingPlayer"
    />

    <ModalQuestion
      v-if="selectedQuestionAnswer && showQuestionModal"
      :question-answer="selectedQuestionAnswer"
      @show-answer="showAnswer"
      @set-answer="setAnswer"
      @set-steal-answer="setStealAnswer"
      @pass-steal="passSteal"
      :is-steal-mode="isStealMode"
      :selected-player="selectedPlayer"
      :stealing-player="stealingPlayer"
    />
  </div>
</template>

<script lang="ts">
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

  isDoubleJeopardyMode = false;
  isStealMode = false;
  currentStealingPlayer = 0;
  isDoubleJeopardy = false;

  created() {
    this.questions = questions;
  }

  get pointsValue() {
    let points = Number(this.selectedPointsValue);
    if (this.isDoubleJeopardyMode) {
      points *= 2;
    }
    return points;
  }

  get stealingPlayer(): Player {
    return this.allPlayers[this.currentStealingPlayer];
  }

  get selectedPlayer(): Player {
    return this.allPlayers[this.currentPlayer];
  }

  get selectedQuestionAnswer(): QuestionAnswer | null {
    if (!this.selectedCategory || !this.selectedPointsValue) {
      return null;
    }

    return this.questions[this.selectedCategory][this.selectedPointsValue];
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
    this.isStealMode = false;
  }

  incrementPlayer() {
    const totalPlayers = this.allPlayers.length;
    this.currentPlayer++;
    if (this.currentPlayer >= totalPlayers) {
      this.currentPlayer = 0;
    }
  }

  incrementStealingPlayer() {
    const totalPlayers = this.allPlayers.length;
    this.currentStealingPlayer++;
    if (this.currentStealingPlayer >= totalPlayers) {
      this.currentStealingPlayer = 0;
    }
  }

  setDoubleJeopardy(isDoubleJeopardy: boolean) {
    this.isDoubleJeopardy = isDoubleJeopardy;
  }

  setCurrentStealingPlayer() {
    const totalPlayers = this.allPlayers.length;
    this.currentStealingPlayer = this.currentPlayer + 1;
    if (this.currentStealingPlayer >= totalPlayers) {
      this.currentStealingPlayer = 0;
    }
  }

  setStealAnswer(answer: string) {
    const pointsValue = this.pointsValue;

    if (answer === "correct") {
      this.allPlayers[this.currentStealingPlayer].points += pointsValue;
    } else {
      this.allPlayers[this.currentStealingPlayer].points -= pointsValue;
    }

    this.incrementStealingPlayer();

    this.checkEndOfStealing();
  }

  unsetStealingMode() {
    this.incrementPlayer();
    this.goHome();
  }

  passSteal() {
    this.incrementStealingPlayer();
    this.checkEndOfStealing();
  }

  checkEndOfStealing() {
    if (this.currentStealingPlayer === this.currentPlayer) {
      this.unsetStealingMode();
    }
  }

  setAnswer(answer: string): void {
    const pointsValue = this.pointsValue;

    const targetPlayerIndex = this.isStealMode
      ? this.currentStealingPlayer
      : this.currentPlayer;

    if (answer === "correct") {
      this.allPlayers[targetPlayerIndex].points += pointsValue;
      this.incrementPlayer();
      this.showAnswer();
    } else {
      this.allPlayers[targetPlayerIndex].points -= pointsValue;

      if (!this.isStealMode) {
        this.isStealMode = true;
        this.setCurrentStealingPlayer();
      } else {
        this.incrementStealingPlayer();
      }

      this.checkEndOfStealing();
    }
  }
}
</script>
