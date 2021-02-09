<template>
  <div class="flex flex-col items-center space-y-2">
    <div
      v-if="player.imageUrl"
      class="rounded-full"
      :class="{
        'border-white border-4 w-24 h-24': highlighted,
        'w-20 h-20': !highlighted
      }"
    >
      <img :src="player.imageUrl" class="object-fill rounded-full" />
    </div>
    <div v-else class="rounded-full w-24 h-24 bg-white"></div>

    <div
      class="text-white"
      :class="{
        'text-xl': !highlighted,
        'text-4xl': highlighted
      }"
    >
      {{ player.name }}
    </div>

    <div
      class="rounded-2xl p-2 w-28 flex justify-center items-center"
      :class="{
        'bg-red-900 text-white': player.points < 0,
        'bg-green-700 text-white': player.points > 0,
        'bg-white text-black': player.points === 0,
        'text-xl': !highlighted,
        'text-4xl': highlighted
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
    },
    highlighted: {
      type: Boolean,
      default: false
    }
  }
})
export default class PlayerPointsSquare extends Vue {
  player!: Player;
  highlighted!: boolean;
}
</script>
