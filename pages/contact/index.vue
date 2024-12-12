<template>
  <div class="w-[100vw] h-full bg-slate-200 dark:bg-slate-900 absolute px-2">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div class="w-full h-full flex flex-col justify-center items-center">
        

        <!-- Basic form: -->
         <div class="w-1/2 mx-auto flex flex-col justify-start p-4">
          <h1 class="text-4xl text-slate-800 dark:text-slate-200 text-start mb-4 primary-font">Hit me up.</h1>
          <div class="w-full flex flex-col justify-start items-start">
            <div class="w-full flex flex-row mb-2">

              <div class="w-1/2 mx-2">
                <label for="name" class="text-slate-800 dark:text-slate-200">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="state.message.name" 
                  class="w-full p-2 border-2 border-slate-300 rounded-md"
                  @keydown="validateName(state.message.name)"
                />
                <p class="text-red-500 text-sm">{{ state.errors.name }}</p>
              </div>

              <div class="w-1/2 mx-2">
                <label for="email" class="text-slate-800 dark:text-slate-200">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="state.message.email" 
                  class="w-full p-2 border-2 border-slate-300 rounded-md"
                  @keydown="validateEmail(state.message.email)"
                />
                <p class="text-red-500 text-sm">{{ state.errors.email }}</p>
              </div>

            </div>
            <div class="w-full flex flex-row mb-4">
              <div class="w-full mx-2">
                <label for="subject" class="text-slate-800 dark:text-slate-200">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="state.message.subject" 
                  class="w-full p-2 border-2 border-slate-300 rounded-md"
                  @keydown="validateSubject(state.message.subject)"
                />
                <p class="text-red-500 text-sm">{{ state.errors.subject }}</p>
              </div>
            </div>
            <div class="w-full flex flex-col">
              <div class="w-full mx-2">
                <label for="message" class="text-slate-800 dark:text-slate-200">Message</label>
                <textarea 
                  id="message" 
                  v-model="state.message.message" 
                  class="w-full p-2 border-2 border-slate-300 rounded-md h-[10rem]"
                  @keydown="validateMessage(state.message.message)"
                ></textarea>
                <p class="text-red-500 text-sm">{{ state.errors.message }}</p>
              </div>
              <button 
                @click="submit_form" 
                class="w-full p-2 mx-2 bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800 rounded-md mt-4"
                :class="state.errors.name.length || state.errors.email.length || state.errors.subject.length || state.errors.message.length ? 'cursor-not-allowed' : 'hover:bg-slate-700 hover:text-slate-100 cursor-pointer'"
                :disabled="state.errors.name.length || state.errors.email.length || state.errors.subject.length || state.errors.message.length"
              >
                <span>Submit</span>
              </button>
              <p v-if="state.success" class="text-green-500 text-md mt-2">{{ state.success }}</p>
            </div>
          </div>  
         </div>
      </div>
    </div>
  </div>
</template>
<script setup>

  const state = reactive({
    message: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    posting: false,
    success: false,
    errors: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  // Methods

  // validate email:
const validateEmail = (email) => {
  console.log('validating email')
  if( email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      state.errors.email = ''
      return true
    } else {
      state.errors.email = 'Email is invalid'
    }
}
// validate subject:
const validateSubject = (subject) => {
  if (String(subject).length > 0) {
    state.errors.subject = ''
    return true
  } else {
    state.errors.subject = 'Subject is required'
  }
}

// validate message:
const validateMessage = (message) => {
  if (String(message).length > 0) {
    state.errors.message = ''
    return true
  } else {
    state.errors.message = 'Message is required'
  }
}

// validate name:
const validateName = (name) => {
  if (String(name).length > 0) {
    state.errors.name = ''
    return true
  } else {
    state.errors.name = 'Name is required'
  }
}


const submit_form = () => {
  state.posting = true
  console.log('Submitting form')
  if(validateEmail(state.message.email) && validateSubject(state.message.subject) && validateMessage(state.message.message) && validateName(state.message.name)) {
    console.log('All fields are valid')
    $fetch('/api/contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: state.message})
    }).then(() => {
      state.posting = false
      state.message = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      state.success = "Message sent successfully! I'll get back to you soon. In the meantime, jam out to some more of my tunes!"
    })
  } else {
    console.log('All fields are not valid')
  }
}



</script>