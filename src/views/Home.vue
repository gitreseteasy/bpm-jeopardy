<template>
  <div
    class="flex flex-col justify-center items-center h-screen w-screen bg-blue-900"
  >
    <div>
      <h1 class="text-8xl mb-4 text-white" style="font-family: 'Gyparody'">
        Big Picture Jeopardy!
      </h1>

      <QuestionValuesTable :categories="questions" class="w-200 h-200" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import questions from "../../questions/questions.json";
import { QuestionCategory } from "@/models";
import QuestionValuesTable from "@/components/QuestionValuesTable.vue";

@Options({
  components: {
    QuestionValuesTable
  }
})
export default class Home extends Vue {
  questions!: { [key: string]: QuestionCategory };
  created() {
    this.questions = questions;
  }
}
</script>
