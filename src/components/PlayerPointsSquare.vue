<template>
  <div class="flex flex-col items-center space-y-2">
    <div v-if="player.imageUrl" class="rounded-full w-24 h-24">
      <img :src="player.imageUrl" class="object-fill rounded-full" />
    </div>
    <div v-else class="rounded-full w-24 h-24 bg-white"></div>

    <div class="text-white">{{ player.name }}</div>

    <div
      class="rounded-2xl text-4xl p-2 w-28 flex justify-center items-center"
      :class="{
        'bg-red-900 text-white': player.points < 0,
        'bg-green-700 text-white': player.points > 0,
        'bg-white text-black': player.points === 0
      }"
    >
      {{ player.points }}
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Player } from "@/models";

@Options({
  props: {
    player: {
      type: Object,
      required: true
    }
  }
})
export default class PlayerPointsSquare extends Vue {
  player!: Player;
}
</script>
