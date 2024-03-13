import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useCourseStore = defineStore('courseStore', {
    state: () => ({ 
        id: '',
        courseName: '', 
        description: '',
        duration: '',
        courseDate: '',
        course_time: '',
        apiCourse: [],
        apiCourseList: [],
        courseError: null,
        isError: false,
        courseListError: null,
        uploadPath: '',
        uploadError: null,
        apiMessage: '',
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
      async getCourseSchedule() {
        
        let { data: kelas, error } = await supabase
        .from('course')
        .select(`
        class_name,
        course_id,
        date,
        time,
        duration,
        course (
            id,
            course_name,
            description,
            thumbnail
        )
        `)
        .order('id', { ascending: false })
        
        if(!error){
            this.apiCourse = kelas
            console.log("course schedule: ", this.apiCourse)
        } else {
            this.courseError = error
            console.log("error :" , this.courseError)
        }
        
      },
      async getCourse() {
        let { data: course, error } = await supabase
        .from('course')
        .select(`
        id,
        course_name,
        description,
        thumbnail
        `)
        .order('id', { ascending: false })
        
        if(!error){
            this.apiCourseList = course
            console.log("course schedule: ", this.apiCourseList)
        } else {
            this.courseError = error
            console.log("error :" , this.courseListError)
        }
      },
      async uploadThumbnail(file) {
        const { data, error } = await supabase.storage.from('loka').upload(file.name, file, {
                                              upsert: true,
                                      })
        if (error) {
          this.setUploadError(error)
          //console.log("error upload: ", this.uploadError)
        } else {
          const uploadPathFile = bucketPath + data.fullPath
          this.setBucketPath(uploadPathFile)
          //console.log("success upload: ", this.uploadPath)
        }
      }, 
      async handleAddCourse() {

        const { data, error } = await supabase
        .from('course')
        .insert([
          { course_name: this.courseName, description: this.description, thumbnail: this.uploadPath },
        ])
        .select()

        if (!error) {
          this.apiMessage = 'add course success'
          console.log("add course: ", this.apiMessage)
        } else {
          this.isError = true
          this.apiMessage = error.message
        }
        
      }
    },
  })