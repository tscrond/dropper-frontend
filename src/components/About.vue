<template>
  <header class="text-black py-8">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl font-bold">
        About <span>Bobak Labs</span>
      </h1>
      <p class="mt-4 text-lg">
        A GitHub Organization fostering collaboration, tech discussions, and innovative project development.
      </p>
    </div>
  </header>

  <section class="container mx-auto my-12 p-6 bg-white shadow rounded-lg">
    <h2 class="text-3xl font-semibold text-center mb-6">Our Mission</h2>
    <p class="text-lg text-center mb-8">
      At <span class="font-semibold">Bobak Labs</span>, we’re passionate about tech and open collaboration.
      Our goal is to build an inclusive platform where anyone can propose and contribute to exciting projects.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Contribute Section -->
      <div class="flex flex-col justify-around p-4 border border-gray-400 rounded-lg bg-gray-100">
        <h3 class="text-xl font-semibold mb-4">Contribute to Bobak Labs</h3>
        <p class="mb-4">
          Have an idea for a new project or improvement? Submit a Pull Request (PR) or open an Issue with a detailed
          project proposal. Collaboration is at the heart of what we do!
        </p>
        <p>
          Proposals for new projects should be submitted within the
          <code class="bg-blue-200 px-1 rounded">project-proposals</code> branch.
        </p>
        <div class="flex flex-row">
          <Button class="flex" as="a" label="Explore Bobak Labs on GitHub" href="https://github.com/bobak-labs" />
        </div>
      </div>

      <!-- Join Section -->
      <div class="flex flex-col justify-around p-4 border border-gray-400 rounded-lg bg-gray-100">
        <h3 class="text-xl font-semibold mb-4">Join Our Organization</h3>
        <p class="mb-4">
          We welcome new members! To join <span class="font-semibold">Bobak Labs</span>, create a pull request with
          your GitHub name in the
          <code class="bg-blue-200 px-1 rounded">users.toml</code> file or open an issue requesting
          membership.
        </p>
        <p>We are an open community and are excited to have new talent join us!</p>
        <div class="flex flex-row">
          <Button class="flex" as="a" label="Join Now" href="https://github.com/bobak-labs" />
        </div>
      </div>
    </div>
  </section>

  <section class="container mx-auto my-12 p-6 shadow border border-gray-400 rounded-lg bg-gray-100">
    <h2 class="text-3xl font-semibold text-center mb-6">Guidelines for Collaboration</h2>
    <p class="text-lg text-center mb-8">
      To ensure smooth collaboration and maintain high-quality projects, we have some guidelines:
    </p>
    <ul class="list-disc list-inside space-y-2">
      <li>Always create a PR for every new feature or change.</li>
      <li>Do not push directly to the <code class="bg-blue-200 px-1 rounded">main</code> or <code class="bg-blue-200 px-1 rounded">master</code> branches.</li>
      <li>If you find any bugs, room for improvement, or security issues, create an issue or PR in the corresponding repository.</li>
      <li>Write clear, descriptive commit messages explaining what and why.</li>
      <li>Follow code style and formatting rules (e.g., <code>gofmt</code>, ESLint).</li>
      <li>Keep PRs focused—one feature or fix per PR.</li>
      <li>Use consistent branch names like <code>feature/xyz</code> or <code>bugfix/abc</code>.</li>
      <li>Be constructive and respectful when reviewing others' code.</li>
      <li>Update documentation when relevant changes are made.</li>
      <li>Ensure all tests pass before pushing changes.</li>
      <li>Don’t merge your own PR unless explicitly allowed to.</li>
      <li>Avoid breaking changes unless clearly communicated.</li>
      <li>Rebase frequently from <code class="bg-blue-200 px-1 rounded">main</code> to prevent conflicts.</li>
    </ul>
  </section>
</template>

<script setup>
import { Button } from 'primevue';
</script>
