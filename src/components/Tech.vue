<template>
  <div class="container mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold text-center mb-10">Tech Stack</h1>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Backend</h2>
      <Accordion :multiple="true" :activeIndex="[0,1,2,3]">
        <AccordionTab header="Golang">
        <div class="flex justify-between items-center flex-row">
          <p>
            The core backend is written in Go — a fast, statically typed language well-suited for building scalable web services.
          </p>
          <img class="size-[70px]" src="https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Aqua.png">
        </div>
        </AccordionTab>
        <AccordionTab header="Chi Router">
        <div class="flex justify-between items-center flex-row">
          <p>
            We use the lightweight and idiomatic <code>chi</code> router for HTTP routing, providing modular middleware chaining and RESTful routing patterns.
          </p>
          <img class="size-[60px]" src="https://cdn.jsdelivr.net/gh/go-chi/chi@master/_examples/chi.svg">
        </div>
        </AccordionTab>
        <AccordionTab header="OAuth2 (golang.org/x/oauth2)">
        <div class="flex justify-between items-center flex-row">
          <p>
            Authentication is handled with the official Go OAuth2 library, allowing secure user login and token-based access flows.
          </p>
          <img class="size-[60px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/1196px-Oauth_logo.svg.png">
        </div>
        </AccordionTab>
        <AccordionTab header="Google Cloud Storage (GCS)">
        <div class="flex justify-between items-center flex-row">
          <p>
            Files are stored in Google Cloud Buckets, offering reliable, secure, and scalable object storage integrated via the official GCS SDK for Go.
          </p>
          <img class="size-[60px]" src="https://img.icons8.com/?size=100&id=WHRLQdbEXQ16&format=png&color=000000">
        </div>
        </AccordionTab>
      </Accordion>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Frontend</h2>
      <Accordion :multiple="true" :activeIndex="[0,1,2]">
        <AccordionTab header="Vue 3">
        <div class="flex justify-between items-center flex-row">
          <p>
            The frontend is built using Vue 3 — a modern, performant, and flexible JavaScript framework designed for building interactive web interfaces.
          </p>
          <img class="size-[60px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1024px-Vue.js_Logo_2.svg.png">
        </div>
        </AccordionTab>
        <AccordionTab header="Pinia">
        <div class="flex justify-between items-center flex-row">
          <p>
            Pinia is used for state management, providing a clean and intuitive API while leveraging Vue’s reactivity system.
          </p>
          <img class="size-[60px]" src="/pinia.png">
        </div>
        </AccordionTab>
        <AccordionTab header="Tailwind CSS">
        <div class="flex justify-between items-center flex-row">
          <p>
            Tailwind CSS powers the UI with utility-first classes for rapid and consistent styling. It ensures a clean, responsive layout across all screen sizes.
          </p>
          <img class="size-[60px]" src="/tailwind.png">
        </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
</script>

<style scoped>
code {
  background-color: #f5f5f5;
  padding: 0.15rem 0.3rem;
  border-radius: 4px;
  font-size: 0.95rem;
}
</style>
