<script setup>
  import { onMounted, ref, watch } from "vue"
  import {useKelasStore} from "../../stores/kelas"
  
  const props = defineProps(['data'])
  const emit = defineEmits(['update'])
  const kelasStore = useKelasStore()

  const page = ref(1)
  const totalData = ref(0)
  const totalPage = ref(0)
  const pageClicked = ref(false)
  const currentItem = ref(0)
  const lastItem = ref(0)
  

  const handlePage = async (pageData) => {
    pageClicked.value = true
    page.value = pageData
    kelasStore.page = pageData
    emit('update')
    //console.log("props data: ", props.data)

  }

  watch(props.data, (oldData, newData) => {
    totalPage.value = newData.totalPage
    currentItem.value = newData.currentItem
    lastItem.value = newData.lastItem
    totalData.value = newData.totalData
  })
  onMounted(() => {
    totalData.value = kelasStore.pagination.total_data
  })

</script>
<template>
  <!-- start paging-->
  <div class="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
          <div class="hidden justify-between text-sm md:flex">
              <div>
                  SHOWING {{ currentItem }} - {{ lastItem }} OF {{ totalData || 0 }}
              </div>
              <div class="flex items-center gap-12" aria-label="Pagination">
                  <button @click="handlePage(page - 1)" :disabled="page === 1" class="hover:text-indigo-600">
                      Previous
                  </button>
                  <ul class="flex items-center gap-1">
                      <template v-for="pageNumber in totalPage" :key="pageNumber">
                          <li>
                            <a href="#" @click="handlePage(pageNumber)" :class="{ 'bg-indigo-600 text-white font-medium hover:bg-indigo-600': pageNumber === page }"
                              class="px-3 py-2 rounded-lg duration-150 hover:text-gray-700">
                                  {{ pageNumber }}
                              </a>
                          </li>
                      </template>
                  </ul>
                  <button @click="handlePage(page + 1)" :disabled="page === totalPage" class="hover:text-indigo-600">
                      Next
                  </button>
              </div>
          </div>
        </div>
        <!-- end paging-->
</template>