<template>
  <div class="flex">
    <div v-for="(value, key) in categories" :key="key" class="w-1/4">
      <div
        class="h-1/4 text-center flex justify-center items-start p-4 border border-yellows bg-blue-900 text-2xl font-semibold text-white"
      >
        {{ value.title }}
      </div>

      <div
        v-for="(pointValue, index) in Object.keys(value).filter(
          cat => cat !== 'title'
        )"
        :key="index"
        class="cursor-pointer hover:text-blue-900 hover:bg-white text-center flex justify-center items-start p-4 border border-yellows bg-blue-900 text-2xl font-semibold text-white"
        @click="$emit('select-question', key, pointValue)"
      >
        {{ pointValue }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { QuestionCategory } from "@/models";

@Options({
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  emits: ["select-question"]
})
export default class QuestionValuesTable extends Vue {
  categories!: { [key: string]: QuestionCategory };
}
</script>
