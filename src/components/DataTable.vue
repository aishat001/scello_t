<script setup>
import { computed, ref } from 'vue';
import FilterDropdown from './FilterDropdown.vue';
import ChevronLeft from '../assets/ChevronLeft.vue';
import ChevronRight from '../assets/ChevronRight.vue';
import SearchFilter from './SearchFilter.vue';
import Menu from './Menu.vue';
import Detail from './Detail.vue';
import { useStore } from 'vuex';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    }
})

const store = useStore()
const searchFilter = ref('')
const sortCriterion = ref('Default')
const filterValue = ref(null)
const rowId = ref(null);
const selectedRows = ref([]);
const selectedRow = ref(null);


const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '/');
};


const currentPage = ref(1);
const perPage = 10;

const totalPages = computed(() => Math.ceil(props?.items?.length / perPage));

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredData.value?.slice(startIndex, endIndex);
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

const startItem = computed(() => (currentPage.value - 1) * perPage + 1);
const endItem = computed(() => Math.min(currentPage.value * perPage, props?.items?.length));

const filterItems = computed(() => {
    return props.items.filter(item => item.userStatus === 'active')
})

const sortData = (criterion, data) => {
    sortCriterion.value = criterion;
    switch (criterion) {
        case 'First Name':
            return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        case 'Last Name':
            return data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        case 'Due Date':
            return data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        case 'Last Login':
            return data.sort((a, b) => new Date(a.lastLogin) - new Date(b.lastLogin));
        default:
            return data;
    }
};

let filteredData = computed(() => {
    if (searchFilter.value !== '') {
        return props.items?.filter(
            (item) =>
                String(item.firstName).toLowerCase().includes(searchFilter.value) ||
                String(item.lastName).toLowerCase().includes(searchFilter.value) ||
                String(item.email).toLowerCase().includes(searchFilter.value) ||
                String(item.userStatus).toLowerCase().includes(searchFilter.value) ||
                String(item.paymentStatus).toLowerCase().includes(searchFilter.value)
        );
    } else if (filterValue.value !== null) {
        return filterValue.value === 'All' ? props.items : props.items?.filter(item => item?.userStatus === filterValue.value.toLowerCase())


    } else if (sortCriterion.value !== 'Default') {
        return sortData(sortCriterion, props.items)

    } else {
        return props.items
    }

});

const isSelected = (item) => {
    return selectedRows.value.some(row => row.id === item.id);
};

const toggleRowSelection = (item) => {
    const index = selectedRows.value.findIndex(row => row.id === item.id);
    if (index === -1) {
        selectedRows.value.push(item);
    } else {
        selectedRows.value.splice(index, 1);
    }
};



const toggleRow = (itemId) => {
    console.log(itemId, rowId)
    console.log(rowId.value === itemId)

    rowId.value = itemId === rowId.value ? null : itemId;
};


const handleSearch = (search) => {
    searchFilter.value = search
}
const handleFilter = (value) => {
    console.log(value)

    filterValue.value = value
}
const handleSort = (value) => {
    console.log(value)

    sortCriterion.value = value
}

const markAsPaid = () => {
    if (selectedRows.value.length === 1) {
        const userId = selectedRows.value[0].id; 
        store.dispatch('markPaid', userId);
    } else {
        console.log(selectedRows.value);
    }
};

console.log(selectedRow.value)
</script>

