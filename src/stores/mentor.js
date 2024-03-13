import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useMentorStore = defineStore('mentorStore', {
    state: () => ({ 
        id: '',
        mentorName: '', 
        mentorDescription: '',
        apiMentor: [],
        isError: false,
        uploadPath: '',
        uploadError: null,
        apiMessage: '',
    }),
    actions: {
      setMentorId(id) {
        this.id = id
      },
      setMentorName(name) {
        this.mentorName = name
      },
      setDescription(description) {
        this.mentorDescription = description
      },
      setBucketPath(path) {
        this.uploadPath = path
      },
      setUploadError(err) {
        this.uploadError = err
      },

      async fetchMentor() {

        let { data: mentor, error } = await supabase
        .from('mentor')
        .select('id, mentor_name, mentor_description, mentor_thumbnail')
        .order('id', { ascending: false })

        if (error) {
            this.isError = true
            this.apiMessage = error.message
        } else {
            this.isError = false
            this.apiMentor = mentor
        }

      },
      
      async addMentor() {

        const { data, error } = await supabase
        .from('mentor')
        .insert([
          { mentor_name: this.mentorName, mentor_description: this.mentorDescription, mentor_thumbnail: this.uploadPath },
        ])
        .select()

        if (error) {
          this.isError = true
          this.apiMessage = error.message
        } else {
          this.isError = false
          this.apiMessage = 'add mentor success'
          console.log("mentor api: ", this.apiMessage)
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
      
    },
  })