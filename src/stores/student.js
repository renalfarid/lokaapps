import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useStudentStore = defineStore('studentStore', {
    state: () => ({ 
        registration_id: null,
        course_id: null,
        apiStudent: [],
        isError: false,
        studentError: null,
        successAddStudent: false,
        successMessage: null,
    }),
    actions: {
        setRegistrationId(id) {
            this.registration_id = id
        },
        async handleAddStudent() {
            
            const { data, error } = await supabase
            .from('student')
            .insert([
              { registration_id: this.registration_id },
            ])
            .select()

            if(!error){
                this.successAddStudent = true
                this.successMessage = 'success add student'
                console.log("message: ", this.successMessage)
            } else {
                this.successAddStudent = false
                this.studentError = error
                console.log("student error :" , this.studentError)
            }
              
        },
        async handleFetchStudent() {
            
            let { data: student, error } = await supabase
            .from('student')
            .select(`
            id,
            registration_id,
            registration (
                id,
                name,
                email,
                mobile_number,
                alamat
            )
            `)
            .order('created_at', { ascending: false })

            //console.log("supabase student: ", student)

            if(!error){
                this.apiStudent = student
            } else {
                this.studentError = error
                console.log("student error :" , this.studentError)
            }

        }
    }
})