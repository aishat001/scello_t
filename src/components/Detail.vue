<script setup>


const { item, expandRow } = defineProps(['item', 'expandRow']);


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
  