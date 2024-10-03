<script setup>
import { ref, onMounted } from "vue";
import Carregamento from "@/components/Carregamento.vue";
import { useAuthStore } from "@/stores/usuario";
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router/index";
import moment from "moment";

const { notify } = useNotification();
const { usuario, getUsuario, resetState } = useAuthStore();

const carregamento = ref(false);
const cadastro = ref({});
const errors = ref({});

const carregarCadastro = async () => {
  // Limpar variaveis
  cadastro.value = {};

  errors.value = {};
  // Buscar dados da cache
  await getUsuario();

  cadastro.value = usuario;
};

const alterarCadastro = async () => {
  try {
    carregamento.value = true;

    const response = await useAuthStore().salvar(cadastro.value);

    if (response?.status === false) {
      notify({ type: "error", text: response.message });

      return (errors.value = response.errors);
    }

    notify({ type: "success", text: response.message });

    setTimeout(() => {
      router.go();
    }, 500);
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  } finally {
    carregamento.value = false;
  }
};

onMounted(async () => {
  await carregarCadastro();
});
</script>

<template>
  <section class="container-full-size">
    <v-card class="pa-2 bg-transparent" elevation="0">
      <section class="container-titulo">
        <h1>Dados de conta</h1>
      </section>
      <Carregamento
        v-if="carregamento"
        :size="30"
        message="Carregando dados do cadastro ..."
      />
      <v-form ref="form" class="mt-5" v-else @submit.prevent="alterarCadastro">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cadastro.nome"
              color="#006b33"
              :error-messages="errors && errors.nome"
              label="Nome Completo:*"
              placeholder="Informe seu nome completo:"
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cadastro.login"
              color="#006b33"
              :error-messages="errors && errors.login"
              label="Telefone:*"
              placeholder="Informe usuário para login:"
              density="compact"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cadastro.senha"
              color="#006b33"
              :error-messages="errors && errors.senha"
              label="Senha:*"
              placeholder="Digite uma senha:"
              type="password"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-btn
          to="/minhas-receitas"
          variant="text"
          color="red"
          size="small"
          class="mt-2"
        >
          <v-icon>mdi-arrow-left</v-icon> Voltar
        </v-btn>

        <v-btn
          type="submit"
          :loading="carregamento"
          size="small"
          class="btn-march"
          color="#4068a8"
        >
          <v-icon left>mdi-check</v-icon>
          Salvar
        </v-btn>
      </v-form>
    </v-card>
  </section>
</template>
