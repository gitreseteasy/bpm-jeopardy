<template>
  <div class="absolute bg-blue-900 w-screen h-screen left-0 top-0">
    <div
      class="flex flex-col w-full h-full justify-center items-center space-y-20"
    >
      <div class="p-8">
        <div
          v-for="(player, index) in playersList"
          :key="index"
          class="rounded border mb-2 bg-white p-4"
        >
          <div>name: {{ player.name }}</div>
          <div>imageUrl: {{ player.imageUrl }}</div>
        </div>

        <div class="bg-white space-y-2 mb-2 rounded p-4">
          <div>
            Name:
            <input
              v-model="currentPlayer.name"
              class="border rounded"
              @keyup="pressEnter"
            />
          </div>
          <div>
            Image:
            <input v-model="currentPlayer.imageUrl" class="border rounded" />
          </div>
        </div>
        <button
          class="border bg-blue-900 rounded text-white font-semibold p-2"
          @click="addCurrentPlayer"
        >
          Add player
        </button>
      </div>

      <button
        @click="$emit('save-players', playersList)"
        class="border bg-blue-900 rounded text-white font-semibold p-2"
      >
        Save Players
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Player } from "@/models";

@Options({
  emits: ["save-players"]
})
export default class ModalPlayerRegistration extends Vue {
  playersList: Array<Player> = [];
  currentPlayer: Player = { name: "", imageUrl: "" };

  addCurrentPlayer() {
    this.playersList.push({ ...this.currentPlayer });
    this.currentPlayer = { name: "", imageUrl: "" };
  }

  pressEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.addCurrentPlayer();
    }
  }
}
</script>
