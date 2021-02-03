<template>
  <div class="absolute bg-blue-900 w-screen h-screen left-0 top-0">
    <div
      class="flex flex-col w-full h-full justify-center items-center space-y-20"
    >
      <div class="p-8">
        <PlayerDisplayDetailsCard
          v-for="(player, index) in playersList"
          :key="index"
          :player="player"
        />

        <PlayerEnterDetailsCard
          :current-player="currentPlayer"
          @submit-player-details="addCurrentPlayer"
        />
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
import PlayerEnterDetailsCard from "@/components/PlayerEnterDetailsCard.vue";
import PlayerDisplayDetailsCard from "@/components/PlayerDisplayDetailsCard.vue";

@Options({
  components: {
    PlayerEnterDetailsCard,
    PlayerDisplayDetailsCard
  },
  emits: ["save-players"]
})
export default class ModalPlayerRegistration extends Vue {
  playersList: Array<Player> = [];
  currentPlayer: Player = { name: "", imageUrl: "" };

  addCurrentPlayer() {
    if (this.currentPlayer.name) {
      this.playersList.push({ ...this.currentPlayer });
      this.currentPlayer = { name: "", imageUrl: "" };
    }
  }
}
</script>
