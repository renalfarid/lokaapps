<script setup>
  import { ref } from "vue"
  import { DialogRoot, DialogTrigger, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from 'radix-vue';
  import { useEnrollmentStore } from "../../stores/enrollment"

  const enrollmentStore = useEnrollmentStore()

  const studentName = ref(null)
  const studentEmail = ref(null)
  const mobileNumber = ref(null)
  const pendidikan = ref(null)
  const alamat = ref(null)
  const kota = ref(null)
  const propinsi = ref(null)
  const namaSekolah = ref(null)

  const handleAddRegistration = async () => {
    enrollmentStore.setName(studentName.value)
    enrollmentStore.setEmail(studentEmail.value)
    enrollmentStore.setMobileNumber(mobileNumber.value)
    enrollmentStore.setPendidikan(pendidikan.value)
    enrollmentStore.setAlamat(alamat.value)
    enrollmentStore.setKota(kota.value)
    enrollmentStore.setpropinsi(propinsi.value)
    enrollmentStore.setNamaSekolah(namaSekolah.value)

    await enrollmentStore.addSekolah()
    await enrollmentStore.getEnrollment()
    enrollmentStore.setIsError(true)
    console.log("full name: ", enrollmentStore.fullName)
  }

  
</script>
<template>
  <div>
    <DialogRoot>
      <DialogTrigger class="w-100 p-5 py-2 ml-2 shadow-sm rounded-md bg-indigo-600 text-white mt-4 flex items-center justify-center">
        Registrasi Student
      </DialogTrigger>
      <DialogPortal>
    <DialogOverlay class="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
    <DialogContent class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
    <div class="bg-white rounded-md shadow-lg px-4 py-6">
        <div class="flex items-center justify-end">
        <DialogClose class="p-2 text-gray-400 rounded-md hover:bg-gray-100">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
            />
            </svg>
        </DialogClose>
        </div>
        <div class="max-w-sm mx-auto space-y-3 text-center">
        <DialogTitle class="text-lg font-medium text-gray-800">
            Registrasi Student
        </DialogTitle>
        <DialogDescription class="text-sm text-gray-600">
            Formulir registrasi student.
        </DialogDescription>
        <fieldset class="Fieldset relative">
            <input v-model="studentName" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Full name" />
            <input v-model="studentEmail" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Email" />
            <input v-model="mobileNumber" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Mobile Number" />
            <div class="relative w-full mt-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
                viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
                <select v-model="pendidikan" class="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option>--Jenjang Pendidikan--</option>
                    <option>S1/D3</option>
                    <option>SMA</option>
                    <option>SMK</option>
                    <option>Lainnya</option>
                </select>
            </div>
            <input v-model="alamat" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Alamat" />
            <input v-model="kota" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Kota" />
            <input v-model="propinsi" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Propinsi" />
            <input v-model="namaSekolah" class="w-full mt-2 pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Nama Sekolah" />
        </fieldset>
        <DialogClose as-child>
            <button class="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2" @click="handleAddRegistration()">
             Submit
            </button>
        </DialogClose>
        </div>
    </div>
    </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>