<script setup>
  import {ref, reactive, onMounted} from "vue"
  import { useRouter } from 'vue-router';
  import moment from "moment"
  import CourseClassForm from "./forms/CourseClassForm.vue"
  import { useKelasStore } from "../stores/kelas"
  
  const kelasStore = useKelasStore()
  const router = useRouter()
  
  let courseData = ref([])
  const isVisible = ref(false)

  const page = ref(1)
  const perPage = ref(5)
  const totalPage = ref(0)
  const totalData = ref(0)
  const pagination = ref({})
  const pageClicked = ref(false)
  const openClassForm = () => {
    isVisible.value = true
  }

  const closeClassform = () => {
    isVisible.value = false
    handleCourse()
  }

  const handlePage = (pageData) => {
    console.log("handle page: ", pageData)
    pageClicked.value = true
    page.value = pageData
    kelasStore.page = pageData
    handleCourse()
  }

  const handleCourse = async () => {
    await kelasStore.fetchClass()
    courseData.value = kelasStore.apiCourse 
    pagination.value = kelasStore.pagination
    totalPage.value = pagination.value.total_page
    totalData.value = pagination.value.total_data
    console.log("total data: ", totalData.value)
  }

  const fetchClassStudent = async (id) => {
    await kelasStore.fetchClassStudent(id)
  
  }

  const convertDate = (dateCourse) => {
    return  moment(dateCourse).format('DD MMMM YYYY')
  }

  const goToSelectStudentPage = (id) => {
      // Replace 'kelas/id' with the appropriate route parameter
      router.push(`/kelas/${id}/select-student`)
    };

  const classPageId = async (id) => {
    //console.log("Class Id: ", id)
    await fetchClassStudent(id)
    router.push(`/kelas/${id}/students`)
  }

  onMounted(() => {
    handleCourse()
   // handleEnrollment()
  })

</script>
<template>
  <div v-if="isVisible">
    <CourseClassForm :is_visible="isVisible" @close="closeClassform()" />
  </div>
  <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Course Class
            </h3>
            <p class="text-gray-600 mt-2">
                Class and Schedule
            </p>
        </div>
        
        <div class="mt-5 md:mt-5 flex justify-end mr-5">
            <button @click="openClassForm()" class="px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                Buat Kelas
            </button>
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Class Name</th>
                    <th class="py-3 px-6">Course Name</th>
                    <th class="py-3 px-6">Duration</th>
                    <th class="py-3 px-6">Date - Time</th>
                    <th class="py-3 px-6">Mentor Name</th>
                    <th class="py-3 px-6"></th>

                </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
                <tr v-for="item,idx in courseData" :key="idx">
                    <td class="px-6 py-4 whitespace-nowrap"><span class="text-indigo-600 hover:cursor-pointer hover:text-indigo-800 " @click="classPageId(item.id)">{{item.class_name}}</span></td> 
                    <td class="px-6 py-4 whitespace-nowrap">{{item.course.course_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{`${item.duration} jam`}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ convertDate(item.date) }} - {{ item.time }}</td>     
                    <td class="px-6 py-4 whitespace-nowrap">{{item.mentor.mentor_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button @click="goToSelectStudentPage(item.id)" class="px-3 py-2 text-xs font-medium text-center 
                        inline-flex items-center text-white bg-green-700 rounded-lg 
                        hover:bg-grren-800 focus:ring-4 focus:outline-none focus:ring-green-300 
                        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      > Add Student 
                      </button>
                    </td>   
                    
                </tr>
            </tbody>
        </table>
    </div>

    <!-- start paging-->
    <div class="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
          <div class="hidden justify-between text-sm md:flex">
              <div>
                  SHOWING {{ page }} - {{ perPage }} OF {{ totalData || 0 }}
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
  </div>
</template>
<style scoped>
</style>