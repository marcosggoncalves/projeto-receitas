<template>
  <v-app v-if="route.meta.allowAnonymous">
    <RouterView />
  </v-app>
  
  <v-app v-else>
    <v-main class="main" v-if="route.meta.auth">
      <Header />
      <div class="container-banner">
        <div class="container-full-size">
          <Banner />
        </div>
      </div>
      <RouterView />
    </v-main>
  </v-app>

  <notifications   position="bottom center" />

  <LGPDModal 
    :isVisible="isModalVisible" 
    :aceite="handleAccept" 
  />


</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Banner from './components/Banner.vue';
import Header from './components/Header.vue';
import LGPDModal from './components/LGPD.vue';

const route = useRoute();
const isModalVisible = ref(false);
const hasAcceptedPolicy = localStorage.getItem('lgpdAccepted');

if (!hasAcceptedPolicy) {
  isModalVisible.value = true; 
}

const handleAccept = () => { 
  localStorage.setItem('lgpdAccepted', 'true'); 
  isModalVisible.value = false;  
};
</script>
