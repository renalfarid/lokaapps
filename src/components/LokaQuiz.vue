<script setup>
 import { onMounted, ref } from "vue"
 import quizForm from "./forms/QuizForm.vue"
 import { useQuizStore } from "../stores/quiz"

 const quizStore = useQuizStore()

 const isOpenForm = ref(false)

 const quizList = ref([])
 const courseList = ref([])

 const closeQuizForm = () => {
  isOpenForm.value = false
  fetchQuiz()
 }

 const fetchCourseList = async () => {
    await quizStore.fetchCourse()
    courseList.value = quizStore.apiCourse
    //console.log("api course: ", courseList.value)
 }

 const fetchQuiz = async () => {
    await quizStore.fetchQuiz()
    console.log("quiz list: ", quizStore.apiQuiz)
    quizList.value = quizStore.apiQuiz
 }

 const openQuizForm = async () => {
  await fetchCourseList()
  isOpenForm.value = true
 }

 onMounted(() => {
    fetchQuiz()
 })

</script>
<template>
  <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Student Quiz
            </h3>
            <p class="text-gray-600 mt-2">
                Data student quiz
            </p>
        </div>
        <div class="mt-5 md:mt-5 flex justify-end mr-5">
            <button @click="openQuizForm()" type="button" class="px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                Create Quiz
            </button>
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Course Name</th>
                    <th class="py-3 px-6">Question</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
                <tr v-for="item,idx in quizList" :key="idx">
                    <td class="px-6 py-4 whitespace-nowrap">{{item.course.course_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{item.question}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
  <div v-if="isOpenForm">
    <quizForm :is_visible="isOpenForm" :course="courseList" @close="closeQuizForm()"/>
  </div>
</template>