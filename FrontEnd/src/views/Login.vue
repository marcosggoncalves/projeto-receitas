<script setup>
import { ref } from "vue";
import router from "@/router/index";
import { useAuthStore } from "@/stores/usuario";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const body = { login: null, senha: null };
const entrar = ref(body);
const carregamento = ref(false);
const showSenha = ref(false);
const errors = ref({});

const reset = () => {
  errors.value = {};
  entrar.value = body;
  carregamento.value = false;
  router.push("/minhas-receitas");
};

const efetuarLogin = async () => {
  try {
    carregamento.value = true;

    const response = await useAuthStore().entrar(entrar.value);

    if (response && !response.status) {
      notify({ type: "error", text: response.message });
      errors.value = response.errors;
      carregamento.value = false;
      return;
    }

    reset();
  } catch (error) {
    notify({ type: "error", text: error.toString() });
    carregamento.value = false;
  }
};
</script>

<template>
  <section class="login">
    <div class="form">
      <div class="form-login">
        <center class="logo mt-10 mb-10">
          <v-img
            alt="Minhas Receitas | Teste"
            contain
            src="/img/logo_verde.png"
            transition="scale-transition"
            width="80"
          />
        </center>
        <v-form method="post"  ref="form" @submit.prevent="efetuarLogin">
          <v-text-field
            density="compact"
            label="Usuário:"
            color="#4068a8"
            variant="outlined" 
            required
            autocomplete="off"
            v-model="entrar.login"
            :error="errors && errors.login"
          ></v-text-field>

          <v-text-field
            id="senha"
            density="compact"
            variant="outlined"
            color="#4068a8"
            label="Senha"
            placeholder="Digite sua senha:"
            :type="showSenha ? 'text' : 'password'"
            v-model="entrar.senha"
            :append-inner-icon="showSenha ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showSenha = !showSenha"
            :error="errors && errors.senha"
          />

          <v-btn
            color="#4068a8"
            :loading="carregamento"
            type="submit"
            class="mr-4 mb-4 white--text"
            block
            >Entrar</v-btn
          >
          <v-btn
            to="/"
            color="#4068a8" 
            variant="text"
            size="small"
            class="mr-4 mb-10 white--text"
            block
            >Não tem cadastro? Clique aqui</v-btn
          >
        </v-form>
        <div class="versao-sistema">
          Minhas Receitas | Teste
          <strong>1.0.0</strong>
        </div>
      </div>
    </div>
    <div class="info"></div>
  </section>
</template>
