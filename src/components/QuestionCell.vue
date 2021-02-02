<template>
  <div class="w-24 h-24 text-white">
    {{ questionValue }}
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    questionValue: {
      type: String,
      required: true
    }
  }
})
export default class QuestionCell extends Vue {
  questionValue: string;
}
</script>
