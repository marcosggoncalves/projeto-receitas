import { defineStore } from 'pinia';
import { useNotification } from "@kyvg/vue3-notification";
import router from "@/router/index";
import Swal from 'sweetalert2';
import api from '@/globais/api.receitas';

const { notify } = useNotification();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: null,
    isAuthenticated: false,
    token: null
  }),
  actions: {
    async logout() {
      try { 
        await api.get(`/api-publica/logout`);

      } catch (error) {
        return {
          status: false,
          message: "Não foi possível consultar, entre em contato com nossa central.",
          error: error.toString()
        };
      }
    },
    async getUsuario() {
      try {
        const { id } = this.usuario;

        const usuarioGet = await api.get(`/api/usuarios/${id}`);

        if (usuarioGet.data && usuarioGet.data) {
          this.usuario = usuarioGet.data;

          return {
            status: true,
            message: "Usuário carregado com sucesso.",
          };
        }

        return {
          status: false,
          message: "Usuário não encontrado."
        };
      } catch (error) {
        return {
          status: false,
          message: "Não foi possível consultar, entre em contato com nossa central.",
          error: error.toString()
        };
      }
    },
    async entrar(login) {
      try {
        const response = await api.post("api-publica/login", login);

        const { token, usuario } = response.data.data;

        this.usuario = usuario;
        this.token = token;
        this.isAuthenticated = true;
      } catch (res) {
        if (res.response.data && res.response.data.data) {
          return {
            status: false,
            message: res.response.data.message,
            errors: res.response.data.data
          }
        }
        return {
          status: false,
          message: res.response.data.message
        };
      }
    },
    async salvar(cadastro) {
      try {
        const id = this.usuario?.id;

        const endpoint = id  ? `/api/usuarios/${id}` : '/api-publica/registrar';

        const method = id ? 'put' : 'post';

        await api[method](endpoint, cadastro);

        return {
          status: true,
          message: id != null ? "Cadastro alterado com sucesso!" : "Seu cadastro foi realizado com sucesso!"
        };
      } catch (res) {
        if (res.response.data && res.response.data.data) {
          return {
            status: false,
            message: res.response.data.message,
            errors: res.response.data.data
          }
        }
        return {
          status: false,
          message: res.response.data.message
        };
      }
    },
    sair() {
      Swal.fire({
        title: "Finalizar Sessão!",
        text: "Deseja encerrar seu acesso ao sistema?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#4068a8",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, pode finalizar",
        reverseButtons: true,
        didRender: () => {
          const confirmButton = document.querySelector('.swal2-confirm');
          const cancelButton = document.querySelector('.swal2-cancel');

          if (confirmButton) confirmButton.style.color = '#ffffff';
          if (cancelButton) cancelButton.style.color = '#ffffff';
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
        
          await api.get(`/api-publica/logout`);

          this.resetState();

          router.push('/login');

          notify({ type: "success", text: 'Sessão finalizada com sucesso!' });
        }
      });
    },
    resetState() {
      this.$reset()
    }
  }
})


