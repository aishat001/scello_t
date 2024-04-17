<script setup>
import DataTable from '../components/DataTable.vue';
import Tab from "../components/Tab.vue";
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const users = computed(() => store.state.users?.data);
const selectedTab = ref(1);


onMounted(() => {
  store.dispatch('fetchUsers');
  
});

const handleTabSelection = (tabId) => {
  selectedTab.value = tabId;
};


const filteredData = computed(() => {
  if (selectedTab.value === 1) {
    return users.value; 
  } else {
    return users.value?.filter(item => {
      if (selectedTab.value === 2) {
        return item.paymentStatus === "paid";
      } else if (selectedTab.value === 3) {
        return item.paymentStatus === "unpaid";
      } else if (selectedTab.value === 4) {
        return item.paymentStatus === "overdue";
      }
    });
  }
});


</script>

<template >
  <div class="max-w-[1200px] mx-auto mt-[100px]">
    <div class=" tex-[14px] font-[700] text-[#6E6893] my-[20px]">Table Heading</div>
    <Tab  @selectTab="handleTabSelection" />
    <DataTable :items="filteredData" />
  </div>
</template>

