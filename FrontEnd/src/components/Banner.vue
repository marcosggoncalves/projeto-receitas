<script setup>
  import { useAuthStore } from "@/stores/usuario";
  const {usuario} = useAuthStore();
</script>

<template>
  <div class="banner">
    <h1 >Seja bem vindo, {{ usuario?.nome }}.</h1>  
    <p>Aqui você tem acesso a todas suas receitas organizadas e de forma fácil, <strong>aproveite.</strong>.</p>
  </div>
</template>
