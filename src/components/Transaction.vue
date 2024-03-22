<script setup>
  import {ref, reactive, onMounted} from "vue"
  import { useKelasStore } from "../stores/kelas"
  import Pagination from "./pagination/Pagination.vue" 

  const transaction = ref({
    "page": 1,
    "perPage": 5,
    "totalPage": 10,
    "totalData": 0,
    "currentItem": 0,
    "lastItem": 4
  })
  const kelasStore = useKelasStore()

  const listTransaction = ref([])

  const fetchTransaction = async () => {
    await kelasStore.fetchTransaction()
    updateTrx()
    //console.log("transaction: ", transaction.value)
    listTransaction.value = kelasStore.apiTransaction
  }

  const updateTrx = () => {
    transaction.value.totalData = kelasStore.pagination.total_data
    transaction.value.totalPage = kelasStore.pagination.total_page
    transaction.value.currentItem = kelasStore.pagination.current_item
    transaction.value.lastItem = kelasStore.pagination.last_item
  }

  const handleApprove = async (id) => {
    kelasStore.id = id
    await kelasStore.handleApproveTrx()
    fetchTransaction()
    //console.log("id trx", id)
  }

  const updateTransaction = () => {
    fetchTransaction()
  }

  onMounted(() => {
    fetchTransaction()
  })
</script>
<template>
    <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Course Transaction
            </h3>
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Name</th>
                    <th class="py-3 px-6">Class Name</th>
                    <th class="py-3 px-6">Status</th>
                    <th class="py-3 px-6"></th>
                </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
                <tr v-for="item,idx in listTransaction" :key="idx">
                    <td class="px-6 py-4 whitespace-nowrap">{{item.student.student_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{item.kelas.class_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span v-if="item.status === 'order'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {{ item.status }}
                        </span>
                        <span v-else-if="item.status === 'paid'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {{ item.status }}
                        </span>
                        <span v-else-if="item.status === 'expired'" class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                            {{ item.status }}
                        </span>

                    </td>
                    <td v-if="item.status === 'order'" class="px-6 py-4 whitespace-nowrap">
                      <button @click="handleApprove(item.id)" class="px-4 py-2 text-sm text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                        Approve
                      </button>
                    </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :data="transaction" @update="updateTransaction" />
  </div>
</template>