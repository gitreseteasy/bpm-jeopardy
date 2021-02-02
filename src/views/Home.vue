<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen bg-blue-900 relative"
  >
    <div>
      <h1 class="text-8xl mb-4 text-white" style="font-family: 'Gyparody'">
        Big Picture Jeopardy!
      </h1>

      <QuestionValuesTable
        :categories="questions"
        @select-question="selectQuestion"
      />
    </div>

    <ModalAnswer
      v-if="selectedQuestionAnswer && showAnswerModal"
      :question-answer="selectedQuestionAnswer"
      @go-home="goHome"
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
import { QuestionAnswer, QuestionCategory } from "@/models";
import QuestionValuesTable from "@/components/QuestionValuesTable.vue";
import ModalQuestion from "@/components/ModalQuestion.vue";
import ModalAnswer from "@/components/ModalAnswer.vue";

type points = "200" | "400" | "800" | "1000";

@Options({
  components: {
    QuestionValuesTable,
    ModalQuestion,
    ModalAnswer
  }
})
export default class Home extends Vue {
  questions!: { [key: string]: QuestionCategory };
  showQuestionModal = false;
  showAnswerModal = false;
  selectedCategory: string | null = null;
  selectedPointsValue: points | null = null;

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

  goHome() {
    // cleanup
    this.showQuestionModal = false;
    this.showAnswerModal = false;
    this.selectedCategory = null;
    this.selectedPointsValue = null;
  }
}
</script>
