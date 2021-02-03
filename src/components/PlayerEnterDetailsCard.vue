<template>
  <div class="bg-white space-y-4 mb-2 rounded p-4">
    <div>New Player:</div>
    <div class="space-x-2">
      <span class="text-xl">Name:</span>
      <input
        v-model="currentPlayer.name"
        class="border rounded p-2"
        @keyup="handleKeyUp"
      />
    </div>
    <div class="space-x-2">
      <span class="text-xl">Image URL:</span>
      <input v-model="currentPlayer.imageUrl" class="border rounded p-2" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Player } from "@/models";

@Options({
  props: {
    currentPlayer: {
      type: Object,
      required: true
    }
  },
  emits: ["submit-player-details"]
})
export default class PlayerEnterDetailsCard extends Vue {
  currentPlayer!: Player;

  handleKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key === "Enter") {
      this.$emit("submit-player-details");
    }
  }
}
</script>
