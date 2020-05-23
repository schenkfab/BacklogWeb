<template>
  <div class="container mx-auto items-center justify-center">
    <div class="text-gray-900 font-bold text-xl mb-2">News Backlog</div>
    <div class="mb-8">
      <p
        class="text-gray-700 text-base"
      >Agile RSS Feed Reader - A structured way of keeping up with what's new!</p>
    </div>
    <div class="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        class="lg:h-auto lg:w-1/3 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style="background-image: url('kanban.png'); height: 300px;"
        title="Woman holding a mug"
      ></div>
      <div
        class="border-r lg:w-2/3 border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <p
            class="text-gray-700 text-base"
          >Structure your news feeds by using a kanban board consisting of the following:</p>
          <ul class="text-gray-500">
            <li>Backlog - All the articles that were released. Automatically updated for you.</li>
            <li>To Do - Daily, or whatever schedule works for you - go through the backlog and add everything you want to read to To Do.</li>
            <li>Done - Put all the articles in there, that you have read.</li>
            <li>Rejected - Articles you are not interessted about.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="max-w-sm w-full lg:max-w-full lg:flex mt-5">
      <div
        class="border-r lg:w-2/3 border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <p
            class="text-gray-700 text-base"
          >Subscribe to already registered feeds or add your own with a simple click!</p>
        </div>
      </div>
      <div
        class="lg:h-auto lg:w-1/3 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style="background-image: url('Feeds.png'); height: 300px;"
        title="Woman holding a mug"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
