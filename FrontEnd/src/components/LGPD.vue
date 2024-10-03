<template>
  <v-dialog v-model="isVisible" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Política de privacidade
      </v-card-title>
      <v-card-text>
        <p>
          Utilizamos cookies para melhorar a sua experiência em nossos serviços.
          Ao continuar, você concorda com a utilização da tecnologia e o uso dos dados.
        </p>
      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-wrap align-center justify-end">

          <v-btn @click="accept" color="#4068a8" variant="flat" size="small" class="mr-2 mt-1">
            <v-icon>mdi-check</v-icon>
            Concordo
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    aceite: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { isVisible, aceite } = toRefs(props);

    const accept = () => {
      aceite.value();
    };

    return {
      isVisible,
      accept
    };
  },
});
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>