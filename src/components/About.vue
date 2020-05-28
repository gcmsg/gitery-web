<!-- src/components/About.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div class="about">
    <div class="greeting">Hello {{ name }} {{ exclamationMarks }}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  @Prop() name!: string;

  @Prop() initialEnthusiasm!: number;

  private enthusiasm: number = this.initialEnthusiasm;

  private increment() {
    this.enthusiasm += 1;
  }

  private decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm -= 1;
    }
  }

  private get exclamationMarks(): string {
    return `${this.enthusiasm}!`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.greeting {
  font-size: 20px;
}
</style>
