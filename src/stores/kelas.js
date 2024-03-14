import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useKelasStore = defineStore('kelasStore', {
    state: () => ({ 
        id: '',
        mentor_id: '',
        className: '',
        courseName: '', 
        description: '',
        courseDuration: 0,
        courseDate: '',
        courseTime: '',
        timeObj: null,
        dateObj: null,
        apiCourse: [],
        apiCourseList: [],
        apiMentorList: [],
        apiCourseClass: [],
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
      setClassName(name) {
        this.className = name
      },
      setCourseDate(date) {
        this.dateObj = date
      },
      setCourseTime(time) {
        this.timeObj = time
      },
      setDuration(duration) {
        this.courseDuration = duration
      },
      convertTime() {
        const classTime = this.timeObj.$d.toLocaleTimeString('en-US', { timeZone: 'Asia/Makassar', hour12: false })
        this.courseTime = classTime
      },
      convertDate() {
        const classDate = this.dateObj.$d.toISOString().split('T')[0]
        this.courseDate = classDate
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
      },
      async createCourseClass() {

        const { data, error } = await supabase
        .from('kelas')
        .insert([
          { course_id: this.selectedCourse, mentor_id: this.selectedMentor,class_name: this.className, date: this.courseDate, time: this.courseTime, duration: this.courseDuration },
        ])
        .select()

        if(error) {
          this.apiMessage = error.message
          console.log("error create class: ", error.message)
        } else {
          this.apiMessage = "success add class"
          console.log("success create class: ", this.apiMessage)
        }
      },
      async fetchClass() {

        let { data: kelas, error } = await supabase
        .from('kelas')
        .select(`
          class_name,
          date,
          time,
          duration,
          course (
            id,
            course_name
          )
        `)
        if (error) {
          this.apiMessage = error.message
        } else {
          this.apiCourse = kelas
        }
    },
        
    }
  })