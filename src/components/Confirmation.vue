<script setup>
</script>
<template>
    <div class="mt-15 max-w-5xl mx-auto px-4 md:px-8">
        <div class="mt-10 text-center mb-12">
          <img src="/images/loka.jpeg" width="150" class="mx-auto" />
        </div>
      <div class="flex justify-between p-4 rounded-md bg-green-50 border border-green-300">
          
          <div class="flex items-start gap-3 w-full">
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
              <div class="flex-1 self-center">
                  <span class="text-green-600 font-medium">
                      Email confirmed
                  </span>
                  <div class="text-green-600">
                      <p class="mt-2 sm:text-sm">
                          Thanks for your confirmation.
                      </p>
                      <div class="mt-2">
                          <a href="/login" class="inline-flex items-center font-semibold hover:underline sm:text-sm">
                              Login
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                          </a>
                      </div>
                  </div>
              </div>
              <button class="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-green-600">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
              </button>
          </div>
      </div>
    </div>
  </template>