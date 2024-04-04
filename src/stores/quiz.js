import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useQuizStore = defineStore('quizStore', {
    state: () => ({ 
        id: '',
        course_id: '', 
        question: '',
        apiQuiz: [],
        apiCourse: null,
        isError: false,
        apiMessage: '',

    }),
    actions: {
      setApiCourse(course) {
        this.apiCourse = course
      },
      async fetchCourse() {

        let { data: course, error } = await supabase
        .from('course')
        .select('id, course_name')
        .order('id', { ascending: false })
        
        if (error) {
            this.isError = true
            this.apiCourse = error.message
        } else {
            //console.log("course data: ", course)
            this.setApiCourse(course)
            this.isError = false
        }

      },
      
      async addQuiz() {
        
        const { data, error } = await supabase
        .from('quiz')
        .insert([
          { course_id: this.course_id, question: this.question },
        ])
        .select()

        if (!error) {
          this.isError = false
          this.apiMessage = "quiz created"
        } else {
          this.isError = true
          this.apiMessage = "failed created quiz"
        }
        
      },

      async fetchQuiz() {        
          let { data: quiz, error } = await supabase
          .from('quiz')
          .select(`
            id,
            question,
            course (
              id,
              course_name
            )
          `)

          if (!error) {
            this.isError = false
            this.apiQuiz = quiz
          } else {
            this.isError = true
            this.apiMessage = "failed get quiz"
          }
        

      }
      
    },
  })