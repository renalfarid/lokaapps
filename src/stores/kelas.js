import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useKelasStore = defineStore('kelasStore', {
    state: () => ({ 
        id: '',
        courseName: '', 
        description: '',
        duration: '',
        courseDate: '',
        course_time: '',
        apiCourse: [],
        apiCourseList: [],
        apiMentorList: [],
        courseError: null,
        isError: false,
        courseListError: null,
        uploadPath: '',
        uploadError: null,
        apiMessage: '',
        selectedCourse: '',
        selectedMentor: '',
    }),
    actions: {
      setCourseId(id) {
        this.id = id
      },
      setCourseName(name) {
        this.courseName = name
      },
      setdescription(description) {
        this.description = description
      },
      setBucketPath(path) {
        this.uploadPath = path
      },
      setUploadError(err) {
        this.uploadError = err
      },
      setSelectedCourse(id) {
        this.selectedCourse = id
      },
      setSelectedMentor(id) {
        this.selectedMentor = id
      },
     
      async selectCourse() {
        let { data: course, error } = await supabase
        .from('course')
        .select('id,course_name,thumbnail')
        if (error) {
            this.apiMessage = error.message
        } else {
            this.apiCourseList = course
        }
      },
      async selectMentor() {
        let { data: mentor, error } = await supabase
        .from('mentor')
        .select('id,mentor_name,mentor_thumbnail')
        if (error) {
            this.apiMessage = error.message
        } else {
            this.apiMentorList = mentor
        }
      }
    },
  })