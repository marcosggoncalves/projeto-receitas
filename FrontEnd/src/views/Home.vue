<script setup>
import { ref, onMounted } from "vue";
import api_token from "@/globais/api.receitas";
import { useAuthStore } from "@/stores/usuario";
import { useNotification } from "@kyvg/vue3-notification";
import moment from "moment";

const { notify } = useNotification();

const carregamento = ref(false);
const cadastro = ref({});
const errors = ref({});

const salvarCadastro = async () => {
  try {
    carregamento.value = true;

    const response = await useAuthStore().salvar(cadastro.value);

    if (response?.status === false) {
      handleErrorResponse(response);
      return;
    }

    notify({ type: "success", text: response.message });

    redirectToLogin();
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  } finally {
    carregamento.value = false;
  }
};

const handleErrorResponse = (response) => {
  notify({ type: "error", text: response.message });
  errors.value = response.errors || {};
};

const redirectToLogin = () => {
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

onMounted(async () => {
  errors.value = {};
  cadastro.value = {};
});
</script>

<template>
  <v-app>
    <v-app-bar elevation="0" color="white">
      <v-toolbar-title class="logo">
        <v-img src="/img/logo_verde.png" alt=" Minhas Receitas | Teste" max-width="64" />
      </v-toolbar-title>
    </v-app-bar>
    <v-row dense class="bannerWidthHeight">
      <v-col cols="12" md="6" class="info-cadastro">
        <div class="banner-titulo">
          <h1>Minhas Receitas</h1>
          <p>
            Aqui você encontra todos suas receitas organizadas para acessa-lá de qualquer lugar.
          </p>
          <p>Gerência suas receitas agora mesmo, acesse nosso painel</p>
          <v-btn to="/login"   class="mt-4" color="#4068a8">
            <v-icon left class="pr-2">mdi-login</v-icon>
            ACESSAR PAINEL
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="form-cadastro">
        <v-card max-width="600" elevation="1" title="Faça seu cadastro"
          subtitle="Cadastre-se e gerência suas receitas agora mesmo">
          <v-form ref="form" class="pr-5 pl-5 pb-5" @submit.prevent="salvarCadastro">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="cadastro.nome" color="#4068a8" :error-messages="errors && errors.nome"
                  label="Nome Completo:*" placeholder="Informe seu nome completo:" density="compact"
                  variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="cadastro.login" color="#4068a8" :error-messages="errors && errors.login"
                  label="Login:*" placeholder="Informe usuário para login" density="compact" variant="outlined" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="cadastro.senha" color="#4068a8" :error-messages="errors && errors.senha"
                  label="Senha:*" placeholder="Digite uma senha:" type="password" density="compact"
                  variant="outlined" />
              </v-col>
            </v-row>
            <v-btn type="submit" :loading="carregamento" class="mt-2" color="#4068a8">
              <v-icon left>mdi-check</v-icon>
              Salvar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
  <v-footer>
    <v-col class="text-center">
      <p>&copy; 2024 - Minhas Receitas . Todos os direitos reservados.</p>
    </v-col>
  </v-footer>
</template>

<style scoped>
.bannerWidthHeight {
  background: url("/img/fundo.png") no-repeat center center fixed;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
}

.banner-titulo {
  color: #ffffff;
  font-weight: bold;
  height: 100px;
  margin-bottom: 40px;
}

.form-cadastro {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  margin-top: 4rem;
}

.info-cadastro h1 {
  font-size: 1.8rem;
}

.info-cadastro p {
  font-size: 1rem;
  font-weight: 100;
}

.info-cadastro {
  display: none;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 1024px) {
  .bannerWidthHeight {
    height: calc(100vh - 10px);
    overflow: hidden;
  }

  .form-cadastro {
    margin-top: unset;
  }

  .info-cadastro {
    padding-left: 45px;
    height: 100vh;
    margin-top: unset;
    display: flex;
  }
}
</style>
