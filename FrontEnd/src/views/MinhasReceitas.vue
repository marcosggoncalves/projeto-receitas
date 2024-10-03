<script setup>
import html2canvas from "html2canvas";
import jsPDF from "jsPDF";
import { useAuthStore } from "@/stores/usuario";
import { useNotification } from "@kyvg/vue3-notification";
import Receita from "@/components/Receita.vue";
import Carregamento from "@/components/Carregamento.vue";
import api from "@/globais/api.receitas";
import { ref, onMounted } from "vue";

const { notify } = useNotification();
const { usuario } = useAuthStore();
const dialogVisuliazarReceita = ref(false);
const dialogNovaReceita = ref(false);
const receitaPrint = ref(null);
const carregamento = ref(true);
const categorias = ref([]);
const receitas = ref([]);
const receita = ref({});
const errors = ref({});

const carregarMinhasReceitas = async () => {
  try {
    carregamento.value = true;

    const response = await api.get("/api/receitas");

    receitas.value = response.data;
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  } finally {
    carregamento.value = false;
  }
};

const carregarCategorias = async () => {
  try {
    const response = await api.get("/api/categorias");

    categorias.value = response.data;
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  }
};

const excluirReceita = async (id) => {
  try {
    const response = await api.delete(`/api/receitas/${id}`);

    notify({ type: "success", text: "Receita excluida com sucesso!"});

    dialogVisuliazarReceita.value = !dialogVisuliazarReceita.value;

    await carregarMinhasReceitas();
  } catch (error) {
    notify({
      type: "error",
      text: error.response.data.message || error.toString(),
    });
  }
};

const salvarReceita = async () => {
  try {
    const { id } = receita.value;

    const idUsuario = usuario?.id;

    const endpoint = id != undefined ? `/api/receitas/${id}` : "/api/receitas";

    const method = id != undefined ? "put" : "post";

    const response = await api[method](endpoint, {
      ...receita.value,
      idUsuario,
    });

  notify({ type: "success", text: "Receita salva com sucesso!"  });

    dialogNovaReceita.value = !dialogNovaReceita.value;

    await carregarMinhasReceitas();
  } catch (res) {
    if (res.response.data && res.response.data.data) {
      return (errors.value = res.response.data.data);
    }

    notify({
      type: "error",
      text: res.response.data.message || res.toString(),
    });
  }
};

const detalharReceita = async (id) => {
  try {
    const response = await api.get(`/api/receitas/${id}`);

    return response.data;
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  }
};

const abrirModalReceita = async (id) => {
  try {
    carregamento.value = true;

    const response = await detalharReceita(id);

    receita.value = response;
  } catch (error) {
    notify({ type: "error", text: error.toString() });
  } finally {
    carregamento.value = false;

    dialogVisuliazarReceita.value = !dialogVisuliazarReceita.value;
  }
};

const printReceita = (nome) => {
  if (receitaPrint.value) {
    html2canvas(receitaPrint.value).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");

      const imgHeight = (canvas.height * 210) / canvas.width;

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, imgHeight);

      pdf.save(`receita_${nome.replace(" ", "_")}.pdf`);
    });
  }
};

const abrirModalNovaReceita = async (id = null) => {
  receita.value = {};
  errors.value = {};

  if (id != null) {
    
    dialogVisuliazarReceita.value = !dialogVisuliazarReceita.value;
    
    receita.value = await detalharReceita(id);
  }

  dialogNovaReceita.value = !dialogNovaReceita.value;
};

onMounted(async () => {
  await carregarMinhasReceitas();
  await carregarCategorias();
});
</script>

