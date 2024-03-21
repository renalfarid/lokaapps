<script setup>
import { ref, onMounted, computed } from 'vue'
import { useKelasStore } from '../../stores/kelas'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const kelasStore = useKelasStore();
const classId = ref('')
const students = ref([]);
const allChecked = ref(false);
const checkboxItems = ref({});
const selectedId = ref([])
const errorMessage = ref('')

const handleCheckboxItems = () => {
    allChecked.value = !allChecked.value;
    let updatedCheckboxItems = {};
    students.value.forEach((item, id) => {
        updatedCheckboxItems[`${item.id}`] = allChecked.value;
    });
    checkboxItems.value = updatedCheckboxItems
    selectedStudentId(checkboxItems.value)
};

const handleCheckboxChange = (idx) => {
    checkboxItems.value = {
        ...checkboxItems.value,
        [`${idx}`]: !checkboxItems.value[`${idx}`]
    };
    
    if (Object.values(checkboxItems.value).every(val => val)) {
        allChecked.value = true;
    } else {
        allChecked.value = false;
    }
    selectedStudentId(checkboxItems.value)
};

const selectedStudentId = (selectedObj) => {
    selectedId.value = Object.keys(selectedObj).filter(key => selectedObj[key])
    //console.log("selected id: ", selectedId.value)
}

const fetchStudents = async () => {
    await kelasStore.fetchSelectStudent();
    students.value = kelasStore.listStudent;
};

const AddStudentClass = async() => {
    if (selectedId.value.length < 1) {
        errorMessage.value = "please, select the student"
        console.log(errorMessage.value)
        return
    }
    kelasStore.selectedStudents = selectedId.value
    kelasStore.id = route.params
    await kelasStore.addStudentToClass().then(
        router.push(`/kelas`)
    )
}

onMounted(() => {
    classId.value = route.params
    fetchStudents();
    let initialCheckboxItems = {};
    students.value.forEach((_, idx) => {
        initialCheckboxItems[`${idx}`] = false
    });
    checkboxItems.value = initialCheckboxItems
});

const initializedCheckboxItems = computed(() => {
    return checkboxItems.value || {}
});
</script>

<template>
<div class="mt-10">
    <h1>Select Student Page</h1>
</div>
<div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table class="w-full table-auto text-sm text-left">
        <thead class="text-gray-600 font-medium border-b">
            <tr>
                <th class="py-3 px-6 flex items-center gap-x-4">
                    <div>
                        <input v-model="allChecked" type="checkbox" @click="handleCheckboxItems" />
                        Student Name
                    </div>
                </th>
                <th class="py-3 px-6">Email</th>
                <th class="py-3 px-6">Phone Number</th>
                <th class="py-3 px-6">Alamat</th>
                <th class="py-3 px-6"></th>
            </tr>
        </thead>
        <tbody class="text-gray-600 divide-y">
            <tr v-for="(item, idx) in students" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                    <input type="checkbox" v-model="initializedCheckboxItems[`${item.id}`]" @click="handleCheckboxChange(item.id)" />
                    {{ item.registration.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.registration.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.registration.mobile_number }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.registration.alamat }}</td>
            </tr>
        </tbody>
    </table>
</div>
<div class="mt-5 flex justify-end mr-5">
    <button
        @click="AddStudentClass()"
        class="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
    >
      Add Student to class
    </button>
</div>

</template>
