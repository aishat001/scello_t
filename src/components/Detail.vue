<script setup>
import { onMounted, onUnmounted, ref } from 'vue';


const { item, expandRow } = defineProps(['item', 'expandRow']);


const deleteUser = () => {
  // Implement delete user functionality here
};

const toggleStatus = () => {
  // Implement toggle status functionality here
};

const viewDetails = () => {
  // Implement view details functionality here
};

// const handleClickOutside = (event) => {
//   if (!event.target.closest('.dropdown')) {
//     closeDropdown();
//   }
// };

// onMounted(() => {
//   document.addEventListener('click', handleClickOutside);
// });

// onUnmounted(() => {
//   document.removeEventListener('click', handleClickOutside);
// });

</script>

<template>
    <div v-if="expandRow" class="detail-table ">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Detail</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detail in item.activities" :key="detail.id">
            <td>{{ detail.date }}</td>
            <td>{{ detail.details }}</td>
            <td>{{ detail.userActivity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
 
  
  <style scoped>
  .detail-table {
    width: 100%;
    margin-top: 10px;
  }
  
  .detail-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .detail-table th,
  .detail-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  .detail-table th {
    background-color: #f2f2f2;
  }
  </style>
  