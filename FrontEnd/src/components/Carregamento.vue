<template>
    <v-dialog
      v-model="carregamento" 
      width="310"
      persistent
    >
      <v-list class="py-2" color="primary" elevation="12" rounded="lg">
        <v-list-item :title="message" >
          <template v-slot:append >
            <v-progress-circular
              color="#4068a8"
              indeterminate
              :size="size" 
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
   
  const props = defineProps({
    message: String,
    size: Number 
  });
   
  const carregamento = ref(true)
  </script>
  