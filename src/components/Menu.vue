<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';


const { item } = defineProps(['item']);

const isOpen = ref(false);
const store = useStore()

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
const closeDropdown = () => {
  isOpen.value = !isOpen.value;
};

const deleteUser = () => {
  store.dispatch('deleteUser', item.id);
};

const toggleStatus = () => {
};

const viewDetails = () => {
};


</script>

<template>
    <div class="relative">
        <button @click="toggleMenu"  class="dropdown rotate-[90deg] !text-[20px] font-[800] text-[#8B83BA]">...</button>

        <div v-if="isOpen" class="menu border  rounded-lg flex flex-col text-start absolute w-[154px] bg-white p-3 right-0 z-[50]" @click.outside="closeDropdown">
          <div @click="deleteUser" class="">Edit</div>
          <div @click="deleteUser" class="">View Profile</div>
          <div @click="toggleStatus" class="text-[#007F00]">{{ item.userStatus === 'active' ? 'Deactivate' : 'Activate User' }}</div>
          <div @click="deleteUser" class="text-[#D30000]">Delete</div>
        </div>
      </div>
</template>

<style lang="scss">
    .menu {
        box-shadow: 0px 5px 15px 0px #00000033;

        div {
            cursor : pointer;
            padding : 2px 0px 2px 4px;
            border-radius: 4px;

            &:hover {
                background: #F2F0F9;
            }
        }

    }
</style>