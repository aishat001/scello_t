<script setup>
import SearchIcon from '../assets/SearchIcon.vue'

const emit = defineEmits(['search'])
const search = (e) => {
    emit('search', e.target.value)
    console.log(e.target.value)

}
</script>
<template>
    <form class="search flex items-center gap-2 h-[40px]">
        <SearchIcon/>
            <input type="text" @input="search" placeholder="search" class=" text-[#6E6893] w-full"/>
    </form>
</template>

<style lang="scss">
.search {
    width: 392px;
    border-radius: 6px;
    background: #f4f2ff;
    padding: 10px;
    border : 1px solid #6D5BD0;

 

    & input {
      background-color: transparent;
      &::placeholder {
        color: #6E6893;
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
</style>