<template>
  <section class="container-full-size">
    <section class="pa-5">
      <v-row class="align-center justify-space-between">
        <div class="container-titulo">
          <h1>Minhas Receitas</h1>
        </div>
        <v-btn
          type="submit"
          size="small"
          @click="abrirModalNovaReceita()"
          class="mt-2"
          color="#4068a8"
        >
          <v-icon left>mdi-check</v-icon>
          Nova Receita
        </v-btn>
      </v-row>
    </section>
    <!-- Criar Nova Receita -->
    <v-dialog v-model="dialogNovaReceita" width="700">
      <v-card :title=" receita && !receita?.id ? 'Criar Nova Receita' : 'Editar Receita'">
        <v-form ref="form" class="pa-5" @submit.prevent="salvarReceita">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="receita.nome"
                color="#4068a8"
                :error-messages="errors && errors.nome"
                label="Nome da Receita:*"
                placeholder="Informe o nome da receita"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
               v-model="receita.idCategoria"
                :error-messages="errors && errors.idCategoria"
                color="#4068a8"
                :items="categorias"
                item-value="id"
                item-title="nome" 
                label="Selecione uma categora"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="receita.tempoPreparoMinutos"
                color="#4068a8"
                label="Tempo de Preparo (min):*"
                :error-messages="errors && errors.tempoPreparoMinutos"
                placeholder="Informe o tempo de preparo em minutos"
                density="compact"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="receita.porcoes"
                :error-messages="errors && errors.porcoes"
                color="#4068a8"
                label="Porções:*"
                placeholder="Quantas porções a receita rende?"
                density="compact"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="receita.modoPreparo"
                color="#4068a8"
                :error-messages="errors && errors.modoPreparo"
                label="Modo de Preparo:*"
                placeholder="Descreva o modo de preparo da receita"
                density="compact"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="receita.ingredientes"
                :error-messages="errors && errors.ingredientes"
                color="#4068a8"
                label="Ingredientes:"
                placeholder="Informe os ingredientes necessários"
                density="compact"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-btn
            @click="abrirModalNovaReceita()"
            variant="text"
            color="red"
            size="small"
            class="mt-2"
          >
            <v-icon>mdi-close</v-icon> Cancelar
          </v-btn>

          <v-btn
            type="submit"
            :loading="carregamento"
            size="small"
            class="btn-salvar"
            color="#4068a8"
          >
            <v-icon left>mdi-check</v-icon> Salvar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Fim -->

    <!-- Visualizar Receita -->
    <v-dialog v-model="dialogVisuliazarReceita" width="800">
      <v-card> 
        <section class="receita-visualizar" ref="receitaPrint">
          <div class="dados">
            <h1>{{receita?.nome}} ({{receita?.categoria?.nome}})</h1> 
            <ul>
              <li>
                <v-icon>mdi-tea-outline</v-icon> Porções: {{ receita?.porcoes }}
              </li>
              <li>
                <v-icon>mdi-timer</v-icon
                > {{ receita?.tempoPreparoMinutos }} min. 
              </li>
            </ul>
            <div class="modo-preparo">
              <h1><v-icon>mdi-account-clock</v-icon> Modo Preparo</h1>
              <pre v-text="receita?.modoPreparo"></pre>
            </div>
            <div class="ingredientes">
              <h1><v-icon>mdi-basket</v-icon> Ingredientes</h1>
              <pre v-text="receita?.ingredientes"></pre>
            </div>
          </div>
        </section>
        <template v-slot:actions>
          <v-btn
            size="small"
            color="red"
            text
            @click="excluirReceita(receita?.id)"
          >
            <v-icon>mdi-close</v-icon>
            EXCLUIR
          </v-btn>
          <v-btn size="small" text @click="abrirModalNovaReceita(receita?.id)">
            <v-icon>mdi-pencil</v-icon>
            EDITAR
          </v-btn>
          <v-btn
            class="ms-auto"
            size="small"
            color="#4068a8"
            text
            @click="printReceita(receita?.nome)"
          >
            <v-icon>mdi-arrow-down</v-icon>
            BAIXAR RECEITA
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <!-- Fim -->

    <!-- Aviso de receitas não encontradas -->
    <v-empty-state
      v-if="receitas.length == 0 || carregamento"
      title="Dados não encontrados"
      text="Não foi possivel carregar suas receitas."
    ></v-empty-state>

    <!-- Fim -->

    <!-- Carregamento(Load) -->
    <Carregamento
      v-if="carregamento"
      :size="30"
      message="Carregando receitas..."
    />
    <!-- Fim -->

    <!-- Listagem das receitas -->
    <section class="receitas" v-else>
      <Receita
        v-for="receita in receitas"
        :key="'#1' + receita.id"
        :receita="receita"
        @click="abrirModalReceita(receita.id)"
      />
    </section>
    <!-- Fim -->
  </section>
</template>