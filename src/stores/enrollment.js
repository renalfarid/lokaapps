import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useEnrollmentStore = defineStore('enrollmentStore', {
    state: () => ({ 
        id: null,
        fullName: null, 
        email: null,
        mobile_number: null,
        alamat: null,
        pendidikan: null,
        kota: null,
        propinsi: null,
        namaSekolah: null,
        status: null,
        course_id: null,
        apiEnrollment: [],
        enrollmentError: null,
        addEnrollSuccess: null,
        approveSuccess: null,
        approveError: null,
        isError: false
    }),
    actions: {
      setId(id) {
        this.id = id
      },
      setName(studentName){
        this.fullName = studentName
      },
      setEmail(studentEmail){
        this.email = studentEmail
      },
      setMobileNumber(mobileNumber){
        this.mobile_number = mobileNumber
      },
      setPendidikan(pendidikan){
        this.pendidikan = pendidikan
      },
      setAlamat(alamat){
        this.alamat = alamat
      },
      setKota(kota){
        this.kota = kota
      },
      setpropinsi(propinsi){
        this.propinsi = propinsi
      },
      setNamaSekolah(namaSekolah){
        this.namaSekolah = namaSekolah
      },
      setStatus(newStatus){
        this.status = newStatus
      },
      setIsError(isError){
        this.isError = isError
      },
      async getEnrollment() {
       
        let { data: registration, error } = await supabase
        .from('registration')
        .select('*')
        .order('created_at', { ascending: false })

        if(!error){
            this.apiEnrollment = registration
        } else {
            this.enrollmentError = error
            onsole.log("error :" , this.enrollmentError)
        }
        
      },
      async addSekolah() {
        
        const { data, error } = await supabase
        .from('registration')
        .insert([
          { name: this.fullName, email: this.email, 
            mobile_number: this.mobile_number, alamat: this.alamat, 
            pendidikan: this.pendidikan, kota:this.kota, propinsi: this.propinsi,
            nama_sekolah: this.namaSekolah },
        ])
        .select()
        
        if(!error){
          this.addEnrollSuccess = 'success enrollment data'
          
        } else {
            this.enrollmentError = error
            console.log("error :" , this.enrollmentError)
        }
      },

      async approveStudent() {

        const { data, error } = await supabase
        .from('registration')
        .update({ status: this.status })
        .eq('id', this.id)
        .select()
        
        
        if(!error){
          this.approveSuccess = 'student approved'
          
        } else {
            this.approveErrorError = error
            console.log("error :" , this.approveError)
        }
      },

      async rejectStudent() {
        const { data, error } = await supabase
        .from('registration')
        .update({ status: this.status })
        .eq('id', this.id)
        .select()
        
        
        if(!error){
          this.approveSuccess = 'student approved'
          
        } else {
            this.approveErrorError = error
            console.log("error :" , this.approveError)
        }
      },
      async handleAddStudent() {
            
        const { data, error } = await supabase
        .from('student')
        .insert([
          { registration_id: this.id },
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
    }
  })