<template>
    <div class="wrapper border  pt-[20px] min-h-[500px] flex flex-col bg-white">
        <div class="flex gap-[20px] px-[20px] mb-[15px]">
            <FilterDropdown @filter="handleFilter" @getSortValue="handleSort" />

            <SearchFilter @search="handleSearch" />

            <button @click="markAsPaid"
                class="ml-auto font-[600] bg-[#6D5BD0] rounded-[6px] w-[100px] h-[40px] text-white flex justify-center items-center">PAY
                DUES</button>

        </div>
        <table class="border w-full flex-[1]">
            <thead>
                <tr class="bg-[#F4F2FF]">
                    <td class="px-4 py-3">
                        <label class="custom-checkbox">
                            <input type="checkbox"  />
                            <span class="checkmark"></span>
                            <slot></slot>
                          </label>
                    </td>
                    <td class="px-4 py-3">Username</td>
                    <td class="px-4 py-3">User Status</td>
                    <td class="px-4 py-3">Payment Status</td>
                    <td class="px-4 py-3 text-end">Amount</td>
                    <td class="px-4 py-3 sr-only">Actions</td>
                    <td class="rotate-[90deg] !p-0 !text-[30px] font-[800] !w-0 !h-0">...</td>
                </tr>
            </thead>
            <tbody class="text-[14px]">
                <template v-for="item in paginatedData" :key="item.id">


                    <tr :class="{ 'border-l border-l-[#6D5BD0] bg-[#F4F2FF]': rowId == item.id }" class="border-b ">
                        <td class="flex items-center">
                            <label class="custom-checkbox">
                                <input type="checkbox" :checked="isSelected(item)" @change="toggleRowSelection(item)" />
                                <span class="checkmark"></span>
                                <slot></slot>
                              </label>

                              <div @click="toggleRow(item.id)">

                                <div v-if="rowId === item.id" class="dropdown-icon w-[15px] h-[15px] ml-10 cursor-pointer">
                                    <img src="/arrowup.svg" alt="">
                                </div>
                                <div v-else class="dropdown-icon w-[15px] h-[15px] ml-10 cursor-pointer ">
                                    <img src="/arrowup.svg" alt="" class="rotate-[-180deg]">
                                </div>
                            </div>
                        </td>
                      
                        <td @click="toggleRow(item.id)">
                            <p class="text-[#25213B] font-[500]">{{ item?.firstName }} {{ item?.lastName }}</p>
                            <p class="font-[400] text-[#6E6893]">{{ item?.email }}</p>
                        </td>
                        <td @click="toggleRow(item.id)">
                            <div :class="`
                        text-[#25213B] text-[12px] font-[500] px-[5px] py-[2px]  bg-[#E6E6F2] rounded-[10px] flex gap-[5px] w-[max-content] items-center 
                        ${item?.userStatus === 'active' ? 'text-[#4A4AFF]' : 'text-[#6E6893]'} 
                        `">
                                <span :class="`
                            ${item?.userStatus === 'active' ? 'bg-[#4A4AFF]' : 'bg-[#6E6893]'}
                             flex w-[6px] h-[6px] rounded-full `"></span>{{ item?.userStatus === 'active' ? 'Active' :
                                'Inactive' }}
                            </div>
                            <p class="font-[400] text-[#6E6893]">Last Login : {{ formatDate(item?.lastLogin) }}</p>
                        </td>


                        <td>
                            <div :class="`
                         text-[12px] font-[500] px-[5px] py-[2px]   rounded-[10px] flex gap-[5px] w-[max-content] items-center 
                        ${item?.paymentStatus === 'paid' ? 'bg-[#CDFFCD] text-[#007F00]' :
                                    item?.paymentStatus === 'unpaid' ? 'bg-[#FFECCC] text-[#965E00]' :
                                        'bg-[#FFE0E0] text-[#D30000]'}                        `">


                                <span :class="`
                            ${item?.paymentStatus === 'paid' ? 'bg-[#007F00]' :
                                        item?.paymentStatus === 'unpaid' ? ' bg-[#965E00]' :
                                            ' bg-[#D30000]'}
                             flex w-[6px] h-[6px] rounded-full `">
                                </span>{{ item?.paymentStatus === 'paid' ? 'Paid' : item?.paymentStatus === 'unpaid' ?
                                    'Unpaid' : 'Overdue' }}
                            </div>

                            <p v-if="item?.paymentStatus === 'paid'" class="font-[500] text-[12px] text-[#25213B]">
                                Paid On : {{ formatDate(item?.paidOn) }}
                            </p>
                            <p v-if="item?.paymentStatus === 'unpaid'" class="font-[500] text-[12px] text-[#25213B]">
                                Dues On : {{ formatDate(item?.paidOn) }}
                            </p>
                            <p v-if="item?.paymentStatus === 'overdue'" class="font-[500] text-[12px] text-[#25213B]">
                                Dued on : {{ formatDate(item?.paidOn) }}
                            </p>
                        </td>
                        <td class="text-end w-[max-content]">
                            <p class="text-[#25213B] font-[500]">${{ item?.amountInCents }}</p>
                            <p class="font-[400] text-[#6E6893]">USD</p>
                        </td>
                        <td class="text-center cursor-pointer" @click="toggleRow(item.id)">View More</td>
                        <td class="">
                            <Menu :item="item" />
                        </td>

                    </tr>

                    <tr v-if="rowId === item.id" class="bg-[#F4F2FF] ">
                        <td colspan="7" class="!py-[20px]  !pl-[50px]">
                            <Detail :item="item" :expandRow="rowId === item.id" />
                        </td>
                    </tr>
                </template>
            </tbody>

        </table>

        <div
            class="pagination flex gap-[50px] items-center ml-auto w-full justify-end bg-[#F4F2FF] py-[15px] px-[20px]">
            <div class="flex items-center gap-2">Rows per page: {{ perPage }}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5L0 0H8L4 5Z" fill="#6E6893" />
                </svg>
                <!-- <select v-model="perPage">
                    <option v-for="option in perPageOptions" :value="option">{{ option }}</option>
                </select> -->
            </div>


            <span>{{ startItem }}-{{ endItem }} of {{ props?.items?.length }}</span>

            <div class="flex gap-[50px]">
                <button @click="prevPage" :disabled="currentPage === 1">
                    <ChevronLeft />
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages">
                    <ChevronRight />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    box-shadow: 0px 10px 50px 0px #00000033;
    border-radius: 6px;
}

thead {
    td {
        color: #6E6893;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
    }
}

td {
    padding: 12px 0px 12px 20px;
}


.custom-checkbox {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    margin-right: 8px;
  
    input[type="checkbox"] {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  
    .checkmark {
      position: absolute;
      top: -12px;
      left: 0;
      width: 20px;
      height: 20px;
      border: 2px solid #8b83ba;
      border-radius: 2px;
      background-color: #fff;
    }
  
    input[type="checkbox"]:checked + .checkmark {
      background: #6D5BD0;
    }
  
    .checkmark::after {
      content: "";
      position: absolute;
      display: none;
    }
  
    input[type="checkbox"]:checked + .checkmark::after {
      display: block;
    }
  
    .checkmark::after {
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
</style>