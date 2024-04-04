<script setup>
  import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
  import { useAiServices } from "../composables/useAiServices"

  const aiServices = useAiServices()


  const userPrompt = ref('')
  const isLoading = ref(false)
  const aiResult = ref('')
  const question = ref('')
  const answer = ref('')
  const score = ref(0)
  const reason = ref('')
  const aiScore = ref(null)
  
  
  const makeQuestion = () => {
    question.value = "The solution set of x + 2y = -3, y + 2z = 4, and x + y + 2z = 5 is {(x,y,z)} . The value of x + z ? "
  }

  const checkAnswer = () => {
      if (answer.value === "") {
        return false
      } else {
        return true
      }
  }
  
  const buildPrompt = () => {
    const scoringRule = "Give score bellow 50 if the answer is wrong or not completed. Give ascore above 50 if the answer right "
    const promptContext = `You are expert teacher, It is your job to help teachers evaluate assignment and give score between 10-100 using valid json format like {"score": your score 10-100, "reason": short reason}, dont give other character.`
    userPrompt.value = scoringRule + promptContext + " question is: " + question.value + " and " + "student answer is: " + answer.value
    //console.log("prompt: ", userPrompt.value)
  }

  const handleAI = async () => {
    if (!checkAnswer()) {
        aiScore.value = {"score" : 0, "reason" : "no answer"};
        return;
    }
    isLoading.value = true
    buildPrompt()
    aiResult.value = await aiServices.runAiService(userPrompt.value)
    isLoading.value = false
    
    try {
        aiScore.value = JSON.parse(aiResult.value)    
    } catch (error) {
        aiScore.value = {"score" : 0, "reason": "failed get score"}
        //console.log(error)
    }
    
  }

  const requestScore = async() => {
    await handleAI()
    score.value = aiScore.value.score
    reason.value = aiScore.value.reason
    
    
    //console.log("ai score", scoreResult.value)
  }

  const scoreResult = computed(() => {
        const colorClass = score.value < 60 ? 'text-red-500' : 'text-green-500';
        return `<p class="${colorClass}">Your score is: ${score.value}</p>
          <p>Reason : ${reason.value}</p>`;
    })

  


  onMounted(() => {
    makeQuestion()
    })

</script>
<template>
  <section>
    <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                AI Quiz
            </h3>
        </div>
    </div>
  </div>
  </section>
  <section>
    <div class="mt-5">
      <form class="mt-8 space-y-5">
        <div>
            <label class="font-medium">
                Question : 
            </label>
            <p>{{ question }}</p>
        </div>
        <div>
          <p>Your answer : </p>
          <textarea v-model="answer" rows="5" class="w-96">
            
          </textarea>
        </div>
        <div class="score-container">
            <p>Your score is: <span :class="{ 'text-red-500': score <= 50, 'text-green-500': score > 50 }">{{ score }}</span></p>
            <p>Reason : <span> {{ reason }} </span></p>
        </div>
        <button :disabled="isLoading" @click="requestScore()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg
            v-if="isLoading"
            aria-hidden="true"
            role="status"
            class="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"></path>
          </svg>
          <span v-if="!isLoading">Give Score 10-100</span>
        </button>
               
      </form>
    </div>
  </section>
</template>
<style scoped>
  .score-container {
    position: relative;
  }
  .score-result {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  width: fit-content;
}
</style>