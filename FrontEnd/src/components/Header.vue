<script setup>
import { useAuthStore } from "@/stores/usuario";
const { sair } = useAuthStore();
</script>
<template>
    <v-app-bar elevation="1" color="white">
        <div class="header container-full-size">
            <v-img alt="Logo" contain src="/img/logo_verde.png" width="60" />
            <v-spacer></v-spacer>
            <v-menu :nudge-width="200" transition="scale-transition">
                <template v-slot:activator="{ props }">
                    <v-chip size="large" class="ma-2 header-minha-conta-btn" color="#4068a8"
                        prepend-icon="mdi-account-circle" v-bind="props" v-on="on">
                        Minha Conta
                    </v-chip>
                </template>
                <v-list density="compact">
                    <v-list-item to="/meu-cadastro">
                        <template v-slot:prepend>
                            <v-icon>mdi-account-edit</v-icon>
                        </template>
                        <v-list-item-title>Meu cadastro</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/minhas-receitas">
                        <template v-slot:prepend>
                            <v-icon>mdi-text-box-check-outline</v-icon>
                        </template>
                        <v-list-item-title>Minhas Receitas</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="sair" color="red">
                        <template v-slot:prepend>
                            <v-icon>mdi-logout</v-icon>
                        </template>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>
