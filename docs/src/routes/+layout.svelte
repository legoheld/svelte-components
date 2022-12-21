<script>
    import "../app.css";
  </script>

<nav class="bg-gray-800">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>
  
              <a href="/embed" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Embed</a>
              <!--
                  <a href="/test" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
      
                  <a href="/test2" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
              -->
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </nav>
  
  
  <slot></slot>