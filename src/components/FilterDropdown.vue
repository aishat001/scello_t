<script setup>
import {  ref } from 'vue';

    const isFilterOpen = ref(false)
    const emit = defineEmits(['filter', 'getSortValue'])
    const toggleFilter = () => {
        isFilterOpen.value = !isFilterOpen.value
    }

    const sortItems = ['Default', 'First Name', 'Last Name', 'Due Date', 'Last Login']
    const userItems = ['All', 'Active', 'Inactive']

    const filterByUserStatus = (status) => {
    emit('filter', status)
};
    const sortUsers = (value) => {
    emit('getSortValue', value)
};
</script>

<template>
    <div class="flex  relative mb-[15px]">
        <div class="border border-[#6D5BD0] flex items-center px-[10px] rounded-[6px] h-[40px]" @click="toggleFilter">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#8B83BA"/>
                </svg>
                              <span class="ml-2">Filter</span>
            </div>

            <div v-if="isFilterOpen" class="absolute border mt-[50px] p-[20px] border border-[#C6C2DE] rounded-[6px] bg-white w-[224px] z-50">
                <p class="text-[#6E6893] text-[12px] mb-[10px]"> SORT BY:</p>
               
                <div class="flex flex-col gap-[10px]">
                    <div v-for="(item, index) in sortItems" :key="index" >
                        <label :for="item"  class="flex justify-between items-center text-[#25213B] text-[14px] w-full"> {{ item }}
                            <input type="radio" :name="'item'" :id="item" :value="item" @change="sortUsers(item)" />
                            <span class="radio-custom"></span>
                        </label>
                                     </div>
                </div>
                <span class="w-full h-[1px] bg-[#F2F0F9] flex my-[10px]"></span>
                <p class="text-[#6E6893] text-[12px] mb-[10px]"> USERS:</p>
                <div class="flex flex-col gap-[10px]">
                    <div v-for="(item, index) in userItems" :key="index" >
                            <label :for="item"  class="flex justify-between items-center text-[#25213B] text-[14px] w-full"> {{ item }}
                            <input type="radio" :name="'item'" :id="item" :value="item" @change="filterByUserStatus(item)" />
                            <span class="radio-custom"></span>
                        </label>
                    </div>
                </div>
            </div>
       
      </div>
</template>

<style lang="scss">
input[type="radio"] {
    display: none;

    + .radio-custom {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      margin-right: 6px;
      border: 2px solid #8b83ba;

      border-radius: 50%;

      &:before {
        content: "";
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0;
      }
    }

    &:checked + .radio-custom:before {
      opacity: 1;
      background-color: #fff;
    }

    &:checked + .radio-custom {
      background-color: #6d5bd0;
      border: none;
    }
  }
</style>

