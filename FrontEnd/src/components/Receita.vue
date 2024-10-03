<script setup>
defineProps({
  receita: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="receita">
    <div class="dados">
      <h1>{{ receita?.nome }}</h1>
      <ul>
        <li>
          <v-icon>mdi-tea-outline</v-icon
          ><strong>Porções: {{ receita?.porcoes }}</strong>
        </li>
        <li>
          <v-icon>mdi-timer</v-icon
          ><strong>{{ receita?.tempoPreparoMinutos }} min.</strong>
        </li>
      </ul>
    </div>
  </div>
</template>