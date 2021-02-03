<template>
  <div class="flex items-center space-x-4 rounded mb-2 bg-white p-4">
    <div v-if="player.imageUrl" class="flex w-12 h-12">
      <img :src="player.imageUrl" class="object-cover rounded-full" />
    </div>
    <div class="text-3xl">{{ player.name }}</div>
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
export default class PlayerDisplayDetailsCard extends Vue {
  player!: Player;
}
</script>
