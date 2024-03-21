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
        kapasitas: 0,
        timeObj: null,
        dateObj: null,
        apiCourse: [],
        apiCourseList: [],
        apiMentorList: [],
        apiCourseClass: [],
        apiClassStudent: [],
        courseError: null,
        isError: false,
        courseListError: null,
        uploadPath: '',
        uploadError: null,
        apiMessage: '',
        selectedCourse: '',
        selectedMentor: '',
        listStudent: [],
        selectedStudents: [],
        page: 1,
        perPage: 5,
        offset: 0,
        countData: 0,
        totalPage: 0,
        pagination: {"total_data" : 0, "per_page" : 5, "total_page" : 0, "current_page": 1},
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
        console.log("get time: ", this.timeObj)
       // const classTime = this.timeObj.$d.toLocaleTimeString('en-ID', { timeZone: 'Asia/Makassar', hour12: false })
        this.courseTime = this.timeObj
      },
      convertDate() {
        const classDate = this.dateObj.$d.toISOString().split('T')[0]
        this.courseDate = classDate
      },
      async decreaseCapacity() {
        let { data: kapasitas, error } = await supabase
          .from('kelas')
          .select("kapasitas")
          .eq('id', this.id)
        if (error) {
          this.apiMessage = error.message
        } else {
          this.kapasitas = kapasitas -1
        }
        
      },
      async selectCourse() {
        let { data: course, error } = await supabase
        .from('course')
        .select('id,course_name,thumbnail')
        .order('created_at', {ascending: false})
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
        .order('created_at', { ascending: false })
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
      async countTotalClass() {
        
        let { data: total, error } = await supabase
        .from('kelas')
        .select('*', {count: "exact"})

        if(error) {
          this.countData = 0
        } else {
          this.countData = total.length
          this.pagination.total_data = total.length
        }
        
      },

      async fetchClass() {
 
        await this.countTotalClass()

        this.offset = (this.page - 1) * this.perPage 
        const lastOffset = this.offset + (this.perPage -1)
        console.log(["offset: ", this.offset], ["last offset: ", lastOffset])

        let { data: kelas, error } = await supabase
        .from('kelas')
        .select(`
          id,
          class_name,
          date,
          time,
          duration,
          course (
            id,
            course_name
          ),
          mentor (
            id,
            mentor_name
          )
        `)
        .order('created_at', { ascending: false })
        .range(this.offset, lastOffset)
        if (error) {
          this.apiMessage = error.message
        } else {
          let totalPage = Math.ceil(this.countData / this.perPage)
          this.pagination.total_page = totalPage
          this.apiCourse = kelas
        }
    },
    async fetchSelectStudent() {

      let { data: student, error } = await supabase
      .from('student')
      .select(`
        id,
        registration (
          id,
          name,
          email,
          mobile_number,
          alamat
        )
      `)

      if (error) {
        this.apiMessage = error.message
      } else {
        this.listStudent = student
      }
    },

    async addStudentToClass() {
      await Promise.all(this.selectedStudents.map(item => this.insertStudent(item)));
    },
    
    async insertStudent(item) {
      try {
        const { data, error } = await supabase
          .from('kelas_student')
          .upsert([{ student_id: item, kelas_id: this.id.id }], { onConflict: ['student_id', 'kelas_id'], skipDuplicates: true })
          .select();
    
        if (error) {
          this.apiMessage = error.message;
          console.log("error insert: ", error.message);
        } else {
          this.apiMessage = `success insert student ${item} to the class`;
          console.log("message :", this.apiMessage);
        }
      } catch (error) {
        console.error("Error occurred:", error.message);
        this.apiMessage = error.message;
      }
    },
    
    /* async addStudentToClass() {
      
      this.selectedStudents.map(insertStudent, this.id, this.apiMessage)

      async function insertStudent (item) {  
        
        const { data, error } = await supabase
        .from('kelas_student')
        .insert([
          { student_id: item, kelas_id: this.id }], { onConflict: ['student_id', 'kelas_id'], ignoreDuplicates: true })
        .select()

        if (error) {
          this.apiMessage = error.message
          console.log("error insert: ", error.message)
        } else {
          this.apiMessage = `success insert student ${item} to the class`
          console.log("message :", this.apiMessage)
        }
        
      }

    }, */
    async fetchClassStudent(classId) {

      let { data: kelas_student, error } = await supabase
      .from('kelas_student')
      .select(`
        id,
        kelas (
          id,
          class_name
        ),
        student (
          id,
          student_name
        )
      `)
      .eq('kelas_id', classId)
      
      if (error) {
        this.apiMessage = error.message
        //console.log("error insert: ", error.message)
      } else {
        //this.apiClassStudent = kelas_student
        //console.log("classStudent :", this.apiClassStudent)
        const classObject = {
          id: null,
          class_name: null,
          students: []
        }
        if (kelas_student.length > 0) {
          const { kelas } = kelas_student[0]; // Get kelas details from the first entry
          classObject.id = kelas.id;
          classObject.class_name = kelas.class_name;

          kelas_student.forEach(({ student }) => {
              classObject.students.push({
                  id: student.id,
                  student_name: student.student_name
              })
          })
        }

        this.apiClassStudent = classObject
        console.log("classStudent :", this.apiClassStudent)
      }
        
    }
  }
})