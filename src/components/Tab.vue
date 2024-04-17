<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const tabs = ref([
  { id: 1, tab: "All" },
  { id: 2, tab: "Paid" },
  { id: 3, tab: "Unpaid" },
  { id: 4, tab: "Overdue" }
]);

const selectedTab = ref(1);

const selectTab = (tabId) => {
  selectedTab.value = tabId;
  emit("selectTab", tabId);

};

const users = computed(() => store.state.users?.data);


const totalPayableAmount = computed(() => {
  if (users.value !== null && users.value !== undefined) {
    const filteredDataArray = Object.values(users.value);

    return filteredDataArray.reduce((cumulative, item) => {
      if (item.paymentStatus === "unpaid" || item.paymentStatus === "overdue") {
        return cumulative + item.amountInCents;
      } else {
        return cumulative;
      }
    }, 0);
  } else {
    return 0; // or any default value you prefer
  }
});


const emit = defineEmits(['selectTab'])

</script>

<template>
    <div class="flex border-b border-[#C6C2DE]  gap-[20px] mb-[20px]">

        <div v-for="(tab, index) in tabs" :key="index"
          :class="` pb-[11px] px-[10px] text-[14px] text-[#6E6893] border-b border-[transparent] font-[500] cursor-pointer
          ${selectedTab === tab.id && ' !border-[#25213B] text-[#25213B]' }`"
          @click="selectTab(tab.id)"
          >
          {{tab.tab}}

        </div>

        <div class="ml-auto text-[#25213B] flex items-center gap-2">
            Total payable amount: 
            <span class="text-[#6D5BD0] text-[18px] font-[700]">

            ${{ totalPayableAmount }}.00
          </span>
          <span class="text-[#6D5BD0] text-[18px] font-[400]">
            USD
          </span>  
        </div>
        
    </div>
</template>